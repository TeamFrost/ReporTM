import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reports from './reducers/reports'
import rootReducers from './reducers/index'

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));