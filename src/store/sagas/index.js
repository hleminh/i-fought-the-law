import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { getChapterDetail, getChapterList } from "./law";
import { search } from "./search";
import { getAllNews } from "./news";

export function* watchGetLaws() {
  yield all([
    takeLatest(actionTypes.GET_LIST_CHAPTER, getChapterList),
    takeLatest(actionTypes.GET_CHAPTER_DETAIL, getChapterDetail)
  ]);
}

export function* watchSearch() {
  yield all([takeLatest(actionTypes.SEARCH, search)]);
}

export function* watchNews() {
  yield all([takeLatest(actionTypes.GET_ALL_NEWS, getAllNews)]);
}
