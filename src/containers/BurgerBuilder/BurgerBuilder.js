import React, { useState } from 'react';
import Aux from 'hoc/Auxiliary';
import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';

const BurgerBuilder = () => {
  const [state, setState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  });

  return (
    <Aux>
      <Burger ingredients={state.ingredients} />
      <div>Build Controls</div>
      <BuildControls />
    </Aux>
  );
};

export default BurgerBuilder;
