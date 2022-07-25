import React, { useRef, useState, FC } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import Image from 'next/image';
import classes from './PhotoesLine.module.scss';

import "swiper/css";
import "swiper/css/navigation";

const PhotoesLine: FC<{ items: string[]}> = ({ items }) => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={5}
                navigation={true} 
                modules={[FreeMode, Navigation]}
                className="backstage-swiper"
            >
                { items.map( image => (
                    <SwiperSlide key={image}>
                        <Image 
                            src={image}
                            alt='Some food'
                            width={180}
                            height={180}
                            objectFit='cover'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default PhotoesLine;