import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { DrawerActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { themeColors } from "../../helpers/style";

import HomeIcon from '../../assets/NavbarIcons/homeIcon';
import DrawerIcon from '../../assets/NavbarIcons/drawerIcon';

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
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                style={styles.bottomMenuTouchable}
                underlayColor={"#C4C4C4"}>
                <DrawerIcon fill={colors.navIconColor} style={{ marginRight: 25 }} />
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => navigation.navigate('Home')}
                style={styles.bottomMenuTouchable}
                underlayColor={"#C4C4C4"}>
                <HomeIcon fill={colors.navIconColor} style={{ marginLeft: 30 }} />
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