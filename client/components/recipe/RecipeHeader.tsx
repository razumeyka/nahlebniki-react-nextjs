import React, { FC } from 'react';
import Image from 'next/image';
import classes from './RecipeHeader.module.scss';
import { Recipe } from "../../types/types";

import Wrapper from '../layout/Wrapper';

const RecipeHeader: FC<{ recipe: Recipe }> = ({ recipe }) => {
    return (
        <div className={classes.container}>
            <Wrapper>
                <h1 className={classes.heading}>{recipe.title}</h1>
                <p className={classes.author}>{recipe.author}</p>
                <p className={classes.country}>{recipe.authorCountry}</p>
                <div className={classes.photo}>
                    <Image 
                        src={recipe.imageUrl}
                        alt='Some food'
                        width={480}
                        height={480}
                        objectFit='cover'
                    />
                </div>
            </Wrapper>
        </div>
    );
};

export default RecipeHeader;