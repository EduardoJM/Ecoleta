import { combineReducers } from 'redux';
import authReducer from './auth';
import globalReducer from './global';
import itemsReducer from './items';
import userReducer from './user';

const reducers = combineReducers({
    auth: authReducer,
    global: globalReducer,
    items: itemsReducer,
    user: userReducer,
});

export default reducers;
