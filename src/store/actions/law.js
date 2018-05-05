import * as actionTypes from '../actions/actionTypes';
import { GET_LAW_CLASS_LIST, GET_VALIDITY_STATUS_LIST } from './actionTypes';

export const getAllLaw = (
  pageIndex,
  itemPerPage,
  agency,
  lawClass,
  promulgateYear,
  validityStatus
) => {
  return {
    type: actionTypes.GET_ALL_LAW,
    page: pageIndex,
    perPage: itemPerPage,
    agency: agency,
    lawClass: lawClass,
    promulgateYear: promulgateYear,
    status: validityStatus
  };
};

export const getAllLawStart = () => {
  return {
    type: actionTypes.GET_ALL_LAW_START
  };
};

export const getAllLawSuccess = results => {
  return {
    type: actionTypes.GET_ALL_LAW_SUCCESS,
    data: results
  };
};

export const getAllLawFail = errorMsg => {
  return {
    type: actionTypes.GET_ALL_LAW_FAIL,
    errorMsg: errorMsg
  };
};

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

export const search = (
  keyword,
  searchType,
  pageIndex,
  itemPerPage,
  lawClass,
  agency,
  validityStatus,
  signer
) => {
  return {
    type: actionTypes.SEARCH,
    keyword: keyword,
    searchType: searchType,
    page: pageIndex,
    perPage: itemPerPage,
    lawClass: lawClass,
    agency: agency,
    validityStatus: validityStatus,
    signer: signer
  };
};

export const searchStart = () => {
  return {
    type: actionTypes.SEARCH_START
  };
};

export const searchSuccess = data => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    data: data
  };
};

export const searchFail = errorMsg => {
  return {
    type: actionTypes.SEARCH_FAIL,
    errorMsg: errorMsg
  };
};

export const getLawDetail = lawId => {
  return {
    type: actionTypes.GET_LAW_DETAIL,
    lawId: lawId
  };
};

export const getLawDetailStart = () => {
  return {
    type: actionTypes.GET_LAW_DETAIL_START
  };
};

export const getLawDetailSuccess = data => {
  console.log(data);
  return {
    type: actionTypes.GET_LAW_DETAIL_SUCCESS,
    data: data
  };
};

export const getLawDetailFail = errorMsg => {
  return {
    type: actionTypes.GET_LAW_DETAIL_FAIL,
    errorMsg: errorMsg
  };
};

export const getNewestLaw = itemNumber => {
  return {
    type: actionTypes.GET_NEWEST_LAW,
    itemNumber: itemNumber
  };
};

export const getNewestLawStart = () => {
  return {
    type: actionTypes.GET_NEWEST_LAW_START
  };
};

export const getNewestLawSuccess = result => {
  return {
    type: actionTypes.GET_NEWEST_LAW_SUCCESS,
    data: result
  };
};

export const getNewestLawFail = errorMsg => {
  return {
    type: actionTypes.GET_NEWEST_LAW_FAIL,
    errorMsg: errorMsg
  };
};

export const getMostViewedLaw = itemNumber => {
  return {
    type: actionTypes.GET_MOST_VIEWED_LAW,
    itemNumber: itemNumber
  };
};

export const getMostViewedLawStart = () => {
  return {
    type: actionTypes.GET_MOST_VIEWED_LAW_START
  };
};

export const getMostViewedLawSuccess = result => {
  return {
    type: actionTypes.GET_MOST_VIEWED_LAW_SUCCESS,
    data: result
  };
};

export const getMostViewedLawFail = errorMsg => {
  return {
    type: actionTypes.GET_MOST_VIEWED_LAW_FAIL,
    errorMsg: errorMsg
  };
};
