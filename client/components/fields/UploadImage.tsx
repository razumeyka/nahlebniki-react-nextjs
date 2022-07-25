import React, { useState, FC, ChangeEvent } from 'react';
import Image from 'next/image';
import classes from './UploadImage.module.scss';

interface InputProps {
    label?: string;
    onChange: (image: File) => void;
};

const UploadImage: FC<InputProps> = ({ 
    label, onChange
}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | ArrayBuffer | null>(null);

    const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        onChange(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('load', () => { 
            setImagePreviewUrl(reader.result);
        });

        reader.addEventListener('error', () => { 
            console.log(reader.error);
        });
    };

    return (
        <>
            <label className={classes.control}>
                <input 
                    type="file"
                    onChange={uploadPhotoHandler}
                />
                <span className={classes.label}>{label}</span>
                <Image 
                    width='30px'
                    height='30px'
                    src='/static/icons/upload.svg'
                    alt='Some food'
                    objectFit='cover'
                />
            </label>
            {imagePreviewUrl && 
                <div className={classes.imageContainer}>
                    <Image 
                        width='300px'
                        height='300px'
                        src={imagePreviewUrl.toString()}
                        alt='Some food'
                        objectFit='cover'
                    />
                </div>
            }
        </>
    );
};

export default UploadImage;