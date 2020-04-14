import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from 'store/actions/actionTypes';

import { logoutSaga } from 'store/sagas/auth';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
}