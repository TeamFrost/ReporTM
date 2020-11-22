import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions } from "react-native";
import { SearchBar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);


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
                    containerStyle={styles.searchBar}
                    inputContainerStyle={styles.searchBar2}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    inputStyle={{ marginRight: 22 }}
                />
                <StatusBar style="auto" />
            </KeyboardAwareScrollView>
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
    searchBar: {
        position: "absolute",
        top: 60,
        width: "80%",
        height: "7%",
        backgroundColor: "#E4E0E9",
        alignSelf: "center",
        borderRadius: 20,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    searchBar2: {
        backgroundColor: '#fff',
        height: "100%",

    }

})