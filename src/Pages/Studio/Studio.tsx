import { TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import CustomizedButton from "../../Components/CustomButton/CustomButton";
import axios from 'axios';
import ImageIcon from '@mui/icons-material/Image';
import './Studio.css'
import CustomSlider from "../../Components/CustomSlider/CustomSlider";


const Studio = () => {

    const [inputValue, setInputValue] = useState('')
    const [images, setImages] = useState<String[]>([]);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<String[]>([]);
    const [width, setWidth] = useState(512);
    const [height, setHeight] = useState(512)

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
        setLoading(false);
    }, [imageUrl])

    const handleGenerateClick = async () => {
        setLoading(true);
        let payload = {
            "prompt": inputValue,
            "steps": 20,
            "width": width,
            "height": height,
        };
     
        axios.post(`${baseUrl}/sdapi/v1/txt2img`, payload)
        .then((res) =>{ let response = res
        setImages(response.data.images)})
       
    }

   
    
    const defaultDiv = <div className="defaultDiv"></div>
    return (
        <>  
           <div className="studio">
            <div className="studio-content">
                <div className="studio-actions">
            <TextField className="textField" id="input" label="Enter a prompt" variant="outlined"  onChange={(e) => setInputValue(e.target.value)}/>
          
            <CustomizedButton className="action-button" title="Generate" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={handleGenerateClick} />
            
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
                        min={64}
                        max={2048}
                        defaultValue={height}
                        step={64}
                        setValue={setHeight}
                        />
                    </div>
                </div>
                <div className="image-div">
                {
             loading ?  <CircularProgress/> :  imageUrl.length ? 
                <>
                     <div className="image">
                    {imageUrl.map((img) => (
                        <img className="img" src={`data:image/png;base64,${img}`} />
                    ))}
                 
            </div> 
                </> : <div >
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