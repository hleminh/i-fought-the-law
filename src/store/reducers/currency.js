import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  result: [],
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENCY_START:
      return getCurrencyStart(state, action);
    case actionTypes.GET_CURRENCY_SUCCESS:
      return getCurrencySuccess(state, action);
    case actionTypes.GET_CURRENCY_FAIL:
      return getCurrencyFail(state, action);
    default:
      return state;
  }
};

const getCurrencyStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const getCurrencySuccess = (state, action) => {
  return updateObject(state, { loading: false, result: action.data });
};

const getCurrencyFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.errorMsg });
};

export default reducer;
