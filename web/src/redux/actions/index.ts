import * as auth from './auth';
import * as global from './global';
import * as items from './items';

export const actions = {
    auth,
    global,
    items,
};

export type { AuthActionType, AuthAction, AuthActionCollection } from './auth';
export type { GlobalActionType, GlobalAction, GlobalActionCollection } from './global';
export type { ItemsActionType, ItemsAction, ItemsActionCollection } from './items';
