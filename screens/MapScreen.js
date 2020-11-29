import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from 'react-native-maps';
import { Image, View, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import { SearchBar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import NavBar from '../helpers/navbar'
import { colors, screenHeight, screenWidth } from "../helpers/style";
import { watchReportsData } from '../redux/actions/reports';
import { category } from '../helpers/category';
import { Callout } from 'react-native-maps';
import { color } from 'react-native-reanimated';

const mapStateToProps = (state) => {
    return {
        reportsData: state.reportsData
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        watchReportsData: () => dispatch(watchReportsData())
    };
}

function MapScreen({ ...props }) {

    const [search, setSearch] = useState('')

    useEffect(() => {
        props.watchReportsData()
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
                    {props.reportsData.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            title={marker.category}
                            description={marker.description}
                            pinColor={
                                (marker.category === "groapa") ? colors.groapa :
                                    (marker.category === "graffiti") ? colors.graffiti :
                                        (marker.category === "gunoi") ? "aqua" :
                                            (marker.category === "iluminat") ? colors.iluminat :
                                                (marker.category === "poluare") ? colors.poluare :
                                                    (marker.category === "parcare") ? colors.parcare : colors.black
                            }
                        >
                            <Callout tooltip>
                                <View>
                                    <View style={styles.calloutView}>
                                        <Text style={{ height: 180, position: 'relative', bottom: 40, right: 17, top: -70, width: 200 }}>
                                            <Image
                                                imageResizeMode='cover'
                                                source={require('../assets/Test.png')}
                                            />
                                        </Text>
                                        <View style={{ marginTop: -40 }}>
                                            <Text style={{ fontSize: 16 }}>
                                                {marker.description}
                                            </Text>
                                        </View>

                                    </View>
                                </View>

                            </Callout>

                        </Marker>
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
                <ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    height={50}
                    style={styles.scrollTags}
                    contentContainerStyle={styles.scrollContainter}
                >
                    {category.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.tagButton}>
                            <Icon
                                type="font-awesome"
                                name={category.icon}
                                size={16}
                                style={{ marginRight: 5, paddingTop: 2, color: category.color }}
                            />
                            <Text style={styles.tagText}>{category.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
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
    scrollTags: {
        position: "absolute",
        top: 130,
    },
    tagText: {
        fontSize: 14
    },
    tagButton: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        height: 35,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.searchBarGray,
        elevation: 3
    },
    scrollContainter: {
        paddingLeft: "10%",
        paddingRight: "10%",

    },
    calloutView: {
        flexDirection: 'column',
        width: 200,
        alignSelf: 'flex-start',
        backgroundColor: colors.white,
        borderRadius: 10,
        borderColor: "#ccc",
        padding: 15,

    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);