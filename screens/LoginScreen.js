import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import { colors, screenHeight } from "../helpers/style";
import { loginUser } from '../redux/actions/auth/auth';

const mapStateToProps = (state) => ({
    doneFetching: state.auth.doneFetching,
    loggedIn: state.auth.loggedIn,
    isFetching: state.auth.isFetching,
    hasError: state.auth.hasError,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({ loginUser: (email, password) => dispatch(loginUser(email, password)) });

function LoginScreen({ ...props }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [textSecurity, setTextSecurity] = useState(true)
    const { doneFetching, loggedIn, navigation, loginUser } = props

    useEffect(() => {
        if (loggedIn) {
            console.log('\x1b[33m%s\x1b[0m: ', "LoggedIn & navigate to drawer")
            navigation.navigate('Drawer')
        }
    }, [doneFetching]);

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
                <Image source={require("../assets/Icon.png")} style={styles.icon} />
                <Text style={styles.titleBaseText}>
                    Repor<Text style={styles.titleInnerText}>TM</Text>
                </Text>
                <Image
                    source={require("../assets/Ellipse_1.png")}
                    style={styles.ellipse1}
                />
                <Image
                    source={require("../assets/Ellipse_2.png")}
                    style={styles.ellipse2}
                />
                <View style={styles.info}>
                    <Input
                        label='Email'
                        labelStyle={styles.text}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        keyboardType="email-address"
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='md-mail'
                                size={30}
                                color={colors.black}
                                style={{ marginRight: 5 }}
                            />
                        }
                    />
                    <Input
                        label='Parola'
                        labelStyle={styles.text}
                        secureTextEntry={textSecurity}
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholder='Password'
                        leftIcon={
                            <Icon
                                name='md-lock'
                                size={30}
                                color={colors.black}
                                style={{ marginRight: 7 }}
                            />
                        }
                        rightIcon={
                            <Icon
                                name='md-eye'
                                size={30}
                                color={colors.black}
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

const styles = StyleSheet.create({
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
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    ellipse1: {
        position: "absolute",
        top: "5%",
        right: "0%",
        width: 59,
        height: 124,
    },
    ellipse2: {
        position: "absolute",
        top: "25%",
        left: "-1%",
        width: 52,
        height: 103,
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
        width: screenHeight / 3.6,
        height: screenHeight / 3.6,
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
