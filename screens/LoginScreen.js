import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { firebase } from '../config/firebaseConfig'


const screenHeight = Math.round(Dimensions.get('window').height);

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [textSecurity, setTextSecurity] = useState(true)

    const onFooterLinkPress = () => {
        navigation.navigate('Register')
    }

    const handleEyeOnPress = () => {
        textSecurity ? setTextSecurity(false) : setTextSecurity(true);
    }

    const onLoginPress = () => {
        console.log("Autentificare")
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        console.log("Succes!")
                        // alert("Succes!")
                        // Toast.show({
                        //     type: 'success',
                        //     text1: 'Autentificare facuta cu succes!',
                        // });
                        navigation.navigate('Drawer')
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image source={require("../assets/Icon.png")} style={styles.icon} />
                <Text style={styles.basetext}>
                    Repor<Text style={styles.innertext}>TM</Text>
                </Text>
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
                                color='black'
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
                                color='black'
                                style={{ marginRight: 7 }}
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
                    <TouchableHighlight underlayColor='#593480' onPress={onLoginPress} style={styles.button}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.buttonText}>Autentificare</Text>
                            <Icon active name='md-arrow-forward' style={styles.icons2} />
                        </View>
                    </TouchableHighlight>

                    <Text style={styles.outerText}>Daca nu ai cont, <Text onPress={onFooterLinkPress} style={styles.innerText}>inregistreaza-te</Text> acum.</Text>
                </View>
                {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
        </View >

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
        top: "25%",
        left: "-1%",
        width: 52,
        height: 103,

    },
    icon: {
        width: screenHeight / 3.6,
        height: screenHeight / 3.6,
        marginBottom: 10,
        marginTop: '15%',
        alignSelf: "center"
    },
    basetext: {
        fontSize: 48,
        fontWeight: "bold",
        alignSelf: "center"
    },
    innertext: {
        fontWeight: "bold",
        color: "#BB6BD9",
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
        color: "#8F92A1",
        fontWeight: "bold",
    },
    icons: {
        fontSize: 30,
    },
    icons2: {
        fontSize: 30,
        alignSelf: "flex-end",
        color: "#fff",
        marginLeft: '5%'
    },
    button: {
        marginTop: "10%",
        backgroundColor: "#BB6BD9",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: "3%",
        elevation: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    outerText: {
        alignSelf: "center",
        color: "#8F92A1",
        fontSize: 16,
    },
    innerText: {
        color: "#FFC61B",
        textDecorationLine: 'underline'
    }

})
