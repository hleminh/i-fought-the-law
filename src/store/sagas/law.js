import {put} from 'redux-saga/effects';

import axios from '../../axios-law';
import * as actions from '../actions/index';

export function* getChapterList(action) {
  yield put(actions.getChapterListStart());
  try {
    const response = yield axios.get('/chapters/getall');
    yield put(actions.getChapterListSuccess(response.data));
  } catch (error) {
    yield put(actions.getChapterListFail(error));
  }
}

export function* getChapterDetail(action) {
  yield put(actions.getChapterDetailStart(action.currentChapter));
  try {
    const url = yield `/articles/getall?page=${action.pageIndex}&item=${action.itemPerPage}&chapter=${action.currentChapter.id}`;
    const response = yield axios.get(url);
    yield put(actions.getChapterDetailSuccess(response.data.data));
  } catch (error) {
    yield put(actions.getChapterDetailFail(error));
  }
}
