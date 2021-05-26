import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';

import { screenHeight, screenWidth, themeColors } from "../helpers/style";


const mapStateToProps = (state) => ({
    user: state.auth.user,
    theme: state.theme
});


function ForgotPasswordScreen({ ...props }) {
    const { navigation, theme } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    const [email, setEmail] = useState('')


    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme])


    return (

        <View style={styles.container}>
            <KeyboardAwareScrollView style={styles.keyboardAware}>

                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
        </View>
    );

}

const styleSheetFactory = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    keyboardAware: {
        width: screenWidth,
        height: screenHeight,
    },
})

export default connect(mapStateToProps)(ForgotPasswordScreen);
