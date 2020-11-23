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

const screenHeight = Math.round(Dimensions.get('window').height);
export default function ReportScreen() {

    const [pickerState, setPickerState] = useState({ category: '' })
    const [value, setValueState] = React.useState('');

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    source={require("../assets/Ellipse_1.png")}
                    style={styles.ellipse_1}
                />
                <Image
                    source={require("../assets/Ellipse_2.png")}
                    style={styles.ellipse_2}
                />

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
                        <TextInput
                            style={styles.locationInput}
                            placeholder='Adaugă locația problemei'
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                        />

                        <Icon style={styles.searchIcon}
                            name="md-locate"
                            size={35}
                            color="#000"
                            onPress={() => console.log("Locatie curenta!")}
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
                        mode="dropdown"
                        onValueChange={(itemValue) =>
                            setPickerState({ category: itemValue })
                        }>
                        <Picker.Item label="Gropi" value="gropi" />
                        <Picker.Item label="Graffiti" value="graffiti" />
                        <Picker.Item label="Gunoi" value="gunoi" />
                        <Picker.Item label="Iluminat Stradal" value="iluminat" />
                        <Picker.Item label="Poluare" value="poluare" />
                    </Picker>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.section}>Incarca o fotografie</Text>
                        <Icon style={styles.uploadIcon}
                            name="md-cloud-upload"
                            size={30}
                            color="#000"
                            onPress={() => console.log("Poza pentru incarcat!")}
                        />
                    </View>
                    <Divider style={{ backgroundColor: '#8F92A1', marginBottom: "6%" }} />
                    <Text style={styles.section}>Descriere</Text>
                    <Divider style={{ backgroundColor: '#8F92A1', marginBottom: "4%" }} />
                    <View>
                        <TextInput
                            style={styles.descriptionInput}
                            multiline
                            numberOfLines={6}
                            maxLength={280}
                            placeholder='Adauga o descriere'
                            onChangeText={text => setValueState(text)}
                            value={value}
                        />
                    </View>
                    <TouchableHighlight underlayColor='#593480' style={styles.button}>
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
        width: screenHeight / 8.3,
        height: screenHeight / 8.3,
        position: "absolute",
        top: "88%",
    },
    button: {
        marginTop: "5%",
        backgroundColor: "#BB6BD9",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: "5%",
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        borderColor: '#8F92A1',
        borderWidth: 0.5,
        marginTop: "5%",
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 1,
    },
    map: {
        marginTop: "5%",
        marginBottom: "5%",
        width: "100%",
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.5,
        borderColor: "black",
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
        color: "#ADADAD",
        fontSize: 11
    },
    uploadIcon: {
        flex: 0.15
    }


})