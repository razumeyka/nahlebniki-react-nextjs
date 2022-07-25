import React, { useRef, useState, FC } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import Image from 'next/image';
import { Recipe } from "../../types/types";
import classes from './PhotoesLine.module.scss';

import "swiper/css";
import "swiper/css/navigation";

import CardGrid from './CardGrid';

const RecipesSlider: FC<{ items: Recipe[]}> = ({ items }) => {
    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                spaceBetween={5}
                navigation={true} 
                modules={[FreeMode, Navigation]}
                className="recipes-swiper"
            >
                { items.map( recipe => (
                    <SwiperSlide key={recipe._id}>
                        <CardGrid recipe={recipe} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default RecipesSlider;