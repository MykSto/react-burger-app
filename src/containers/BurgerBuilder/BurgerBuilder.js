import React, { useState } from 'react';
import Burger from 'components/Burger/Burger';
import Spinner from 'components/UI/Spinner/Spinner';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';

import { connect } from 'react-redux';
import * as actionTypes from 'store/actions';
import Aux from 'hoc/Auxiliary';
import axios from 'axios-orders';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

const BurgerBuilder = (props) => {
  const [state, setState] = useState({
    purchasing: false,
    loading: false,
    error: false,
  });

  // sum of the array, return boolean
  const updatePurchaseState = (ingredients) => {
    const reducer = (acc, cur) => acc + cur;
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((reducer), 0);

    return sum > 0;
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const result = await axios.get('/ingredients.json');

  //       setState((prevState) => ({ ...prevState, ingredients: result.data }));
  //     } catch (error) {
  //       setState((prevState) => ({ ...prevState, error: true }));
  //     }
  //   }
  //   fetchData();
  // }, []);

  const purchaseHandler = () => {
    setState((prevState) => ({ ...prevState, purchasing: true }));
  };

  const purchaseContinueHandler = () => {
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
  ings: state.ingredients,
  price: state.totalPrice,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
  onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
