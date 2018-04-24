import * as actionTypes from '../actions/actionTypes';
import { GET_LAW_CLASS_LIST, GET_VALIDITY_STATUS_LIST } from './actionTypes';

export const getListAgency = () => {
  return {
    type: actionTypes.GET_LIST_AGENCY
  };
};

export const getListAgencyStart = () => {
  return {
    type: actionTypes.GET_LIST_AGENCY_START
  };
};

export const getListAgencySuccess = agencyList => {
  return {
    type: actionTypes.GET_LIST_AGENCY_SUCCESS,
    data: agencyList
  };
};

export const getListAgencyFail = errorMsg => {
  return {
    type: actionTypes.GET_LIST_AGENCY_FAIL,
    errorMsg: errorMsg
  };
};

export const getLawClassList = () => {
  return {
    type: actionTypes.GET_LAW_CLASS_LIST
  };
};

export const getLawClassListStart = () => {
  return {
    type: actionTypes.GET_LAW_CLASS_LIST_START
  };
};

export const getLawClassListSucess = lawClassList => {
  return {
    type: actionTypes.GET_LAW_CLASS_LIST_SUCCESS,
    data: lawClassList
  };
};

export const getLawClassListFail = errorMsg => {
  return {
    type: actionTypes.GET_LAW_CLASS_LIST_FAIL,
    errorMsg: errorMsg
  };
};

export const getValidityStatusList = () => {
  return {
    type: actionTypes.GET_VALIDITY_STATUS_LIST
  };
};

export const getValidityStatusListStart = () => {
  return {
    type: actionTypes.GET_VALIDITY_STATUS_LIST_START
  };
};

export const getValidityStatusSuccess = validityStatusList => {
  return {
    type: actionTypes.GET_VALIDITY_STATUS_LIST_SUCESS,
    data: validityStatusList
  };
};

export const getValidityStatusFail = errorMsg => {
  return {
    type: actionTypes.GET_VALIDITY_STATUS_LIST_FAIL,
    errorMsg: errorMsg
  };
};

export const search = (keyword, pageIndex, itemPerPage, chapterId) => {
  return {
    type: actionTypes.SEARCH,
    keyword: keyword,
    pageIndex: pageIndex,
    itemPerPage: itemPerPage,
    chapterId: chapterId
  };
};
