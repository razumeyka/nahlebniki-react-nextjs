import React, { FC } from 'react';
import Image from 'next/image';
import Link from "next/link";
import classes from './CardGrid.module.scss';
import { Recipe } from "../../types/types";

const CardGrid: FC<{ recipe: Recipe }> = ({ recipe }) => {
    return (
        <Link href={'/recipe/[recipeId]'} as={`/recipe/${recipe._id}`}>
            <a 
                className={classes.card}
            >
                <Image 
                    src={recipe?.imageUrl ? recipe.imageUrl : '/static/images/burger.jpg'}
                    alt='Some food'
                    width={400}
                    height={400}
                    objectFit='cover'
                />
                <div className={classes.heading}>
                    <span>{recipe.title}</span>
                </div>
            </a>
        </Link>
    );
};

export default CardGrid;