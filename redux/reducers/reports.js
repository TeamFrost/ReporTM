import * as types from '../actions/auth/actionTypes'

const initialState = {
    reportsData: [],
};

export default reports = (state = initialState, action) => {
    switch (action.type) {
        case "setReportsData": {
            const { reportsData } = action;
            return {
                ...state,
                reportsData
            };
        }
        default:
            return state;
    }
}