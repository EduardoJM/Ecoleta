import {all} from 'redux-saga/effects';

import authSagas from './auth';

export default function* sagas() {
    yield all([
        authSagas(),
    ]);
}
