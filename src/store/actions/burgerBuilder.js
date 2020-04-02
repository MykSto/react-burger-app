import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios-orders';

export const addIngredient = (ingName) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingName,
});

export const removeIngredient = (ingName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingName,
});

const setIngredients = (ing) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ing,
});

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => (dispatch) => {
  axios.get('/ingredients.json')
    .then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch((response) => {
      dispatch(fetchIngredientsFailed(response));
    });
};
