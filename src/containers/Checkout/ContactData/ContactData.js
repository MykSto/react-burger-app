import React, { useState } from 'react';
import Button from 'components/UI/Button/Button';
import axios from 'axios';
import Spiner from 'components/UI/Spinner/Spinner';
import Aux from 'hoc/Auxiliary';
import styles from './ContactData.module.css';

const ContactData = (props) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  });


  const orderHandler = (event) => {
    event.preventDefault();
    setData({ ...data, loading: true });
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: 'Michail',
        address: {
          street: 'Zirmunu 54',
          zipcode: '08256',
          country: 'Lithuania',
        },
        email: 'test@tes.com',
      },
      deliveryMethod: 'fast',
    };

    async function sendData() {
      try {
        await axios.post('/orders.json', order);

        setData({ ...data, loading: false });
      } catch (error) {
        setData({ ...data, loading: false });
      }
    }
    sendData();
  };

  return (
    <div className={styles.ContactData}>
      {data.loading ? <Spiner /> : (
        <Aux>
          <h4>Enter you contact data</h4>
          <form className={styles.Input}>
            <input type="text" name="name" placeholder="Your name" />
            <input type="email" name="email" placeholder="Your email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
          </form>
        </Aux>
      )}
    </div>
  );
};

export default ContactData;
