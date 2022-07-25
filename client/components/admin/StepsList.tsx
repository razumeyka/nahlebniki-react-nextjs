import React, { ChangeEvent, FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import classes from './StepsList.module.scss';
import useTextArea from './../../hooks/useTextArea';

import TextArea from '../fields/TextArea';
import UploadImage from '../fields/UploadImage';

interface StepsListProps {
    index: number;
    step: RecipeStep; 
    onEditStep: (step: RecipeStep) => void;
    onDeleteStep: (id: string) => void;
};

interface RecipeStep {
    id: string;
    stepNumber: number | null;
    description: string;
    image: File | null;
};

const StepsList: FC<StepsListProps> = ({ index, step, onEditStep, onDeleteStep }) => {
    const stepDescription = useTextArea('', { isEmpty: true });
    const [ newStep, setNewStep ] = useState<RecipeStep>({
        id: step.id,
        stepNumber: index, 
        description: '', 
        image: null
    });

    useEffect( () => {
        onEditStep(newStep);
    }, [ newStep ]);

    const changeDescriptioHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        stepDescription.onChange(event);
        setNewStep({ ...newStep, description: event.target.value });
    };

    const uploadImageHandler = (image: File) => {
        setNewStep({ ...newStep, image: image });
    };

    const deleteStepHandler = () => {
        onDeleteStep(step.id);
    }

    return (
        <>
            <div className={classes.number}>{index}</div>
            <div className={classes.row}>
                <div className={classes['row-item-95']}>
                    <TextArea 
                        placeholder="Description"
                        name="stepDescription"
                        value={stepDescription.value}
                        isBlur={stepDescription.isBlur}
                        isValid={stepDescription.isInputValid}
                        error='Field should not be empty'
                        onChange={changeDescriptioHandler}
                        onBlur={stepDescription.onBlur}
                    />
                    <UploadImage 
                        label={newStep.image ? "Change step photo" : "Upload step photo"}
                        onChange={uploadImageHandler}
                    />
                </div>
                <div className={classes['row-item-5']}>
                    <button
                        className={classes['remove-button']}
                        type='button'
                        onClick={deleteStepHandler}
                    >x</button>
                </div>
            </div>
        </>
    )
};

export default StepsList;