import { firebase } from '../../config/firebaseConfig';

import types from './types';

const loginStart = () => ({
    type: types.LOGIN_START,
});

const loginFinished = user => ({
    type: types.LOGIN_FINISHED,
    user,
});

const loginError = error => ({
    type: types.LOGIN_ERROR,
    error,
});

export const loginUser = (email, password) => (dispatch, getState) => {
    dispatch(loginStart());
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    console.log("Succes!")
                    dispatch(loginFinished(response.user));
                    navigation.navigate('Drawer')
                })
                .catch(error => {
                    dispatch(loginError(error));
                });
        })
        .catch(error => {
            alert(error)
        })
};

const logoutStart = () => ({
    type: types.LOGOUT_START,
});

const logoutFinished = () => ({
    type: types.LOGOUT_FINISHED,
});

const logoutError = error => ({
    type: types.LOGOUT_ERROR,
    error,
});

export const logoutUser = async => (dispatch, getState) => {
    dispatch(logoutStart());
    try {
        const response = { ok: true };
        if (!response.ok) {
            throw new Error(response.statusMessage);
        }
        dispatch(logoutFinished());
    } catch (error) {
        dispatch(logoutError(error));
    }
};