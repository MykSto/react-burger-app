import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as authActions from 'store/actions/index';
import { Redirect } from 'react-router-dom';

import { checkValidity } from 'shared/validation';
import { updateObject } from 'shared/utility';

import Input from 'components/UI/Form/Input/Input';
import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';

import styles from './Auth.module.css';

const Auth = (props) => {
  const [auth, setAuth] = useState({
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  });

  useEffect(() => {
    if (!props.buildBurger && props.authRedirect !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, [props]);

  const switchAuthModeHandler = () => {
    setAuth((prevState) => ({ ...prevState, isSignUp: !prevState.isSignUp }));
  };

  const inputChangedHandler = (event, controlName) => {
    const authControls = { ...auth.controls };
    const updatedControls = updateObject(authControls, {
      [controlName]: updateObject(authControls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, auth.controls[controlName].validation),
        touched: true,
      }),
    });

    setAuth({ controls: updatedControls });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(auth.controls.email.value, auth.controls.password.value, auth.isSignUp);
  };

  const formElementsArray = [];

  for (const key in auth.controls) {
    formElementsArray.push({
      id: key,
      config: auth.controls[key],
    });
  }

  const form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      changed={(event) => inputChangedHandler(event, formElement.id)}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      isTouched={formElement.config.touched}
    />
  ));

  console.log('Auth.js', props.token)

  return (
    <div className={styles.Auth}>
      <form onSubmit={submitHandler}>
        { props.token && <Redirect to={props.authRedirect}/>}
        { props.loading ? <Spinner /> : form }
        { props.error && (<p>{props.error.message}</p>)}
        <Button btnType="Success">Submit</Button>
      </form>
      <Button
        clicked={switchAuthModeHandler}
        btnType="Danger"
      >
        Switch to:
        {' '}
        {auth.isSignUp ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token !== null,
  buildBurger: state.burgerBuilder.building,
  authRedirect: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, authMethod) => dispatch(authActions.auth(email, password, authMethod)),
  onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
