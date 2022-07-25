import React, { FC, ChangeEvent } from 'react';
import classes from './TextInput.module.scss';

interface InputProps {
    label?: string;
    name: string;
    type: string;
    placeholder?: string;
    value: string;
    isBlur: boolean;
    isValid: boolean;
    error: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
};

const TextInput: FC<InputProps> = ({ 
    label, name, type, placeholder, value, isBlur, isValid, error, onChange, onBlur
}) => {
    return (
        <label className={classes.control}>
            {label && <span className={classes.label}>{label}</span>}
            <input 
                className={classes.input}
                name={name}
                type={type}
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

export default TextInput;