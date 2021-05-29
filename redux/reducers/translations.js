import * as types from "../actions/translations/actionTypes";
import * as Localization from 'expo-localization';

const initialState = {
    language: 'ro'
};

export default translations = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_LANGUAGE: {
            const { language } = action;
            return {
                language,
            };
        }
        default:
            return state;
    }
}