import { UserActionCollection } from '../actions';
import { UserStore, UserStoreInitial } from '../store/user';

export default function userReducer(
    state: UserStore = UserStoreInitial,
    action: UserActionCollection
) : UserStore {
    if (action.type === 'UserSetPointsData') {
        return {
            ...state,
            points: action.payload.results,
            page: action.payload.page,
            pagesCount: action.payload.pagesCount,
        };
    } else if (action.type === 'UserRemovePoint') {
        return {
            ...state,
            points: state.points.filter((item) => item.id !== action.payload.id),
        }
    }
    return state;
}
