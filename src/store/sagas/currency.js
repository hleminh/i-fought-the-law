import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

const currencyArr = ['USD', 'JPY', 'EUR', 'GBP', 'SGD', 'AUD'];

export function* getCurrencyExchange(action) {
  yield put(actions.getCurrencyStart());
  try {
    const responseUSD = yield axios.get(
      'http://free.currencyconverterapi.com/api/v5/convert?q=USD_VND&compact=y'
    );
    const responseJPY = yield axios.get(
      'http://free.currencyconverterapi.com/api/v5/convert?q=JPY_VND&compact=y'
    );
    const responseEUR = yield axios.get(
      'http://free.currencyconverterapi.com/api/v5/convert?q=EUR_VND&compact=y'
    );
    const responseGBP = yield axios.get(
      'http://free.currencyconverterapi.com/api/v5/convert?q=GBP_VND&compact=y'
    );
    const responseSGD = yield axios.get(
      'http://free.currencyconverterapi.com/api/v5/convert?q=SGD_VND&compact=y'
    );
    const responseAUD = yield axios.get(
      'http://free.currencyconverterapi.com/api/v5/convert?q=AUD_VND&compact=y'
    );
    const data = [
      responseUSD.data,
      responseJPY.data,
      responseEUR.data,
      responseGBP.data,
      responseSGD.data,
      responseAUD.data
    ];
    yield put(actions.getCurrencySuccess(data));
  } catch (error) {
    yield put(actions.getCurrencyFail(error.response));
  }
}
