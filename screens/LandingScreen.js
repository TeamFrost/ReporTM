import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { connect } from 'react-redux';

import { colors, screenHeight } from "../helpers/style";
import { restoreSession } from '../redux/actions/auth/auth';
import Logo from "../assets/Logo";
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"

const mapStateToProps = (state) => ({
    doneFetching: state.auth.doneFetching,
    loggedIn: state.auth.loggedIn,
    isFetching: state.auth.isFetching,
    signUp: state.auth.signUp,
    loggedOut: state.auth.loggedOut,
    hasError: state.auth.hasError,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({ restoreSession: () => dispatch(restoreSession()) });

function LandingScreen({ ...props }) {

    const { loggedIn, doneFetching, navigation, restoreSession } = props;

    useEffect(() => {
        restoreSession()
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
            <Logo width={screenHeight / 3} height={screenHeight / 3} style={styles.icon} />
            <Text style={styles.titleBaseText}>
                Repor<Text style={styles.titleInnerText}>TM</Text>
            </Text>
            <Ellipse1 width={59} height={124} style={styles.ellipse1} />
            <Ellipse2 width={52} height={103} style={styles.ellipse2} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
    ellipse1: {
        position: "absolute",
        top: "20%",
        right: "0%",
    },
    ellipse2: {
        position: "absolute",
        top: "75%",
        left: "-1%",
    },
    icon: {
        marginBottom: "6%",
    },
    titleBaseText: {
        fontSize: 52,
        fontWeight: "bold",
        color: colors.textColor
    },
    titleInnerText: {
        fontWeight: "bold",
        color: colors.purple,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
