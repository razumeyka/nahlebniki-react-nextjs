import React, { FC } from 'react';
import { useRouter } from 'next/router';
import classes from './AuthForm.module.scss';
import useInput from './../../hooks/useInput';

import TextInput from '../fields/TextInput';
import MainButton from '../ui/MainButton';

const AuthForm: FC = () => {
    const router = useRouter();
    const userName = useInput('', { isEmpty: true });
    const password = useInput('', { isEmpty: true });

    const loginHandler = () => {
        router.push('/admin/dashboard');
    };

    return (
        <div className={classes.container}>
            <div className={classes.heading}>Log in</div>
            <form 
                className={classes.form}
                onSubmit={(event) => event.preventDefault()}
            >
                <TextInput 
                    label="Name"
                    name="username"
                    type="text"
                    placeholder="Enter user name"
                    value={userName.value}
                    isBlur={userName.isBlur}
                    isValid={userName.isInputValid}
                    error='Field should not be empty'
                    onChange={userName.onChange}
                    onBlur={userName.onBlur}
                />
                <TextInput 
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={password.value}
                    isBlur={password.isBlur}
                    isValid={password.isInputValid}
                    error='Field should not be empty'
                    onChange={password.onChange}
                    onBlur={password.onBlur}
                />
                <MainButton 
                    title="Log in"
                    isDisabled={ !userName.isInputValid || !password.isInputValid }
                    onClick={loginHandler}
                />
            </form>
        </div>
    );
};

export default AuthForm;