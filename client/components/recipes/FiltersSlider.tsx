import React, { FC, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import Image from 'next/image';
import classes from './FiltersSlider.module.scss';

import "swiper/css";
import "swiper/css/navigation";

interface Cuisine {
    _id: string,
    name: string,
    iconUrl: string
}

interface FiltersSliderProps {
    items: Cuisine[],
    onFilter: (selectedCountry: string) => void,
}

const FiltersSlider: FC<FiltersSliderProps> = ({ items, onFilter }) => {
    const [ selectedCountry, setSelectedContry ] = useState<string>('all');

    return (
        <>
            <Swiper
                slidesPerView={"auto"}
                // spaceBetween={5}
                modules={[FreeMode, Navigation]}
                className="filters-swiper"
            >
                <SwiperSlide>
                    <button 
                        className={selectedCountry === 'all' ? `${classes['filter-button']} ${classes['filter-button_active']}` : classes['filter-button']}
                        onClick={() => {
                            setSelectedContry('all')
                            onFilter('all')
                        }}
                    >
                        <Image 
                            src="/static/icons/flags/earth.svg"
                            alt='Some food'
                            width={30}
                            height={30}
                            objectFit='contain'
                        />
                        <div className={classes.heading}>All countries</div>
                    </button>
                </SwiperSlide>
                { items.map( cuisine => (
                    <SwiperSlide key={cuisine._id}>
                        <button 
                            className={selectedCountry === cuisine.name ? `${classes['filter-button']} ${classes['filter-button_active']}` : classes['filter-button']}
                            onClick={() => {
                                setSelectedContry(cuisine.name)
                                onFilter(cuisine.name)
                            }}
                        >
                            <Image 
                                src={cuisine.iconUrl}
                                alt='Some food'
                                width={30}
                                height={30}
                                objectFit='contain'
                            />
                            <div className={classes.heading}>{cuisine.name}</div>
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default FiltersSlider;