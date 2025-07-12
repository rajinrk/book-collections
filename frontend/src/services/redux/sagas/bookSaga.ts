import { put, takeLatest } from 'redux-saga/effects';
import {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
  addBookSuccess,
  addBookFailure,
  addBookRequest,
  updateBookSuccess,
  updateBookFailure,
  updateBookRequest,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailure,
} from '../slices/bookSlice';
import { createBooksAPI, deleteBookAPI, getBooksAPI, updateBookAPI } from '../../api';

function* getBooks(action: any): Generator<any, void, any> {
  try {
    const response = yield getBooksAPI(action.payload);

    if (response.data.status === 'success') {
      yield put(fetchBooksSuccess(response.data));
    } else {
      yield put(fetchBooksFailure(response.data));
    }
  } catch (error: any) {
    yield put(fetchBooksFailure(error.response.data));
  }
}

function* addBooks(action: any): Generator<any, void, any> {
  try {
    const response = yield createBooksAPI(action.payload);

    if (response.data.status === 'success') {
      yield put(addBookSuccess(response.data));
    } else {
      yield put(addBookFailure(response.data));
    }
  } catch (error: any) {
    yield put(addBookFailure(error.response.data));
  }
}

function* updateBooks(action: any): Generator<any, void, any> {
  try {
    const response = yield updateBookAPI(action.payload);

    if (response.data.status === 'success') {
      yield put(updateBookSuccess(response.data));
    } else {
      yield put(updateBookFailure(response.data));
    }
  } catch (error: any) {
    yield put(updateBookFailure(error.response.data));
  }
}

function* deleteBooks(action: any): Generator<any, void, any> {
  try {
    const response = yield deleteBookAPI(action.payload);

    if (response.data.status === 'success') {
      yield put(deleteBookSuccess(response.data));
    } else {
      yield put(deleteBookFailure(response.data));
    }
  } catch (error: any) {
    yield put(deleteBookFailure(error.response.data));
  }
}
export default function* bookSaga() {
  yield takeLatest(fetchBooksRequest.type, getBooks);
  yield takeLatest(addBookRequest.type, addBooks);
  yield takeLatest(updateBookRequest.type, updateBooks);
  yield takeLatest(deleteBookRequest.type, deleteBooks);
}
