import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import MapView from 'react-native-maps';
import { Image, View, StyleSheet } from "react-native";
import { SearchBar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import NavBar from '../helpers/navbar'
import { colors, screenHeight, screenWidth } from "../helpers/style";

export default function MapScreen() {

    const [search, setSearch] = useState('')

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <MapView
                    style={{ height: screenHeight, width: screenWidth }}
                    initialRegion={{
                        latitude: 45.753256501696036,
                        longitude: 21.227993167956523,
                        latitudeDelta: 0.0722,
                        longitudeDelta: 0.0321,
                    }}
                    onLongPress={e => console.log(e.nativeEvent.coordinate)}
                />

                <SearchBar
                    platform='default'
                    lightTheme={true}
                    autoCapitalize="none"
                    placeholder='Search'
                    textAlign='center'
                    round={true}
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInput}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    inputStyle={{ marginRight: 22 }}
                />
                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
            <NavBar />
            <Image
                source={require("../assets/Map.png")}
                style={styles.bottomIcon}
            />
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
    searchBarContainer: {
        position: "absolute",
        top: 60,
        width: "80%",
        height: "7%",
        backgroundColor: colors.searchBarGray,
        alignSelf: "center",
        borderRadius: 20,
        shadowColor: colors.shadowGray,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    searchBarInput: {
        backgroundColor: colors.white,
        height: "100%",

    },
    bottomIcon: {
        width: screenHeight / 8.3,
        height: screenHeight / 8.3,
        position: "absolute",
        top: "88%",
    },

})