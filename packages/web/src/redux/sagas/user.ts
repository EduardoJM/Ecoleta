import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions, UserAction } from '../actions';
import { PointList, UserData } from '../../types';
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

function* deletePoint(action: UserAction<'UserRequestDeletePoint'>) {
    const { id } = action.payload;
    yield put(actions.global.pushLoading());
    try {
        yield call(api.point.deletePoint, id);
        yield put(actions.user.removePoint(id));
    } catch (err) {
        yield put(actions.global.pushMessage(displayAPIError(err)));
    } finally {
        yield put(actions.global.popLoading());
    }
}

function* updateUser(action: UserAction<'UserRequestUpdate'>) {
    const data = action.payload;
    yield put(actions.global.pushLoading());
    try {
        const response : {
            user: UserData
        } = yield call(api.user.updateUser, data);
        yield put(actions.auth.setUserData(response.user));
        yield put(actions.global.pushMessage('Dados atualizados com sucesso!'));
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

function* watchDeletePoint() {
    yield takeLatest<UserAction<'UserRequestDeletePoint'>>('UserRequestDeletePoint', deletePoint);
}

function* watchUpdateUser() {
    yield takeLatest<UserAction<'UserRequestUpdate'>>('UserRequestUpdate', updateUser);
}

export default function* userSagas() {
    yield all([
        watchLoadPointsPage(),
        watchAddPoint(),
        watchDeletePoint(),
        watchUpdateUser(),
    ]);
}

