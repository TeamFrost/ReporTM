import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';

import { firebase } from '../config/firebaseConfig'
import { screenHeight, screenWidth, themeColors } from "../helpers/style";

import Logo from "../assets/Logo";
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import MailIcon from "../assets/Icons/mailIcon.js";

const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme
});

function ForgotPasswordScreen({ ...props }) {
    const { navigation, theme } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight));
    const [colors, setColors] = useState(themeColors.themeLight);

    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

    const [errorStyle, setErrorStyle] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [checkColor, setCheckColor] = useState(colors.backgroundColor);


    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme])

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onConfirmPress = () => {
        if (isValid) {
            let auth = firebase.auth();
            let emailAddress = email;

            auth.sendPasswordResetEmail(emailAddress)
                .then(
                    () => { navigation.navigate('Login') }
                )
                .catch(function (error) {
                    alert(error.message)
                });
        } else {
            alert('Adaugă o adresă de email validă!')
        }

    }

    const handleOnTextChangeEmail = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === true) {
            setErrorStyle({ color: '#6CAF5F' })
            setErrorMessage('Adresa de email valida!')
            setCheckColor('#6CAF5F')
            setIsValid(true)
        }
        else {
            setErrorStyle({ color: colors.modalCancel })
            setErrorMessage('Adresa de email formatată incorect!')
            setCheckColor(colors.backgroundColor)
            setIsValid(false)
        }
        setEmail(text)
    }

    return (

        <View style={styles.container}>
            <KeyboardAwareScrollView style={styles.keyboardAware}>

                <View style={{ height: screenHeight / 2.4 }}>
                    <Logo width={screenHeight / 3.8} height={screenHeight / 3.8} style={styles.icon} />
                    <Ellipse1 width={59} height={124} style={styles.ellipse1} />
                    <Ellipse2 width={52} height={103} style={styles.ellipse2} />
                </View>

                <View style={styles.info}>

                    <Text style={styles.headerText}>Ți-ai uitat parola?</Text>
                    <Text style={styles.descriptionText}>
                        Completează câmpul de mai jos pentru a primi instrucțiunile de resetare a parolei la adresa de email introdusă.
                        </Text>

                    <Input
                        errorStyle={errorStyle}
                        inputContainerStyle={{ borderBottomColor: errorStyle.color }}
                        errorMessage={errorMessage}
                        color={colors.textColor}
                        label='Email'
                        labelStyle={styles.text}
                        autoCapitalize="none"
                        placeholder='Email'
                        onChangeText={(text) => handleOnTextChangeEmail(text)}
                        value={email}
                        keyboardType="email-address"
                        leftIcon={<MailIcon />}
                        rightIcon={
                            <Icon
                                name='md-checkmark'
                                size={30}
                                color={checkColor}
                            />}
                    />

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.button}>
                        <TouchableOpacity onPress={onConfirmPress} style={styles.touchable}>
                            <Text style={styles.buttonText}>Trimite email</Text>
                            <Icon active name='md-arrow-forward' style={styles.arrowIcon} />
                        </TouchableOpacity>
                    </LinearGradient>

                    <Text style={styles.footerOuterText}>
                        Ți-ai amintit parola? Întroarce-te la <Text onPress={onFooterLinkPress} style={styles.footerInnerText}>autentificare</Text> acum.
                    </Text>

                </View>

                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
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
    keyboardAware: {
        width: screenWidth,
        height: screenHeight,
    },
    ellipse1: {
        position: "absolute",
        top: "80%",
        right: "0%",
    },
    ellipse2: {
        position: "absolute",
        top: "30%",
        left: "-1%",
    },
    icon: {
        marginTop: '25%',
        alignSelf: "center"
    },
    info: {
        height: screenHeight / 1.7,
        alignSelf: "center",
        width: "85%",
        justifyContent: 'space-evenly',
    },
    text: {
        fontSize: 20,
        color: colors.textGray,
        fontWeight: "bold",
    },
    footerInnerText: {
        color: colors.textYellow,
        textDecorationLine: 'underline',
    },
    footerOuterText: {
        textAlign: 'center',
        alignSelf: "center",
        color: colors.textGray,
        fontSize: 18,
        marginTop: '3%'
    },
    button: {
        height: 53,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.purple,
        borderRadius: 22,
        elevation: 5,
    },
    touchable: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
    },
    arrowIcon: {
        fontSize: 30,
        alignSelf: "flex-end",
        color: colors.white,
        marginLeft: '5%'
    },
    headerText: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.textColor,
    },
    descriptionText: {
        fontSize: 16,

    }
})

export default connect(mapStateToProps)(ForgotPasswordScreen);
