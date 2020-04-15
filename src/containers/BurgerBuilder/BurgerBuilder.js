import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as burgerBuilderActions from 'store/actions/burgerBuilder';
import * as actionOrder from 'store/actions/order';
import * as authActions from 'store/actions/auth';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import axios from 'axios-orders';

import Burger from 'components/Burger/Burger';
import Spinner from 'components/UI/Spinner/Spinner';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Aux from 'hoc/Auxiliary';

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const token = useSelector((state) => state.auth.token !== null);

  const onIngredientAdded = (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName));
  const onFetchIngredients = useCallback(() => dispatch(burgerBuilderActions.initIngredients()), []);
  const onPurchaseInit = () => dispatch(actionOrder.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(authActions.setAuthRedirectPath(path));

  useEffect(() => {
    onFetchIngredients();
  }, [onFetchIngredients]);

  // sum of the array, return boolean
  const updatePurchaseState = (ingredients) => {
    const reducer = (acc, cur) => acc + cur;
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((reducer), 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (token) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseContinueHandler = () => {
    onPurchaseInit();
    props.history.push('/checkout');
  };

  const closeModalHandler = () => {
    setPurchasing(false);
  };

  const disabledInfo = {
    ...ings,
  };

  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  return (
    <Aux>
      <Modal isOrdered={purchasing} modalClosed={closeModalHandler}>
        {ings ? (
          <OrderSummary
            ingredients={ings}
            purchaseCancelled={closeModalHandler}
            purchaseContinue={purchaseContinueHandler}
            totalPrice={price}
          />
        ) : <Spinner />}
      </Modal>

      {ings ? (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={updatePurchaseState(ings)}
            disabledType={disabledInfo}
            price={price}
            purchasable={updatePurchaseState(ings)}
            ordered={purchaseHandler}
            isAuth={token}
          />
        </Aux>
      ) : <Spinner />}

    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
