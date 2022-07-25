import React, { FC, useState } from 'react';
import classes from "./RecipeIngredients.module.scss";
import { RecipeIngredient } from "../../types/types";

interface RecipeIngredientsProps {
    ingredients: RecipeIngredient[];
    initialServing: number;
    serving: number;
    onAddServing: () => void;
    onRemoveServing: () => void;
    isIngredientsGrouped: boolean;
};

const RecipeIngredients: FC<RecipeIngredientsProps> = ({ ingredients, initialServing, serving, onAddServing, onRemoveServing, isIngredientsGrouped }) => {
    let ingredientGroups: string[] = [];
    function unique() {
        if (!isIngredientsGrouped) return;
        const groups = ingredients.map( ingredient => ingredient.group );
      
        for (let group of groups) {
          if (! ingredientGroups.includes(group)) {
            ingredientGroups.push(group);
          }
        }
    };
    unique();

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className={classes['top-line']}>
                <h3 className={classes.subheading}>Ingredients</h3>
                <div className={classes.serving}>
                    <button 
                        type='button'
                        onClick={() => onRemoveServing()}
                    >
                        -
                    </button>
                    <div className={classes['serving__title']}>{serving} servings</div>
                    <button 
                        type='button'
                        onClick={() => onAddServing()}
                    >
                        +
                    </button>
                </div>
            </div>
            <ul className={classes.ingredients}>
                { isIngredientsGrouped
                    ? ingredientGroups.map( group => (
                        <div key={group} className={classes['ingredients__group']}>
                            <div className={classes['ingredients__title']}>{capitalizeFirstLetter(group)}:</div>
                            { ingredients.map(ingredient => {
                                if (ingredient.group === group) {
                                    return (
                                        <li key={ingredient._id}>
                                            {ingredient.title.toLowerCase()} - {(ingredient.quantity/initialServing)*serving} {ingredient.unit}
                                        </li>
                                    )
                                }
                            })}
                        </div>
                    ))
                    : ingredients.map(ingredient => (
                        <li key={ingredient._id}>
                            {ingredient.title.toLowerCase()} - {(ingredient.quantity/initialServing)*serving} {ingredient.unit}
                        </li>
                    ))
                }
            </ul>
        </>               
    )
}

export default RecipeIngredients;
