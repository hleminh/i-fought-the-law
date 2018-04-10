import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utilities';

const initialState = {
    news: [],
    newsLoading: true,
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_ALL_NEWS_START:
      return getAllNewsStart(state, action);
    case actionTypes.GET_ALL_NEWS_SUCCESS:
      return getAllNewsSuccess(state, action);
    case actionTypes.GET_ALL_NEWS_FAIL:
      return getAllNewsFail(state, action);
    default:
      return state;
    }
};

const getAllNewsStart = (state, action) => {
  return updateObject(state, {newsLoading: true});
}

const getAllNewsSuccess = (state, action) => {
  return updateObject(state, {news: action.results, newsLoading: false});
}

const getAllNewsFail = (state, action) => {
  return updateObject(state, {newsLoading: false});
}

export default reducer;