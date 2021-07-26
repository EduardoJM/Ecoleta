import { Action } from 'redux';
import { History } from 'history';
import { PointList } from '../../types';

export interface UserActionTypePayloadMap {
    'UserSetPointsData': PointList;
    'UserRequestPoints': {
        page: number;
    };
    'UserRequestCreatePoint': {
        data: FormData;
        history: History;
    },
    'UserRequestDeletePoint': {
        id: number;
    },
    'UserRemovePoint': {
        id: number;
    },
    'UserRequestUpdate': FormData,
}

export interface UserAction<K extends keyof UserActionTypePayloadMap> extends Action<K> {
    payload: UserActionTypePayloadMap[K];
}

export type UserActionType = keyof UserActionTypePayloadMap;

export type UserActionCollection =
    UserAction<'UserSetPointsData'> |
    UserAction<'UserRequestPoints'> |
    UserAction<'UserRequestCreatePoint'> |
    UserAction<'UserRemovePoint'> |
    UserAction<'UserRequestDeletePoint'> |
    UserAction<'UserRequestUpdate'>;

export function setPointsData(pointsData: PointList): UserAction<'UserSetPointsData'> {
    return { type: 'UserSetPointsData', payload: pointsData };
}

export function requestPoints(page: number): UserAction<'UserRequestPoints'> {
    return { type: 'UserRequestPoints', payload: { page } };
}

export function requestCreatePoint(data: FormData, history: History) : UserAction<'UserRequestCreatePoint'> {
    return { type: 'UserRequestCreatePoint', payload: { data, history } };
}

export function removePoint(id: number) : UserAction<'UserRemovePoint'> {
    return { type: 'UserRemovePoint', payload: { id } };
}

export function requestDeletePoint(id: number) : UserAction<'UserRequestDeletePoint'> {
    return { type: 'UserRequestDeletePoint', payload: { id } };
}

export function requestUpdateUser(data: FormData) : UserAction<'UserRequestUpdate'> {
    return { type: 'UserRequestUpdate', payload: data };
}
