import * as types from "./actionTypes";
import { themeColors } from "../../../helpers/style.js"
import { storeData } from "../../../helpers/storage"

export const changeTheme = (theme) => (dispatch) => {
    storeData('@reportm-theme', theme)
        .then(() => {
            dispatch(change_theme(theme));
        })
        .catch((error) => {
            alert(error)
        });
};



const change_theme = (theme) => ({
    type: types.CHANGE_THEME,
    theme
});

