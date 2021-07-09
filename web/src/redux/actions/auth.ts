import { Action } from 'redux';
import { UserData } from '../../types';

export interface AuthActionSetUserDataPayload extends UserData {
}

export interface AuthActionTypePayloadMap {
    'AuthSetUserData': AuthActionSetUserDataPayload;
    'AuthRequestLogin': {
        email: string;
        password: string;
    };
    'AuthRequestLogout': null;
}

export interface AuthAction<K extends keyof AuthActionTypePayloadMap> extends Action<K> {
    payload: AuthActionTypePayloadMap[K];
}

export type AuthActionType = keyof AuthActionTypePayloadMap;

export type AuthActionCollection =
    AuthAction<'AuthSetUserData'> |
    AuthAction<'AuthRequestLogin'> |
    AuthAction<'AuthRequestLogout'>;

export function setUserData(user: UserData): AuthAction<'AuthSetUserData'> {
    return {
        type: 'AuthSetUserData',
        payload: user,
    };
}
