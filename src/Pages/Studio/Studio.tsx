import { TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import CustomizedButton from "../../Components/CustomButton/CustomButton";
import axios from 'axios';


const Studio = () => {

    const [inputValue, setInputValue] = useState('')
    const [showDefaultImage, setShowDefaultImage] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

 
    const handleGenerateClick = async () => {
        setLoading(true);
        let payload = {
            "prompt": inputValue,
            "steps": 5,
        };
     
        // window.open('https://auth.dashtoon.ai/oauth2/sign_out?rd=https%3A%2F%2Fwww.googleapis.com%2Fsign_out_page')
        
        
        axios.post('https://stability.dashtoon.ai/sdapi/v1/txt2img', payload, {withCredentials: true})
        .then((res) =>{ let response = res
        console.log(response)})

     

        // let url = 'https://lexica.art/api/v1/search?q=' + inputValue;
        // fetch(url).then(response => response.json())
        // .then((responseJson) => {
        //     let imageUrl = responseJson['images'][0]['src'];      
        //    setImageUrl(imageUrl);
        //    setShowDefaultImage(false);
        //    setLoading(false);
        //    setInputValue('');
        // }).catch(error => console.log(error))
    }
    
    const defaultDiv = <div className="defaultDiv"></div>
    return (
        <>  
           <div className="freeform">
            <div className="content">
                <div>
            <TextField id="input" label="Input Something" variant="outlined" fullWidth onChange={(e) => setInputValue(e.target.value)}/>
            </div>
            <div className="imageDiv">
                {loading ? <CircularProgress /> :
                showDefaultImage ? defaultDiv : <img className="image" src={imageUrl} alt="image" /> }
                 
            </div>
            <div className="buttonDiv">
                <CustomizedButton title="Generate" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={handleGenerateClick} />
            </div>
            </div>
        </div>

        </>
    )
}

export default Studio;