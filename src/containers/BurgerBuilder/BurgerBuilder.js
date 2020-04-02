import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as burgerBuilderActions from 'store/actions/burgerBuilder';
import * as actionOrder from 'store/actions/order';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import axios from 'axios-orders';

import Burger from 'components/Burger/Burger';
import Spinner from 'components/UI/Spinner/Spinner';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Aux from 'hoc/Auxiliary';

const BurgerBuilder = (props) => {
  const [state, setState] = useState({
    purchasing: false,
  });

  useEffect(() => {
    props.onFetchIngredients();
  }, []);

  // sum of the array, return boolean
  const updatePurchaseState = (ingredients) => {
    const reducer = (acc, cur) => acc + cur;
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((reducer), 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    setState((prevState) => ({ ...prevState, purchasing: true }));
  };

  const purchaseContinueHandler = () => {
    props.onPurchaseInit();
    props.history.push('/checkout');
  };

  const closeModalHandler = () => {
    setState((prevState) => ({ ...prevState, purchasing: false }));
  };

  const disabledInfo = {
    ...props.ings,
  };

  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Aux>
      <Modal isOrdered={state.purchasing} modalClosed={closeModalHandler}>
        {props.ings ? (
          <OrderSummary
            ingredients={props.ings}
            purchaseCancelled={closeModalHandler}
            purchaseContinue={purchaseContinueHandler}
            totalPrice={props.price}
          />
        ) : <Spinner />}
      </Modal>

      {props.ings ? (
        <Aux>
          <Burger ingredients={props.ings} />
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={updatePurchaseState(props.ings)}
            disabledType={disabledInfo}
            price={props.price}
            purchasable={updatePurchaseState(props.ings)}
            ordered={purchaseHandler}
          />
        </Aux>
      ) : <Spinner />}

    </Aux>
  );
};

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
  onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
  onFetchIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  onPurchaseInit: () => dispatch(actionOrder.purchaseInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
