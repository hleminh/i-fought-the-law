import * as actionTypes from '../actions/actionTypes';

export const getCurrency = () => {
  return {
    type: actionTypes.GET_CURRENCY
  };
};

export const getCurrencyStart = () => {
  return {
    type: actionTypes.GET_CURRENCY_START
  };
};

export const getCurrencySuccess = result => {
  return {
    type: actionTypes.GET_CURRENCY_SUCCESS,
    data: result
  };
};

export const getCurrencyFail = error => {
  return {
    type: actionTypes.GET_CURRENCY_FAIL,
    errorMsg: error
  };
};
