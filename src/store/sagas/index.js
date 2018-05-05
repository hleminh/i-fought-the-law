import { all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";
import {
  getAllLaw,
  getAgencyList,
  getLawClassList,
  getValidityStatus,
  searchLaw,
  getLawDetail,
  getNewestLaw,
  getMostViewedLaw
} from "./law";
import { getAllNews, getNewsById } from "./news";
import { getStepSetByInput, updateSetFeatureByIdAndInput } from "./chatbot";

export function* watchGetLaws() {
  yield all([
    takeLatest(actionTypes.GET_ALL_LAW, getAllLaw),
    takeLatest(actionTypes.GET_LAW_CLASS_LIST, getLawClassList),
    takeLatest(actionTypes.GET_LIST_AGENCY, getAgencyList),
    takeLatest(actionTypes.GET_VALIDITY_STATUS_LIST, getValidityStatus),
    takeLatest(actionTypes.SEARCH, searchLaw),
    takeLatest(actionTypes.GET_LAW_DETAIL, getLawDetail),
    takeLatest(actionTypes.GET_NEWEST_LAW, getNewestLaw),
    takeLatest(actionTypes.GET_MOST_VIEWED_LAW, getMostViewedLaw)
  ]);
}

export function* watchNews() {
  yield all([
    takeLatest(actionTypes.GET_ALL_NEWS, getAllNews),
    takeLatest(actionTypes.GET_NEWS_BY_ID, getNewsById)
  ]);
}

export function* watchChatBot() {
  yield all([
    takeLatest(actionTypes.GET_STEP_SET_BY_INPUT, getStepSetByInput),
    takeLatest(
      actionTypes.UPDATE_SET_FEATURE_BY_ID_AND_INPUT,
      updateSetFeatureByIdAndInput
    )
  ]);
}
