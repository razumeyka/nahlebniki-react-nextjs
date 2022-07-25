import React, { useCallback, useEffect, FC } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import classes from './RecipeForm.module.scss';
import useInput from './../../hooks/useInput';
import useTextArea from './../../hooks/useTextArea';
import { Category, Cuisine } from '../../types/types';

import TextInput from '../fields/TextInput';
import TextArea from '../fields/TextArea';
import UploadImage from '../fields/UploadImage';
import UploadImagesMulti from '../fields/UploadImagesMulti';
import SelectField from '../fields/SelectField';
import SelectMultiField from '../fields/SelectMultiField';
import IngredientsList from './IngredientsList';
import StepsList from './StepsList';
import MainButton from '../ui/MainButton';

interface RecipeIngredient {
    id: string, 
    title: string, 
    quantity: number, 
    unit: string,
    group: string
};

interface RecipeStep {
    id: string;
    stepNumber: number | null;
    description: string;
    image: File | null;
};

interface formOptions {
    [key: string]: any,
};

const initialIngredient = {
    id: uuidv4(), 
    title: '', 
    quantity: 1, 
    unit: '',
    group: ''
};

const initialStep = {
    id: uuidv4(), 
    stepNumber: null, 
    description: '', 
    image: null
};

const RecipeForm: FC<{ cuisines: Cuisine[], categories: Category[] }> = ({ cuisines, categories }) => {
    const router = useRouter();
    const [ recipeImage, setRecipeImage] = useState<File | null>(null);
    const [ backstageImages, setBackstageImages] = useState<File[]>([]);
    const [ recipeCuisine, setRecipeCuisine ] = useState<string>('');
    const [ recipeCategories, setRecipeCategories ] = useState<string[]>([]);
    const [ recipeIngredients, setRecipeIngredients ] = useState<RecipeIngredient[]>([initialIngredient]);
    const [ isIngredientsGrouped, setIsIngredientsGrouped ] = useState<Boolean>(false);
    const [ recipeSteps, setRecipeSteps ] = useState<RecipeStep[]>([initialStep]);

    const title = useInput('', { isEmpty: true });
    const author = useInput('', { isEmpty: true });
    const authorCountry = useInput('', { isEmpty: true });
    const description = useTextArea('', { isEmpty: true });
    const serving = useInput('', { isEmpty: true });

    const addIngredientHandler = () => {
        const ingredientId = uuidv4();
        setRecipeIngredients(prev => [ ...prev, { id: ingredientId, title: '', quantity: 1, unit: '', group: '' }]);
    };

    const editIngredientHandler = (ingredient: RecipeIngredient) => {
        setRecipeIngredients( prev => prev.map( item => ingredient.id === item.id ? ingredient : item ));
    };

    const deleteIngredientHandler = (id: string) => {
        setRecipeIngredients( prev => prev.filter( item => id !== item.id ));
    };

    const addStepHandler = () => {
        const stepId = uuidv4();
        setRecipeSteps(prev => [ ...prev, { id: stepId, stepNumber: null, description: '', image: null } ]);
    };

    const editStepHandler = (step: RecipeStep) => {
        setRecipeSteps( prev => prev.map( item => step.id === item.id ? step : item ));
    };

    const deleteStepHandler = (id: string) => {
        setRecipeSteps( prev => prev.filter( item => {
            return id !== item.id 
        }).map((step, index) => {
            return { ...step, stepNumber: index + 1 }
        }));
    };

    const addRecipeHandler = useCallback(async () => {
        try {
            if (!recipeImage) return;

            const form: formOptions = {
                title: title.value, 
                image: recipeImage,
                author: author.value,
                authorCountry: authorCountry.value,
                originCountry: recipeCuisine,
                description: description.value,
                backstageImages: backstageImages,
                serving: serving.value,
                ingredients: recipeIngredients.map( ingredient => ({ title: ingredient.title, quantity: ingredient.quantity, unit: ingredient.unit, group: ingredient.group })),
                isIngredientsGrouped: isIngredientsGrouped,
                steps: recipeSteps.map(step => ({ stepNumber: step.stepNumber, description: step.description })),
                stepsImages: recipeSteps.map(step => step.image),
                categories: recipeCategories,
            };

            const formData = new FormData();

            Object.keys(form).forEach(key => {
                if (key !== 'backstageImages' && key !== 'categories' && key !== 'ingredients' && key !== 'steps' && key !== 'stepsImages') {
                    formData.append(key, form[key]);
                }
            });
            
            form.backstageImages.forEach((val: any) => formData.append('backstageImage', val));
            form.categories.forEach((val: any) => formData.append('categories', val));
            formData.append('ingredients', JSON.stringify(form.ingredients));
            formData.append('steps', JSON.stringify(form.steps));
            form.stepsImages.forEach((val: any, index: number) => formData.append(`stepImage-${index + 1}`, val));

            await axios.post('http://localhost:5000/api/admin/create', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response.data);
            })
        } catch(err) {
            console.log(err);
        }
    }, [title.value, author.value, authorCountry.value, recipeCuisine, description.value, backstageImages, serving.value, recipeImage, recipeCategories, recipeIngredients, recipeSteps, isIngredientsGrouped]);

    return (
        <div className={classes.container}>
            <div className={classes.heading}>Add new recipe</div>
            <form 
                className={classes.form}
                onSubmit={(event) => event.preventDefault()}
            >
                <TextInput 
                    placeholder="Title"
                    name="title"
                    type="text"
                    value={title.value}
                    isBlur={title.isBlur}
                    isValid={title.isInputValid}
                    error='Field should not be empty'
                    onChange={title.onChange}
                    onBlur={title.onBlur}
                />
                <UploadImage 
                    label={recipeImage ? "Change main photo" : "Upload main photo"}
                    onChange={(image: File) => setRecipeImage(image)}
                />
                <UploadImagesMulti 
                    label={"Upload backstage images"}
                    onChange={(images: FileList) => setBackstageImages(prev => [ ...prev, ...Array.from(images)])}
                />
                <TextInput 
                    placeholder="Author"
                    name="author"
                    type="text"
                    value={author.value}
                    isBlur={author.isBlur}
                    isValid={author.isInputValid}
                    error='Field should not be empty'
                    onChange={author.onChange}
                    onBlur={author.onBlur}
                />
                <TextInput 
                    placeholder="Author country"
                    name="authorCountry"
                    type="text"
                    value={authorCountry.value}
                    isBlur={authorCountry.isBlur}
                    isValid={authorCountry.isInputValid}
                    error='Field should not be empty'
                    onChange={authorCountry.onChange}
                    onBlur={authorCountry.onBlur}
                />
                <SelectField 
                    placeholder='Select cuisine'
                    items={cuisines}
                    onChange={(value: string) => setRecipeCuisine(value)}
                />
                <SelectMultiField 
                    placeholder='Select categories'
                    items={categories}
                    onChange={(values: string[]) => setRecipeCategories(values)}
                />
                <TextArea 
                    placeholder="Description"
                    name="description"
                    value={description.value}
                    isBlur={description.isBlur}
                    isValid={description.isInputValid}
                    error='Field should not be empty'
                    onChange={description.onChange}
                    onBlur={description.onBlur}
                />
                <TextInput 
                    placeholder="Serving"
                    name="serving"
                    type="number"
                    value={serving.value}
                    isBlur={serving.isBlur}
                    isValid={serving.isInputValid}
                    error='Field should not be empty'
                    onChange={serving.onChange}
                    onBlur={serving.onBlur}
                />
                <div className={classes.subheading}>Ingredients</div>
                <label>
                    <input type="checkbox" onChange={() => setIsIngredientsGrouped(prev => !prev)}/>
                    <span>Has several groups of ingredients</span>
                </label>
                { recipeIngredients.map( (ingredient) => (
                    <IngredientsList
                        key={ingredient.id}
                        ingredient={ingredient}
                        isIngredientsGrouped={isIngredientsGrouped}
                        onEditIngredient={editIngredientHandler}
                        onDeleteIngredient={deleteIngredientHandler}
                    />
                ))}
                <button 
                    className={classes['add-button']}
                    type="button" 
                    onClick={addIngredientHandler}
                >
                    +
                </button>
                <div className={classes.subheading}>Steps</div>
                { recipeSteps.map( (step, index) => (
                    <StepsList
                        key={step.id}
                        index={index + 1}
                        step={step}
                        onEditStep={editStepHandler}
                        onDeleteStep={deleteStepHandler}
                    />
                ))}
                <button 
                    className={classes['add-button']}
                    type="button" 
                    onClick={addStepHandler}
                >
                    +
                </button>
                <MainButton 
                    title="Submit Recipe"
                    isDisabled={false}
                    onClick={addRecipeHandler}
                />
            </form>
        </div>
    );
};

export default RecipeForm;