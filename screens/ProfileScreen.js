import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
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

})