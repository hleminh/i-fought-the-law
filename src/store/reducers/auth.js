import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_RESET:
      return authReset(state, action);
    default:
      return state;
  }
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    email: action.email,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    email: null
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.errorMsg
  });
};

const authReset = (state, action) => {
  return updateObject(state, { error: null });
};

export default reducer;
