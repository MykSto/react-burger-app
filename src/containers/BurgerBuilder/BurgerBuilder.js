import React, { useState, useEffect } from 'react';
import Aux from 'hoc/Auxiliary';
import Burger from 'components/Burger/Burger';
import axios from 'axios-orders';
import Spinner from 'components/UI/Spinner/Spinner';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = (props) => {
  const [state, setState] = useState({
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  });

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    setState((prevState) => ({ ...prevState, purchasable: sum > 0 }));
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get('https://burger-app-76fb9.firebaseio.com/ingredients.json');

        setState((prevState) => ({ ...prevState, ingredients: result.data }));
      } catch (error) {
        setState((prevState) => ({ ...prevState, error }));
      }
    }
    fetchData();
  }, []);

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
    const queryParams = [];

    for (let i in state.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(state.ingredients[i])}`);
    }

    queryParams.push('price=' + state.totalPrice);

    const queryString = queryParams.join('&');

    props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
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
      <Modal isOrdered={state.purchasing} modalClosed={closeModalHandler}>
        {state.ingredients ? (
          <OrderSummary
            ingredients={state.ingredients}
            purchaseCancelled={closeModalHandler}
            purchaseContinue={purchaseContinueHandler}
            totalPrice={state.totalPrice}
          />
        ) : <Spinner />}
      </Modal>

      {state.ingredients ? (
        <Aux>
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
      ) : <Spinner />}

    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
