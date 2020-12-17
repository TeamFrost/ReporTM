import { firebase } from '../../../config/firebaseConfig';

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
                        const authorId = report.author
                        firebase.firestore().collection("users").where("id", "==", authorId)
                            .get()
                            .then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    // doc.data() is never undefined for query doc snapshots
                                    const author = doc.data().username;
                                    const reportFinal = { ...report, parent, author };
                                    reportsData.push(reportFinal)
                                });
                            })
                            .catch(function (error) {
                                console.log("Error getting documents: ", error);
                            });
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