import React, { ChangeEvent, FC } from 'react';
import { useState, useEffect } from 'react';
import classes from './IngredientsList.module.scss';
import useInput from './../../hooks/useInput';

import TextInput from '../fields/TextInput';

interface RecipeIngredient {
    id: string, 
    title: string, 
    quantity: number, 
    unit: string,
    group: string
};

interface IngredientsListProps {
    ingredient: RecipeIngredient;
    isIngredientsGrouped: Boolean;
    onEditIngredient: (ingredient: RecipeIngredient) => void;
    onDeleteIngredient: (id: string) => void;
}

const IngredientsList: FC<IngredientsListProps> = ({ ingredient, isIngredientsGrouped, onEditIngredient, onDeleteIngredient }) => {
    const ingredientName = useInput('', { isEmpty: true });
    const ingredientQuantity = useInput('', { isEmpty: true });
    const ingredientUnit = useInput('', { isEmpty: true });
    const ingredientGroup = useInput('', { isEmpty: true });
    const [ newIngredient, setNewIngredient ] = useState<RecipeIngredient>({ ...ingredient });

    useEffect( () => {
        onEditIngredient(newIngredient);
    }, [ newIngredient ]);

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        ingredientName.onChange(event);
        setNewIngredient({ ...newIngredient, title: event.target.value });
    };

    const changeQuantityHandler = (event: ChangeEvent<HTMLInputElement>) => {
        ingredientQuantity.onChange(event);
        setNewIngredient({ ...newIngredient, quantity: +event.target.value });
    };

    const changeUnitHandler = (event: ChangeEvent<HTMLInputElement>) => {
        ingredientUnit.onChange(event);
        setNewIngredient({ ...newIngredient, unit: event.target.value });
    };

    const changeGroupHandler = (event: ChangeEvent<HTMLInputElement>) => {
        ingredientGroup.onChange(event);
        setNewIngredient({ ...newIngredient, group: event.target.value });
    };

    const deleteIngredientHandler = () => {
        onDeleteIngredient(ingredient.id);
    }

    return (
        <div className={classes.row}>
            <div className={classes['row-item-lg']}>
                <TextInput 
                    placeholder="Title"
                    name="ingredient"
                    type="text"
                    value={ingredientName.value}
                    isBlur={ingredientName.isBlur}
                    isValid={ingredientName.isInputValid}
                    error='Field should not be empty'
                    onChange={changeTitleHandler}
                    onBlur={ingredientName.onBlur}
                />
            </div>
            <div className={classes['row-item-sm']}>
                <TextInput 
                    placeholder="Quantity"
                    name="quantity"
                    type="number"
                    value={ingredientQuantity.value}
                    isBlur={ingredientQuantity.isBlur}
                    isValid={ingredientQuantity.isInputValid}
                    error='Field should not be empty'
                    onChange={changeQuantityHandler}
                    onBlur={ingredientQuantity.onBlur}
                />
            </div>
            <div className={classes['row-item-sm']}>
                <TextInput 
                    placeholder="Unit"
                    name="unit"
                    type="text"
                    value={ingredientUnit.value}
                    isBlur={ingredientUnit.isBlur}
                    isValid={ingredientUnit.isInputValid}
                    error='Field should not be empty'
                    onChange={changeUnitHandler}
                    onBlur={ingredientUnit.onBlur}
                />
            </div>
            { isIngredientsGrouped &&
                <div className={classes['row-item-sm']}>
                    <TextInput 
                        placeholder="Group"
                        name="group"
                        type="text"
                        value={ingredientGroup.value}
                        isBlur={ingredientGroup.isBlur}
                        isValid={ingredientGroup.isInputValid}
                        error='Field should not be empty'
                        onChange={changeGroupHandler}
                        onBlur={ingredientGroup.onBlur}
                    />
                </div>
            }
            <div className={classes['row-item-5']}>
                <button
                    className={classes['remove-button']}
                    type='button'
                    onClick={deleteIngredientHandler}
                >x</button>
            </div>
        </div>
    )
};

export default IngredientsList;