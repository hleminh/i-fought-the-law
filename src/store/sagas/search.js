import { put } from "redux-saga/effects";

import axios from "../../axios-law";
import * as actions from "../actions/index";

export function* search(action) {
  yield put(actions.searchStart());
  try {
    let url = yield `/articles/getall?page=${action.pageIndex}&item=${
      action.itemPerPage
    }&keyword=${action.keyword}`;
    if (action.chapterId) {
      url += yield `chapter=${action.chapterId}`;
    }
    const response = yield axios.get(url);
    yield put(actions.searchSuccess(response.data.data));
  } catch (error) {
    yield put(actions.searchFail(error));
  }
}
