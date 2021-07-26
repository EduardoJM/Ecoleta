import { AuthActionCollection } from '../actions';
import { AuthStore, AuthStoreInitial } from '../store/auth';

export default function authReducer(
    state: AuthStore = AuthStoreInitial,
    action: AuthActionCollection
) : AuthStore {
    if (action.type === 'AuthSetUserData') {
        return {
            ...state,
            user: action.payload,
        };
    } else if (action.type === 'AuthRemoveUserData') {
        return {
            ...state,
            user: null,
        };
    }
    return state;
}

