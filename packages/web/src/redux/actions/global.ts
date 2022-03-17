import { Action } from 'redux';

export interface GlobalActionTypePayloadMap {
    'GlobalPushLoading': null;
    'GlobalPopLoading': null;
    'GlobalPushMessage': string;
    'GlobalPopMessage': {
        key: number;
    };
}

export interface GlobalAction<K extends keyof GlobalActionTypePayloadMap> extends Action<K> {
    payload: GlobalActionTypePayloadMap[K];
}

export type GlobalActionType = keyof GlobalActionTypePayloadMap;

export type GlobalActionCollection =
    GlobalAction<'GlobalPopLoading'> |
    GlobalAction<'GlobalPopMessage'> |
    GlobalAction<'GlobalPushLoading'> |
    GlobalAction<'GlobalPushMessage'>;

export function pushLoading(): GlobalAction<'GlobalPushLoading'> {
    return { type: 'GlobalPushLoading', payload: null };
}

export function popLoading(): GlobalAction<'GlobalPopLoading'> {
    return { type: 'GlobalPopLoading', payload: null };
}

export function pushMessage(message: string): GlobalAction<'GlobalPushMessage'> {
    return { type: 'GlobalPushMessage', payload: message };
}

export function popMessage(key: number): GlobalAction<'GlobalPopMessage'> {
    return { type: 'GlobalPopMessage', payload: { key } };
};
