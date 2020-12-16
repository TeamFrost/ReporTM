import * as types from '../actions/auth/actionTypes';

const initialState = {
    loggedIn: false,
    isFetching: false,
    hasError: false,
    errorMessage: '',
    user: null
};

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case types.SESSION_START: {
            return {
                ...state,
                isFetching: true
            };
        }
        case types.SESSION_SUCCESS: {
            const { user } = action;
            return {
                ...state,
                isFetching: false,
                loggedIn: true,
                user
            };
        }
        case types.SIGNUP_SUCCESS: {
            const { user } = action;
            return {
                ...state,
                isFetching: false,
                user,
                hasError: false,
                loggedIn: false,
            };
        }
        case types.SESSION_ERROR: {
            const { error } = action;
            return {
                ...state,
                isFetching: false,
                loggedIn: false,
                hasError: true,
                user: null,
                errorMessage: error
            };
        }
        case types.SESSION_LOGOUT: {
            return {
                ...initialState
            };
        }
        default: {
            return state;
        }
    }
};