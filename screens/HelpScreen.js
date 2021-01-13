import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, TouchableHighlight, } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';


import NavBar from '../helpers/navbar'
import { colors, screenHeight } from "../helpers/style";

export default function HelpScreen() {
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                keyboardShouldPersistTaps="always">

                <Image
                    source={require("../assets/Ellipse_1.png")}
                    style={styles.ellipse1}
                />
                <Image
                    source={require("../assets/Ellipse_2.png")}
                    style={styles.ellipse2}
                />

                <View style={styles.infoTop}>
                    <Text style={styles.textTop}>INFORMAȚII ADMINISTRAȚIE PUBLICĂ TIMIȘOARA</Text>
                    <Text style={{ ...styles.textTop, fontSize: 16, color: colors.black, fontWeight: 'normal' }}>Pentru a contacta prin canale oficiale probleme sesizate, găsiți mai jos datele de contact pentru instituțiile relevante.</Text>
                </View>

                <View style={styles.infoDiv}>
                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>Primăria Timișoara</Text>
                        <Text>Telefon: <Text onPress={() => Linking.openURL(`tel:0256 408 300`)} style={styles.linkText}>0256 408 300</Text></Text>
                        <Text>Email: <Text onPress={() => Linking.openURL(`mailto:primariatm@primariatm.ro`)} style={styles.linkText}>primariatm@primariatm.ro</Text></Text>
                        <Text>Website: <Text onPress={() => Linking.openURL(`https:www.primariatm.ro`)} style={styles.linkText}>www.primariatm.ro</Text></Text>
                    </View>

                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>Poliția Locală Timișoara</Text>
                        <Text>Telefon: <Text onPress={() => Linking.openURL(`tel:0256 246 112`)} style={styles.linkText}>0256 246 112</Text></Text>
                        <Text>Email: <Text onPress={() => Linking.openURL(`mailto:contact@politialoctm.ro`)} style={styles.linkText}>contact@politialoctm.ro</Text></Text>
                        <Text>Website: <Text onPress={() => Linking.openURL(`https:www.polcomtim.ro`)} style={styles.linkText}>www.polcomtim.ro</Text></Text>
                    </View>

                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>Societatea de Transport Public Timișoara</Text>
                        <Text>Telefon: <Text onPress={() => Linking.openURL(`tel:0356 803 700`)} style={styles.linkText}>0356 803 700</Text></Text>
                        <Text>Email: <Text onPress={() => Linking.openURL(`mailto:relatiipublice@stpt.ro`)} style={styles.linkText}>relatiipublice@stpt.ro</Text></Text>
                        <Text>Website: <Text onPress={() => Linking.openURL(`http:www.ratt.ro`)} style={styles.linkText}>www.ratt.ro</Text></Text>
                    </View>

                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>S.C. RETIM Ecologic Service S.A.</Text>
                        <Text>Telefon: <Text onPress={() => Linking.openURL(`tel:0256 499 490`)} style={styles.linkText}>0256 499 490</Text></Text>
                        <Text>Email: <Text onPress={() => Linking.openURL(`mailto:contact@retim.ro`)} style={styles.linkText}>contact@retim.ro</Text></Text>
                        <Text>Website: <Text onPress={() => Linking.openURL(`https:www.retim.ro`)} style={styles.linkText}>www.retim.ro</Text></Text>
                    </View>

                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>Direcția de Sănătate Publică Timiș</Text>
                        <Text>Telefon: <Text onPress={() => Linking.openURL(`tel:0256 494 680`)} style={styles.linkText}>0256 494 680</Text></Text>
                        <Text>Email: <Text onPress={() => Linking.openURL(`mailto:dspj.timis@dsptimis.ro`)} style={styles.linkText}>dspj.timis@dsptimis.ro</Text></Text>
                        <Text>Website: <Text onPress={() => Linking.openURL(`https:www.dsptimis.ro`)} style={styles.linkText}>www.dsptimis.ro</Text></Text>
                    </View>
                </View>

                <View style={styles.tutorialTextDiv}>
                    <Icon name='info-circle' type="font-awesome-5" size={24} style={{ padding: 5 }} />
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        Pentru a afla cum să faci o sesizare din aplicație, apasă pe butonul de mai jos.
                    </Text>
                </View>

                <View style={styles.tutorialButton}>

                    <TouchableHighlight onPress={() => console.log("merge!")} style={styles.touchButton}>

                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.button}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttonText}>Cum raportez o problemă?</Text>
                            </View>
                        </LinearGradient>
                    </TouchableHighlight>

                </View>

            </KeyboardAwareScrollView>

            <NavBar />
            <StatusBar style="auto" />
            <Image
                source={require("../assets/Help.png")}
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
        justifyContent: "center",
    },
    bottomIcon: {
        width: screenHeight / 8.5,
        height: screenHeight / 8.5,
        position: "absolute",
        top: "88%",
    },
    ellipse1: {
        position: "absolute",
        top: "13%",
        right: "0%",
        width: 35,
        height: 75,
    },
    ellipse2: {
        position: "absolute",
        top: "10%",
        left: "-1%",
        width: 41,
        height: 80,
    },
    infoTop: {
        width: '80%',
        height: screenHeight / 4,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 40
    },
    textTop: {
        textAlign: "center",
        fontSize: 18,
        padding: 5,
        paddingTop: 10,
        color: colors.darkPurple,
        fontWeight: "bold",
    },
    infoText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    infoDiv: {
        height: screenHeight / 1.4,
        justifyContent: "space-between",
        width: '81%',
        alignSelf: "center"
    },
    infoTextDiv: {
        paddingBottom: 10
    },
    tutorialTextDiv: {
        flexDirection: "row",
        width: '85%',
        alignSelf: "center",
        height: screenHeight / 11,
        alignItems: "center",
    },
    tutorialButton: {
        height: screenHeight / 9,
    },
    button: {
        marginTop: "5%",
        backgroundColor: colors.purple,
        height: 50,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginBottom: "5%",
        elevation: 5,

    },
    buttonText: {
        fontSize: 16,
        color: colors.white,
        fontWeight: "bold",
    },
    touchButton: {
        marginTop: "3%",
        height: 50,
        width: "85%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "5%",
        borderRadius: 25,
        alignSelf: "center"
    },
    linkText: {
        textDecorationLine: 'underline',
        color: colors.linkBlue
    }
})