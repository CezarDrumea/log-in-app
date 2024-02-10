import React, { useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'ENTER_EMAIL': {
      return {
        ...state,
        email: action.typedEmail,
        isEmailValid: action.typedEmail.includes('@'),
      };
    }
    case 'ENTER_PASSWORD': {
      return {
        ...state,
        password: action.typedPassword,
        isPasswordValid: action.typedPassword.trim().length > 6,
      };
    }
    case 'VALIDATE_EMAIL': {
      return {
        ...state,
        isEmailValid: state.email.includes('@'),
      };
    }
    case 'VALIDATE_PASSWORD': {
      return {
        ...state,
        isPasswordValid: state.password.trim().length > 6,
      };
    }
    case 'VALIDATE_FORM': {
      return {
        ...state,
        formIsValid: state.isEmailValid && state.isPasswordValid,
      };
    }
    default: {
      throw Error('Unknown action:' + action.type);
    }
  }
};

const Login = (props) => {
  const [state, dispatch] = useReducer(formReducer, {
    email: '',
    password: '',
    isEmailValid: null,
    isPasswordValid: null,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: 'VALIDATE_FORM' });
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.isEmailValid, state.isPasswordValid]);

  const changeHandler = (type, field) => (event) => {
    dispatch({ type, [field]: event.target.value });
  };

  const validateHandler = (type) => () => {
    dispatch({
      type,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.email, state.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.isEmailValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={state.email}
            onChange={changeHandler('ENTER_EMAIL', 'typedEmail')}
            onBlur={validateHandler('VALIDATE_EMAIL')}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.isPasswordValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={state.password}
            onChange={changeHandler('ENTER_PASSWORD', 'typedPassword')}
            onBlur={validateHandler('VALIDATE_PASSWORD')}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type='submit'
            className={classes.btn}
            disabled={!state.formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
