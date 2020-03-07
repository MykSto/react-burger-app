import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from 'containers/Checkout/ContactData/ContactData';

const Checkout = (props) => {
  const [check, setCheck] = useState({
    ingredients: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    // pass state data via router
    function queryFunc() {
      const query = new URLSearchParams(props.location.search);
      const queryIngredients = {};
      let price = 0;

      for (let param of query.entries()) {
        if (param[0] === 'price') {
          price = +param[1];
        } else {
          queryIngredients[param[0]] = +param[1];
        }
      }
      setCheck({ ingredients: queryIngredients, totalPrice: price });
    }
    queryFunc();
    // return function cleanUp() {
    // setCheck({  ingredients: ingredients, price: price });
      
    // }
  }, []);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('checkout/contact-data');
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={check.ingredients}
        checkoutContinued={checkoutContinuedHandler}
        checkoutCancelled={checkoutCancelledHandler}
      />
      <Route
        path={`${props.match.path}/contact-data`}
        render={(props) => (
          <ContactData
            price={check.totalPrice}
            ingredients={check.ingredients}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default Checkout;
