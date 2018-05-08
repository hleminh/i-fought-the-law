import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
    email: email
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMsg: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};

export const authReset = () => {
  return {
    type: actionTypes.AUTH_RESET
  };
};
