import { GlobalActionCollection } from '../actions';
import { GlobalStore, GlobalStoreInitial } from '../store/global';

export default function globalReducer(
    state: GlobalStore = GlobalStoreInitial,
    action: GlobalActionCollection
) : GlobalStore {
    if (action.type === 'GlobalPushLoading') {
        return {
            ...state,
            loadingCount: state.loadingCount + 1,
        };
    } else if (action.type === 'GlobalPopLoading') {
        return {
            ...state,
            loadingCount: state.loadingCount - 1,
        };
    } else if (action.type === 'GlobalPushMessage') {
        return {
            ...state,
            messages: [
                ...state.messages,
                {
                    message: action.payload,
                    key: state.nextKey,
                },
            ],
            nextKey: state.nextKey + 1,
        };
    } else if (action.type === 'GlobalPopMessage') {
        return {
            ...state,
            messages: state.messages.filter(
                (item) => item.key !== action.payload.key
            ),
        };
    }
    return state;
}

