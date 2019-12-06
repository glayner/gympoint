import {takeLatest, call, put, all} from 'redux-saga/effects';
import Toast from 'react-native-simple-toast';

import api from '~/services/api';

import {signInSuccess, singFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {id} = payload;

    const response = yield call(api.get, `sessions/${id}/students`);

    const user = response.data;

    yield put(signInSuccess(user));
  } catch (err) {
    Toast.show(err.response.data.error, Toast.LONG);

    yield put(singFailure());
  }
}

export default all([takeLatest('@user/SIGN_IN_REQUEST', signIn)]);
