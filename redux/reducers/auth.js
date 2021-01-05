import * as types from '../actions/auth/actionTypes';

const initialState = {
    doneFetching: false,
    loggedIn: false,
    signUp: false,
    loggedOut: false,
    isFetching: false,
    hasError: false,
    errorMessage: '',
    user: null
};

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case types.SESSION_START: {
            return {
                ...initialState,
                isFetching: true,
            };
        }
        case types.SESSION_SUCCESS: {
            const { user } = action;
            return {
                ...state,
                doneFetching: true,
                isFetching: false,
                loggedIn: true,
                user
            };
        }
        case types.SIGNUP_SUCCESS: {
            return {
                ...state,
                doneFetching: true,
                isFetching: false,
                signUp: true,
                loggedIn: false,
            };
        }
        case types.SESSION_ERROR: {
            const { error } = action;
            return {
                ...state,
                doneFetching: true,
                isFetching: false,
                loggedIn: false,
                hasError: true,
                user: null,
                errorMessage: error
            };
        }
        case types.SESSION_LOGOUT: {
            return {
                ...initialState,
                doneFetching: true,
                loggedOut: true
            };
        }
        default: {
            return state;
        }
    }
};