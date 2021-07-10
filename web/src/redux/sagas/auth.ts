import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions, AuthAction } from '../actions';
import { UserAuthenticatedData } from '../../types';
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
        if (action.payload.route) {
            action.payload.route.history.push(action.payload.route.next);
        }
    } catch (err) {
        yield put(actions.global.pushMessage(displayAPIError(err)));
    } finally {
        yield put(actions.global.popLoading());
    }
}

function* watchLogin() {
    yield takeLatest<AuthAction<'AuthRequestLogin'>>('AuthRequestLogin', login);
};

export default function* authSagas() {
    yield all([
        watchLogin(),
    ]);
}
