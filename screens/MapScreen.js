import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, View, StyleSheet, ScrollView, TouchableOpacity, Text, Platform } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Callout } from 'react-native-maps';
import { Svg, Image as ImageSvg } from 'react-native-svg';
import i18n from 'i18n-js';

import { screenHeight, screenWidth, mapStyle, themeColors } from "../helpers/style";
import NavBar from './components/NavBar'
import Map from "../assets/Map.svg";
import { watchReportsData } from '../redux/actions/reports/reports';
import { category } from '../helpers/category';
import { ro, en } from "../helpers/dictionary";

const mapStateToProps = (state) => ({
    doneFetching: state.reports.doneFetching,
    isFetching: state.reports.isFetching,
    hasError: state.reports.hasError,
    errorMessage: state.reports.errorMessage,
    reportsData: state.reports.reportsData,
    theme: state.theme,
    language: state.translations.language,
});

const mapDispatchToProps = (dispatch) => ({ watchReportsData: () => dispatch(watchReportsData()) });

function MapScreen({ ...props }) {
    const { reportsData, theme, watchReportsData, language } = props;
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [mapData, setMapData] = useState(reportsData)

    i18n.fallbacks = true
    i18n.translations = { ro, en }
    i18n.locale = language

    useEffect(() => {
        // watchReportsData()
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme])

    const applyFilter = (filter) => {
        if (filter === '') {
            setMapData(reportsData)
        }
        else {
            let mapData = reportsData.filter(data => data.parent === filter)
            setMapData(mapData);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <MapView
                    provider="google"
                    customMapStyle={(colors.textColor === colors.white) ? mapStyle : []}
                    style={{ height: screenHeight, width: screenWidth }}
                    initialRegion={{
                        latitude: 45.753256501696036,
                        longitude: 21.227993167956523,
                        latitudeDelta: 0.0722,
                        longitudeDelta: 0.0321,
                    }}
                    onLongPress={e => {
                        const coords = e.nativeEvent.coordinate;
                        props.navigation.navigate('Report', { coords })
                    }}
                >
                    {mapData.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinates}
                            description={marker.description}
                            pinColor={marker.color}
                        >
                            <Callout tooltip>
                                <View>
                                    <View style={styles.calloutView}>
                                        {Platform.OS === 'android' ?
                                            (<Svg width={200} height={200}>
                                                <ImageSvg
                                                    width={'100%'}
                                                    height={'100%'}
                                                    preserveAspectRatio="xMidYMid slice"
                                                    href={{ uri: marker.image }}
                                                />
                                            </Svg>) :
                                            (
                                                <Image
                                                    style={{ height: 200, width: 200 }}
                                                    resizeMethod='resize'
                                                    resizeMode='stretch'
                                                    source={{ uri: marker.image }}
                                                />
                                            )
                                        }
                                        <View>
                                            <Text style={{ fontSize: 16, color: colors.textColor }}>
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
                    lightTheme={(colors.textColor === colors.white) ? false : true}
                    autoCapitalize="none"
                    placeholder={i18n.t("search")}
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
                        <TouchableOpacity key={index} style={styles.tagButton} onPress={() => {
                            category.value === categoryFilter
                                ? (
                                    applyFilter(''),
                                    setCategoryFilter('')
                                ) :
                                (
                                    applyFilter(category.value),
                                    setCategoryFilter(category.value)
                                )
                        }}>
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
            <Map width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
            <StatusBar style="auto" />
        </View>
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    bottomIcon: {
        position: "absolute",
        top: "88%",
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
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
        backgroundColor: colors.tooltipWhite,
        height: "100%",
    },
    scrollTags: {
        position: "absolute",
        top: 130,
    },
    tagText: {
        color: colors.textColor,
        fontSize: 14
    },
    tagButton: {
        flexDirection: "row",
        backgroundColor: colors.tooltipWhite,
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        height: 35,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.searchBarGray,
        elevation: 3,
        alignItems: 'center'
    },
    scrollContainter: {
        paddingLeft: "10%",
        paddingRight: "10%",
    },
    calloutView: {
        flexDirection: 'column',
        width: 220,
        alignSelf: 'flex-start',
        backgroundColor: colors.tooltipWhite,
        borderRadius: 10,
        borderColor: "#ccc",
        padding: 10,
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);