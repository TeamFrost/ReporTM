import { firebase } from '../../config/firebaseConfig';

import { types } from './types';

const reportsRef = firebase.firestore().collectionGroup('sub_reports');

const setReportsData = (reportsData) => {
    return {
        type: types.setReportsData,
        value: reportsData
    };
};

export const watchReportsData = () => {
    return function (dispatch) {
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