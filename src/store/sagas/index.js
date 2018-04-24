import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import { getAgencyList, getLawClassList, getValidityStatus } from "./law";
import { search } from "./search";
import { getAllNews, getNewsById } from "./news";

export function* watchGetLaws() {
  yield all([
    takeLatest(actionTypes.GET_LAW_CLASS_LIST, getLawClassList),
    takeLatest(actionTypes.GET_LIST_AGENCY, getAgencyList),
    takeLatest(actionTypes.GET_VALIDITY_STATUS_LIST, getValidityStatus)
  ]);
}

export function* watchSearch() {
  yield all([takeLatest(actionTypes.SEARCH, search)]);
}

export function* watchNews() {
  yield all([
    takeLatest(actionTypes.GET_ALL_NEWS, getAllNews),
    takeLatest(actionTypes.GET_NEWS_BY_ID, getNewsById)
  ]);
}
