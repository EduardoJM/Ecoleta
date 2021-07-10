import {all} from 'redux-saga/effects';

import authSagas from './auth';
import itemsSagas from './items';

export default function* sagas() {
    yield all([
        authSagas(),
        itemsSagas(),
    ]);
}
