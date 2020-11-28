import { types } from '../actions/types';

const initialState = {
    reportsData: [],
}

export default reports = (state = initialState, action) => {
    switch (action.type) {
        case types.setReportsData:
            return { ...state, reportsData: action.value };
        default:
            return state;
    }
}