import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

import { firebase } from '../config/firebaseConfig'
import { colors, screenHeight } from "../helpers/style";

export default function LandingScreen({ navigation }) {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                    })
                    .catch((error) => {
                        setLoading(false)

                    });
                setTimeout(() => {
                    navigation.navigate('Drawer')
                }, 3000);
                clearTimeout();
            } else {
                setLoading(false)
                setTimeout(() => {
                    navigation.navigate('LoginStack')
                }, 3000);
                clearTimeout();
            }
        });
    }, []);

    if (loading) {
        return (
            <>
            </>
        )
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/Icon.png")}
                style={styles.icon}
            />
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
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    ellipse1: {
        position: "absolute",
        top: "20%",
        right: "0%",
        width: 59,
        height: 124,
    },
    ellipse2: {
        position: "absolute",
        top: "75%",
        left: "-1%",
        width: 52,
        height: 103,
    },
    icon: {
        width: screenHeight / 3,
        height: screenHeight / 3,
        marginBottom: "6%",
    },
    titleBaseText: {
        fontSize: 52,
        fontWeight: "bold",
    },
    titleInnerText: {
        fontWeight: "bold",
        color: colors.purple,
    },
});
