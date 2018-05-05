import { put } from "redux-saga/effects";

import axios from "../../axios-law-chatbot";
import * as actions from "../actions/index";

export function* getStepSetByInput(action) {
  yield put(actions.getStepSetByInputStart());
  try {
    const url = "/chatbot/sets/" + action.input;
    const response = yield axios.get(url);
    console.log(response);
    yield put(actions.getStepSetByInputSuccess(response));
  } catch (error) {
    yield put(actions.getStepSetByInputFail());
  }
}

export function* updateSetFeatureByIdAndInput(action) {
  yield put(actions.updateSetFeatureByIdAndInputStart());
  try {
    const url = "/chatbot/sets/" + action.id;
    const response = yield axios.post(url, {
      input: action.input
    });
    console.log(response);
    yield put(actions.updateSetFeatureByIdAndInputSuccess(response));
  } catch (error) {
    yield put(actions.updateSetFeatureByIdAndInputFail());
  }
}
