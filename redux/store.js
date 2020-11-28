import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reports from './reducers/reports'

export const store = createStore(reports, applyMiddleware(thunkMiddleware));