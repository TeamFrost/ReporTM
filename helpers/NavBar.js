import React from 'react';
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

import { colors } from "./style";

export default function NavBar() {
    const navigation = useNavigation();

    return (
        <View style={styles.bottomMenu}>
            <TouchableHighlight
                // onPress={() => console.log('PressedMenu!')}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ flex: 1 }}>
                <View style={styles.bottomMenuTouchable}>
                    <Icon
                        name='md-menu'
                        size={30}
                        color={colors.darkPurple}
                        style={{ marginRight: 25 }}
                    />
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => navigation.navigate('Home')}
                style={{ flex: 1 }}>
                <View style={styles.bottomMenuTouchable}>
                    <Icon
                        name='md-home'
                        size={30}
                        color={colors.darkPurple}
                        style={{ marginLeft: 25 }}
                    />
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomMenu: {
        flexDirection: 'row',
        width: '100%',
        height: '8%',
        borderTopColor: colors.darkPurple,
        borderTopWidth: 0.5,
    },
    bottomMenuTouchable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.pressedWhite,
    }

})
