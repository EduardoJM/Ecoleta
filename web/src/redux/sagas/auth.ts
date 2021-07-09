import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions, AuthAction } from '../actions';
import { UserAuthenticatedData } from '../../types';
import { api } from '../../services';

function* login(action: AuthAction<'AuthRequestLogin'>) {
    const { email, password } = action.payload;
    put(actions.global.pushLoading());
    try {
        const response : UserAuthenticatedData = yield call(api.user.loginUser, email, password);
        api.axios.defaults.headers.Authorization = `Bearer ${response.token}`;
        localStorage.setItem('@Ecoleta_authorization_token', response.token);
        yield put(actions.auth.setUserData(response.user));
    } catch (err) {
        console.log(JSON.stringify(err, null, 3));
        let errorMessage = "Ops! Tivemos um erro desconhecido!";
        // TODO: get error from "err";
        put(actions.global.pushMessage(errorMessage));
    } finally {
        put(actions.global.popLoading());
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
