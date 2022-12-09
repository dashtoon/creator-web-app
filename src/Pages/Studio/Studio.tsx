import { TextField, CircularProgress, ImageList, ImageListItem, Rating } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, SyntheticEvent, useEffect, useLayoutEffect, useState } from "react";
import CustomizedButton from "../../Components/CustomButton/CustomButton";
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
import './Studio.css'
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import LinearWithValueLabel from '../../Components/LinearProgressBar/LinearProgressBar';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import RatingEmoji from "../../Components/Rating/Rating";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface ImageDetails {
    url: String;
    rating: number;
}

const Studio = () => {

    const [inputValue, setInputValue] = useState('')
    const [images, setImages] = useState<String[]>([]);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<String[]>([]);
    const [selectedImageurl, setSelectedImageUrl] = useState<String>();
    const [width, setWidth] = useState(512);
    const [height, setHeight] = useState(512);
    const [batchCount, setBatchCount] = useState(1);
    const [progress, setProgress] = useState<number>();
    const [loop, setLoop] = useState<NodeJS.Timer>();
    const [progressValue, setProgressValue] = useState(0);
    const [ratingValue, setRatingValue] = useState(0)
    const [imageData, setImageData] = useState<ImageDetails[]>([]);
    const navigate = useNavigate();

    const CustomZoomContent = (
        data: {
        buttonUnzoom: any, 
        modalState: any, 
        img: any,
        onUnzoom: any,
        }
      ) => {
        const [isLoaded, setIsLoaded] = useState(false)
      
        // console.log(data.img.props.src)
        useLayoutEffect(() => {
          if (data.modalState === 'LOADED') {
            setIsLoaded(true)
          } else if (data.modalState === 'UNLOADING') {
            setIsLoaded(false)
          }
        }, [data.modalState])
      
        const classCaption = isLoaded
          ? 'zoom-caption zoom-caption--loaded'
          : 'zoom-caption'
      
        return (<>
          {isLoaded ? data.buttonUnzoom : null}
      
          <figure>
            {data.img}


          </figure>

         {isLoaded ? <CustomizedButton className="modal-button" title="Create Character" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={() => {data.onUnzoom(); handleCreateCharacterClick() }}/> : null }  

        </>)
      }

    let baseUrl = process.env.NODE_ENV === 'development' ? 'http://100.64.0.3:7860' : 'https://stability.dashtoon.ai';

    useEffect(() => {
        
        let imgArray : String[] = []
        if(images)
        {
        images.map((image) => {
            imgArray.push(image)
            
             
    })
        if(imgArray.length)
        setImageUrl(imgArray)
}
    
    }, [images])
   
    useEffect(() => {
        console.log(imageUrl)
        let imgData: ImageDetails[] = []
        imageUrl.map((image) => {
            imgData.push({url: image, rating: 0})
        })
        setImageData(imgData)
        setLoading(false);
    }, [imageUrl])

    useEffect(() => {
        console.log(imageData)
    }, [imageData])

    useEffect(() => {
  
        if(progress)
        {
        setProgressValue(progress)
        }
    
    },[progress])

    useEffect(
        () => {
            if(loading === true)
            {
          setLoop(
            setInterval(async () => {
               if(progress !==0) await axios.get(`${baseUrl}/sdapi/v1/progress`)
                .then((res) => {                  
                    setProgress(res.data.progress * 100)
                })
            }, 200));
        }
      
        
        if(progress === 0)
         clearInterval(loop)
        },
        [loading]
      );

    const handleCreateCharacterClick = () => {
        let ratingCount = 0
        imageData.map((img) => {
            if(img.rating === 0)
                ratingCount++;
        })
        if(ratingCount>0)
        toast.error("Please provide Ratings for all the Images to proceed.", {
            position: toast.POSITION.BOTTOM_LEFT
          });
        else
            navigate('/create-character');
    }
   const handleRatingChange = (url: String, value: number) => {
    let imgDetails = [...imageData]
    imgDetails.map((img) => {
        if(url === img.url)
            img.rating = value
    })

   setImageData(imgDetails);
   }

    const handleGenerateClick = async () => {
        setLoading(true);
        setProgress(0.01);
        setProgressValue(0);
        let payload = {
            "prompt": inputValue,
            "steps": 20,
            "width": width,
            "height": height,
            "n_iter": batchCount,
        };
     
       await axios.post(`${baseUrl}/sdapi/v1/txt2img`, payload)
        .then((res) =>{ 
            let response = res
            setImages(response.data.images)
                })
       
            }

   
    return (
        <>  
        <ToastContainer />
           <div className="studio">
            <div className="studio-content">
                <div className="studio-actions">
            <TextField className="textField" id="input" label="Enter a prompt" variant="outlined"  onChange={(e) => setInputValue(e.target.value)}/>
          
            <CustomizedButton className="action-button" title="Generate" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="#ed1b64" onClick={handleGenerateClick} />
            
            </div>
            <div className="view-div">
                <div className="options-div">
                    <div className="option-div">
                        <div className="optionsHeading">
                            Width: <span className="box">{width}px</span>
                        </div>
                    <CustomSlider
                        key={"width-slider"}
                        name="width"
                        disabled={true}
                        min={64}
                        max={2048}
                        defaultValue={width}
                        step={64}
                        setValue={setWidth}
                        />
                    </div>

                    <div className="option-div">
                        <div className="optionsHeading">
                            Height: <span className="box">{height}px</span>
                        </div>
                    <CustomSlider
                        key={"height-slider"}
                        name="height"
                        disabled={true}
                        min={64}
                        max={2048}
                        defaultValue={height}
                        step={64}
                        setValue={setHeight}
                        />
                    </div>
                    <div className="option-div">
                        <div className="optionsHeading">
                            Batch Count: <span className="box">{batchCount}</span>
                        </div>
                    <CustomSlider
                        key={"batch-slider"}
                        name="batch"
                        disabled={false}
                        min={1}
                        max={5}
                        defaultValue={batchCount}
                        step={1}
                        setValue={setBatchCount}
                        />
                    </div>
                </div>
                <div className="image-div">
                {
                    
             loading ? <div className="centeredDiv"> <LinearWithValueLabel value={progressValue} /> </div> :  imageUrl.length ? 
                <>
             
             <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {imageData.map((item) => (
        <ImageListItem key={`${item.url}`}>
             <Zoom ZoomContent={CustomZoomContent}>
             <img
                      className="img"
                      src={`data:image/png;base64,${item.url}`}
                    />
          </Zoom>
       <div>Rating:  <RatingEmoji key={`${item.url}`} url={`${item.url}`} defaultValue={item.rating}  handleRatingChange={handleRatingChange} /></div> 
        </ImageListItem>
      ))}
    </ImageList>
             
          
          
                    
                </> : <div className="centeredDiv">
                       <ImageIcon sx={{fontSize: '5rem'}}/>
                    </div>
            }
                </div>
            </div>
            
            </div>
        </div>

        </>
    )
}

export default Studio;