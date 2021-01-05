import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import NavBar from '../helpers/navbar'
import { colors, screenHeight } from "../helpers/style";

export default function SuccessScreen() {

    const onButtonPress = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Text>Success</Text>
            <TouchableHighlight underlayColor='#593480' onPress={onButtonPress} style={styles.button}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.buttonText}>Pagina Principala</Text>
                    <Icon active name='md-arrow-forward' style={styles.arrowIcon} />
                </View>
            </TouchableHighlight>
            <NavBar />
            <StatusBar style="auto" />
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

})