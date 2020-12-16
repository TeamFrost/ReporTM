import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight, Modal, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Location from 'expo-location';
import { LogBox } from 'react-native';

import NavBar from '../helpers/navbar';
import { colors, screenHeight } from "../helpers/style";
import { category } from '../helpers/category';
import { firebase } from '../config/firebaseConfig';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

export default function ReportScreen({ ...props }) {

    const [pickerVisibility, setPickerVisibility] = useState(false)
    const [value, setValueState] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescriptionState] = useState('');
    const [title, setTitle] = useState('Alege o categorie');
    const [imageRef, setImageRef] = useState("");
    const [imageURL, setImageURL] = useState("");

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [coords, setCoords] = useState({
        "latitude": 45.73893889978378,
        "longitude": 21.228619515895844,
    });
    const [adress, setAdress] = useState(null);

    const [image, setImage] = useState(null);

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

            })();
        }
    }, []);

    const getCurrentLocation = async () => {
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
        // console.log(adress)
    }

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (adress) {
        let street = adress.map(res => res.street)
        let number = adress.map(res => res.name)
        text = street + " " + number;
        // console.log(text)
    }

    const togglePicker = () => {
        setPickerVisibility(!pickerVisibility)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("Poza!!")
        console.log(result);

        if (!result.cancelled) {
            let image = result.uri;
            setImage(image);
            uploadImage(image, 'test')
        }
    };

    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`images/reports/${imageName}`);
        setImageRef(ref);
        return ref.put(blob);
    }

    const submitForm = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        imageRef.getDownloadURL().then(function (url) {
            let imageURL = url;
            setImageURL(imageURL)
        }).catch(function (error) {
            alert(error)
        });
        const data = {
            color: color,
            coordinates: coords,
            description: description,
            image: imageURL,
            timestamp: timestamp,
            upvotes: [],
        }
        const reportRef = firebase.firestore().collection('reports').doc(value).collection('sub_reports').doc("test")
        reportRef
            .set(data)
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    source={require("../assets/Ellipse_1.png")}
                    style={styles.ellipse1}
                />
                <Image
                    source={require("../assets/Ellipse_2.png")}
                    style={styles.ellipse2}
                />

                <View style={styles.form}>
                    <Text style={styles.header}>COMPLETEAZĂ FORMULARUL PENTRU A SEMNALA O PROBLEMĂ</Text>
                    <Text style={styles.section}>Locație</Text>
                    <Divider style={{ backgroundColor: colors.textGray }} />
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
                        <Text style={styles.section}>Incarca o fotografie</Text>
                        <Icon style={styles.uploadIcon}
                            name="md-cloud-upload"
                            size={30}
                            color={colors.black}
                            // onPress={() => console.log("Poza pentru incarcat!")}
                            onPress={pickImage}
                        />

                    </View>
                    <Divider style={styles.divider} />
                    <Text style={styles.section}>Descriere</Text>
                    <Divider style={{ backgroundColor: colors.textGray, marginBottom: "4%" }} />
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
                    <TouchableHighlight underlayColor={colors.darkPurple} style={styles.button} onPress={submitForm}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.buttonText}>Trimite</Text>
                        </View>
                    </TouchableHighlight>
                </View>

            </KeyboardAwareScrollView>
            <NavBar />
            <Image
                source={require("../assets/Report.png")}
                style={styles.bottomIcon}
            />
            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    bottomIcon: {
        width: screenHeight / 8.5,
        height: screenHeight / 8.5,
        position: "absolute",
        top: "88%",
    },
    button: {
        marginTop: "5%",
        backgroundColor: colors.purple,
        height: 50,
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
        marginBottom: "7%"
    },
    ellipse1: {
        position: "absolute",
        top: "7%",
        right: "0%",
        width: 29,
        height: 61,
    },
    ellipse2: {
        position: "absolute",
        top: "10%",
        left: "-1%",
        width: 31,
        height: 61,
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
        alignItems: "baseline"
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
        // backgroundColor: "pink",
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
    }


})