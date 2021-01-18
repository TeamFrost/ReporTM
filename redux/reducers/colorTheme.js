import * as types from "../actions/colorTheme/actionTypes";
import { themeColors } from "../../helpers/style";

const initialState = { theme: themeColors.themeLight };

export default theme = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_THEME: {
            const { theme } = action;
            return {
                theme
            };
        }
        default:
            return state;
    }
}