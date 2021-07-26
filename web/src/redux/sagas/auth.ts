import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions, AuthAction } from '../actions';
import { UserAuthenticatedData, UserData } from '../../types';
import { api } from '../../services';
import { displayAPIError } from '../../utils/errors';

function* login(action: AuthAction<'AuthRequestLogin'>) {
    const { email, password } = action.payload;
    yield put(actions.global.pushLoading());
    try {
        const response : UserAuthenticatedData = yield call(api.user.loginUser, email, password);
        api.axios.defaults.headers.Authorization = `Bearer ${response.token}`;
        localStorage.setItem('@Ecoleta_authorization_token', response.token);
        yield put(actions.auth.setUserData(response.user));
        if (action.payload.route.next) {
            action.payload.route.history.push(action.payload.route.next);
        } else {
            action.payload.route.history.push('/user');
        }
    } catch (err) {
        yield put(actions.global.pushMessage(displayAPIError(err)));
    } finally {
        yield put(actions.global.popLoading());
    }
}

function* checkIfLogged() {
    yield put(actions.global.pushLoading());
    try {
        const token = localStorage.getItem('@Ecoleta_authorization_token');
        if (token) {
            api.axios.defaults.headers.Authorization = `Bearer ${token}`;
            const response : UserData = yield call(api.user.getMyData);
            yield put (actions.auth.setUserData(response));
        }
    } catch(err) {
        api.axios.defaults.headers.Authorization = undefined;
        localStorage.removeItem('@Ecoleta_authorization_token');
        yield put(actions.global.pushMessage(displayAPIError(err)));
    } finally {
        yield put(actions.global.popLoading());
    }
}

function* watchLogin() {
    yield takeLatest<AuthAction<'AuthRequestLogin'>>('AuthRequestLogin', login);
};

function* watchCheckIfLogged() {
    yield takeLatest<AuthAction<'AuthRequestCheckIfLogged'>>('AuthRequestCheckIfLogged', checkIfLogged);
}

export default function* authSagas() {
    yield all([
        watchLogin(),
        watchCheckIfLogged(),
    ]);
}
