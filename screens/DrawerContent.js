import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { colors, screenHeight, screenWidth } from "../helpers/style";
import { Avatar, Caption } from 'react-native-paper';


export default function DrawerContent(props) {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.avatarDiv}>
                    <View style={styles.userInfoIcon}>
                        <Avatar.Image size={50} source={require('../assets/ProfileWhite.png')} />
                    </View>
                    <View style={styles.userInfoView}>
                        <Text style={styles.userInfoText}>Edi One</Text>
                        <Caption style={{ color: colors.white, marginTop: -5 }}>@edyonetiu</Caption>
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple
    },
    avatarDiv: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: screenHeight / 8.3,
        width: '80%',
        backgroundColor: colors.purple,
        borderBottomRightRadius: 55,
    },
    userInfoText: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold'
    },
    userInfoIcon: {
        flex: 0.35,
        alignItems: "center",
    },
    userInfoView: {
        flex: 0.65,
        flexDirection: "column"
    }


})