import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from 'react-native-maps';
import { Image, View, StyleSheet } from "react-native";
import { SearchBar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import NavBar from '../helpers/navbar'
import { colors, screenHeight, screenWidth } from "../helpers/style";
import { firebase } from '../config/firebaseConfig'

export default function MapScreen() {

    const [search, setSearch] = useState('')
    const [reports, setReports] = useState([]);

    const reportsRef = firebase.firestore().collection('reports');

    useEffect(() => {
        reportsRef
            .onSnapshot(
                querySnapshot => {
                    const newReports = []
                    querySnapshot.forEach(doc => {
                        const report = doc.data()
                        report.id = doc.id
                        newReports.push(report)
                    });
                    setReports(newReports)
                    console.log(reports)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <MapView
                    provider="google"
                    style={{ height: screenHeight, width: screenWidth }}
                    initialRegion={{
                        latitude: 45.753256501696036,
                        longitude: 21.227993167956523,
                        latitudeDelta: 0.0722,
                        longitudeDelta: 0.0321,
                    }}
                    onLongPress={e => console.log(e.nativeEvent.coordinate)}
                >
                    {reports.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            title={marker.category}
                            description={marker.description}
                            pinColor={colors.purple}
                        />
                    ))}
                </MapView>

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
    bottomIcon: {
        width: screenHeight / 8.5,
        height: screenHeight / 8.5,
        position: "absolute",
        top: "88%",
    },
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
})