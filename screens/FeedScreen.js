import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import NavBar from '../helpers/navbar'
import { colors, screenHeight, screenWidth } from "../helpers/style";
import Feed from "../assets/Feed.svg"
import FeedCard from "../screens/components/FeedCard";
import { watchReportsData } from '../redux/actions/reports/reports';

const mapStateToProps = (state) => ({
    doneFetching: state.reports.doneFetching,
    isFetching: state.reports.isFetching,
    hasError: state.reports.hasError,
    errorMessage: state.reports.errorMessage,
    reportsData: state.reports.reportsData,
    currentUser: state.auth.user
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
        />
    );
}

function FeedScreen({ ...props }) {

    const { reportsData } = props
    const [search, setSearch] = useState('')

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])

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
                                color={colors.textHelpGray}
                            />
                        }
                        onChangeText={value => setSearch({ value })}
                    />
                </View>
                <View style={styles.tagsContainer}>
                    <TouchableOpacity style={styles.tagButton}>
                        <Icon
                            type="font-awesome-5"
                            name='clock'
                            size={16}
                            style={{ marginRight: 2, paddingTop: 2, color: colors.purple }}
                        />
                        <Text style={{ fontSize: 14 }}> Recente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tagButton}>
                        <Icon
                            type="font-awesome-5"
                            name='fire'
                            size={16}
                            style={{ marginRight: 2, paddingTop: 2, color: colors.purple }}
                        />
                        <Text style={{ fontSize: 14 }}> Populare</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tagButton}>
                        <Icon
                            type="font-awesome-5"
                            name='tag'
                            size={16}
                            style={{ marginRight: 2, paddingTop: 2, color: colors.purple }}
                        />
                        <Text style={{ fontSize: 14 }}> Categorie</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <KeyboardAwareScrollView>
                <View style={styles.mainPage}>
                    <FlatList
                        data={reportsData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    // ListHeaderComponent={getHeader}
                    />
                </View>
            </KeyboardAwareScrollView>
            <NavBar />
            <Feed width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
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
    mainPage: {
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
    tagsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "85%",
        height: 50,
        //backgroundColor: "#CA239166"
    },
    tagButton: {
        flexDirection: "row",
        backgroundColor: colors.white,
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
})

export default connect(mapStateToProps)(FeedScreen);