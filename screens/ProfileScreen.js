import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import NavBar from '../helpers/navbar'
import { colors, screenHeight } from "../helpers/style";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={styles.avatarView}>
                    <Image
                        source={require("../assets/Ellipse_1.png")}
                        style={styles.ellipse1}
                    />
                    <Image
                        source={require("../assets/Ellipse_2.png")}
                        style={styles.ellipse2}
                    />
                    <Avatar.Image style={{ marginTop: 30 }} size={150} source={require("../assets/avatarPhoto.jpg")} />
                    <Text style={{ fontSize: 28, fontWeight: "bold" }}>Eduard One</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{ fontSize: 14, textDecorationLine: 'underline', color: colors.textGray }}
                            onPress={() => console.log('Editam')}
                        >Editează-ți profilul</Text>
                        <Icon name='sliders-h' type="font-awesome-5" size={12} style={{ marginLeft: 5, color: colors.textGray }} />
                    </View>
                </View>

            </KeyboardAwareScrollView>
            <NavBar />
            <StatusBar style="auto" />
            <Image
                source={require("../assets/Profile.png")}
                style={styles.bottomIcon}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "space-between",
    },
    bottomIcon: {
        width: screenHeight / 8.5,
        height: screenHeight / 8.5,
        position: "absolute",
        top: "88%",
    },
    ellipse1: {
        position: "absolute",
        top: "35%",
        right: "0%",
        width: 35,
        height: 75,
    },
    ellipse2: {
        position: "absolute",
        top: "50%",
        left: "-1%",
        width: 50,
        height: 100,
    },
    avatarView: {
        flex: 1,
        height: screenHeight / 2.8,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",

    }
})