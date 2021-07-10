import { ItemsActionCollection } from '../actions';
import { ItemsStore, ItemsStoreInitial } from '../store/items';

export default function itemsReducer(
    state: ItemsStore = ItemsStoreInitial,
    action: ItemsActionCollection
) : ItemsStore {
    if (action.type === 'ItemsSet') {
        return [
            ...action.payload,
        ];
    }
    return state;
}

