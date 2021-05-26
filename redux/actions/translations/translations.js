import * as types from "./actionTypes";
import { storeData } from "../../../helpers/storage"

export const changeLanguage = (language) => (dispatch) => {
    storeData('@reportm-language', language)
        .then(() => {
            dispatch(change_language(language));
        })
        .catch((error) => {
            alert(error)
        });
};

const change_language = (language) => ({
    type: types.CHANGE_LANGUAGE,
    language: language
});