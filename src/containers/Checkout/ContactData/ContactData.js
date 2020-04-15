import React, { useState } from 'react';
import axios from 'axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import * as orderActions from 'store/actions/index';

import { checkValidity } from 'shared/validation';
import { updateObject } from 'shared/utility';

import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';
import Input from 'components/UI/Form/Input/Input';

import styles from './ContactData.module.css';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Street',
      },
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZipCode',
      },
      value: '',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        minLength: 3,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fasters' },
          { value: 'normal', displayValue: 'Normal' },
          { value: 'slowest', displayValue: 'Slowest' },
        ],
      },
      value: 'fastest',
      valid: true,
      validation: {},
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (const formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    // name, street, zipcode...
    const updatedOrder = { ...orderForm };
    // name configs, street configs, zipcode configs

    const updatedFormElement = updateObject(updatedOrder[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, updatedOrder[inputIdentifier].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(updatedOrder, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;

    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    updatedOrderForm[inputIdentifier] = updatedFormElement;
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];

  for (const key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  const formElement = formElementsArray.map((formEl) => (
    <Input
      key={formEl.id}
      elementType={formEl.config.elementType}
      elementConfig={formEl.config.elementConfig}
      value={formEl.config.value}
      changed={(event) => inputChangedHandler(event, formEl.id)}
      invalid={!formEl.config.valid}
      shouldValidate={formEl.config.validation}
      isTouched={formEl.config.touched}
    />
  ));

  const form = (
    <form onSubmit={orderHandler}>
      {formElement}
      <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
    </form>
  );

  return (
    <div className={styles.ContactData}>
      <h4>Enter your Contact Data</h4>
      {props.loading ? <Spinner /> : form}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
