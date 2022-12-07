import React from "react";
import CustomizedButton from "../../Components/CustomButton/CustomButton";
import Logo from "../../Assets/Images/logo.png";
import './Home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const handleFreeFormClick = () => {
        navigate('create_freeform')
    }

    const handleCharacterClick = () => {
        navigate('create_character')
    }

    const handleStudioClick = () => {
        navigate('studio')
    }

    return(
        <>
        <div className="logo-div">
            <img className="logo-image" src={Logo} alt="logo" />
            <p className="logo-text">DASHTOON</p>
        </div>
        <div className="buttons-div">
        
        <CustomizedButton title="Create Freeform" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={handleFreeFormClick} />
        <CustomizedButton title="Create Character" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={handleCharacterClick} />
        <CustomizedButton title="Studio" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={handleStudioClick} />


        </div>
        </>
    );
}

export default Home;