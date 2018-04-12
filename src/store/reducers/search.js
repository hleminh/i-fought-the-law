import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  results: [],
  isLoading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START:
      return searchStart(state, action);
    case actionTypes.SEARCH_SUCCESS:
      return searchSuccess(state, action);
    case actionTypes.SEARCH_FAIL:
      return searchFail(state, action);
    default:
      return state;
  }
};

const searchStart = (state, action) => {
  return updateObject(state, { isLoading: true, error: null });
};

const searchSuccess = (state, action) => {
  return updateObject(state, { isLoading: false, results: action.results });
};

const searchFail = (state, action) => {
  return updateObject(state, { isLoading: false, error: action.errorMsg });
};

export default reducer;
