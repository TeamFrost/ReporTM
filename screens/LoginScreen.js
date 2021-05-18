import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import { screenHeight, screenWidth, themeColors } from "../helpers/style";
import Logo from "../assets/Logo";
import Ellipse1 from "../assets/Ellipse1";
import Ellipse2 from "../assets/Ellipse2";
import MailIcon from "../assets/Icons/mailIcon.js";
import LockIcon from "../assets/Icons/lockIcon.js";
import EyeIcon from "../assets/Icons/eyeIcon.js";
import EyeCloseIcon from "../assets/Icons/eyeCloseIcon.js";
import GoogleIcon from "../assets/googleIcon.js";
import { loginUser } from '../redux/actions/auth/auth';


const mapStateToProps = (state) => ({
    doneFetching: state.auth.doneFetching,
    loggedIn: state.auth.loggedIn,
    isFetching: state.auth.isFetching,
    hasError: state.auth.hasError,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
    theme: state.theme
});

const mapDispatchToProps = (dispatch) => ({ loginUser: (email, password) => dispatch(loginUser(email, password)) });

function LoginScreen({ ...props }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [textSecurity, setTextSecurity] = useState(true)
    const { doneFetching, loggedIn, navigation, loginUser, theme } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    useEffect(() => {
        if (loggedIn && doneFetching) {
            navigation.navigate('Drawer')
        }
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [doneFetching, theme]);

    const onLoginPress = () => {
        loginUser(email, password)
        setEmail('')
        setPassword('')
    }

    const onGooglePress = () => {
        console.log("Google")
    }

    const onForgotPress = () => {
        console.log("Forgot")
    }

    const onFooterLinkPress = () => {
        navigation.navigate('Register')
    }

    const handleEyeOnPress = () => {
        setTextSecurity(!textSecurity);
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={styles.keyboardAware}>
                <View style={{ height: screenHeight / 2.2 }}>
                    <Logo width={screenHeight / 4} height={screenHeight / 4} style={styles.icon} />
                    <Text style={styles.titleBaseText}>
                        Repor<Text style={styles.titleInnerText}>TM</Text>
                    </Text>
                    <Ellipse1 width={59} height={124} style={styles.ellipse1} />
                    <Ellipse2 width={52} height={103} style={styles.ellipse2} />
                </View>
                <View style={styles.info}>
                    <Input
                        label='Email'
                        labelStyle={styles.text}
                        color={colors.textColor}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        keyboardType="email-address"
                        placeholder='Email'
                        leftIcon={<MailIcon />}
                    />
                    <Input
                        label='Parola'
                        labelStyle={styles.text}
                        color={colors.textColor}
                        secureTextEntry={textSecurity}
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder='Parola'
                        leftIcon={<LockIcon />}
                        rightIcon={textSecurity ? <EyeIcon onPress={handleEyeOnPress} /> : <EyeCloseIcon onPress={handleEyeOnPress} />}
                    />
                    <Text style={styles.forgotText} onPress={onForgotPress}>Am uitat parola.</Text>

                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.button}>
                        <TouchableOpacity onPress={onLoginPress} style={{ flexDirection: "row" }}>
                            <Text style={styles.buttonText}>Autentificare</Text>
                            <Icon active name='md-arrow-forward' style={styles.arrowIcon} />
                        </TouchableOpacity>
                    </LinearGradient>

                    <Text style={styles.footerOuterText}>Dacă nu ai cont, <Text onPress={onFooterLinkPress} style={styles.footerInnerText}>înregistrează-te</Text> acum.</Text>

                    <TouchableOpacity style={styles.googleButton} onPress={onGooglePress}>
                        <GoogleIcon style={{ marginRight: 10 }} />
                        <Text style={{ ...styles.buttonText, color: colors.darkPurple, fontSize: 18 }}>Autentificare cu Google</Text>
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
        </View >

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
        top: "55%",
        left: "-1%",
    },
    footerInnerText: {
        color: colors.textYellow,
        textDecorationLine: 'underline'
    },
    footerOuterText: {
        alignSelf: "center",
        color: colors.textGray,
        fontSize: 16,
    },
    icon: {
        marginBottom: 10,
        marginTop: '15%',
        alignSelf: "center"
    },
    info: {
        flex: 1,
        height: screenHeight / 1.80,
        width: '85%',
        alignSelf: "center",
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 20,
        color: colors.textGray,
        fontWeight: "bold",
    },
    titleBaseText: {
        color: colors.textColor,
        fontSize: 48,
        fontWeight: "bold",
        alignSelf: "center"
    },
    titleInnerText: {
        fontWeight: "bold",
        color: colors.purple,
    },
    keyboardAware: {
        width: screenWidth,
        height: screenHeight,
    },
    forgotText: {
        height: 50,
        alignItems: 'flex-start',
        color: colors.textGray,
        fontSize: 16,
        textDecorationLine: 'underline',
        paddingLeft: "3%",
        marginTop: '-10%'
    },
    googleButton: {
        flexDirection: "row",
        height: 53,
        alignItems: "center",
        backgroundColor: '#FEFBFF',
        borderColor: colors.purple,
        borderWidth: 1,
        justifyContent: "center",
        borderRadius: 22,
        elevation: 5,
        marginBottom: '5%'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
