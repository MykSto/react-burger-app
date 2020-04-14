import * as actionTypes from 'store/actions/actionTypes';

export const addIngredient = (ingName) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: ingName,
});

export const removeIngredient = (ingName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: ingName,
});

export const setIngredients = (ing) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ing,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => ({
  type: actionTypes.INITIATE_INGREDIENTS,
});
