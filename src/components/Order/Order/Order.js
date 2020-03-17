import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  const ingredients = [];

  for (const ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName],
      }
    );
  }

  const ingredientOutput = ingredients.map((ig) => (
    <span
      key={ig.name}
    >
      {ig.name}
      {' '}
      (
      {ig.amount}
      )
    </span>
  ));

  return (
    <div className={classes.Order}>
      <div>
        Ingredients:
        {ingredientOutput}
      </div>
      <p>
        Price:
        <strong>
          USD
          {Number.parseFloat(props.price).toFixed(2)}
        </strong>
      </p>
    </div>
  );
};

export default order;