import React, { FC } from 'react';
import Image from "next/image";
import classes from "./RecipeStep.module.scss";
import { RecipeStep } from "../../types/types";

interface RecipeStepProps {
    step: RecipeStep
};

const RecipeStep: FC<RecipeStepProps> = ({ step }) => {
  return (
    <div className={classes['step']} key={step._id}>
        <div className={classes['step-text']}>
            <div className={classes['step-num']}>{step.stepNumber}</div>
            <div className={classes['step-description']}>
                <p>{step.description}</p>
            </div>
        </div>
        { step.imageUrl &&
            <div className={classes['step-photo']}>
                <Image 
                    src={step.imageUrl}
                    alt='Some food'
                    layout='fill'
                    objectFit='cover'
                />
            </div>
        }
    </div>
  )
}

export default RecipeStep;
