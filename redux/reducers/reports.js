import * as types from '../actions/reports/actionTypes'

const initialState = {
    doneFetching: false,
    isFetching: false,
    hasError: false,
    errorMessage: '',
    reportsData: [],
};

export default reports = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_START: {
            return {
                ...initialState,
                isFetching: true
            };
        }
        case types.REQUEST_SUCCESS: {
            const { reportsData } = action;
            return {
                ...state,
                doneFetching: true,
                isFetching: false,
                reportsData
            };
        }
        case types.REQUEST_ERROR: {
            const { error } = action;
            return {
                ...state,
                doneFetching: true,
                isFetching: false,
                hasError: true,
                reportsData: [],
                errorMessage: error
            };
        }
        default:
            return state;
    }
}