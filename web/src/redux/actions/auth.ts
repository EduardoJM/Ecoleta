import { Action } from 'redux';
import { History } from 'history';
import { UserData } from '../../types';

export interface AuthActionSetUserDataPayload extends UserData {
}

export interface AuthActionTypePayloadMap {
    'AuthSetUserData': AuthActionSetUserDataPayload;
    'AuthRequestLogin': {
        email: string;
        password: string;
        route: {
            next?: string;
            history: History;
        }
    };
    'AuthRequestCheckIfLogged': null;
    'AuthRequestLogout': History;
    'AuthRemoveUserData': null;
}

export interface AuthAction<K extends keyof AuthActionTypePayloadMap> extends Action<K> {
    payload: AuthActionTypePayloadMap[K];
}

export type AuthActionType = keyof AuthActionTypePayloadMap;

export type AuthActionCollection =
    AuthAction<'AuthSetUserData'> |
    AuthAction<'AuthRequestLogin'> |
    AuthAction<'AuthRequestLogout'> |
    AuthAction<'AuthRequestCheckIfLogged'> |
    AuthAction<'AuthRemoveUserData'>;

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
    route: {
        next?: string;
        history: History;
    }
): AuthAction<'AuthRequestLogin'> {
    return {
        type: 'AuthRequestLogin',
        payload: { email, password, route },
    };
}

export function requestLogout(history: History): AuthAction<'AuthRequestLogout'> {
    return { type: 'AuthRequestLogout', payload: history };
}

export function removeUserData(): AuthAction<'AuthRemoveUserData'> {
    return { type: 'AuthRemoveUserData', payload: null };
}
