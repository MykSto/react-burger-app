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

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

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

  const API_TOKEN = 'AIzaSyC3a2VhP10iIXGnEgRmviB4hpL1X-51ke0';

  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_TOKEN}`;

  if (!authMethod) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_TOKEN}`;
  }

  axios.post(url, authData)
    .then((response) => {
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
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

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(logOut());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate <= new Date()) {
      dispatch(logOut());
    } else {
      const userId = localStorage.getItem('userId');

      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};
