import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';


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

})

export default function RegisterScreen() {
    return (
        <View style={styles.container}>
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
                    label='Email'
                    labelStyle={styles.text}
                    placeholder='Email'
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
                            color='black'
                        />
                    }
                />
                <Input
                    label='Nume de Utilizator'
                    labelStyle={styles.text}
                    placeholder='Nume de utilizator'
                    leftIcon={
                        <Icon
                            name='md-person'
                            size={30}
                            color='black'
                            style={{ marginRight: 7, marginLeft: 3 }}
                        />
                    }
                    rightIcon={
                        <Icon
                            name='md-checkmark'
                            size={30}
                            color='black'
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
                            style={{ marginRight: 8, marginLeft: 4 }}
                        />
                    }
                    rightIcon={
                        <Icon
                            name='md-checkmark'
                            size={30}
                            color='black'
                        />
                    }
                />

                <TouchableHighlight underlayColor='#593480' onPress={() => console.log("Buton apasat test")} style={styles.button}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.buttonText}>Inregistrare</Text>
                        <Icon active name='md-arrow-forward' style={styles.icons2} />
                    </View>
                </TouchableHighlight>

                <Text style={styles.outerText}>Daca ai deja cont, <Text onPress={() => console.log("Mergi la login")} style={styles.innerText}>autentifica-te</Text> acum.</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );

}