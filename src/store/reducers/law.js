import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utilities';

const initialState = {
  lawClassList: [],
  lawClassLoading: false,
  lawClassErrorMsg: null,
  agencyList: [],
  agencyListLoading: false,
  agencyListErrorMsg: null,
  validityStatusList: [],
  statusListLoading: false,
  statusListErrorMsg: null,
  searchResult: [],
  totalResult: 0,
  searchLoading: false,
  searchError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LAW_CLASS_LIST_START:
      return getLawClassStart(state, action);
    case actionTypes.GET_LAW_CLASS_LIST_SUCCESS:
      return getLawCLassSuccess(state, action);
    case actionTypes.GET_LAW_CLASS_LIST_FAIL:
      return getLawClassFail(state, action);
    case actionTypes.GET_LIST_AGENCY_START:
      return getListAgencyStart(state, action);
    case actionTypes.GET_LIST_AGENCY_SUCCESS:
      return getListAgencySuccess(state, action);
    case actionTypes.GET_LIST_AGENCY_FAIL:
      return getListAgencyFail(state, action);
    case actionTypes.GET_VALIDITY_STATUS_LIST_START:
      return getStatusListStart(state, action);
    case actionTypes.GET_VALIDITY_STATUS_LIST_SUCESS:
      return getStatusListSuccess(state, action);
    case actionTypes.GET_VALIDITY_STATUS_LIST_FAIL:
      return getStatusListFail(state, action);
    case actionTypes.SEARCH_START:
      return searchLawStart(state, action);
    case actionTypes.SEARCH_SUCCESS:
      return searchLawSuccess(state, action);
    case actionTypes.SEARCH_FAIL:
      return searchLawFail(state, action);
    default:
      return state;
  }
};

const searchLawStart = (state, action) => {
  return updateObject(state, { searchLoading: true });
};

const searchLawSuccess = (state, action) => {
  return updateObject(state, {
    searchLoading: false,
    searchResult: action.data.data,
    totalResult: action.data.total
  });
};

const searchLawFail = (state, action) => {
  return updateObject(state, {
    searchLoading: false,
    searchError: action.errorMsg
  });
};

const getLawClassStart = (state, action) => {
  return updateObject(state, { lawClassLoading: true });
};

const getLawCLassSuccess = (state, action) => {
  return updateObject(state, {
    lawClassLoading: false,
    lawClassList: action.data
  });
};

const getLawClassFail = (state, action) => {
  return updateObject(state, {
    lawClassLoading: false,
    lawClassErrorMsg: action.errorMsg
  });
};

const getListAgencyStart = (state, action) => {
  return updateObject(state, { agencyListLoading: true });
};

const getListAgencySuccess = (state, action) => {
  return updateObject(state, {
    agencyListLoading: false,
    agencyList: action.data
  });
};

const getListAgencyFail = (state, action) => {
  return updateObject(state, {
    agencyListLoading: false,
    agencyListErrorMsg: action.errorMsg
  });
};

const getStatusListStart = (state, action) => {
  return updateObject(state, { statusListLoading: true });
};

const getStatusListSuccess = (state, action) => {
  return updateObject(state, {
    statusListLoading: false,
    validityStatusList: action.data
  });
};

const getStatusListFail = (state, action) => {
  return updateObject(state, {
    statusListLoading: false,
    statusListErrorMsg: action.errorMsg
  });
};

export default reducer;
