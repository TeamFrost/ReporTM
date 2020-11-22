import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight, Dimensions, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Input, Divider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';

import NavBar from '../helpers/NavBar'
import { firebase } from '../config/firebaseConfig'

export default function ReportScreen() {

    const [pickerState, setPickerState] = useState({ category: '' })

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/Ellipse_1.png")}
                style={styles.ellipse_1}
            />
            <Image
                source={require("../assets/Ellipse_2.png")}
                style={styles.ellipse_2}
            />
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                <View style={styles.form}>
                    <Text style={styles.header}>COMPLETEAZĂ FORMULARUL PENTRU A SEMNALA O PROBLEMĂ</Text>
                    <Text style={styles.section}>Locație</Text>
                    <Divider style={{ backgroundColor: '#8F92A1' }} />
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
                        <Icon style={styles.searchIcon} name="md-locate" size={20} color="#000" />
                        <TextInput
                            style={styles.locationInput}
                            placeholder='Adaugă locația problemei'
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                        />
                    </View>
                    <View style={styles.map}>
                        <Text>Map here :D</Text>
                    </View>
                    <Text style={styles.section}>Alege o categorie</Text>
                    <Divider style={{ backgroundColor: '#8F92A1' }} />
                    <Picker
                        selectedValue={pickerState.category}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            setPickerState({ category: itemValue })
                        }>
                        <Picker.Item label="Gropi" value="gropi" />
                        <Picker.Item label="Graffiti" value="graffiti" />
                        <Picker.Item label="Gunoi" value="gunoi" />
                        <Picker.Item label="Iluminat Stradal" value="iluminat" />
                        <Picker.Item label="Poluare" value="poluare" />
                    </Picker>
                </View>
            </KeyboardAwareScrollView>
            <NavBar />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ellipse_1: {
        position: "absolute",
        top: "7%",
        right: "0%",
        width: 29,
        height: 61,
    },
    ellipse_2: {
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
        color: "#593480",
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '5%'
    },
    help: {
        flexDirection: "row"
    },
    info: {
        marginTop: '1%',
        width: 15,
        height: 15,
    },
    locationInput: {
        height: 40,
        borderColor: '#8F92A1',
        borderWidth: 0.5,
        marginTop: "5%",
        paddingLeft: 5,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    map: {
        marginTop: "5%",
        marginBottom: "5%",
        width: "100%",
        height: "35%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "black",
    },
    picker: {
        width: "100%",
        height: "10%"
    },
    section: {
        fontSize: 16,
        marginBottom: '2%',
    },
    text: {

    },
    textHelp: {
        marginLeft: '1%',
        marginRight: '1%',
        marginTop: '1.5%',
        color: "#ADADAD",
        fontSize: 11
    },


})