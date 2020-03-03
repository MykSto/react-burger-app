import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from 'containers/Checkout/ContactData/ContactData';

const Checkout = (props) => {
  const [check, setCheck] = useState({
    ingredients: null,
    price: 0,
  });

  useEffect(() => {
    // pass state data via router
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    let price = null;

    for (const param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    setCheck(prevState => ({ ...prevState, ingredients: ingredients, price: price }));
  }, [props.location.search]);

  const checkoutCancelled = () => {
    props.history.goBack();
  };

  const checkoutContinued = () => {
    props.history.replace(`${props.match.url}/contact-data/`);
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={check.ingredients}
        checkoutContinued={checkoutContinued}
        checkoutCancelled={checkoutCancelled}
      />
      <Route
        path={`${props.match.url}/contact-data/`}
        render={() => (
          <ContactData
            price={check.totalPrice}
            ingredients={check.ingredients}
          />
        )}
      />
    </div>
  );
};

export default Checkout;
