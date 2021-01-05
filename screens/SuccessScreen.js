import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import NavBar from '../helpers/navbar'
import { colors, screenHeight } from "../helpers/style";

export default function SuccessScreen({ ...props }) {

    const onButtonPress = () => {
        props.navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Image
                    source={require("../assets/Success.png")}
                    style={styles.icon}
                />
                <Image
                    source={require("../assets/Ellipse_1_s.png")}
                    style={styles.ellipse1}
                />
                <Image
                    source={require("../assets/Ellipse_2_s.png")}
                    style={styles.ellipse2}
                />
            </View>
            <View style={{ ...styles.textView, height: screenHeight / 3, width: '80%', justifyContent: 'space-around', }}>
                <Text style={styles.text}>Formular trimis!</Text>
                <Text style={{ ...styles.text, fontSize: 14 }}>Sesizarea ta a fost inregistrata cu succes. Intoarce-te la pagina principala.</Text>
                <TouchableHighlight
                    style={styles.confirmButton}
                    onPress={onButtonPress}
                    underlayColor='#E9DBF8'
                >
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={{ ...styles.confirmButton, width: '100%' }}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.buttonText}>Pagina principală</Text>
                        </View>
                    </LinearGradient>
                </TouchableHighlight>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    confirmButton: {
        height: 45,
        borderRadius: 18,
        justifyContent: 'center',
        width: '100%',
        alignSelf: "center",
        marginTop: 5,
        elevation: 5,

    },
    buttonText: {
        fontSize: 18,
        color: colors.white,
        fontWeight: "bold",
    },
    ellipse1: {
        position: "absolute",
        top: "20%",
        right: "0%",
        width: 59,
        height: 124,
    },
    ellipse2: {
        position: "absolute",
        top: "60%",
        left: "-1%",
        width: 47,
        height: 103,
    },
    textView: {
        height: screenHeight / 1.75,
        width: '100%',
        alignItems: "center",
        justifyContent: 'center',
    },
    text: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    }


})