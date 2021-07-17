import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions, UserAction } from '../actions';
import { PointList } from '../../types';
import { api } from '../../services';
import { displayAPIError } from '../../utils/errors';

function* loadPointsPage(action: UserAction<'UserRequestPoints'>) {
    const { page } = action.payload;
    yield put(actions.global.pushLoading());
    try {
        const response: PointList = yield call(api.user.listUserPoints, page);
        yield put(actions.user.setPointsData(response));
    } catch (err) {
        yield put(actions.global.pushMessage(displayAPIError(err)));
    } finally {
        yield put(actions.global.popLoading());
    }
}

function* addPoint(action: UserAction<'UserRequestCreatePoint'>) {
    const { data, history } = action.payload;
    yield put(actions.global.pushLoading());
    try {
        yield call(api.point.createPoint, data);
        yield put(actions.user.requestPoints(1));
        history.push('/user/points/1');
    } catch (err) {
        yield put(actions.global.pushMessage(displayAPIError(err)));
    } finally {
        yield put(actions.global.popLoading());
    }
}

function* watchLoadPointsPage() {
    yield takeLatest<UserAction<'UserRequestPoints'>>('UserRequestPoints', loadPointsPage);
}

function* watchAddPoint() {
    yield takeLatest<UserAction<'UserRequestCreatePoint'>>('UserRequestCreatePoint', addPoint);
}

export default function* userSagas() {
    yield all([
        watchLoadPointsPage(),
        watchAddPoint(),
    ]);
}

