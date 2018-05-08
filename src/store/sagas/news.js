import { put } from 'redux-saga/effects';

import axios from '../../axios-law';
import * as actions from '../actions/index';

export function* getAllNews(action) {
  yield put(actions.getAllNewsStart());
  try {
    const url = `/news/all?page=${action.pageIndex}&perPage=${
      action.itemPerPage
    }`;
    const response = yield axios.get(url);
    yield put(actions.getAllNewsSuccess(response));
    console.log(response);
  } catch (error) {
    yield put(actions.getAllNewsFail());
  }
}

export function* getNewsById(action) {
  yield put(actions.getNewsByIdStart());
  try {
    const response = yield axios.get('/news/' + action.newsId);
    yield put(actions.getNewsByIdSuccess(response));
    console.log(response);
  } catch (error) {
    yield put(actions.getNewsByIdFail());
  }
}

export function* getMostViewdNews(action) {
  yield put(actions.getMostViewedNewStart());
  try {
    const response = yield axios.get(
      `/news/mostViewed?itemNumber=${action.itemNumber}`
    );
    yield put(actions.getMostViewedNewSuccess(response.data));
  } catch (error) {
    yield put(error.response.data);
  }
}
