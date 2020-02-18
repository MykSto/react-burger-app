import React, { useState } from 'react';
import Aux from 'hoc/Auxiliary';
import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = () => {
  const [state, setState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  });

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    setState((prevState) => ({ ...prevState, purchasable: sum > 0 }));
  };

  const addIngredientHandler = (type) => {
    const oldCount = state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const additionalPrice = INGREDIENT_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice + additionalPrice;

    setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    updatePurchaseState(updatedIngredients);
  };

  const purchaseHandler = () => {
    setState((prevState) => ({ ...prevState, purchasing: true }));
  };

  const purchaseContinueHandler = () => {
    alert("continu");
  };

  const closeModalHandler = () => {
    setState((prevState) => ({ ...prevState, purchasing: false }));
  };

  const removeIngredientsHandler = (type) => {
    const oldCount = state.ingredients[type];

    if (oldCount <= 0) { return; }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...state.ingredients,
    };

    updatedIngredients[type] = updatedCount;
    const priceDeducation = INGREDIENT_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice - priceDeducation;

    setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    updatePurchaseState(updatedIngredients);
  };

  const disabledInfo = {
    ...state.ingredients,
  };

  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Aux>
      {state.purchasing === true && (
        <Modal isOrdered={state.purchasing} modalClosed={closeModalHandler}>
          <OrderSummary
            ingredients={state.ingredients}
            purchaseCancelled={closeModalHandler}
            purchaseContinue={purchaseContinueHandler}
          />
        </Modal>
      ) }
      {/* <Modal>
        <OrderSummary ingredients={state.ingredients} />
      </Modal> */}
      <Burger ingredients={state.ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientsHandler}
        disabled={disabledInfo}
        price={state.totalPrice}
        purchasable={state.purchasable}
        ordered={purchaseHandler}
      />
    </Aux>
  );
};

export default BurgerBuilder;
