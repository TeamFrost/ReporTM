import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import { ro, en } from "../helpers/dictionary";
import { screenHeight, screenWidth, themeColors } from "../helpers/style";
import Logo from "../assets/Logo";
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import MailIcon from "../assets/Icons/mailIcon.js";
import UserIcon from "../assets/Icons/userIcon.js";
import LockIcon from "../assets/Icons/lockIcon.js";
import InfoIcon from "../assets/Icons/infoIcon.js";
import EyeIcon from "../assets/Icons/eyeIcon.js";
import EyeCloseIcon from "../assets/Icons/eyeCloseIcon.js";
import { signupUser } from '../redux/actions/auth/auth';

const mapStateToProps = (state) => ({
    doneFetching: state.auth.doneFetching,
    isFetching: state.auth.isFetching,
    hasError: state.auth.hasError,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
    theme: state.theme,
    language: state.translations.language,
});

const mapDispatchToProps = (dispatch) => ({ signupUser: (email, password, username) => dispatch(signupUser(email, password, username)) });

function RegisterScreen({ ...props }) {
    const { navigation, signupUser, theme, doneFetching, user, language } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isValid, setIsValid] = useState(false);

    const [errorStyle, setErrorStyle] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [checkColor, setCheckColor] = useState(colors.backgroundColor)

    const [textSecurity, setTextSecurity] = useState(true)

    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
            setCheckColor(colors.backgroundColor)
        }
        if (doneFetching) {
            if (user != null) {
                navigation.navigate('Drawer', {
                    screen: 'HomeStack',
                    initial: false,
                    params: {
                        screen: 'Home',
                        params: { showIntro: true },
                    }
                })
            }
        }
    }, [doneFetching])

    i18n.fallbacks = true
    i18n.translations = { ro, en }
    i18n.locale = language

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const handleOnTextChangeEmail = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === true) {
            setErrorStyle({ color: '#6CAF5F' })
            setErrorMessage(i18n.t('registerMailAlert'))
            setCheckColor('#6CAF5F')
            setIsValid(true)
        }
        else {
            setErrorStyle({ color: colors.modalCancel })
            setErrorMessage(i18n.t('registerMailAlert'))
            setCheckColor(colors.backgroundColor)
            setIsValid(false)
        }
        setEmail(text)
    }

    const handleEyeOnPress = () => {
        setTextSecurity(!textSecurity);
    }

    const onRegisterPress = () => {
        if (isValid) {
            signupUser(email, password, username)
            setEmail('')
            setUsername('')
            setPassword('')
        }
        else {
            Alert.alert(i18n.t("registerAlert1"), i18n.t("registerAlert2"))
        }
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
                    <Input
                        errorStyle={errorStyle}
                        inputContainerStyle={{ borderBottomColor: errorStyle.color }}
                        errorMessage={errorMessage}
                        color={colors.textColor}
                        label={i18n.t("loginEmail")}
                        labelStyle={styles.text}
                        autoCapitalize="none"
                        placeholder={i18n.t("loginEmail")}
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
                    <Input
                        label={i18n.t("registerUser")}
                        labelStyle={styles.text}
                        color={colors.textColor}
                        autoCapitalize="none"
                        placeholder={i18n.t("registerUser")}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        leftIcon={<UserIcon />}
                    />
                    <Input
                        label={i18n.t("loginPass")}
                        labelStyle={styles.text}
                        color={colors.textColor}
                        autoCapitalize="none"
                        secureTextEntry={textSecurity}
                        placeholder={i18n.t("loginPass")}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        leftIcon={<LockIcon />}
                        rightIcon={textSecurity ? <EyeIcon onPress={handleEyeOnPress} /> : <EyeCloseIcon onPress={handleEyeOnPress} />}
                    />
                    <View style={styles.textInfo}>
                        <InfoIcon marginTop={1} />
                        <Text style={{ color: colors.textGray }}> {i18n.t("registerInfo")}</Text>
                    </View>

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.button}>
                        <TouchableOpacity onPress={onRegisterPress} style={styles.touchable}>
                            <Text style={styles.buttonText}>{i18n.t("registerButton")}</Text>
                            <Icon active name='md-arrow-forward' style={styles.arrowIcon} />
                        </TouchableOpacity>
                    </LinearGradient>

                    <Text style={styles.footerOuterText}>{i18n.t("registerRedirect")}<Text onPress={onFooterLinkPress} style={styles.footerInnerText}>{i18n.t("registerRedirect2")}</Text>{i18n.t("registerRedirect3")}</Text>

                </View>

                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
        </View>
    );

}

const styleSheetFactory = (colors) => StyleSheet.create({
    arrowIcon: {
        fontSize: 30,
        alignSelf: "flex-end",
        color: colors.white,
        marginLeft: '5%'
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
    buttonText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "flex-start",
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
    footerInnerText: {
        color: colors.textYellow,
        textDecorationLine: 'underline',
    },
    footerOuterText: {
        alignSelf: "center",
        color: colors.textGray,
        fontSize: 16,
        marginTop: '3%'
    },
    icon: {
        marginBottom: 10,
        marginTop: '20%',
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
    keyboardAware: {
        width: screenWidth,
        height: screenHeight,
    },
    touchable: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    textInfo: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: "row",
        marginTop: '-4%',
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
