import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableHighlight, BackHandler } from "react-native";
import { connect } from 'react-redux';

import { screenHeight, themeColors } from "../helpers/style";
import { watchReportsData } from '../redux/actions/reports/reports';
import NavBar from '../screens/components/NavBar'
import Home from "../assets/Home";
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import Map from '../assets/Map.svg'
import Report from '../assets/Report.svg'
import Feed from '../assets/Feed.svg'
import Profile from '../assets/Profile.svg'
import Settings from '../assets/Settings.svg'
import Help from '../assets/Help.svg'

const mapStateToProps = (state) => ({
    reportsData: state.reports.reportsData,
    theme: state.theme
});

const mapDispatchToProps = (dispatch) => ({ watchReportsData: () => dispatch(watchReportsData()) });

function HomeScreen({ ...props }) {

    const { watchReportsData, navigation, theme } = props;
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    console.log(props.route)

    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }

        watchReportsData()

        if (props.route.params) {
            let showIntro = props.route.params.showIntro;
            if (showIntro) {
                navigation.navigate("Intro");
            }
        }
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => true)
    }, [theme, props.route.params])

    return (
        <View style={styles.container}>
            <Ellipse1 width={29} height={61} style={styles.ellipse1} />
            <Ellipse2 width={31} height={61} style={styles.ellipse2} />
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
                    underlayColor={colors.pressedHomeCardsColor}
                    style={styles.card}
                >
                    <View style={styles.paper}>
                        <Map width={50} height={50} style={styles.iconPaper} />
                        <Text style={styles.titlePaper}>Hartă</Text>
                        <Text style={styles.descriptionPaper}>Vezi harta problemelor din oraș</Text>
                    </View>

                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Report')}
                    underlayColor={colors.pressedHomeCardsColor}
                    style={styles.card}
                >
                    <View style={styles.paper}>
                        <Report width={50} height={50} style={styles.iconPaper} />
                        <Text style={styles.titlePaper}>Raportează</Text>
                        <Text style={styles.descriptionPaper}>Raportează o problemă întâlnită</Text>
                    </View>
                </TouchableHighlight>

            </View>

            <View style={styles.paperView}>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Feed')}
                    underlayColor={colors.pressedHomeCardsColor}
                    style={styles.card}
                >
                    <View style={styles.paper}>
                        <Feed width={50} height={50} style={styles.iconPaper} />
                        <Text style={styles.titlePaper}>Sesizări</Text>
                        <Text style={styles.descriptionPaper}>Toate sesizările utilizatorilor</Text>
                    </View>

                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Profile')}
                    underlayColor={colors.pressedHomeCardsColor}
                    style={styles.card}
                >
                    <View style={styles.paper}>
                        <Profile width={50} height={50} style={styles.iconPaper} />
                        <Text style={styles.titlePaper}>Profilul meu</Text>
                        <Text style={styles.descriptionPaper}>Vezi informațiile despre utilizator</Text>
                    </View>
                </TouchableHighlight>

            </View>
            <View style={styles.paperView}>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Settings')}
                    underlayColor={colors.pressedHomeCardsColor}
                    style={styles.card}
                >
                    <View style={styles.paper}>
                        <Settings width={50} height={50} style={styles.iconPaper} />
                        <Text style={styles.titlePaper}>Setări</Text>
                        <Text style={styles.descriptionPaper}>Setări aplicație</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Help')}
                    underlayColor={colors.pressedHomeCardsColor}
                    style={styles.card}
                >
                    <View style={styles.paper}>
                        <Help width={50} height={50} style={styles.iconPaper} />
                        <Text style={styles.titlePaper}>Ajutor</Text>
                        <Text style={styles.descriptionPaper}>Află cum să folosești aplicația</Text>
                    </View>
                </TouchableHighlight>

            </View>
            <NavBar />
            <Home width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
            <StatusBar style="auto" />
        </View >
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    bottomIcon: {
        position: "absolute",
        top: "88%",
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "space-between",
    },
    ellipse1: {
        position: "absolute",
        top: "7%",
        right: "0%",
    },
    ellipse2: {
        position: "absolute",
        top: "10%",
        left: "-1%",
    },
    description: {
        color: colors.textColor,
        marginTop: 10,
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center'
    },
    descriptionPaper: {
        color: colors.textColor,
        fontSize: 11,
        fontWeight: "400",
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        fontStyle: "italic"
    },
    iconPaper: {
        marginTop: 13,
    },
    paper: {
        backgroundColor: colors.homeCardsColor,
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
        marginTop: "15%",
        margin: "10%",
        marginBottom: "2%"
    },
    titleBaseText: {
        color: colors.textColor,
        fontSize: 52,
        fontWeight: "bold",
    },
    titleInnerText: {
        fontWeight: "bold",
        color: colors.purple,
    },
    titlePaper: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5
    },
    card: {
        borderRadius: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);