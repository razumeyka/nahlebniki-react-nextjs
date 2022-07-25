import React, { FC } from 'react';
import classes from './MainButton.module.scss';

interface ButtonProps {
    title: string; 
    isDisabled: boolean; 
    onClick: () => void;
};

const MainButton: FC<ButtonProps> = (
    { title, isDisabled, onClick }
) => {
    return (
        <button 
            disabled={isDisabled}
            className={classes.button}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default MainButton;