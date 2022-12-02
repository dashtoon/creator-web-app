import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

interface IProps {
    color: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    title: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> 
}


const CustomizedButton = (props: IProps) => {

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: props.color,
        backgroundColor: props.backgroundColor,
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '10%',
        '&:hover': {
          backgroundColor: props.hoverBackgroundColor,
        },
      }));
  return (
    <>
      <ColorButton onClick={e  => props.onClick(e)}  variant="contained">{props.title}</ColorButton>
      </>
  );
}

export default CustomizedButton;