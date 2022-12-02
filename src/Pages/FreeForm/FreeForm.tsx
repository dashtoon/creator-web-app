import { CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import './FreeForm.css'
import DefaultImage from '../../Assets/Images/default.png'
import CustomizedButton from "../../Components/CustomButton/CustomButton";

const Freeform = () => {
    const [inputValue, setInputValue] = useState('')
    const [showDefaultImage, setShowDefaultImage] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateClick = () => {
        setLoading(true);
        let url = 'https://lexica.art/api/v1/search?q=' + inputValue;
        fetch(url).then(response => response.json())
        .then((responseJson) => {
            let imageUrl = responseJson['images'][0]['src'];      
           setImageUrl(imageUrl);
           setShowDefaultImage(false);
           setLoading(false);
           setInputValue('');
        }).catch(error => console.log(error))
    }
  
    return (
        <div className="freeform">
            <div className="content">
                <div>
            <TextField id="input" label="Input Something" variant="outlined" fullWidth onChange={(e) => setInputValue(e.target.value)}/>
            </div>
            <div className="imageDiv">
                {loading ? <CircularProgress /> :
                <img className="image" src={showDefaultImage ? DefaultImage : imageUrl} alt="image" /> }
            </div>
            <div className="buttonDiv">
                <CustomizedButton title="Generate" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={handleGenerateClick} />
            </div>
            </div>
        </div>
    )
}

export default Freeform;