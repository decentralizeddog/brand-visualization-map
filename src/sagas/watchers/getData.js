import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_DATA, GET_S2ID_LIST, GET_COMPANY_LIST } from '../../constants';
import { setData, setS2IDList, setCompanyList } from '../../actions';
import { getData, getS2IDList, getCompanyList } from '../../lib/api';

function* workerGetDataSaga(actions) {
  const data = yield call(getData, actions.searchQuery);
  yield put(setData(data.data));
}



function* workerGetS2IDsaga(level) {
  const data = yield call(getS2IDList, level);
  yield put(setS2IDList(data.data));
}

function* workerGetCompanySaga(actions) {
  const data = yield call(getCompanyList, actions.types);
  yield put(setCompanyList(data.data));
}

export default function* watchGetUsersSaga() {
  yield takeLatest(GET_DATA, workerGetDataSaga);
  yield takeLatest(GET_S2ID_LIST, workerGetS2IDsaga);
  yield takeLatest(GET_COMPANY_LIST, workerGetCompanySaga);
}
