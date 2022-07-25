
import { ChangeEvent } from 'react';
import { useState } from 'react';
import useValidation from './useValidation';

const useInput = (initialValue: string, validations: {isEmpty?: boolean}) => {
    const [ value, setValue ] = useState<string>(initialValue);
    const [ isBlur, setIsBlur ] = useState<boolean>(false);
    const valid = useValidation(value, validations);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onBlur = () => {
        setIsBlur(true);
    };

    return {
        value,
        isBlur,
        onChange,
        onBlur,
        ...valid
    }
}

export default useInput;