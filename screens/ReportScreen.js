import React, { useState, useEffect, useRef, createRef } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Platform, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as Random from 'expo-random';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import ActionSheet from "react-native-actions-sheet";
import moment from 'moment';
import i18n from 'i18n-js';

import { firebase } from '../config/firebaseConfig';
import { category } from '../helpers/category';
import { ro, en } from "../helpers/dictionary";

import { screenHeight, mapStyle, themeColors } from "../helpers/style";
import NavBar from './components/NavBar';
import Report from "../assets/Report.svg"
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import AddPhoto from '../assets/ActionSheetIcons/AddPhoto.js';
import ChoosePhoto from '../assets/ActionSheetIcons/ChoosePhoto.js';

const mapStateToProps = (state) => ({
    currentUser: state.auth.user,
    theme: state.theme,
    language: state.translations.language,
});

function ReportScreen({ ...props }) {

    const { currentUser, navigation, theme, language } = props;
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    const [value, setValueState] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescriptionState] = useState('');
    const [title, setTitle] = useState(i18n.t("reportCategory"));

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coords, setCoords] = useState({
        "latitude": 45.751291,
        "longitude": 21.224554,
    });
    const [adress, setAdress] = useState(null);

    const [image, setImage] = useState(null);
    const [imageRef, setImageRef] = useState("");

    const [text, setText] = useState('')

    const [dividerColor, setDividerColor] = useState(colors.textGray)
    const [dividerHeight, setDividerHeight] = useState(1)
    const [iconColor, setIconColor] = useState(colors.backgroundColor)

    const mapRef = useRef();
    const actionSheetRef = createRef();
    const actionSheetRefPhoto = createRef();

    const firstHalf = category.slice(0, 3);
    const secondHalf = category.slice(3, 6);

    i18n.fallbacks = true
    i18n.translations = { ro, en }
    i18n.locale = language

    useEffect(() => {
        if (props.route.params) {
            let coords = props.route.params.coords;
            setCoords(props.route.params.coords);
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                }
                let adress = await Location.reverseGeocodeAsync(coords);
                setAdress(adress);
                if (errorMsg) {
                    let text = errorMsg
                    setText(text)
                }
                else {
                    if (adress) {
                        if (Platform.OS === 'ios') {
                            let name = adress.map(res => res.name)
                            let text = name
                            setText(text)
                        }
                        else {
                            let street = adress.map(res => res.street)
                            let number = adress.map(res => res.name)
                            let text = street + " " + number
                            setText(text)
                        }
                    }
                }
            })();
        }
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme]);

    const changeRegion = ({ latitude, longitude }) => {
        mapRef.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
        }, 1000)
    }


    const getCurrentLocation = async () => {
        setText('Waiting...')

        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };

        LogBox.ignoreLogs(['Failed prop type']);

        setCoords(coords);

        let adress = await Location.reverseGeocodeAsync(coords);
        setAdress(adress);

        if (errorMsg) {
            let text = errorMsg
            setText(text)
        }
        else {
            if (adress) {
                if (Platform.OS === 'ios') {
                    let name = adress.map(res => res.name)
                    let text = name
                    setText(text)
                }
                else {
                    let street = adress.map(res => res.street)
                    let number = adress.map(res => res.name)
                    let text = street + " " + number
                    setText(text)
                }
            }
        }

        changeRegion(coords);
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
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setDividerColor('green')
            setDividerHeight(2)
            setIconColor('green')
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
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setDividerColor('#6CAF5F')
            setDividerHeight(2)
            setIconColor('#6CAF5F')
            let image = result.uri;
            setImage(image);
            let imageName = moment(Date.parse(new Date())).format().toString() + '-' + Random.getRandomBytes(1).toString();
            uploadImage(image, imageName)
        }
    }

    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`images/reports/${imageName}`);
        setImageRef(ref);
        return ref.put(blob);
    }

    let imageURL = '';
    let check = true;

    const submitForm = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        if ((text === '') || (coords === '') || (imageRef === '') || (value === '') || (description === "")) {
            check = false
            alert(i18n.t("submitFormAlert"))
        }
        if (check === true) {
            imageRef.getDownloadURL()
                .then(function (url) {
                    imageURL = url;
                    const data = {
                        adress: text,
                        author: currentUser.id,
                        color: color,
                        coordinates: coords,
                        description: description,
                        image: imageURL,
                        solved: false,
                        timestamp: timestamp,
                        upvotes: [],
                    }
                    const reportRef = firebase.firestore().collection('reports').doc(value).collection('sub_reports');
                    reportRef.add(data)
                        .then(
                            navigation.navigate('Success')
                        )
                        .catch(function (error) {
                            alert(error)
                        });
                })
                .catch(function (error) {
                    alert(error)
                });
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                keyboardShouldPersistTaps="always">
                <Ellipse1 width={29} height={61} style={styles.ellipse1} />
                <Ellipse2 width={31} height={61} style={styles.ellipse2} />

                <View style={styles.form}>
                    <Text style={styles.header}>{i18n.t('reportHeader')}</Text>
                    <Text style={styles.section}>{i18n.t('reportLocation')}</Text>
                    <Divider style={{ ...styles.divider, marginBottom: '1%' }} />
                    <Text style={styles.textHelp}>{i18n.t('reportCurrentLocation')}</Text>
                    <View style={styles.location}>
                        <TextInput
                            editable={false}
                            style={styles.locationInput}
                            placeholder={i18n.t('reportLocationPlaceholder')}
                            placeholderTextColor={colors.textColor}
                        >
                            {text}
                        </TextInput>
                        <Icon style={styles.searchIcon}
                            name="md-locate"
                            size={35}
                            color={colors.textColor}
                            onPress={() => getCurrentLocation()}
                        />
                    </View>
                    <View style={styles.map}>
                        <MapView
                            ref={mapRef}
                            provider="google"
                            customMapStyle={(colors.textColor === colors.white) ? mapStyle : []}
                            style={{ height: 150, width: "100%" }}
                            zoomEnabled={false}
                            scrollEnabled={false}
                            initialRegion={{
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                                latitudeDelta: 0.0025,
                                longitudeDelta: 0.0025,
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: coords.latitude,
                                    longitude: coords.longitude
                                }}
                            />
                        </MapView>
                    </View>
                    <View style={styles.category}>
                        <Text style={styles.categorySection}>{title}</Text>

                        <Icon style={styles.searchIcon}
                            name="md-arrow-dropdown"
                            size={35}
                            color={colors.textColor}
                            onPress={() => {
                                actionSheetRef.current.setModalVisible();
                            }}
                        />
                    </View>
                    <Divider style={styles.divider} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.section}>{i18n.t("reportUpload")}</Text>
                        <Icon style={styles.uploadIcon}
                            name="md-checkmark"
                            size={30}
                            color={iconColor}
                        />
                        <Icon style={styles.uploadIcon}
                            name="md-cloud-upload"
                            size={30}
                            color={colors.textColor}
                            onPress={() => {
                                actionSheetRefPhoto.current.setModalVisible();
                            }}
                        />

                    </View>
                    <Divider style={{ backgroundColor: dividerColor, marginBottom: "7%", height: dividerHeight }} />
                    <Text style={styles.section}>{i18n.t("reportDescription")}</Text>
                    <Divider style={{ ...styles.divider, marginBottom: "4%" }} />
                    <View>
                        <TextInput
                            style={styles.descriptionInput}
                            multiline
                            numberOfLines={6}
                            maxLength={240}
                            placeholder={i18n.t("reportDescriptionPlaceholder")}
                            placeholderTextColor={colors.textColor}
                            onChangeText={text => setDescriptionState(text)}
                            value={description}
                        />
                    </View>
                    <TouchableHighlight onPress={submitForm} style={styles.touchButton}>

                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.button}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttonText}>{i18n.t("reportSend")}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableHighlight>

                </View>

                <ActionSheet ref={actionSheetRef} containerStyle={styles.bottomSheetContainerStyle}>
                    <View style={styles.bottomSheetView}>
                        <Text style={styles.textBottom}>{i18n.t("reportCategory")}</Text>
                        <View style={styles.bottomSheetRow}>
                            {firstHalf.map((value) => (
                                <View style={styles.bottomSheetOrganizer} key={value.key}>
                                    <TouchableOpacity
                                        style={{ ...styles.bottomSheetButton, backgroundColor: value.color }}
                                        onPress={() => {
                                            setValueState(value.value);
                                            setTitle(value.title);
                                            setColor(value.color);
                                            actionSheetRef.current.hide();
                                        }}>
                                        <Icon5
                                            type="font-awesome"
                                            name={value.icon}
                                            size={30}
                                            style={{ color: "#FFFFFF" }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.bottomSheetText}>{value.title}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.bottomSheetRow}>
                            {secondHalf.map((value) => (
                                <View style={styles.bottomSheetOrganizer} key={value.key}>
                                    <TouchableOpacity
                                        style={{ ...styles.bottomSheetButton, backgroundColor: value.color }}
                                        onPress={() => {
                                            setValueState(value.value);
                                            setTitle(value.title);
                                            setColor(value.color);
                                            actionSheetRef.current.hide();
                                        }}>
                                        <Icon5
                                            type="font-awesome"
                                            name={value.icon}
                                            size={30}
                                            style={{ color: "#FFFFFF" }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.bottomSheetText}>{value.title}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ActionSheet>

                <ActionSheet ref={actionSheetRefPhoto} containerStyle={styles.bottomSheetContainerStyle}>
                    <View style={{ ...styles.bottomSheetView, height: '48%' }}>
                        <Text style={styles.textBottom}>{i18n.t("actionReportTitle")}</Text>
                        <View style={styles.bottomSheetRow}>
                            <View style={styles.bottomSheetOrganizer2}>
                                <TouchableOpacity style={{ ...styles.bottomSheetButton2, backgroundColor: "#BB6BD9" }}
                                    onPress={() => {
                                        takePicture();
                                        actionSheetRefPhoto.current.hide();
                                    }}>
                                    <AddPhoto />
                                </TouchableOpacity>
                                <Text style={styles.bottomSheetText}>{i18n.t("actionCamera")}</Text>
                            </View>
                            <View style={styles.bottomSheetOrganizer2}>
                                <TouchableOpacity style={{ ...styles.bottomSheetButton2, backgroundColor: "#793BB2" }}
                                    onPress={() => {
                                        pickImage();
                                        actionSheetRefPhoto.current.hide();
                                    }}>
                                    <ChoosePhoto />
                                </TouchableOpacity>
                                <Text style={styles.bottomSheetText}>{i18n.t("actionGallery")}</Text>
                            </View>
                        </View>
                    </View>
                </ActionSheet>

            </KeyboardAwareScrollView>
            <NavBar />
            <Report width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
            <StatusBar style="auto" />
        </View >
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    bottomIcon: {
        position: "absolute",
        top: "88%",
    },
    button: {
        marginTop: "5%",
        height: 50,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: "5%",
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
    },
    category: {
        flexDirection: 'row',
    },
    categorySection: {
        color: colors.textColor,
        flex: 8.9,
        fontSize: 18,
        alignSelf: "flex-end",
        marginBottom: '2%'
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "space-between",
    },
    descriptionInput: {
        backgroundColor: colors.input,
        height: 100,
        borderColor: colors.textGray,
        borderWidth: 0.5,
        padding: 10,
        elevation: 1,
        textAlignVertical: 'top'
    },
    divider: {
        backgroundColor: colors.textGray,
        marginBottom: "7%",
        height: 1
    },
    ellipse1: {
        position: "absolute",
        top: "7%",
        right: "0%",
    },
    ellipse2: {
        position: "absolute",
        top: "10%",
        left: "-1%",
    },
    form: {
        alignSelf: "flex-start",
        marginLeft: "10%",
        marginTop: '15%',
        width: "80%",
        marginBottom: "5%",
    },
    header: {
        fontSize: 18,
        color: colors.darkPurple,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '5%'
    },
    location: {
        flexDirection: 'row',
    },
    locationInput: {
        backgroundColor: colors.input,
        color: colors.textColor,
        flex: 8.9,
        height: 40,
        borderColor: colors.textGray,
        borderWidth: 0.5,
        marginTop: "5%",
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 1,
    },
    map: {
        marginTop: "5%",
        marginBottom: "2%",
        width: "100%",
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: colors.textColor,
    },
    picker: {
        flex: 1,
        width: '100%',
        height: 50,
    },
    searchIcon: {
        flex: 1.1,
        marginTop: "5%",
        alignSelf: "center",
        marginLeft: 10,
    },
    section: {
        color: colors.textColor,
        flex: 1,
        fontSize: 18,
        marginBottom: '2%',
    },
    text: {

    },
    textHelp: {
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '1.5%',
        color: colors.textColor,
        fontSize: 11
    },
    uploadIcon: {
        flex: 0.15
    },
    touchButton: {
        marginTop: "5%",
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%",
        borderRadius: 20,
    },
    bottomSheetButton: {
        height: 70,
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35,
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
        color: colors.textColor,
        width: "120%",
    },
    bottomSheetOrganizer: {
        width: 80,
        height: 100,
        alignItems: "center",
        textAlign: 'center',
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
    }
})

export default connect(mapStateToProps)(ReportScreen);