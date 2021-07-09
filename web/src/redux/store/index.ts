import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';

import { AuthStore } from './auth';
import { GlobalStore } from './global';

export interface Store {
    auth: AuthStore;
    global: GlobalStore;
}

const sagasMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagasMiddleware));
sagasMiddleware.run(sagas);

export default store;
