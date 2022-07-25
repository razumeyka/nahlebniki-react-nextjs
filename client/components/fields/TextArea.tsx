import React, { FC, ChangeEvent } from 'react';
import classes from './TextArea.module.scss';

interface TextAreaProps {
    label?: string;
    name: string;
    placeholder?: string;
    value: string;
    isBlur: boolean;
    isValid: boolean;
    error: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: () => void;
};

const TextArea: FC<TextAreaProps> = ({ 
    label, name, placeholder, value, isBlur, isValid, error, onChange, onBlur
}) => {
    return (
        <label className={classes.control}>
            <span className={classes.label}>{label}</span>
            <textarea 
                className={classes.textarea}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {isBlur && !isValid &&
                <span className={classes.message}>{error}</span>
            }
        </label>
    );
};

export default TextArea;