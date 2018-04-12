import * as actionTypes from "./actionTypes";

export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_START
  };
};

export const searchSuccess = results => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    results: results
  };
};

export const searchFail = errorMsg => {
  return {
    type: actionTypes.SEARCH_FAIL,
    errorMsg: errorMsg
  };
};
