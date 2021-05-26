import React, { useState, useEffect, createRef } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableOpacity, Switch, Modal, Platform, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import ActionSheet from "react-native-actions-sheet";
import * as ImagePicker from 'expo-image-picker';
import * as Random from 'expo-random';
import moment from 'moment';

import Settings from "../assets/Settings.svg"
import { firebase } from '../config/firebaseConfig'
import { restoreSession } from '../redux/actions/auth/auth';
import { changeTheme } from '../redux/actions/colorTheme/colorTheme'
import { changeLanguage } from '../redux/actions/translations/translations'

import { screenHeight, themeColors } from "../helpers/style";
import NavBar from '../screens/components/NavBar'
import ProfilePlus from '../assets/ProfilePlus.svg'
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import AddPhoto from '../assets/ActionSheetIcons/AddPhoto.js';
import ChoosePhoto from '../assets/ActionSheetIcons/ChoosePhoto.js';

const mapStateToProps = (state) => ({
    user: state.auth.user,
    doneFetching: state.auth.doneFetching,
    theme: state.theme,
    dark: state.theme.dark
});

const mapDispatchToProps = (dispatch) => ({
    restoreSession: () => dispatch(restoreSession()),
    changeTheme: (theme) => dispatch(changeTheme(theme)),
    changeLanguage: (language) => dispatch(changeLanguage(language))
});

