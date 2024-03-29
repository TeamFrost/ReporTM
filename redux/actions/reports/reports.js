import { firebase } from '../../../config/firebaseConfig';
import * as types from './actionTypes';

export const watchReportsData = () => dispatch => {
    dispatch(requestStart());
    const reportsRef = firebase.firestore().collectionGroup('sub_reports');
    reportsRef
        .onSnapshot(querySnapshot => {
            let reportsData = []
            querySnapshot.forEach(doc => {
                const report = doc.data()
                report.id = doc.id
                const parent = doc.ref.parent.parent.id
                const authorId = report.author
                firebase.firestore().collection("users")
                    .doc(authorId)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            dispatch(requestError("Document does not exist!"))
                        }
                        const username = firestoreDocument.data().username;
                        const avatar = firestoreDocument.data().profile;
                        const userInfo = { username, avatar }
                        const reportFinal = { ...report, parent, userInfo };
                        reportsData.push(reportFinal)
                    })
                    .catch(error => {
                        dispatch(requestError(error));
                    });
            })
            dispatch(requestSuccess(reportsData))
        }),
        (error) => {
            dispatch(requestError(error))
        }
}


const requestStart = () => ({
    type: types.REQUEST_START
});

const requestSuccess = reportsData => ({
    type: types.REQUEST_SUCCESS,
    reportsData
});

const requestError = error => ({
    type: types.REQUEST_ERROR,
    error
});

