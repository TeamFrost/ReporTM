import { firebase } from '../../../config/firebaseConfig';

import * as types from './actionTypes';

export const watchReportsData = () => {
    return function (dispatch) {
        const reportsRef = firebase.firestore().collectionGroup('sub_reports');
        reportsRef
            .onSnapshot(
                querySnapshot => {
                    let reportsData = []
                    querySnapshot.forEach(doc => {
                        const report = doc.data()
                        report.id = doc.id
                        const parent = doc.ref.parent.parent.id
                        const reportFinal = { ...report, parent };
                        reportsData.push(reportFinal)
                    });
                    const actionSetReportsData = setReportsData(reportsData)
                    dispatch(actionSetReportsData);
                },
                error => {
                    console.log(error)
                }
            )
    }
};

const setReportsData = (reportsData) => ({
    type: "setReportsData",
    reportsData
});