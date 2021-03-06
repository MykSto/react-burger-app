import React from 'react';
import Aux from 'hoc/Auxiliary';
import Button from 'components/UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey) => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
        :
        {props.ingredients[igKey]}
      </li>
    ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Burger with following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>
        Total Price:
        <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
      <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;
