import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

const screenHeight = Math.round(Dimensions.get('window').height);

export default function LandingScreen({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 3000);
    });
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/Icon.png")}
                style={styles.icon}
            />
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
    ellipse_1: {
        position: "absolute",
        top: "20%",
        right: "0%",
        width: 59,
        height: 124,
    },
    ellipse_2: {
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
    basetext: {
        fontSize: 52,
        fontWeight: "bold",
    },
    innertext: {
        fontWeight: "bold",
        color: "#BB6BD9",
    },
});
