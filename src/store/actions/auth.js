import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logOut = (token) => ({
  type: actionTypes.AUTH_LOGOUT,
  token,
});

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logOut());
  }, expirationTime * 1000);
};

export const auth = (email, password, authMethod) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  if (!authMethod) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  }

  axios.post(url, authData)
    .then((response) => {
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((error) => {
      dispatch(authFail(error.response.data.error));
    });
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});
