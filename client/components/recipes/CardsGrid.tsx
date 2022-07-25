import React, { FC, useState } from 'react';
import classes from './CardsGrid.module.scss';
import { Recipe, Cuisine } from "../../types/types";

import Wrapper from '../layout/Wrapper';
import FiltersSlider from './FiltersSlider';
import RecipesSlider from './RecipesSlider';


interface CardsProps {
    cuisines: Cuisine[],
    recipes: {
        [key: string]: Recipe[],
    }
}

const CardsGrid: FC<CardsProps> = ({ recipes, cuisines }) => {
    const [ filtredRecipes, setFilteredRecipes ] = useState<Recipe[] | null>([]);

    console.log(recipes.travel);

    const filterCountryHandler = (selectedCountry: string) => {
        if (selectedCountry === 'all') {
            setFilteredRecipes([]);
        } else {
            const filtered = recipes.travel.filter(recipe => recipe.authorCountry === selectedCountry);
            if (!!filtered.length) {
                setFilteredRecipes(filtered);
            } else {
                setFilteredRecipes(null);
            }
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes['cards-container']}>
                <Wrapper>
                    <div className={classes['top-line']}>
                        <h2 className={classes.heading}>Travel recipes</h2>
                        <div className={classes.link}>Show all travel recipes</div>
                    </div>
                </Wrapper>
                <div className={classes['slider-container']}>
                    <div className={classes.filters}>
                        <FiltersSlider 
                            items={cuisines} 
                            onFilter={filterCountryHandler}
                        />
                    </div>
                    { filtredRecipes === null   
                        ? <div className={classes['no-recipies']}>
                            <span>No recipes yet in selected country</span>
                        </div>
                        : !filtredRecipes.length        
                            ? <RecipesSlider items={recipes.travel} />
                            : <RecipesSlider items={filtredRecipes} />
                    }
                </div>
            </div>
            { !!recipes.backpacking.length &&
                <div className={classes['cards-container']}>
                    <Wrapper>
                        <div className={classes['top-line']}>
                            <h2 className={classes.heading}>Backpacking recipes</h2>
                            <div className={classes.link}>Show all recipes</div>
                        </div>
                    </Wrapper>
                    <div className={classes['slider-container']}>
                        <RecipesSlider items={recipes.backpacking} />
                    </div>
                </div>
            }
            { !!recipes.vegetarian.length &&
                <div className={classes['cards-container']}>
                    <Wrapper>
                        <div className={classes['top-line']}>
                            <h2 className={classes.heading}>Vegetarian recipes</h2>
                            <div className={classes.link}>Show all recipes</div>
                        </div>
                    </Wrapper>
                    <div className={classes['slider-container']}>
                        <RecipesSlider items={recipes.vegetarian} />
                    </div>
                </div>
            }
            { !!recipes.all.length &&
                <div className={classes['cards-container']}>
                    <Wrapper>
                        <div className={classes['top-line']}>
                            <h2 className={classes.heading}>All recipes</h2>
                            <div className={classes.link}>Show all recipes</div>
                        </div>
                    </Wrapper>
                    <div className={classes['slider-container']}>
                        <RecipesSlider items={recipes.all} />
                    </div>
                </div>
            }
        </div>
    );
};

export default CardsGrid;