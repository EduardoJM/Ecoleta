import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';

import { AuthStore } from './auth';
import { GlobalStore } from './global';
import { ItemsStore } from './items';
import { UserStore } from './user';

export interface Store {
    auth: AuthStore;
    global: GlobalStore;
    items: ItemsStore;
    user: UserStore;
}

const sagasMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagasMiddleware));
sagasMiddleware.run(sagas);

export default store;
