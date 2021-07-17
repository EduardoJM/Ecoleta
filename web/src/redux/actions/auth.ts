import { Action } from 'redux';
import { UserData } from '../../types';
import { History } from 'history';

export interface AuthActionSetUserDataPayload extends UserData {
}

export interface AuthActionTypePayloadMap {
    'AuthSetUserData': AuthActionSetUserDataPayload;
    'AuthRequestLogin': {
        email: string;
        password: string;
        route?: {
            next: string;
            history: History;
        }
    };
    'AuthRequestCheckIfLogged': null;
    'AuthRequestLogout': null;
}

export interface AuthAction<K extends keyof AuthActionTypePayloadMap> extends Action<K> {
    payload: AuthActionTypePayloadMap[K];
}

export type AuthActionType = keyof AuthActionTypePayloadMap;

export type AuthActionCollection =
    AuthAction<'AuthSetUserData'> |
    AuthAction<'AuthRequestLogin'> |
    AuthAction<'AuthRequestLogout'> |
    AuthAction<'AuthRequestCheckIfLogged'>;

export function requestCheckIfLogged(): AuthAction<'AuthRequestCheckIfLogged'> {
    return {
        type: 'AuthRequestCheckIfLogged',
        payload: null,
    };
}

export function setUserData(user: UserData): AuthAction<'AuthSetUserData'> {
    return {
        type: 'AuthSetUserData',
        payload: user,
    };
}

export function requestLogin(
    email: string,
    password: string,
    route?: {
        next: string;
        history: History;
    }
): AuthAction<'AuthRequestLogin'> {
    return {
        type: 'AuthRequestLogin',
        payload: { email, password, route },
    };
}
