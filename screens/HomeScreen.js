import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, StyleSheet, TouchableHighlight, Dimensions } from "react-native";

import NavBar from '../helpers/NavBar'
import { colors, screenHeight } from "../helpers/style";

export default function HomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/Ellipse_1.png")}
                style={styles.ellipse1}
            />
            <Image
                source={require("../assets/Ellipse_2.png")}
                style={styles.ellipse2}
            />
            <View style={styles.textBox}>
                <Text style={styles.titleBaseText}>
                    Repor<Text style={styles.titleInnerText}>TM</Text>
                </Text>
                <Text style={styles.description}>
                    Ajută-ți orașul să devină mai bun prin semnalarea problemelor întâlnite. Cu ajutorul acestei aplicații îți poți face vocea auzită și poți face parte din schimbare!
                </Text>
            </View>

            <View style={styles.paperView}>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Map')}
                    underlayColor={colors.pressedLightPurple}
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Map.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Hartă</Text>
                        <Text style={styles.descriptionPaper}>Vezi harta problemelor din oraș</Text>
                    </View>

                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Report')}
                    underlayColor={colors.pressedLightPurple}
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Report.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Raportează</Text>
                        <Text style={styles.descriptionPaper}>Raportează o problemă întâlnită</Text>
                    </View>
                </TouchableHighlight>

            </View>

            <View style={styles.paperView}>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Feed')}
                    underlayColor={colors.pressedLightPurple}
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Feed.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Sesizări</Text>
                        <Text style={styles.descriptionPaper}>Toate sesizările utilizatorilor</Text>
                    </View>

                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Profile')}
                    underlayColor={colors.pressedLightPurple}
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Profile.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Profilul meu</Text>
                        <Text style={styles.descriptionPaper}>Vezi informațiile despre utilizator</Text>
                    </View>
                </TouchableHighlight>

            </View>
            <View style={styles.paperView}>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Settings')}
                    underlayColor={colors.pressedLightPurple}
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Settings.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Setări</Text>
                        <Text style={styles.descriptionPaper}>Setări aplicație</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Help')}
                    underlayColor={colors.pressedLightPurple}
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Help.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Ajutor</Text>
                        <Text style={styles.descriptionPaper}>Află cum să folosești aplicația</Text>
                    </View>
                </TouchableHighlight>

            </View>
            <NavBar />
            <Image
                source={require("../assets/Home.png")}
                style={styles.bottomIcon}
            />

            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    bottomIcon: {
        width: screenHeight / 8.3,
        height: screenHeight / 8.3,
        position: "absolute",
        top: "88%",
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "space-between",
    },
    ellipse1: {
        position: "absolute",
        top: "7%",
        right: "0%",
        width: 29,
        height: 61,
    },
    ellipse2: {
        position: "absolute",
        top: "10%",
        left: "-1%",
        width: 31,
        height: 61,
    },
    description: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center'
    },
    descriptionPaper: {
        fontSize: 11,
        fontWeight: "400",
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        fontStyle: "italic"
    },
    iconPaper: {
        marginTop: 13,
        width: 50,
        height: 50,
    },
    paper: {
        backgroundColor: colors.lightPurple,
        width: 150,
        height: 130,
        borderRadius: 20,
        flexDirection: "column",
        alignItems: "center",
    },
    paperView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: '100%'
    },
    textBox: {
        alignItems: "center",
        marginTop: "9%",
        margin: "10%",
        marginBottom: "2%"
    },
    titleBaseText: {
        fontSize: 52,
        fontWeight: "bold",
    },
    titleInnerText: {
        fontWeight: "bold",
        color: colors.purple,
    },
    titlePaper: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5
    },
})