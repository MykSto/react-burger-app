import React, { useState } from 'react';

import Input from 'components/UI/Form/Input/Input';
import Button from 'components/UI/Button/Button';

import styles from './Auth.module.css';

const Auth = () => {
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
  });

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;

      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...auth.controls,
      [controlName]: {
        ...auth.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, auth.controls[controlName].validation),
        touched: true,
      },
    };

    setAuth({ controls: updatedControls });
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

  return (
    <div className={styles.Auth}>
      <form>
        { form }
        <Button btnType="Success">Login</Button>
      </form>
    </div>
  );
};

export default Auth;
