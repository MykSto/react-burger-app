import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/actionTypes';

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from 'store/sagas/auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_USER, authUserSaga);
}
