import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message';
import { firebase } from '../config/firebaseConfig'


const screenHeight = Math.round(Dimensions.get('window').height);

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
                    style={styles.ellipse_1}
                />
                <Image
                    source={require("../assets/Ellipse_2.png")}
                    style={styles.ellipse_2}
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
                                color='black'
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
                                color='black'
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
                                color='black'
                                style={{ marginRight: 8, marginLeft: 4 }}
                            />
                        }
                        rightIcon={
                            <Icon
                                name='md-eye'
                                size={30}
                                color='black'
                                onPress={handleEyeOnPress}
                            />
                        }
                    />

                    <TouchableHighlight underlayColor='#593480' onPress={onRegisterPress} style={styles.button}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.buttonText}>Inregistrare</Text>
                            <Icon active name='md-arrow-forward' style={styles.icons2} />
                        </View>
                    </TouchableHighlight>

                    <Text style={styles.outerText}>Daca ai deja cont, <Text onPress={onFooterLinkPress} style={styles.innerText}>autentifica-te</Text> acum.</Text>
                </View>

                <StatusBar style="auto" />
                {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
            </KeyboardAwareScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    ellipse_1: {
        position: "absolute",
        top: "5%",
        right: "0%",
        width: 59,
        height: 124,
    },
    ellipse_2: {
        position: "absolute",
        top: "20%",
        left: "-1%",
        width: 52,
        height: 103,
    },
    icon: {
        width: screenHeight / 4,
        height: screenHeight / 4,
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
    buttonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    button: {
        marginTop: "10%",
        backgroundColor: "#BB6BD9",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: "5%",
        elevation: 10,
    },
    outerText: {
        alignSelf: "center",
        color: "#8F92A1",
        fontSize: 16,
    },
    innerText: {
        color: "#FFC61B",
        textDecorationLine: 'underline'
    },
    icons2: {
        fontSize: 30,
        alignSelf: "flex-end",
        color: "#fff",
        marginLeft: '5%'
    },
    text: {
        fontSize: 20,
        color: "#8F92A1",
        fontWeight: "bold",
    },

})
