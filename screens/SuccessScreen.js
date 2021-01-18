import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';

import { screenHeight, themeColors } from "../helpers/style";
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import Success from "../assets/Success.svg"

const mapStateToProps = (state) => ({ theme: state.theme });

function SuccessScreen({ ...props }) {
    const { navigation, theme } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    const onButtonPress = () => {
        navigation.navigate('Home')
    }
    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme])

    return (
        <View style={styles.container}>
            <View style={styles.textView}>

                <Success width={200} height={200} />
                <Ellipse1 width={59} height={128} style={styles.ellipse1} />
                <Ellipse2 width={47} height={103} style={styles.ellipse2} />

            </View>
            <View style={{ ...styles.textView, height: screenHeight / 3, width: '80%', justifyContent: 'space-around', }}>
                <Text style={styles.text}>Formular trimis!</Text>
                <Text style={{ ...styles.text, fontSize: 14 }}>Sesizarea ta a fost inregistrata cu succes. Intoarce-te la pagina principala.</Text>
                <TouchableHighlight
                    style={styles.confirmButton}
                    onPress={onButtonPress}
                    underlayColor={colors.backgroundColor}
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

const styleSheetFactory = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
    },
    ellipse2: {
        position: "absolute",
        top: "60%",
        left: "-1%",
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
        textAlign: "center",
        color: colors.textColor
    }
})

export default connect(mapStateToProps)(SuccessScreen);