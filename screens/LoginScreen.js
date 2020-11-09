import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const screenHeight = Math.round(Dimensions.get('window').height);

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

export default function LoginScreen() {
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
                        placeholder='Email'
                        leftIcon={
                            <Icon
                                name='md-person'
                                size={30}
                                color='black'
                                style={{ marginRight: 5 }}
                            />

                        }
                    />
                    <Input
                        label='Parola'
                        labelStyle={styles.text}
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
                            />
                        }
                    />
                    <TouchableHighlight underlayColor='#593480' onPress={() => console.log("Buton apasat test")} style={styles.button}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.buttonText}>Autentificare</Text>
                            <Icon active name='md-arrow-forward' style={styles.icons2} />
                        </View>
                    </TouchableHighlight>

                    <Text style={styles.outerText}>Daca nu ai cont, <Text onPress={() => console.log("Mergi la register")} style={styles.innerText}>inregistreaza-te</Text> acum.</Text>
                </View>
                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
        </View >

    );
}
