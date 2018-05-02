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

export function* searchLaw(action) {
  yield put(actions.searchStart());
  try {
    let url = `/lawDocument/search?page=${action.page}&perPage=${
      action.perPage
    }&keyword=${encodeURI(action.keyword)}&searchType=${action.searchType}`;
    if (action.lawClass) {
      url += `&classId=${action.lawClass}`;
    }
    if (action.agency) {
      url += `&agencyId=${action.agency}`;
    }
    if (action.validityStatus) {
      url += `&status=${action.validityStatus}`;
    }
    if (action.signer) {
      url += `&signer=${encodeURI(action.signer)}`;
    }
    const response = yield axios.get(url);
    yield put(actions.searchSuccess(response.data));
  } catch (error) {
    yield put(actions.searchFail(error));
  }
}

export function* getLawDetail(action) {
  yield put(actions.getLawDetailStart());
  try {
    const response = yield axios.get(`/lawDocument/detail/${action.lawId}`);
    yield put(actions.getLawDetailSuccess(response.data));
  } catch (err) {
    yield put(actions.getLawDetailFail(err));
  }
}

export function* getNewestLaw(action) {
  yield put(actions.getNewestLawStart());
  try {
    const response = yield axios.get(
      `/lawDocument/newest?itemNumber=${action.itemNumber}`
    );
    yield put(actions.getNewestLawSuccess(response.data));
  } catch (err) {
    yield put(actions.getNewestLawFail(err));
  }
}

export function* getMostViewedLaw(action) {
  yield put(actions.getMostViewedLawStart());
  try {
    const response = yield axios.get(
      `/lawDocument/mostviewed?itemNumber=${action.itemNumber}`
    );
    yield put(actions.getMostViewedLawSuccess(response.data));
  } catch (err) {
    yield put(actions.getMostViewedLawFail(err));
  }
}

export function* getAllLaw(action) {
  yield put(actions.getAllLawStart());
  try {
    let url = `/lawDocument/getAll?page=${action.page}&perPage=${
      action.perPage
    }`;
    if (action.lawClass) {
      url += `&classId=${action.lawClass}`;
    }
    if (action.agency) {
      url += `&agencyId=${action.agency}`;
    }
    if (action.status) {
      url += `&status=${action.validityStatus}`;
    }
    if (action.promulgateYear) {
      url += `&year=${action.promulgateYear}`;
    }
    const response = yield axios.get(url);
    yield put(actions.getAllLawSuccess(response.data));
  } catch (error) {
    yield put(actions.getAllLawFail(error));
  }
}
