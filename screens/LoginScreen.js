import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import { screenHeight, themeColors } from "../helpers/style";
import Logo from "../assets/Logo";
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
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

    const onFooterLinkPress = () => {
        navigation.navigate('Register')
    }

    const handleEyeOnPress = () => {
        textSecurity ? setTextSecurity(false) : setTextSecurity(true);
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Logo width={screenHeight / 4.2} height={screenHeight / 4.2} style={styles.icon} />
                <Text style={styles.titleBaseText}>
                    Repor<Text style={styles.titleInnerText}>TM</Text>
                </Text>
                <Ellipse1 width={59} height={124} style={styles.ellipse1} />
                <Ellipse2 width={52} height={103} style={styles.ellipse2} />
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
                        leftIcon={
                            <Icon
                                name='md-mail'
                                size={30}
                                color={colors.textColor}
                                style={{ marginRight: 5 }}
                            />
                        }
                    />
                    <Input
                        label='Parola'
                        labelStyle={styles.text}
                        color={colors.textColor}
                        secureTextEntry={textSecurity}
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='md-lock'
                                size={30}
                                color={colors.textColor}
                                style={{ marginRight: 7 }}
                            />
                        }
                        rightIcon={
                            <Icon
                                name='md-eye'
                                size={30}
                                color={colors.textColor}
                                onPress={handleEyeOnPress}
                            />
                        }
                    />
                    <TouchableHighlight underlayColor='#593480' onPress={onLoginPress} style={styles.button}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.buttonText}>Autentificare</Text>
                            <Icon active name='md-arrow-forward' style={styles.arrowIcon} />
                        </View>
                    </TouchableHighlight>

                    <Text style={styles.footerOuterText}>Daca nu ai cont, <Text onPress={onFooterLinkPress} style={styles.footerInnerText}>inregistreaza-te</Text> acum.</Text>
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
        marginTop: "10%",
        backgroundColor: colors.purple,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: "3%",
        elevation: 10,
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
        top: "5%",
        right: "0%",
    },
    ellipse2: {
        position: "absolute",
        top: "25%",
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
        alignSelf: "flex-start",
        marginLeft: "10%",
        marginTop: '10%',
        width: "80%",
        flex: 1,
        marginBottom: "5%",
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
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
