import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import bookSaga from './bookSaga';

export default function* rootSaga() {
  yield all([authSaga(), bookSaga()]);
}
