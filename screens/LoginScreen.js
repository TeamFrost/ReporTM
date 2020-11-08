import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Container, Content, Item, Input, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
        width: 200,
        height: 200,
        marginBottom: 10,
        marginTop: 70,
    },
    basetext: {
        fontSize: 48,
        fontWeight: "bold",
    },
    innertext: {
        fontWeight: "bold",
        color: "#BB6BD9",
    },
    info: {
        alignSelf: "flex-start",
        marginLeft: "10%",
        flex: 0.95,
        width: "80%",
        marginBottom: "5%",
    },
    text: {
        fontSize: 18,
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
        marginTop: "8%",
        width: "80%",
        backgroundColor: "#BB6BD9",
        height: "6%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginBottom: "5%",
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",

    },
    outerText: {
        color: "#8F92A1",
        fontSize: 16,
    },
    innerText: {
        color: "#FFC61B",
        textDecorationLine: 'underline'
    }

})
export function EmailField() {
    return (
        <Container>
            <Content>
                <Item>
                    <Icon active name='md-person' style={styles.icons} />
                    <Input placeholder='Email' />
                </Item>
            </Content>
        </Container>
    );
}
export function PasswordField() {
    return (
        <Container>
            <Content>
                <Item>
                    <Icon name='md-lock' style={styles.icons} />
                    <Input placeholder='Parola' />
                    <Icon name='md-eye' style={styles.icons} />
                </Item>
            </Content>
        </Container>
    );
}



export default function LoginScreen() {
    return (
        <View style={styles.container}>

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

            <View style={styles.info} marginTop={30}>
                <Text style={styles.text}>
                    Email
                    </Text>
                <EmailField />

                <Text style={styles.text}>
                    Parola
                </Text>
                <PasswordField />
            </View>
            <TouchableHighlight style={styles.button}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.buttonText}>Autentificare</Text>
                    <Icon active name='md-arrow-forward' style={styles.icons2} />
                </View>
            </TouchableHighlight>
            <Text style={styles.outerText}>Daca nu ai cont, <Text style={styles.innerText}>inregistreaza-te</Text> acum.</Text>
            <StatusBar style="auto" />
        </View>

    );
}
