import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';

import schemasReducer from './schemasReducer'

export default combineReducers({
    authReducer,
    form: reduxFormReducer,
    schemasReducer,
});