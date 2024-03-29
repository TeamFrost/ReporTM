import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Caption } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { DrawerActions } from '@react-navigation/native';

import { ro, en } from "../helpers/dictionary";
import { logoutUser } from '../redux/actions/auth/auth';
import { changeTheme } from '../redux/actions/colorTheme/colorTheme'
import { screenHeight, themeColors } from "../helpers/style";

const mapStateToProps = (state) => ({
    doneFetching: state.auth.doneFetching,
    isFetching: state.auth.isFetching,
    hasError: state.auth.hasError,
    errorMessage: state.auth.errorMessage,
    user: state.auth.user,
    theme: state.theme,
    dark: state.theme.dark,
    language: state.translations.language,
});


const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
    changeTheme: (theme) => dispatch(changeTheme(theme))
});

function DrawerContent({ ...props }) {
    const { logoutUser, doneFetching, navigation, user, theme, changeTheme, dark, language } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    const [isSwitch, setIsSwitch] = useState(dark)

    i18n.fallbacks = true
    i18n.translations = { ro, en }
    i18n.locale = language

    let username = ''
    let nickname = ''
    let avatar = 'https://firebasestorage.googleapis.com/v0/b/reportm-40f3e.appspot.com/o/Profile.png?alt=media&token=1a6adc03-d653-4465-bf47-aabff7f14f29'
    if (user) {
        username = user.username
        nickname = '@' + user.email.substring(0, user.email.indexOf('@'))
        avatar = user.profilelight
    }

    useEffect(() => {
        if (doneFetching) {
            if (user === null) {
                navigation.dispatch(DrawerActions.closeDrawer());
                navigation.navigate('LoginStack')
            }
        }
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
            setIsSwitch(dark)
        }
    }, [theme, doneFetching]);

    const toggleSwitch = () => {
        if (isSwitch === false) {
            changeTheme(themeColors.themeDark)
        }
        else {
            changeTheme(themeColors.themeLight)
        }
    }
    const onLogoutPress = () => {
        logoutUser()
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.avatarDiv}>
                    <View style={styles.userInfoIcon}>
                        <Avatar.Image size={55} source={{ uri: avatar }} />
                    </View>
                    <View style={styles.userInfoView}>
                        <Text style={styles.userInfoText}>{username}</Text>
                        <Caption style={{ color: colors.white, marginTop: -5 }}>{nickname}</Caption>
                    </View>
                </View>
                <View style={{ flex: 1, shadowColor: 'transparent' }}>
                    <DrawerItem
                        label={i18n.t('drawerMap')}
                        style={styles.itemDrawer}
                        labelStyle={styles.itemText}
                        onPress={() => { props.navigation.navigate("Map") }}
                    />
                    <DrawerItem
                        label={i18n.t('drawerReport')}
                        style={styles.itemDrawer}
                        labelStyle={styles.itemText}
                        onPress={() => { props.navigation.navigate("Report") }}
                    />
                    <DrawerItem
                        label={i18n.t('drawerFeed')}
                        style={styles.itemDrawer}
                        labelStyle={styles.itemText}
                        onPress={() => { props.navigation.navigate("Feed") }}
                    />
                    <DrawerItem
                        label={i18n.t('drawerProfile')}
                        style={styles.itemDrawer}
                        labelStyle={styles.itemText}
                        onPress={() => { props.navigation.navigate("Profile") }}
                    />
                    <DrawerItem
                        label={i18n.t('drawerSettings')}
                        style={styles.itemDrawer}
                        labelStyle={styles.itemText}
                        onPress={() => { props.navigation.navigate("Settings") }}
                    />
                    <DrawerItem
                        label={i18n.t('drawerHelp')}
                        style={styles.itemDrawer}
                        labelStyle={styles.itemText}
                        onPress={() => { props.navigation.navigate("Help") }}
                    />
                </View>
                <View style={styles.switchView}>
                    <Icon
                        name="moon-o"
                        type="font-awesome"
                        size={35}
                        color={colors.alwaysDarkPurple}
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
                <View style={styles.bottomItemDrawer}>
                    <DrawerItem
                        label={i18n.t('drawerLogout')}
                        labelStyle={styles.bottomItemText}
                        icon={() => <Icon
                            name="sign-out"
                            type="font-awesome"
                            size={35}
                            color={colors.alwaysDarkPurple}
                            style={{ marginLeft: 12 }}
                        />}
                        onPress={onLogoutPress}
                    />
                </View>
            </DrawerContentScrollView>
            <StatusBar style="auto" />
        </View>
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.drawerColor,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    avatarDiv: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: '80%',
        height: screenHeight / 5.8,
        backgroundColor: colors.drawerSectionColor,
        borderBottomRightRadius: 55,
        marginBottom: '20%',
        marginTop: "-20%",
        paddingTop: "15%"
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
        borderColor: colors.drawerSectionColor,
        marginLeft: 0,
        borderRadius: 0,
        marginBottom: 10,
    },
    itemText: {
        fontSize: screenHeight > 700 ? 18 : 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: colors.textColor,
        marginLeft: 15
    },
    switchView: {
        flex: 1,
        flexDirection: 'row',
        height: screenHeight / 6.2,
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: 30,
        paddingBottom: 25,
        marginBottom: screenHeight > 750 ? 20 : -10
    },
    bottomItemDrawer: {
        flex: 1,
        height: screenHeight / 10,
        justifyContent: "flex-end",
        paddingBottom: screenHeight > 700 ? 20 : 10,
        borderTopWidth: 1,
        borderColor: colors.textGray
    },
    bottomItemText: {
        fontSize: screenHeight > 700 ? 18 : 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: colors.textColor,
        marginLeft: -20
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);