import React, { useState, FC, ChangeEvent } from 'react';
import Image from 'next/image';
import classes from './UploadImagesMulti.module.scss';

interface InputProps {
    label?: string;
    onChange: (images: FileList) => void;
};

const UploadImagesMulti: FC<InputProps> = ({ 
    label, onChange
}) => {
    const [imagesPreviewUrl, setImagesPreviewUrl] = useState<any[]>([]);

    const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const files: FileList = event.target.files;
        onChange(files);

        Array.from(files).forEach( file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.addEventListener('load', () => { 
                setImagesPreviewUrl((prev) => [ ...prev, reader.result?.toString() ]);
            });

            reader.addEventListener('error', () => { 
                console.log(reader.error);
            });
        });
    };

    return (
        <>
            <label className={classes.control}>
                <input 
                    multiple
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
            <div className={classes.images}>
                {imagesPreviewUrl.length !== 0 && 
                    imagesPreviewUrl.map( uri => (
                        <div className={classes.imageContainer} key={uri}>
                            <Image 
                                width='120px'
                                height='120px'
                                src={uri}
                                alt='Some food'
                                objectFit='cover'
                            />
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default UploadImagesMulti;