import * as actionTypes from "../actions/actionTypes";

export const getAllNews = (pageIndex, itemPerPage) => {
  return {
    type: actionTypes.GET_ALL_NEWS,
    pageIndex: pageIndex,
    itemPerPage: itemPerPage
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

export const getNewsById = (newsId) => {
  return {
    type: actionTypes.GET_NEWS_BY_ID,
    newsId: newsId
  };
};

export const getNewsByIdStart = () => {
  return{
    type: actionTypes.GET_NEWS_BY_ID_START,
  }
}

export const getNewsByIdSuccess = results => {
  return {
    type: actionTypes.GET_NEWS_BY_ID_SUCCESS,
    results: results
  };
};

export const getNewsByIdFail = () => {
  return {
    type: actionTypes.GET_NEWS_BY_ID_FAIL
  };
};
