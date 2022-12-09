import React from 'react';
import { Slider } from "@mui/material";

interface IProps {
    defaultValue: number;
    step: number;
    min: number;
    max: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    name: string;
    disabled: boolean;
}
const CustomSlider = (props: IProps) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
          props.setValue(newValue);
        }
      };

    return(
        <>
         <Slider
            sx={{padding: '2% !important', width: '90%' }}
            key={props.name}
            aria-label="Width"
            disabled={props.disabled}
            value={props.defaultValue}
            valueLabelDisplay="auto"
            step={props.step}
            min={props.min}
            max={props.max}
            onChange={handleChange}
            />
        </>
    );
}

export default CustomSlider;