import { put } from 'redux-saga/effects';

import axios from '../../axios-law';
import * as actions from '../actions/index';


export function* getLawClassList(action) {
  yield put(actions.getLawClassListStart());
  try {
    const response = yield axios.get('/class/getAll');
    yield put(actions.getLawClassListSucess(response.data));
  } catch (error) {
    yield put(actions.getLawClassListFail(error));
  }
}

export function* getAgencyList(action) {
  yield put(actions.getListAgencyStart());
  try {
    const response = yield axios.get('/agency/getAll');
    yield put(actions.getListAgencySuccess(response.data));
  } catch (error) {
    yield put(actions.getListAgencyFail(error));
  }
}

export function* getValidityStatus(action) {
  yield put(actions.getValidityStatusListStart());
  try {
    const response = yield axios.get('/status/getAll');
    yield put(actions.getValidityStatusSuccess(response.data));
  } catch (error) {
    yield put(actions.getValidityStatusFail(error));
  }
}
