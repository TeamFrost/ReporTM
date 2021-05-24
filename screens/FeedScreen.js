import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import NavBar from '../screens/components/NavBar'
import { screenHeight, screenWidth, themeColors } from "../helpers/style";
import Feed from "../assets/Feed.svg"
import FeedCard from "../screens/components/FeedCard";
import { watchReportsData } from '../redux/actions/reports/reports';

const mapStateToProps = (state) => ({
    doneFetching: state.reports.doneFetching,
    isFetching: state.reports.isFetching,
    hasError: state.reports.hasError,
    errorMessage: state.reports.errorMessage,
    reportsData: state.reports.reportsData,
    currentUser: state.auth.user,
    theme: state.theme
});

const renderItem = ({ item }) => {

    let time = item.timestamp.toDate();
    let relativeTime = moment(time).fromNow();

    return (
        <FeedCard
            id={item.id}
            userName={item.userInfo.username}
            userAvatar={{ uri: item.userInfo.avatar }}
            adress={item.adress}
            time={relativeTime}
            photo={{ uri: item.image }}
            description={item.description}
            upvotes={item.upvotes.length}
            tag={item.parent}
            color={item.color}
            author={item.author}
            solved={item.solved}
        />
    );
}

function FeedScreen({ ...props }) {

    const { reportsData, theme } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)
    const [reports, setReports] = useState(reportsData)
    const [recentToggle, setRecentToggle] = useState(false)
    const [popularToggle, setPopularToggle] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const [search, setSearch] = useState('')

    const flatListRef = useRef()

    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [theme])

    const handleRecentPress = () => {

        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })

        if (popularToggle) setPopularToggle(!popularToggle);
        if (recentToggle) {
            setRecentToggle(false)
            reportsData.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        }
        else {
            setRecentToggle(true)
            reportsData.sort((a, b) => (new Date(b.timestamp.toDate()) > new Date(a.timestamp.toDate())) ? 1 : ((new Date(a.timestamp.toDate()) > new Date(b.timestamp.toDate())) ? -1 : 0))
        }
    }

    const handlePopularPress = () => {

        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })

        if (recentToggle) setRecentToggle(!recentToggle);

        if (popularToggle) {
            setPopularToggle(false)
            reportsData.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        }
        else {
            setPopularToggle(true)
            reportsData.sort((a, b) => ((b.upvotes.length > a.upvotes.length) ? 1 : (a.upvotes.length > b.upvotes.length) ? -1 : 0))
        }
    }

    const handleSearchPress = () => {
        var res = [];
        reportsData.filter((obj) => {
            Object.keys(obj).forEach((key) => {
                if (obj[key].toString().indexOf(search) !== -1) {
                    res.push(obj);
                }
            });
        });

        setReports(res)
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.searchBar}>
                    <Input
                        style={{ padding: 5 }}
                        placeholder='Caută'
                        rightIcon={
                            <Icon
                                name='search'
                                size={24}
                                color={colors.textColor}
                                onPress={handleSearchPress}
                            />
                        }
                        onChangeText={value => setSearch(value)}
                        onSubmitEditing={handleSearchPress}
                    />
                </View>
                <View style={styles.tagsContainer}>
                    <TouchableOpacity style={[styles.tagButton, recentToggle && styles.active]} onPress={handleRecentPress}>
                        <Icon
                            type="font-awesome-5"
                            name='clock'
                            size={16}
                            style={[styles.headerIcons, recentToggle && styles.activeIcon]}
                        />
                        <Text style={styles.headerIconsText}> Recente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tagButton, popularToggle && styles.active]} onPress={handlePopularPress}>
                        <Icon
                            type="font-awesome-5"
                            name='fire'
                            size={16}
                            style={[styles.headerIcons, popularToggle && styles.activeIcon]}
                        />
                        <Text style={styles.headerIconsText}> Populare</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.tagButton, }}>
                        <Icon
                            type="font-awesome-5"
                            name='clipboard-check'
                            size={16}
                            style={styles.headerIcons}
                        />
                        <Text style={styles.headerIconsText}> Rezolvate</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.mainPage}>
                <FlatList
                    ref={flatListRef}
                    data={reports}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={reportsData}
                    onRefresh={watchReportsData}
                    refreshing={refreshing}
                />
            </View>

            <NavBar />
            <Feed width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
            <StatusBar style="auto" />
        </View>
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
    },
    mainPage: {
        flex: 1,
        width: screenWidth,
    },
    bottomIcon: {
        position: "absolute",
        top: "88%",
    },
    searchBar: {
        marginTop: 50,
        width: screenWidth / 10 * 8.5,
        height: 50,
        alignSelf: "center",
    },
    headerIcons: {
        marginRight: 1,
        paddingTop: 2,
        color: colors.purple
    },
    headerIconsText: {
        fontSize: 14,
        color: colors.textColor
    },
    tagsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "85%",
        height: 50,
    },
    tagButton: {
        flexDirection: "row",
        backgroundColor: colors.tooltipWhite,
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        height: 35,
        marginRight: 4,
        marginLeft: 4,
        borderWidth: 1,
        borderColor: colors.purple,
        elevation: 3,
        shadowColor: colors.shadowGray,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    active: {
        borderWidth: 2.5,
        borderColor: colors.tooglePress
    },
    activeIcon: {
        color: colors.tooglePress
    }
})

export default connect(mapStateToProps)(FeedScreen);