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
}

export interface UserAction<K extends keyof UserActionTypePayloadMap> extends Action<K> {
    payload: UserActionTypePayloadMap[K];
}

export type UserActionType = keyof UserActionTypePayloadMap;

export type UserActionCollection =
    UserAction<'UserSetPointsData'> |
    UserAction<'UserRequestPoints'> |
    UserAction<'UserRequestCreatePoint'>;

export function setPointsData(pointsData: PointList): UserAction<'UserSetPointsData'> {
    return { type: 'UserSetPointsData', payload: pointsData };
}

export function requestPoints(page: number): UserAction<'UserRequestPoints'> {
    return { type: 'UserRequestPoints', payload: { page } };
}

export function requestCreatePoint(data: FormData, history: History) : UserAction<'UserRequestCreatePoint'> {
    return { type: 'UserRequestCreatePoint', payload: { data, history } };
}
