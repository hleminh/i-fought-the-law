import { put } from "redux-saga/effects";

import axios from "../../axios-law";
import * as actions from "../actions/index";

export function* getAllNews(action) {
  yield put(actions.getAllNewsStart());
  try {
    const response = yield axios.get("/news/all");
    yield put(actions.getAllNewsSuccess(response));
    console.log(response)
  } catch (error) {
    yield put(actions.getAllNewsFail());
  }
}
