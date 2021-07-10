import { Action } from 'redux';
import { CollectItem } from '../../types';

export interface ItemsActionTypePayloadMap {
    'ItemsSet': CollectItem[];
    'ItemsRequest': null;
}

export interface ItemsAction<K extends keyof ItemsActionTypePayloadMap> extends Action<K> {
    payload: ItemsActionTypePayloadMap[K];
}

export type ItemsActionType = keyof ItemsActionTypePayloadMap;

export type ItemsActionCollection =
    ItemsAction<'ItemsSet'> |
    ItemsAction<'ItemsRequest'>;

export function setItems(items: CollectItem[]): ItemsAction<'ItemsSet'> {
    return {
        type: 'ItemsSet',
        payload: items,
    };
}

export function requestItems(): ItemsAction<'ItemsRequest'> {
    return {
        type: 'ItemsRequest',
        payload: null,
    };
}
