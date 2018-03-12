import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {getChapterDetail, getChapterList} from './law';

export function* watchGetLaws() {
  yield all([
      takeLatest(actionTypes.GET_LIST_CHAPTER, getChapterList),
      takeLatest(actionTypes.GET_CHAPTER_DETAIL, getChapterDetail)
  ]);
}