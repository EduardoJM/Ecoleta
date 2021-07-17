import { Point } from '../../types';

export interface UserStore {
    points: Point[];
    page: number;
    pagesCount: number;
}

export const UserStoreInitial: UserStore = {
    points: [],
    page: 1,
    pagesCount: 1,
};
