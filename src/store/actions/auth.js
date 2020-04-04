import * as actionTypes from 'store/actions/actionTypes';
import axios from 'axios';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password, authMethod) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API-TOKEN]';

  if (!authMethod) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API-TOKEN]';
  }

  axios.post(url, authData)
    .then((response) => {
      console.log(response);
      dispatch(authSuccess(response.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(authFail(error));
    });
};
