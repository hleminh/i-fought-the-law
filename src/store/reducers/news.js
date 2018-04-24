import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  news: [],
  newsLoading: true,
  newsCount: 0,
  currentNews: null,
  currentNewsLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_NEWS_START:
      return getAllNewsStart(state, action);
    case actionTypes.GET_ALL_NEWS_SUCCESS:
      return getAllNewsSuccess(state, action);
    case actionTypes.GET_ALL_NEWS_FAIL:
      return getAllNewsFail(state, action);
    case actionTypes.GET_NEWS_BY_ID_START:
      return getNewsByIdStart(state, action);
    case actionTypes.GET_NEWS_BY_ID_SUCCESS:
      return getNewsByIdSuccess(state, action);
    case actionTypes.GET_NEWS_BY_ID_FAIL:
      return getNewsByIdFail(state, action);
    default:
      return state;
  }
};

const getAllNewsStart = (state, action) => {
  return updateObject(state, { newsLoading: true });
};

const getAllNewsSuccess = (state, action) => {
  for (let news in action.results.data.data) {
    let date = new Date(action.results.data.data[news].publishedDate);
    action.results.data.data[news].publishedDate = date.toISOString().substring(0, 10);
  }
  return updateObject(state, {
    news: action.results.data,
    newsCount: action.results.data.total,
    newsLoading: false
  });
};

const getAllNewsFail = (state, action) => {
  return updateObject(state, { newsLoading: false });
};

const getNewsByIdStart = (state, action) => {
  return updateObject(state, {currentNewsLoading: true});
};

const getNewsByIdSuccess = (state, action) => {
  let date = new Date(action.results.data.data[0].publishedDate);
  action.results.data.data[0].publishedDate = date.toString().substring(0, 15);
  return updateObject(state, {currentNews: action.results.data, currentNewsLoading: false});
};

const getNewsByIdFail = (state, action) => {
  return updateObject(state, { currentNewsLoading: false });
};

export default reducer;
