import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight, Modal, TextInput, Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Location from 'expo-location';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as Random from 'expo-random';
import moment from 'moment';
import { useActionSheet } from '@expo/react-native-action-sheet'
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';

import { firebase } from '../config/firebaseConfig';
import { category } from '../helpers/category';

import { colors, screenHeight } from "../helpers/style";
import NavBar from '../helpers/navbar';
import Report from "../assets/Report.svg"
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"

const mapStateToProps = (state) => ({ currentUser: state.auth.user });

function ReportScreen({ ...props }) {

    const { showActionSheetWithOptions } = useActionSheet();

    const { currentUser, navigation } = props;

    const [pickerVisibility, setPickerVisibility] = useState(false)
    const [value, setValueState] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescriptionState] = useState('');
    const [title, setTitle] = useState('Alege o categorie');

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coords, setCoords] = useState({
        "latitude": 45.73893889978378,
        "longitude": 21.221619515895844,
    });
    const [adress, setAdress] = useState(null);

    const [image, setImage] = useState(null);
    const [imageRef, setImageRef] = useState("");

    const [text, setText] = useState('')

    const [dividerColor, setDividerColor] = useState(colors.textGray)
    const [dividerHeight, setDividerHeight] = useState(1)
    const [iconColor, setIconColor] = useState(colors.white)

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
    }, []);


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
    }

    const togglePicker = () => {
        setPickerVisibility(!pickerVisibility)
    }

    const chooseImage = () => {

        const options = ['Take Photo...', 'Choose from gallery...', 'Cancel'];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    takePicture()
                } else if (buttonIndex === 1) {
                    pickImage()
                } else if (buttonIndex === 2) {
                    //cancel
                }
            },
        );
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
        // console.log("Camera")
        // console.log(result);

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

        // (async () => {
        //     if (Platform.OS !== 'web') {
        //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        //         if (status !== 'granted') {
        //             alert('Sorry, we need camera roll permissions to make this work!');
        //         }
        //     }
        // })();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        // console.log("Library")
        // console.log(result);

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
            alert("Toate câmpurile trebuie completate!")
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
                    <Text style={styles.header}>COMPLETEAZĂ FORMULARUL PENTRU A SEMNALA O PROBLEMĂ</Text>
                    <Text style={styles.section}>Locație</Text>
                    <Divider style={{ ...styles.divider, marginBottom: '1%' }} />
                    <View style={styles.help}>
                        <Image
                            source={require("../assets/Info.png")}
                            style={styles.info}
                        />
                        <Text style={styles.textHelp}>Apasă pe butonul</Text>
                        <Image
                            source={require("../assets/Location.png")}
                            style={styles.info}
                        />
                        <Text style={styles.textHelp}>pentru a afla locația curentă.</Text>
                    </View>
                    <View style={styles.location}>
                        <TextInput
                            style={styles.locationInput}
                            placeholder="Adaugă locația problemei"
                        >
                            {text}
                        </TextInput>
                        <Icon style={styles.searchIcon}
                            name="md-locate"
                            size={35}
                            color={colors.black}
                            onPress={() => getCurrentLocation()}
                        />
                    </View>
                    <View style={styles.map}>
                        <MapView
                            provider="google"
                            style={{ height: 150, width: "100%" }}
                            // zoomEnabled={false}
                            // scrollEnabled={false}
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
                            color={colors.black}
                            onPress={() => togglePicker()}
                        />
                    </View>
                    <Divider style={styles.divider} />
                    <Modal visible={pickerVisibility} animationType={"slide"} transparent={true}>
                        <View style={{
                            alignSelf: "center",
                            margin: 20, padding: 20,
                            backgroundColor: "#fcfcfc",
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: "48%",
                            width: "80%",

                        }}>
                            <Text style={{ color: colors.textHelpGray }}>Selectează o categorie</Text>
                            {category.map((value, index) => {
                                return <TouchableHighlight
                                    key={index}
                                    underlayColor={colors.lightPurple}
                                    onPress={() => {
                                        setValueState(value.value);
                                        setTitle(value.title);
                                        setColor(value.color);
                                        togglePicker()
                                    }}
                                    style={{
                                        padding: 6,
                                        width: "80%",
                                        alignItems: "center",
                                        borderRadius: 20,
                                    }}
                                >
                                    <Text style={{ fontSize: 18, }}>{value.title}</Text>
                                </TouchableHighlight>
                            })}
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
                                <Text style={{ color: colors.red, fontSize: 18 }}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.section}>Incarcă o fotografie</Text>
                        <Icon style={styles.uploadIcon}
                            name="md-checkmark"
                            size={30}
                            color={iconColor}
                        />
                        <Icon style={styles.uploadIcon}
                            name="md-cloud-upload"
                            size={30}
                            color={colors.black}
                            onPress={chooseImage}
                        />

                    </View>
                    <Divider style={{ backgroundColor: dividerColor, marginBottom: "7%", height: dividerHeight }} />
                    <Text style={styles.section}>Descriere</Text>
                    <Divider style={{ ...styles.divider, marginBottom: "4%" }} />
                    <View>
                        <TextInput
                            style={styles.descriptionInput}
                            multiline
                            numberOfLines={6}
                            maxLength={240}
                            placeholder='Adauga o descriere'
                            onChangeText={text => setDescriptionState(text)}
                            value={description}
                        />
                    </View>
                    <TouchableHighlight onPress={submitForm} style={styles.touchButton}>

                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.button}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttonText}>Trimite</Text>
                            </View>
                        </LinearGradient>
                    </TouchableHighlight>

                </View>

            </KeyboardAwareScrollView>
            <NavBar />
            <Report width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    bottomIcon: {
        position: "absolute",
        top: "88%",
    },
    button: {
        marginTop: "5%",
        backgroundColor: colors.purple,
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
        flex: 8.9,
        fontSize: 18,
        alignSelf: "flex-end",
        marginBottom: '2%'
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "space-between",
    },
    descriptionInput: {
        height: 100,
        borderColor: 'gray',
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
    help: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    info: {
        marginTop: '1%',
        width: 15,
        height: 15,
    },
    location: {
        flexDirection: 'row',
    },
    locationInput: {
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
        borderColor: colors.black,
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
        color: colors.textHelpGray,
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
    }
})

export default connect(mapStateToProps)(ReportScreen);