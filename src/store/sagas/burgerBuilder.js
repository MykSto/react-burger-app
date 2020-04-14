import { put } from 'redux-saga/effects';
import * as actions from 'store/actions/index';
import axios from 'axios-orders';

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get('/ingredients.json');

    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed(error));
  }
}
