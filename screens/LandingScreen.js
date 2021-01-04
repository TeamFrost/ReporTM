import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from 'react-redux';

import { colors, screenHeight } from "../helpers/style";
import { restoreSession } from '../redux/actions/auth/auth';

const mapStateToProps = (state) => ({
    doneFetching: state.auth.doneFetching,
    loggedIn: state.auth.loggedIn,
    isFetching: state.auth.isFetching,
    hasError: state.auth.hasError,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user
});

function LandingScreen({ ...props }) {

    const { dispatch, loggedIn, doneFetching, navigation } = props;

    useEffect(() => {
        dispatch(restoreSession())
    }, []);

    if (doneFetching) {
        setTimeout(() => {
            if (loggedIn) {
                navigation.navigate('Drawer')
            }
            else {
                navigation.navigate('Login')
            }
        }, 2000);
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

export default connect(mapStateToProps)(LandingScreen);
