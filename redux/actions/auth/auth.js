import { firebase } from '../../../config/firebaseConfig';
import * as types from './actionTypes';

import * as RootNavigation from '../../../helpers/rootnav';

export const restoreSession = () => dispatch => {
    dispatch(sessionStart());
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            usersRef
                .doc(user.uid)
                .get()
                .then((document) => {
                    const userData = document.data()
                    dispatch(sessionSuccess(userData));
                })
                .catch((error) => {
                    dispatch(sessionError(error));
                });
        } else {
            dispatch(sessionLogout());
        }
    });
};

export const loginUser = (email, password) => dispatch => {
    dispatch(sessionStart());
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
                    dispatch(sessionSuccess(user));
                    RootNavigation.navigate('Drawer');
                    // navigation.navigate('Drawer')
                })
                .catch(error => {
                    dispatch(sessionError(error));
                });
        })
        .catch(error => {
            alert(error)
        })
};

export const signupUser = (email, password, username) => dispatch => {
    dispatch(sessionStart());
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const user = {
                id: uid,
                email,
                username,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(user)
                .then(() => {
                    console.log("!!!!!!!!!!!")
                    alert("Cont creat!")
                    RootNavigation.navigate('Login');
                    // navigation.navigate('Login')
                })
                .catch((error) => {
                    dispatch(sessionError(error.message));
                });
        })
        .catch((error) => {
            dispatch(sessionError(error.message));
        });
};

export const logoutUser = () => dispatch => {
    dispatch(sessionStart());
    firebase.auth().signOut()
        .then(() => {
            dispatch(sessionLogout())
            RootNavigation.navigate('Login');
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'LoginStack' }],
            // })
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

const sessionStart = () => ({
    type: types.SESSION_START
});

const sessionSuccess = user => ({
    type: types.SESSION_SUCCESS,
    user
});

const sessionError = error => ({
    type: types.SESSION_ERROR,
    error
});

const sessionLogout = () => ({
    type: types.SESSION_LOGOUT
});


