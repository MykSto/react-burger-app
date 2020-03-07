import React, { Component } from 'react';

import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import axios from 'axios-orders';
import Input from 'components/UI/Form/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZipCode'
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fasters' },
            { value: 'normal', displayValue: 'Normal' },
            { value: 'slowest', displayValue: 'Slowest' },
          ]
        },
        value: '',
      }
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};

    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]};

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm});
  }

  render() {

    const formElementsArray = [];

    for (let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    };

    const formElement = formElementsArray.map((formEl) => {
      return ( <Input
        key={formEl.id}
        elementType={formEl.config.elementType}
        elementConfig={formEl.config.elementConfig}
        value={formEl.config.value}
        changed={(event) => this.inputChangedHandler(event, formEl.id)}
        />)
    })

    let form = (
      <form onSubmit={this.orderHandler}>
        {/* <Input elementType="..." elementConfig="..." value="..." /> */}
        {formElement}
        <Button btnType="Success">ORDER</Button>
      </form>
    );

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.loading ? <Spinner /> : form}
      </div>
    );
  }
}

export default ContactData;
