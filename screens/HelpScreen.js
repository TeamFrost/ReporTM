import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableHighlight, } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import { ro, en } from "../helpers/dictionary";
import { screenHeight, themeColors } from "../helpers/style";
import NavBar from '../screens/components/NavBar'
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import Help from "../assets/Help.svg"

const mapStateToProps = (state) => ({ theme: state.theme, language: state.translations.language, });

function HelpScreen({ ...props }) {

    const { navigation, theme, language } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme])

    i18n.fallbacks = true
    i18n.translations = { ro, en }
    i18n.locale = language

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                keyboardShouldPersistTaps="always">

                <Ellipse1 width={35} height={75} style={styles.ellipse1} />
                <Ellipse2 width={41} height={80} style={styles.ellipse2} />

                <View style={styles.infoTop}>
                    <Text style={styles.textTop}>{i18n.t("helpTitle")}</Text>
                    <Text style={{ ...styles.textTop, fontSize: 16, color: colors.textColor, fontWeight: 'normal' }}>{i18n.t("helpDesc")}</Text>
                </View>

                <View style={styles.infoDiv}>
                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>{i18n.t("help1")}</Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpPhone")} <Text onPress={() => Linking.openURL(`tel:0256 408 300`)} style={styles.linkText}>0256 408 300</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpMail")} <Text onPress={() => Linking.openURL(`mailto:primariatm@primariatm.ro`)} style={styles.linkText}>primariatm@primariatm.ro</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpWeb")} <Text onPress={() => Linking.openURL(`https:www.primariatm.ro`)} style={styles.linkText}>www.primariatm.ro</Text></Text>
                    </View>

                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>{i18n.t("help2")}</Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpPhone")} <Text onPress={() => Linking.openURL(`tel:0256 246 112`)} style={styles.linkText}>0256 246 112</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpMail")} <Text onPress={() => Linking.openURL(`mailto:contact@politialoctm.ro`)} style={styles.linkText}>contact@politialoctm.ro</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpWeb")} <Text onPress={() => Linking.openURL(`https:www.polcomtim.ro`)} style={styles.linkText}>www.polcomtim.ro</Text></Text>
                    </View>

                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>{i18n.t("help3")}</Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpPhone")} <Text onPress={() => Linking.openURL(`tel:0356 803 700`)} style={styles.linkText}>0356 803 700</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpMail")} <Text onPress={() => Linking.openURL(`mailto:relatiipublice@stpt.ro`)} style={styles.linkText}>relatiipublice@stpt.ro</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpWeb")} <Text onPress={() => Linking.openURL(`http:www.ratt.ro`)} style={styles.linkText}>www.ratt.ro</Text></Text>
                    </View>

                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>{i18n.t("help4")}</Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpPhone")} <Text onPress={() => Linking.openURL(`tel:0256 499 490`)} style={styles.linkText}>0256 499 490</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpMail")} <Text onPress={() => Linking.openURL(`mailto:contact@retim.ro`)} style={styles.linkText}>contact@retim.ro</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpWeb")} <Text onPress={() => Linking.openURL(`https:www.retim.ro`)} style={styles.linkText}>www.retim.ro</Text></Text>
                    </View>

                    <View style={styles.infoTextDiv}>
                        <Text style={styles.infoText}>{i18n.t("help5")}</Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpPhone")} <Text onPress={() => Linking.openURL(`tel:0256 494 680`)} style={styles.linkText}>0256 494 680</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpMail")} <Text onPress={() => Linking.openURL(`mailto:dspj.timis@dsptimis.ro`)} style={styles.linkText}>dspj.timis@dsptimis.ro</Text></Text>
                        <Text style={styles.linkInfo}>{i18n.t("helpWeb")} <Text onPress={() => Linking.openURL(`https:www.dsptimis.ro`)} style={styles.linkText}>www.dsptimis.ro</Text></Text>
                    </View>
                </View>

                <View style={styles.tutorialTextDiv}>
                    <Icon name='info-circle' type="font-awesome-5" size={24} style={{ padding: 5, color: colors.textColor }} />
                    <Text style={{ fontWeight: "bold", fontSize: 15, color: colors.textColor }}>
                        {i18n.t("helpInfo")}
                    </Text>
                </View>

                <View style={styles.tutorialButton}>

                    <TouchableHighlight onPress={() => navigation.navigate('Intro')} style={styles.touchButton}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.button}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttonText}> {i18n.t("helpButton")}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableHighlight>

                </View>

            </KeyboardAwareScrollView>

            <NavBar />
            <StatusBar style="auto" />
            <Help width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
        </View>
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomIcon: {
        position: "absolute",
        top: "88%",
    },
    ellipse1: {
        position: "absolute",
        top: "13%",
        right: "0%",
    },
    ellipse2: {
        position: "absolute",
        top: "10%",
        left: "-1%",
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
        marginBottom: 10,
        color: colors.textColor
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
    },
    linkInfo: {
        color: colors.textColor
    }
})


export default connect(mapStateToProps)(HelpScreen);