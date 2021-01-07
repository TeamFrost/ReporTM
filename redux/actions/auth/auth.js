import { round } from 'react-native-reanimated';
import { firebase } from '../../../config/firebaseConfig';
import * as types from './actionTypes';

export const restoreSession = () => dispatch => {
    dispatch(sessionStart());
    const usersRef = firebase.firestore().collection('users');
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
                    dispatch(sessionSuccess(user))
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
            const profile = 'https://firebasestorage.googleapis.com/v0/b/reportm-40f3e.appspot.com/o/Profile.png?alt=media&token=03f17fb0-6394-43fb-9695-fbc7633d7c19'
            const profileLight = 'https://firebasestorage.googleapis.com/v0/b/reportm-40f3e.appspot.com/o/ProfileWhite.png?alt=media&token=0346a6ca-8551-47e2-acae-d2e1020d51ca'
            const uid = response.user.uid
            const user = {
                id: uid,
                darkmode: false,
                email,
                language: "ro",
                notifications: true,
                profile: profile,
                profilelight: profileLight,
                upvotedreports: [],
                username,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(user)
                .then(() => {
                    console.log("Cont creat!")
                    dispatch(sessionSuccess(user))
                })
                .catch((error) => {
                    dispatch(sessionError(error.message));
                });
        })
        .catch((error) => {
            dispatch(sessionError(error.message));
            alert(error)
        });
};

export const logoutUser = () => dispatch => {
    dispatch(sessionStart());
    firebase.auth().signOut()
        .then(() => {
            dispatch(sessionLogout())
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

const signupSuccess = () => ({
    type: types.SIGNUP_SUCCESS
});

const sessionError = error => ({
    type: types.SESSION_ERROR,
    error
});

const sessionLogout = () => ({
    type: types.SESSION_LOGOUT
});


