import { all, takeLatest, call, put } from 'redux-saga/effects';
import { actions, ItemsAction } from '../actions';
import { CollectItem } from '../../types';
import { api } from '../../services';
import { displayAPIError } from '../../utils/errors';

function* getItems() {
    yield put(actions.global.pushLoading());
    try {
        const response : CollectItem[] = yield call(api.items.getItems);
        yield put(actions.items.setItems(response));
    } catch (err) {
        yield put(actions.global.pushMessage(displayAPIError(err)));
    } finally {
        yield put(actions.global.popLoading());
    }
}

function* watchGetItems() {
    yield takeLatest<ItemsAction<'ItemsRequest'>>('ItemsRequest', getItems);
};

export default function* itemsSagas() {
    yield all([
        watchGetItems(),
    ]);
}
