import { Autocomplete, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, {useState} from "react";
import CustomizedButton from "../../Components/CustomButton/CustomButton";
import handleGenerateImage from "../../utils/api";
import './Character.css';
const Character = () => {

    const [frame, setFrame] = useState(1);
    const [characterType, setCharacterType] = useState("Woman");
    const [miscFeatures, setMiscFeatures] = useState(['']);
    const [orientation, setOrientation] = useState("Portrait");
    const [eyeColor, setEyeColor] = useState('Black');
    const [hairColor, setHairColor] = useState("Brown");
    const [expression, setExpression] = useState("Neutral");
    const [artStyle, setArtStyle] = useState("Artgerm");
    const [excessOptions, setExcessOptions] = useState("Concept Art");
    const [hairStyle, setHairStyle] = useState('Short');
  
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [showImage, setShowImage] = useState(false);
  
    const characterTypeList = ["man", "woman", "child", "wizard", "witch", "soldier"]
    const excessOptionsList = ["concept art", "comic cover art", "sharp focus"]
    const artStylesList = ["greg rutkowski", "artgerm", "alphone mecha", "charles vess", "peter elson", "jordan grimmer"]
    const orientationList = ["portrait", "full body", "side view", "facing away"]
    const eyeColorList = ["brown", "black", "green", "blue", "red", "yellow", "white", "gold", "orange", "gray"]
    const hairColorsList = ["black", "brown", "red", "gold", "grey", "white"]
    const hairStylesList = ["short", "medium", "shoulder-length", "long", "waist-length", "straight", "curly", "wavy", "wiry", "fluffy", "mushroom", "mohawk", "bald"]
    const expressionsList = ["neutral", "happy", "surprised", "sad", "confused", "worried", "fearful", "sleepy", "grumpy", "silly", "relaxed", "enraged"]
    const miscFeaturesList = ["wringles", "freckles", "earrings", "nose ring", "beard", "mustache", "goatee", "scars", "glasses", "eyepatch", "lipstick", "missing tooth", "headphones"]

 
    const capitalizeFirstLetter = (str: string) => {
        return(str.charAt(0).toUpperCase() + str.slice(1));
      }
    
    const getArray = (inputArray: string[]) => {
        let arr : string[] = []  

        inputArray.map((word) => 
            arr.push(capitalizeFirstLetter(word))
        )

        return arr;
      }

    const handleMiscChange = (event: SelectChangeEvent<typeof miscFeatures>) => {
        const {
            target: { value },
          } = event;
          setMiscFeatures(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
          
    }
    
    const handleGenerate = () => {
        handleGenerateImage(createPrompt(), setImageUrl, setLoading)
    }

 

    const createPrompt = () => {
        setShowImage(true);
        setFrame(3);
        var fullPrompt = orientation[0];
        fullPrompt = fullPrompt + ', ' + artStyle + ', ' + characterType + ' with ' + hairColor + ' ' + hairStyle + 'hair and ' + eyeColor + ' eyes, expression is ' + expression + '.';
        fullPrompt = fullPrompt + ' ' + miscFeatures + ' , ' + excessOptions;
        return fullPrompt;
      }
    
      const renderImage = () => {
        if (showImage) {
          return (
            <div className="imageDiv">
                {isLoading ? <CircularProgress /> : 
              <img
                src={imageUrl}
                className='image'
              />
          }
            </div>
    
          )
        }
      }

    return(
        <div className="character-inputs">
            {frame === 1 ? 
            (
                <>
            <div className="heading"> Create your Character</div>
            <div className="inputs">
            <Autocomplete
                disablePortal
                className="inputBox"
                id="character-type"
                options={getArray(characterTypeList)}
                value={characterType}
                sx={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Character Type" />}
                onChange={(e, value) => value ? setCharacterType(value) : null}
            />
             <Autocomplete
                disablePortal
                id="orientation-type"
                className="inputBox"
                options={getArray(orientationList)}
                value={orientation}
                sx={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Orientation" />}
                onChange={(e, value) =>  value ? setOrientation(value) : null}
            />
            <Autocomplete
                disablePortal
                id="eyecolor"
                className="inputBox"
                options={getArray(eyeColorList)}
                value={eyeColor}
                sx={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Eye Color" />}
                onChange={(e, value) =>  value ? setEyeColor(value) : null}
            />
            <Autocomplete
                disablePortal
                id="expression"
                className="inputBox"
                options={getArray(expressionsList)}
                value={expression}
                sx={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Expression" />}
                onChange={(e, value) =>  value ? setExpression(value) : null}
            />
             <Autocomplete
                disablePortal
                id="haircolor"
                className="inputBox"
                options={getArray(hairColorsList)}
                value={hairColor}
                sx={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Hair Color" />}
                onChange={(e, value) =>  value ? setHairColor(value) : null}
            />
             <Autocomplete
                disablePortal
                id="hairstyle"
                className="inputBox"
                options={getArray(hairStylesList)}
                value={hairStyle}
                sx={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Hair Style" />}
                onChange={(e, value) =>  value ? setHairStyle(value) : null}
            />
            </div>
            <CustomizedButton title="Next" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={() => setFrame(2)}  />
            </>
            )
            : frame === 2 ? 
            (
                <>
            <div className="heading"> Create your Character</div>
            <div className="inputs">
            <Autocomplete
                disablePortal
                className="inputBox"
                id="artStyle"
                options={getArray(artStylesList)}
                value={artStyle}
                sx={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Art Style" />}
                onChange={(e, value) => value ? setArtStyle(value) : null}
            />
          
            <FormControl className="inputBox" sx={{width: 300 }} >
        <InputLabel id="demo-multiple-name-label">Misc Features</InputLabel>
        <Select
          labelId="misc-label"
          id="misc"
          multiple
          value={miscFeatures}
          onChange={handleMiscChange}
          input={<OutlinedInput label="Misc Features" />}
          
        >
          {getArray(miscFeaturesList).map((misc) => (
            <MenuItem
              key={misc}
              value={misc}
             
            >
              {misc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
            <Autocomplete
                disablePortal
                id="excessOptions"
                className="inputBox"
                options={getArray(excessOptionsList)}
                value={excessOptions}
                sx={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Excess Options" />}
                onChange={(e, value) =>  value ? setExcessOptions(value) : null}
            />
            
            </div>
            <div className="buttons-div">
            <CustomizedButton title="Back" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={() => setFrame(1)}  />
            <CustomizedButton title="Generate" color="white" backgroundColor="#357cf0" hoverBackgroundColor="" onClick={() => handleGenerate()}  />
            </div>
            </>
            ) 
            : frame === 3 ? (
            <div className="content1"> 
                <div className="heading">Character</div>
            {renderImage()}
            <div className="edit-div">
            <CustomizedButton title="Edit" color="white" backgroundColor="#ed1b64" hoverBackgroundColor="" onClick={() => setFrame(1)}  />
                </div>
            </div>
            )
            : null}
        </div>
    )
}

export default Character;