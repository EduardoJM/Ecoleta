import * as auth from './auth';
import * as global from './global';

export const actions = {
    auth,
    global,
};

export type { AuthActionType, AuthAction, AuthActionCollection } from './auth';
export type { GlobalActionType, GlobalAction, GlobalActionCollection } from './global';
