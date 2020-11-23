import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message';

import { firebase } from '../config/firebaseConfig'
import { colors, screenHeight } from "../helpers/style";

export default function RegisterScreen({ navigation }) {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errorStyle, setErrorStyle] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const [checkColor, setCheckColor] = useState('white')

    const [textSecurity, setTextSecurity] = useState(true)

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const handleOnTextChangeEmail = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === true) {
            setErrorStyle({ color: 'green' })
            setErrorMessage('Adresa de email valida!')
            setCheckColor('green')
        }
        else {
            setErrorStyle({ color: 'red' })
            setErrorMessage('Adresa de email invalida!')
            setCheckColor('white')
        }
        setEmail(text)
    }

    const handleEyeOnPress = () => {
        setTextSecurity(false);
    }

    const onRegisterPress = () => {
        console.log("Inregistrare")
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    username,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        alert("Cont creat!")
                        navigation.navigate('LoginStack')
                        // Toast.show({
                        //     type: 'success',
                        //     text1: 'Cont creat cu succes!',
                        // });
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                // console.log(error)
                alert(error)
            });
    }

    return (

        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                <Image
                    source={require("../assets/Icon.png")}
                    style={styles.icon}
                />
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
                        errorStyle={errorStyle}
                        errorMessage={errorMessage}
                        label='Email'
                        labelStyle={styles.text}
                        autoCapitalize="none"
                        placeholder='Email'
                        onChangeText={(text) => handleOnTextChangeEmail(text)}
                        value={email}
                        keyboardType="email-address"
                        leftIcon={
                            <Icon
                                name='md-mail'
                                size={30}
                                color={colors.black}
                                style={{ marginRight: 5 }}
                            />
                        }
                        rightIcon={
                            <Icon
                                name='md-checkmark'
                                size={30}
                                color={checkColor}
                            />}
                    />
                    <Input
                        label='Nume de utilizator'
                        labelStyle={styles.text}
                        autoCapitalize="none"
                        placeholder='Nume de utilizator'
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        leftIcon={
                            <Icon
                                name='md-person'
                                size={30}
                                color={colors.black}
                                style={{ marginRight: 7, marginLeft: 3 }}
                            />
                        }
                    />
                    <Input
                        label='Parola'
                        labelStyle={styles.text}
                        autoCapitalize="none"
                        secureTextEntry={textSecurity}
                        placeholder='Parola'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        leftIcon={
                            <Icon
                                name='md-lock'
                                size={30}
                                color={colors.black}
                                style={{ marginRight: 8, marginLeft: 4 }}
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

                    <TouchableHighlight underlayColor='#593480' onPress={onRegisterPress} style={styles.button}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.buttonText}>Inregistrare</Text>
                            <Icon active name='md-arrow-forward' style={styles.arrowIcon} />
                        </View>
                    </TouchableHighlight>

                    <Text style={styles.footerOuterText}>Daca ai deja cont, <Text onPress={onFooterLinkPress} style={styles.footerInnerText}>autentifica-te</Text> acum.</Text>
                </View>

                <StatusBar style="auto" />
                {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
            </KeyboardAwareScrollView>
        </View>
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
        marginTop: "7%",
        backgroundColor: colors.purple,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: "5%",
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
        top: "20%",
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
        width: screenHeight / 4.2,
        height: screenHeight / 4.2,
        marginBottom: 10,
        marginTop: '15%',
        alignSelf: "center"
    },
    info: {
        alignSelf: "flex-start",
        marginLeft: "10%",
        marginTop: '10%',
        width: "80%",
        marginBottom: "5%",
    },
    text: {
        fontSize: 20,
        color: colors.textGray,
        fontWeight: "bold",
    },
})
