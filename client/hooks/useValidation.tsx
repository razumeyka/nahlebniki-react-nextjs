import { useState, useEffect } from 'react';

const useValidation = (value: string, validations: {isEmpty?: boolean}) => {
    const [ isEmpty, setIsEmpty ] = useState<boolean>(true);
    const [ isInputValid, setIsInputValid ] = useState<boolean>(false);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
            }
        }
    }, [value, validations]);

    useEffect( () => {
        if (isEmpty) {
            setIsInputValid(false);
        } else {
            setIsInputValid(true);
        }
    }, [isEmpty]);

    return {
        isEmpty,
        isInputValid
    }
};

export default useValidation;