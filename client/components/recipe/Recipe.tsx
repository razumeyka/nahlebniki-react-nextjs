import React, { useState, useEffect, useRef, FC } from 'react';
import classes from "./Recipe.module.scss";
import { Recipe } from "../../types/types";

import Wrapper from "../layout/Wrapper";
import PhotoesLine from '../common/PhotoesLine';
import RecipeIngredients from './RecipeIngredients';
import RecipeStep from './RecipeStep';

interface RecipeProps {
    recipe: Recipe
};

const Recipe: FC<RecipeProps> = ({ recipe }) => {
    const recipeInstructions = useRef<HTMLDivElement>(null);
    const [ isSticky, setIsSticky ] = useState<boolean>(false);
    const [ recipeServing, setRecipeServing ] = useState(recipe.serving);

    const addServingHandler = () => {
        setRecipeServing(prev => ++prev)
    }

    const removeServingHandler = () => {
        if (recipeServing === 1) return;
        setRecipeServing(prev => --prev)
    }

    useEffect(() => {
        window.addEventListener('scroll', stickHandler);

        return () => {
            window.removeEventListener('scroll', stickHandler);
        };
    }, []);

    const stickHandler = () => {
        if (window !== undefined) {
            let windowHeight = window.innerHeight;
            let coords = recipeInstructions.current?.getBoundingClientRect();

            coords && coords.y < 0 && (coords.y + coords.height - windowHeight) > 0
                ? setIsSticky(true) 
                : setIsSticky(false);
        }
    };

    return (
        <div className={classes.recipe}>
            <Wrapper>
                <div className={classes.content}>
                    <div className={classes['left-column']}>
                        <h2 className={classes.heading}>{recipe.title} recipe</h2>
                        <p className={classes.description}>{recipe.description}</p>
                        <div className={classes.gallery}>
                            <PhotoesLine items={recipe.backstageImagesUrl} />
                        </div>
                        <RecipeIngredients 
                            ingredients={recipe.ingredients}
                            serving={recipeServing}
                            initialServing={recipe.serving}
                            onAddServing={addServingHandler}
                            onRemoveServing={removeServingHandler}
                            isIngredientsGrouped={recipe.isIngredientsGrouped}
                        />
                        <div ref={recipeInstructions}>
                            <h3 className={classes.subheading}>Instructions</h3>
                            { recipe.steps.map( step => (
                                <RecipeStep key={step._id} step={step} />
                            ))}
                        </div>
                    </div>
                    <div className={classes['right-column']}>
                        <div className={classes.categories}>
                            { recipe.categories.map( (category, index) => (
                                <div className={classes.category} key={index}>{category}</div>
                            ))}
                        </div>
                        <div className={isSticky ? classes['sticky-container'] : classes['hidden-container']}>
                            <RecipeIngredients 
                                ingredients={recipe.ingredients}
                                serving={recipeServing}
                                initialServing={recipe.serving}
                                onAddServing={addServingHandler}
                                onRemoveServing={removeServingHandler}
                                isIngredientsGrouped={recipe.isIngredientsGrouped}
                            />
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default Recipe;
