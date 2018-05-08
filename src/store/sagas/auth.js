import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from '../../axios-law';
import * as actions from '../actions/index';

const TOKEN_KEY = 'token';
const EXPIRATION_DATE = 'expiration_date';
const USER_ID_KEY = 'user_id';
const USER_EMAIL = 'user_email';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], TOKEN_KEY);
  yield call([localStorage, 'removeItem'], EXPIRATION_DATE);
  yield call([localStorage, 'removeItem'], USER_ID_KEY);
  yield call([localStorage, 'removeItem'], USER_EMAIL);
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeOutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password
  };
  let url = '/user/login';
  if (action.isSignup) {
    url = '/user/signUp';
  }
  try {
    const response = yield axios.post(url, authData);
    const expirationDay = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem(TOKEN_KEY, response.data.token);
    yield localStorage.setItem(EXPIRATION_DATE, expirationDay);
    yield localStorage.setItem(USER_ID_KEY, response.data._id);
    yield localStorage.setItem(USER_EMAIL, response.data.email);
    yield put(
      actions.authSuccess(
        response.data.token,
        response.data._id,
        response.data.email
      )
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem(TOKEN_KEY);
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem(EXPIRATION_DATE)
    );
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem(USER_ID_KEY);
      const email = yield localStorage.getItem(USER_EMAIL);
      yield put(actions.authSuccess(token, userId, email));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
