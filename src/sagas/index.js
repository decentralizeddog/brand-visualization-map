import { all, fork } from 'redux-saga/effects';

import watchGetDataSaga from './watchers/getData';

export default function* root() {
  yield all([
    fork(watchGetDataSaga),
  ]);
}
