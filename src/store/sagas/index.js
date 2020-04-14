import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/actionTypes';

import {
  logoutSaga, checkAuthTimeoutSaga, authUserSaga, checkStateSaga,
} from 'store/sagas/auth';
import { initIngredientsSaga } from 'store/sagas/burgerBuilder';
import { fetchOrdersSaga, purchaseBurgerSaga } from 'store/sagas/order';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_USER, authUserSaga);
  yield takeEvery(actionTypes.CHECK_STATE, checkStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INITIATE_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
}
