import * as actionTypes from "../actions/actionTypes";

export const getAllNews = () => {
  return {
    type: actionTypes.GET_ALL_NEWS
  };
};

export const getAllNewsStart = () => {
  return {
    type: actionTypes.GET_ALL_NEWS_START
  };
};

export const getAllNewsSuccess = results => {
  return {
    type: actionTypes.GET_ALL_NEWS_SUCCESS,
    results: results
  };
};

export const getAllNewsFail = () => {
  return {
    type: actionTypes.GET_ALL_NEWS_FAIL
  };
};
