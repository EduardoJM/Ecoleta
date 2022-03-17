import { UserData } from '../../types';

export interface AuthStore {
    user: UserData | null;
}

export const AuthStoreInitial: AuthStore = {
    user: null,
};
