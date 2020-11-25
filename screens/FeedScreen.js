import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";

import NavBar from '../helpers/navbar'
import { colors, screenHeight } from "../helpers/style";

export default function FeedScreen() {
    return (
        <View style={styles.container}>
            <Text>Feed</Text>
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