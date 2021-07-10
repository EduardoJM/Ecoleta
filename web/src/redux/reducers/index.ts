import { combineReducers } from 'redux';
import authReducer from './auth';
import globalReducer from './global';
import itemsReducer from './items';

const reducers = combineReducers({
    auth: authReducer,
    global: globalReducer,
    items: itemsReducer,
});

export default reducers;
