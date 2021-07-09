import { combineReducers } from 'redux';
import authReducer from './auth';
import globalReducer from './global';

const reducers = combineReducers({
    auth: authReducer,
    global: globalReducer,
});

export default reducers;
