import { combineReducers } from 'redux';

import reports from './reports';
import auth from './auth';
import theme from './colorTheme'
import translations from './translations'

export default rootReducer = combineReducers({
    reports,
    auth,
    theme,
    translations,
})