function SettingsScreen({ ...props }) {

    const { user, restoreSession, doneFetching, theme, changeTheme, dark, changeLanguage } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    const [image, setImage] = useState(null);
    const [imageRef, setImageRef] = useState("");

    const [newName, setNewName] = useState('')
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [newPassConfirm, setNewPassConfirm] = useState('')

    const [isSwitch, setIsSwitch] = useState(false)
    const [isSwitchDark, setIsSwitchDark] = useState(dark)
    const [value, setValueState] = useState('Română');
    const [pickerVisibility, setPickerVisibility] = useState(false)

    const actionSheetRefPhoto = createRef();

    useEffect(() => {
        if (user) {
            setIsSwitch(user.notifications)
            // setIsSwitchDark(user.darkmode)
        }
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
            setIsSwitchDark(dark)
        }
    }, [user, theme])

    let username = '';

    const changeName = () => {
        if (user) {
            firebase.firestore().collection('users').doc(user.id)
                .update({
                    username: newName
                })
                .then(function () {
                    restoreSession()
                    setNewName('')
                })
        }
    }

    if (doneFetching) {
        if (user) {
            username = user.username
        }
    }

    const changePass = () => {
        const currentUser = firebase.auth().currentUser
        const credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            oldPass
        );

        currentUser.reauthenticateWithCredential(credential).then(function () {
            if (newPass === newPassConfirm) {
                currentUser.updatePassword(newPass).then(function () {
                    alert("Success!")
                    setOldPass('')
                    setNewPass('')
                    setNewPassConfirm('')
                    iconColor = colors.backgroundColor
                }).catch(function (error) {
                    alert(error)
                });
            }
        }).catch(function (error) {
            alert(error)
        });
    }

    let iconColor = colors.backgroundColor

    if (newPass === newPassConfirm && newPass.length != 0) {
        iconColor = 'green'
    }

    const togglePicker = () => {
        setPickerVisibility(!pickerVisibility)
    }

    const takePicture = async () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let image = result.uri;
            setImage(image);
            let imageName = moment(Date.parse(new Date())).format().toString() + '-' + Random.getRandomBytes(1).toString();
            uploadImage(image, imageName)
        }
    }

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            let image = result.uri;
            setImage(image);
            let imageName = moment(Date.parse(new Date())).format().toString() + '-' + Random.getRandomBytes(1).toString();
            uploadImage(image, imageName)
        }
    }

    let profile = ''
    let id = ''
    if (user) {
        profile = user.profile
        id = user.id
    }

    const uploadImage = async (uri, imageName) => {
        let oldRef = ''
        if (profile != 'https://firebasestorage.googleapis.com/v0/b/reportm-40f3e.appspot.com/o/Profile.png?alt=media&token=1a6adc03-d653-4465-bf47-aabff7f14f29') {
            console.log("poza diferita de profile")
            oldRef = firebase.storage().refFromURL(profile)
        }
        console.log(oldRef)
        const response = await fetch(uri);
        const blob = await response.blob();
        let imageURL = '';
        const ref = firebase.storage().ref().child(`images/users/${imageName}`);
        setImageRef(ref)
        ref.put(blob)
            .then(function () {
                ref.getDownloadURL()
                    .then(function (url) {
                        imageURL = url;
                        firebase.firestore().collection('users').doc(id)
                            .update({
                                profile: imageURL,
                                profilelight: imageURL
                            })
                            .then(function () {
                                if (oldRef != '') {
                                    console.log("delete if oldREf===0")
                                    oldRef.delete().then(function () {
                                        restoreSession()
                                        alert("Success!")
                                    }).catch(function (error) {
                                        alert(error)
                                    });
                                }
                                else {
                                    restoreSession()
                                    alert("Success!")
                                }
                            })
                            .catch(function (error) {
                                alert(error)
                            });
                    })
                    .catch(function (error) {
                        alert(error)
                    })
            })
            .catch(function (error) {
                alert(error)
            })
    }

    const toggleSwitch = () => setIsSwitch(previousState => !previousState);

    const toggleSwitchDark = () => {
        if (isSwitchDark === false) {
            changeTheme(themeColors.themeDark)
        }
        else {
            changeTheme(themeColors.themeLight)
        }
    }

    const handleOnRoPress = () => changeLanguage("ro")

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                keyboardShouldPersistTaps="always">

                <View style={styles.avatarView}>
                    <Ellipse1 width={35} height={75} style={styles.ellipse1} />
                    <Ellipse2 width={50} height={100} style={styles.ellipse2} />
                    <ProfilePlus width={150} height={150} />
                    <View style={styles.avatarTextDiv}>
                        <Text
                            style={styles.avatarText}
                            onPress={() => {
                                actionSheetRefPhoto.current.setModalVisible();
                            }}
                        >
                            Încarcă o poză de profil
                            </Text>
                        <Icon name='camera' type="font-awesome-5" size={14} style={styles.cameraIcon} />
                    </View>
                </View>

                <View style={{ ...styles.nameDiv, marginTop: 10 }}>
                    <Text style={styles.nameText}>Schimbă numele</Text>
                    <Text style={styles.defaultText}>Numele tau curent este: {username}</Text>
                    <Input
                        placeholder='Scrie aici noul nume'
                        onChangeText={(text) => setNewName(text)}
                        value={newName}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                    />
                    <TouchableOpacity style={styles.confirmButton} onPress={changeName}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={{ ...styles.confirmButton, width: '100%' }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttonText}>Confirmă schimbarea</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

                <View style={{ ...styles.nameDiv, height: screenHeight / 2.6, marginTop: 10 }}>
                    <Text style={styles.nameText}>Schimbă parola</Text>
                    <Input
                        placeholder='Parola veche'
                        onChangeText={(text) => setOldPass(text)}
                        value={oldPass}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                        containerStyle={styles.inputContainerStyle}
                    />
                    <Input
                        placeholder='Parola nouă'
                        rightIcon={<Icon
                            name='check'
                            size={16}
                            color={iconColor}
                        />}
                        onChangeText={(text) => setNewPass(text)}
                        value={newPass}
                        secureTextEntry={true}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}
                    />
                    <Input
                        placeholder='Confirmă parola nouă'
                        rightIcon={<Icon
                            name='check'
                            size={16}
                            color={iconColor}
                        />}
                        onChangeText={(text) => setNewPassConfirm(text)}
                        value={newPassConfirm}
                        secureTextEntry={true}
                        inputStyle={styles.inputStyle}
                        containerStyle={styles.inputContainerStyle}

                    />
                    <TouchableOpacity style={styles.confirmButton} onPress={changePass}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={{ ...styles.confirmButton, width: '100%' }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttonText}>Confirmă schimbarea</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{ ...styles.nameDiv, justifyContent: 'flex-start', height: screenHeight / 2.8 }}>
                    <Text style={{ ...styles.nameText, marginTop: 20 }}>Notificări</Text>
                    <View style={styles.switchDiv}>
                        <Text style={styles.defaultText}>Vreau să primesc notificări de la aplicație</Text>
                        <Switch
                            style={{ transform: Platform.OS ? 'andriod'[{ scaleX: 1.3 }, { scaleY: 1.3 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
                            trackColor={{ false: "#767577", true: "#34C759" }}
                            thumbColor={isSwitch ? colors.white : colors.white}
                            ios_backgroundColor="#767577"
                            onValueChange={toggleSwitch}
                            value={isSwitch}
                        />
                    </View>

                    <Text style={{ ...styles.nameText, marginTop: 5 }}>Dark mode</Text>
                    <View style={styles.switchDiv}>
                        <Text style={styles.defaultText}>Activează modul întunecat</Text>
                        <Switch
                            style={{ transform: Platform.OS ? 'andriod'[{ scaleX: 1.3 }, { scaleY: 1.3 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
                            trackColor={{ false: "#767577", true: "#34C759" }}
                            thumbColor={isSwitch ? colors.white : colors.white}
                            ios_backgroundColor="#767577"
                            onValueChange={toggleSwitchDark}
                            value={isSwitchDark}
                        />
                    </View>

                    <Text style={{ ...styles.nameText, marginTop: 5 }}>Alege limba</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.categorySection}>{value}</Text>
                        <Icon style={styles.searchIcon}
                            name="sort-down"
                            size={24}
                            color={colors.textColor}
                            onPress={() => togglePicker()}
                        />
                    </View>
                    <Divider style={styles.divider} />
                    <Modal visible={pickerVisibility} animationType={"slide"} transparent={true}>
                        <View style={{
                            alignSelf: "center",
                            margin: 20, padding: 20,
                            backgroundColor: colors.modalColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: "65%",
                            width: "85%",

                        }}>
                            <Text style={{ color: colors.modalTextHelp }}>Alege o limbă</Text>
                            <TouchableHighlight
                                underlayColor={colors.homeCardsColor}
                                // onPress={() => {
                                //     setValueState("Româna");
                                //     changeLanguage("ro")
                                //     togglePicker()
                                // }}
                                onPress={handleOnRoPress}
                                style={{
                                    padding: 6,
                                    width: "85%",
                                    alignItems: "center",
                                    borderRadius: 20,
                                }}
                            >
                                <Text style={{ fontSize: 18, color: colors.textColor }}>Română</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                underlayColor='none'
                                onPress={() =>
                                    togglePicker()
                                }
                                style={{
                                    paddingTop: 4,
                                    paddingBottom: 4
                                }}
                            >
                                <Text style={{ color: colors.modalCancel, fontSize: 18 }}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>

                <ActionSheet ref={actionSheetRefPhoto} containerStyle={styles.bottomSheetContainerStyle}>
                    <View style={{ ...styles.bottomSheetView, height: '48%' }}>
                        <Text style={styles.textBottom}>Alege una dintre optiunile</Text>
                        <View style={styles.bottomSheetRow}>
                            <View style={styles.bottomSheetOrganizer2}>
                                <TouchableOpacity style={{ ...styles.bottomSheetButton2, backgroundColor: "#BB6BD9" }}
                                    onPress={() => {
                                        takePicture();
                                        actionSheetRefPhoto.current.hide();
                                    }}>
                                    <AddPhoto />
                                </TouchableOpacity>
                                <Text style={styles.bottomSheetText}>Deschide camera</Text>
                            </View>
                            <View style={styles.bottomSheetOrganizer2}>
                                <TouchableOpacity style={{ ...styles.bottomSheetButton2, backgroundColor: "#793BB2" }}
                                    onPress={() => {
                                        pickImage();
                                        actionSheetRefPhoto.current.hide();
                                    }}>
                                    <ChoosePhoto />
                                </TouchableOpacity>
                                <Text style={styles.bottomSheetText}>Alege din galerie</Text>
                            </View>
                        </View>
                    </View>
                </ActionSheet>

            </KeyboardAwareScrollView>
            <NavBar />
            <StatusBar style="auto" />
            <Settings width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
        </View>
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomIcon: {
        position: "absolute",
        top: "88%",
    },
    avatarView: {
        flex: 1,
        height: screenHeight / 2.8,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    ellipse1: {
        position: "absolute",
        top: "25%",
        right: "0%",
    },
    ellipse2: {
        position: "absolute",
        top: "58%",
        left: "-1%",
    },
    avatarTextDiv: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    avatarText: {
        textDecorationLine: 'underline',
        color: colors.textGray
    },
    nameDiv: {
        flex: 1,
        height: screenHeight / 4.3,
        alignSelf: 'center',
        width: "85%",
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    nameText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 8,
        color: colors.textColor
    },
    confirmButton: {
        height: 35,
        borderRadius: 18,
        justifyContent: 'center',
        width: '55%',
        alignSelf: "center",
        marginTop: 5
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
    },
    switchDiv: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    categorySection: {
        flex: 8.9,
        fontSize: 16,
        alignSelf: "flex-end",
        marginBottom: '2%',
        marginLeft: 8,
        marginTop: 10,
        color: colors.textColor
    },
    searchIcon: {
        flex: 1.1,
        alignSelf: "center",
        marginLeft: 10,
        paddingBottom: 5
    },
    divider: {
        backgroundColor: colors.textGray,
        marginBottom: "7%",
        width: "95%",
        alignSelf: "center"
    },
    bottomSheetButton2: {
        height: 90,
        width: 90,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
    },
    bottomSheetRow: {
        flexDirection: 'row',
        width: '100%',
        height: 120,
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingTop: 10,
    },
    bottomSheetText: {
        textAlign: 'center',
        paddingTop: 5,
        color: colors.textColor
    },
    bottomSheetOrganizer2: {
        width: 120,
        height: 120,
        alignItems: "center",
        textAlign: 'center',
        marginTop: "5%",
    },
    textBottom: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: "5%",
        color: colors.textColor
    },
    bottomSheetContainerStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.modalColor
    },
    bottomSheetView: {
        height: "60%",
        alignItems: "center",
    },
    cameraIcon: {
        marginLeft: 5,
        marginTop: 2,
        color: colors.textGray
    },
    inputStyle: {
        fontStyle: 'italic',
        color: colors.textColor
    },
    inputContainerStyle: {
        height: 65
    },
    defaultText: {
        marginLeft: 8,
        color: colors.textColor
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);