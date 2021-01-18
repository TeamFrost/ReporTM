import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableHighlight } from "react-native";
// import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { themeColors } from "../../helpers/style";

const mapStateToProps = (state) => ({ theme: state.theme });

function NavBar({ ...props }) {

    const navigation = useNavigation();

    const { theme } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme])

    return (
        <View style={styles.bottomMenu}>
            <TouchableHighlight
                // onPress={() => console.log('PressedMenu!')}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={{ flex: 1 }}>
                <View style={styles.bottomMenuTouchable}>
                    <Icon
                        name='bars'
                        type="font-awesome"
                        size={30}

                        color={colors.navIconColor}
                        style={{ marginRight: 25 }}
                    />
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => navigation.navigate('Home')}
                style={{ flex: 1 }}>
                <View style={styles.bottomMenuTouchable}>
                    <Icon
                        name='home'
                        type="font-awesome"
                        size={32}
                        color={colors.navIconColor}
                        style={{ marginLeft: 25 }}
                    />
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    bottomMenu: {
        flexDirection: 'row',
        width: '100%',
        height: '8%',
        borderTopColor: colors.navStroke,
        borderTopWidth: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    },
    bottomMenuTouchable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.navColor,
    }

})

export default connect(mapStateToProps)(NavBar);