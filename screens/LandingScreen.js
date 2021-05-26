import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { connect } from 'react-redux';

import { colors, screenHeight } from "../helpers/style";
import { restoreSession } from '../redux/actions/auth/auth';
import Logo from "../assets/Logo";
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import { changeTheme } from "../redux/actions/colorTheme/colorTheme";
import { getData } from "../helpers/storage"

const mapStateToProps = (state) => ({
    doneFetching: state.auth.doneFetching,
    isFetching: state.auth.isFetching,
    hasError: state.auth.hasError,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
    theme: state.theme
});

const mapDispatchToProps = (dispatch) => ({
    restoreSession: () => dispatch(restoreSession()),
    changeTheme: (theme) => dispatch(changeTheme(theme))
});

function LandingScreen({ ...props }) {

    const { user, doneFetching, navigation, restoreSession, changeTheme } = props;

    useEffect(() => {
        getData('@reportm-theme')
            .then((theme) => {
                if (theme) {
                    changeTheme(theme);
                }
                restoreSession()
            })
            .catch(() => {
                console.log(error)
            });
    }, []);

    useEffect(
        () => {
            if (doneFetching) {
                let timer = setTimeout(() => {
                    if (user != null) {
                        navigation.navigate('Drawer')
                    }
                    else {
                        navigation.navigate('LoginStack')
                    }
                }, 2000);
                return () => {
                    clearTimeout(timer);
                };
            }
        }, [doneFetching]);

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
