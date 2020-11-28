import React, { useState } from "react";
import { firebase } from '../config/firebaseConfig';
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { colors, screenHeight } from "../helpers/style";
import { Avatar, Caption, Drawer } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { StatusBar } from "expo-status-bar";

export default function DrawerContent(props) {

    const [isSwitch, setIsSwitch] = useState(false);
    const toggleSwitch = () => setIsSwitch(previousState => !previousState);

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
                <View style={{ flex: 1, shadowColor: 'transparent' }}>
                    <Drawer.Section >
                        <DrawerItem
                            label="Hartă"
                            style={styles.itemDrawer}
                            labelStyle={styles.itemText}
                            onPress={() => { props.navigation.navigate("Map") }}
                        />
                        <DrawerItem
                            label="Raportează"
                            style={styles.itemDrawer}
                            labelStyle={styles.itemText}
                            onPress={() => { props.navigation.navigate("Report") }}
                        />
                        <DrawerItem
                            label="Sesizări"
                            style={styles.itemDrawer}
                            labelStyle={styles.itemText}
                            onPress={() => { props.navigation.navigate("Feed") }}
                        />
                        <DrawerItem
                            label="Profilul meu"
                            style={styles.itemDrawer}
                            labelStyle={styles.itemText}
                            onPress={() => { props.navigation.navigate("Profile") }}
                        />
                        <DrawerItem
                            label="Setări"
                            style={styles.itemDrawer}
                            labelStyle={styles.itemText}
                            onPress={() => { props.navigation.navigate("Settings") }}
                        />
                        <DrawerItem
                            label="Ajutor"
                            style={styles.itemDrawer}
                            labelStyle={styles.itemText}
                            onPress={() => { props.navigation.navigate("Help") }}
                        />
                    </Drawer.Section>
                </View>
                <View style={styles.switchView}>
                    <Icon
                        name="moon-o"
                        type="font-awesome"
                        size={35}
                        color={colors.darkPurple}
                        style={{ marginRight: 15 }} />
                    <Switch
                        style={{ transform: Platform.OS ? 'andriod'[{ scaleX: 1.3 }, { scaleY: 1.3 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
                        trackColor={{ false: "#767577", true: "#34C759" }}
                        thumbColor={isSwitch ? colors.white : colors.white}
                        ios_backgroundColor="#767577"
                        onValueChange={toggleSwitch}
                        value={isSwitch}
                    />
                </View>
                <Drawer.Section>
                    <View style={styles.bottomItemDrawer}>
                        <DrawerItem
                            label="Deconectare"
                            labelStyle={styles.bottomItemText}
                            icon={() => <Icon
                                name="sign-out"
                                type="font-awesome"
                                size={35}
                                color={colors.darkPurple}
                                style={{ marginLeft: 12 }}
                            />}
                            onPress={
                                () => {
                                    firebase.auth().signOut()
                                        .then(
                                            props.navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'LoginStack' }],
                                            }))
                                        .catch(error => {
                                            alert(error)
                                        });
                                }
                            }

                        />
                    </View>
                </Drawer.Section>
            </DrawerContentScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPurple,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    avatarDiv: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: '80%',
        height: screenHeight / 6.3,
        backgroundColor: colors.purple,
        borderBottomRightRadius: 55,
        marginBottom: '20%',
        marginTop: "-10%",
        paddingTop: "10%"
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
    },
    itemDrawer: {
        borderLeftWidth: 7,
        borderColor: colors.purple,
        marginLeft: 0,
        borderRadius: 0,
        marginBottom: 10,
    },
    itemText: {
        fontSize: screenHeight > 700 ? 18 : 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: "#1B1D28",
        marginLeft: 15
    },
    switchView: {
        flex: 1,
        flexDirection: 'row',
        height: screenHeight / 6,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: 30,
        paddingBottom: 25,

    },
    bottomItemDrawer: {
        flex: 1,
        height: screenHeight / 9.5,
        justifyContent: "flex-end",
        paddingBottom: 20,
        borderTopWidth: 1,
        borderColor: colors.textGray
    },
    bottomItemText: {
        fontSize: screenHeight > 700 ? 18 : 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: "#1B1D28",
        marginLeft: -20
    },

})