import { firebase } from '../../config/firebaseConfig';

import { types } from './types';

const reportsRef = firebase.firestore().collection('reports');

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
                        reportsData.push(report)
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