import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';
import { useActionSheet } from '@expo/react-native-action-sheet'
import { connect } from 'react-redux';

import { screenWidth, screenHeight, themeColors } from "../../helpers/style";
import { firebase } from "../../config/firebaseConfig";
import { restoreSession } from '../../redux/actions/auth/auth';

import SolvedIcon from '../../assets/ActionSheetIcons/SolvedIcon.js'
import DeleteIcon from '../../assets/ActionSheetIcons/DeleteIcon.js';
import CancelIcon from '../../assets/ActionSheetIcons/CancelIcon.js';
import WrongInfo from '../../assets/ActionSheetIcons/WrongInfo.js';
import WrongPhoto from '../../assets/ActionSheetIcons/WrongPhoto.js';
import WrongTag from '../../assets/ActionSheetIcons/WrongTag.js';
import ReportFeedIcon from '../../assets/Icons/reportFeedIcon.js';

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    theme: state.theme
});

const mapDispatchToProps = (dispatch) => ({ restoreSession: () => dispatch(restoreSession()) });

function FeedCard({ userName, userAvatar, adress, time, photo, description, upvotes, tag, color, id, author, solved, ...props }) {

    const { showActionSheetWithOptions } = useActionSheet();

    const { currentUser, restoreSession, theme } = props

    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)
    const [pickerVisibility, setPickerVisibility] = useState(false)
    const [currentUserId, setCurrentUserId] = useState("")

    const togglePicker = () => {
        setPickerVisibility(!pickerVisibility)
    }

    useEffect(() => {
        if (currentUser) {
            const id = currentUser.id
            setCurrentUserId(id)
        }
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme])

    const handleOptionsPress = () => {

        if (currentUserId === author) {
            const options = ['Marchează ca rezolvat', 'Șterge postarea', "Anulează"];
            const destructiveButtonIndex = 1;
            const cancelButtonIndex = 2;
            const title = "Ce acțiune dorești să execuți?"
            const icons = [<SolvedIcon />, <DeleteIcon style={{ marginLeft: 2 }} />, <CancelIcon />]
            const containerStyle = [styles.bottomSheetContainer]
            const textStyle = [{ marginLeft: -15, marginBottom: 2 }]
            const userInterfaceStyle = theme === themeColors.themeLight ? "light" : "dark";

            showActionSheetWithOptions(
                {
                    title,
                    containerStyle,
                    textStyle,
                    options,
                    icons,
                    destructiveButtonIndex,
                    cancelButtonIndex,
                    userInterfaceStyle,
                },
                buttonIndex => {
                    if (buttonIndex === 0) {
                        solvePostConfirm()
                    } else if (buttonIndex === 1) {
                        deletePostConfirm()
                    }
                },
            );
        }
        else {
            const options = ['Informații false', 'Poză necorepunzătoare', 'Categorie greșită', 'Anulează'];
            const cancelButtonIndex = 3;
            const title = "De ce vrei să raportezi această postare?"
            const icons = [<WrongInfo />, <WrongPhoto />, <WrongTag />, <CancelIcon />]
            const containerStyle = [styles.bottomSheetContainer]
            const textStyle = [{ marginLeft: -15, marginBottom: 2 }]
            const userInterfaceStyle = theme === themeColors.themeLight ? "light" : "dark";

            showActionSheetWithOptions(
                {
                    title,
                    containerStyle,
                    textStyle,
                    options,
                    icons,
                    cancelButtonIndex,
                    userInterfaceStyle,
                },
                buttonIndex => {
                    if (buttonIndex === 0) {
                        reportPost("False Information")
                    } else if (buttonIndex === 1) {
                        reportPost("Invalid Photo")
                    } else if (buttonIndex === 2) {
                        reportPost("Wrong Category")
                    }
                },
            );
        }
    }

    const deletePostConfirm = () => {
        const options = ['Da', 'Nu'];
        const destructiveButtonIndex = 0;
        const title = "Ești sigur că dorești să ștergi postarea?"
        const containerStyle = [styles.bottomSheetContainer]
        const icons = [<SolvedIcon fill={"#d32f2f"} />, <CancelIcon />]
        const textStyle = [{ marginLeft: -15, marginBottom: 2 }]

        showActionSheetWithOptions(
            {
                title,
                options,
                destructiveButtonIndex,
                containerStyle,
                icons,
                textStyle,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    deletePost()
                } else if (buttonIndex === 1) {
                    handleOptionsPress()
                }
            },
        );
    }

    const deletePost = () => {
        firebase.firestore().collection('reports').doc(tag).collection('sub_reports').doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    const solvePostConfirm = () => {
        const options = ['Da', 'Nu'];
        const destructiveButtonIndex = 0;
        const title = "Ești sigur că dorești să marchezi această postare ca rezolvată?"
        const containerStyle = [styles.bottomSheetContainer]
        const icons = [<SolvedIcon fill={"#d32f2f"} />, <CancelIcon />]
        const textStyle = [{ marginLeft: -15, marginBottom: 2 }]

        showActionSheetWithOptions(
            {
                title,
                options,
                destructiveButtonIndex,
                containerStyle,
                icons,
                textStyle,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    solvePost()
                } else if (buttonIndex === 1) {
                    handleOptionsPress()
                }
            },
        );
    }

    const solvePost = () => {
        firebase.firestore().collection('reports').doc(tag).collection('sub_reports').doc(id).update({
            solved: true,
        })
            .then(() => {
                console.log("Document successfully updated!");
            }).catch((error) => {
                console.error("Error updateing document: ", error);
            });
    }

    const reportPost = (reason) => {

        const timestamp = firebase.firestore.FieldValue.serverTimestamp();

        firebase.firestore().collection('reportedPosts').add({
            postId: id,
            reason: reason,
            reporterId: currentUserId,
            reportTime: timestamp,
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    const onUpvotePress = async () => {
        const reportRef = firebase.firestore().collection('reports').doc(tag).collection('sub_reports').doc(id);
        const userRef = firebase.firestore().collection('users').doc(currentUser.id);
        if (currentUser.upvotedreports.includes(id)) {
            const unionRepRes = await reportRef.update({
                upvotes: firebase.firestore.FieldValue.arrayRemove(currentUser.id)
            });
            const unionUserRes = await userRef.update({
                upvotedreports: firebase.firestore.FieldValue.arrayRemove(id)
            });
            restoreSession()
        }
        else {
            const unionRepRes = await reportRef.update({
                upvotes: firebase.firestore.FieldValue.arrayUnion(currentUser.id)
            });
            const unionUserRes = await userRef.update({
                upvotedreports: firebase.firestore.FieldValue.arrayUnion(id)
            });
            restoreSession()
        }
    }

    const iconSelector = (tag) => {
        if (tag === 'groapa') return 'exclamation-triangle'
        if (tag === 'graffiti') return 'spray-can'
        if (tag === 'gunoi') return 'trash'
        if (tag === 'iluminat') return 'lightbulb'
        if (tag === 'poluare') return 'smog'
        if (tag === 'parcare') return 'parking'

    }

    const displayIcon = () => {
        if (currentUser) {
            if (currentUser.upvotedreports.includes(id)) {
                return (
                    <Icon name='check-circle' size={25} color={colors.upvotePressed} style={styles.upvoteIcon} solid />
                )
            }
            else {
                return (
                    <Icon name='arrow-alt-circle-up' size={25} color={colors.darkPurple} style={styles.upvoteIcon} />
                )
            }
        }
    }

    const iconSolvedSelector = () => {
        if (solved) {
            return (
                <View style={styles.solvedView}>
                    <Text style={styles.solveText}>Rezolvat</Text>
                </View>
            )
        }
        else {
            if (currentUserId === author) {
                return (
                    <TouchableHighlight
                        underlayColor="#eeeeee"
                        style={styles.actionIcons}
                        onPress={() => handleOptionsPress()}
                    >
                        <Icon name='ellipsis-h' size={20} style={{ color: colors.textColor }} />
                    </TouchableHighlight>
                )
            }
            else return (
                <TouchableHighlight
                    underlayColor="#eeeeee"
                    style={styles.actionIcons}
                    onPress={() => handleOptionsPress()}
                >
                    <ReportFeedIcon fill={colors.textColor} />
                </TouchableHighlight>
            )
        }
    }

    return (
        <View style={[styles.card, solved && styles.solved]}>
            <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                    <Avatar.Image size={50} source={userAvatar} />
                    <View style={styles.cardHeaderText}>
                        <Text style={styles.usernameText}>{userName}</Text>
                        <View style={styles.cardFooterLeft}>
                            <Icon name='map-marker-alt' type="font-awesome-5" size={10} style={{ paddingRight: 7, color: colors.textColor }} />
                            <Text numberOfLines={1} ellipsizeMode={'middle'} style={{ fontSize: 12, color: colors.textColor, width: screenWidth / 10 * 4, }}>{adress}</Text>
                        </View>
                        <View style={styles.cardFooterLeft}>
                            <Icon name='clock' type="font-awesome-5" size={10} style={{ paddingRight: 5, marginLeft: -1, color: colors.textGray }} />
                            <Text style={{ fontSize: 12, color: colors.textGray }}>{time}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.cardHeaderRight}>
                    {iconSolvedSelector()}
                </View>
            </View>

            <View style={styles.cardContent}>
                <TouchableOpacity onPress={() => togglePicker()}>
                    <Image
                        source={photo}
                        style={{ width: 160, height: 160 }}
                    />
                </TouchableOpacity>
                <Text numberOfLines={10} style={styles.cardDescription}>
                    {description}
                </Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.cardFooter}>
                <View style={styles.cardFooterLeft}>
                    <TouchableOpacity onPress={onUpvotePress}>
                        {displayIcon()}
                    </TouchableOpacity>
                    <Text style={styles.normalText}>{upvotes} {upvotes === 1 ? <Text>Aprobare</Text> : <Text>Aprobări</Text>}</Text>
                </View>
                <View style={styles.rightBottomTag}>
                    <TouchableOpacity style={styles.tagButton2} >
                        <Icon
                            type="font-awesome"
                            name={iconSelector(tag)}
                            size={15}
                            style={{ marginRight: 5, paddingTop: 1, color: color }}
                        />
                        <Text style={styles.normalText}>{tag}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={pickerVisibility} animationType={"fade"} transparent={true} onRequestClose={togglePicker}>
                <View style={styles.modalCover}>
                    <View style={styles.modal}>
                        <Image
                            source={photo}
                            style={styles.modalImageStyle}
                        />
                        <TouchableHighlight onPress={togglePicker} style={styles.exitModal}>
                            <View style={styles.modalIconClose}>
                                <Icon name='times' size={25} color={colors.darkPurple} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <StatusBar style="auto" backgroundColor='#0000007F' />
                </View>
            </Modal>
        </View>
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    card: {
        alignSelf: 'center',
        borderRadius: 20,
        margin: 10,
        width: "85%",
        height: 280,
        backgroundColor: colors.feedCards,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70,
        width: '100%',
    },
    cardHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15

    },
    cardHeaderText: {
        width: screenWidth / 10 * 4.6,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 10,
    },
    cardHeaderRight: {
        justifyContent: "center",
        paddingRight: 10
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 165,
    },
    cardDescription: {
        color: colors.textColor,
        textAlign: 'center',
        padding: 5,
        fontSize: 12,
        width: screenWidth > 400 ? screenWidth / 2.7 : screenWidth / 2.8,
    },
    cardFooter: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardFooterLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tagButton2: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.tooltipWhite,
        marginTop: 1,
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        height: 30,
        marginRight: 4,
        marginLeft: 4,
        borderWidth: 1,
        borderColor: colors.darkPurple,
        elevation: 1,
    },
    rightBottomTag: {
        width: 110,
        alignItems: "center"
    },
    modalCover: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: '#0000007F',
    },
    modal: {
        position: 'absolute',
        top: 122,
        width: "85%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center",
        backgroundColor: colors.modalColor,
        elevation: 5
    },
    usernameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textColor
    },
    upvoteIcon: {
        paddingLeft: 15,
        paddingRight: 5
    },
    normalText: {
        color: colors.textColor
    },
    divider: {
        height: 1,
        width: '90%',
        backgroundColor: colors.textGray,
        alignSelf: "center"
    },
    modalImageStyle: {
        width: screenWidth / 10 * 8.5,
        height: screenWidth / 10 * 8.5
    },
    exitModal: {
        position: 'absolute',
        top: '5%',
        right: '5%',
    },
    modalIconClose: {
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.backgroundColor,
        borderRadius: 5,
        elevation: 5
    },
    solved: {
        borderWidth: 3,
        borderColor: "#39AA45",
    },
    actionIcons: {
        width: 40,
        height: '50%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 20
    },
    solvedView: {
        width: 75,
        height: 30,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'green',
    },
    bottomSheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    solveText: {
        color: "#FFF",
        fontSize: 13
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);