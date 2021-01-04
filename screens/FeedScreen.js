import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import NavBar from '../helpers/navbar'
import { colors, screenHeight, screenWidth } from "../helpers/style";
import { Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar } from 'react-native-paper';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import { watchReportsData } from '../redux/actions/reports/reports';

const mapStateToProps = (state) => ({
    reportsData: state.reports.reportsData,
    currentUser: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({ watchReportsData: () => dispatch(watchReportsData()) });

const iconSelector = (tag) => {
    if (tag === 'groapa') return 'exclamation-triangle'
    if (tag === 'graffiti') return 'spray-can'
    if (tag === 'gunoi') return 'trash'
    if (tag === 'iluminat') return 'lightbulb'
    if (tag === 'poluare') return 'smog'
    if (tag === 'parcare') return 'parking'

}

const Item = ({ userName, userAvatar, adress, time, photo, description, upvotes, tag, color }) => (
    <View style={styles.card}>
        <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
                <Avatar.Image size={50} source={userAvatar} />
                <View style={styles.cardHeaderText}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{userName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Icon name='map-marker-alt' type="font-awesome-5" size={10} style={{ paddingRight: 7 }} />
                        <Text style={{ fontSize: 12, }}>{adress}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Icon name='clock' type="font-awesome-5" size={10} style={{ paddingRight: 5, marginLeft: -1, color: colors.textGray }} />
                        <Text style={{ fontSize: 12, color: colors.textGray }}>{time}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardHeaderRight}>
                <TouchableOpacity>
                    <Icon name='ellipsis-h' size={20} style={{ color: colors.textGray, paddingRight: 10 }} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.cardContent}>
            <Image
                source={photo}
                style={{ width: 190, height: 130 }}
            />
            <Text numberOfLines={10} style={styles.cardDescription}>
                {description}
            </Text>
        </View>
        <Divider style={{ height: 1, backgroundColor: colors.textGray, width: '90%', alignSelf: "center" }} />
        <View style={styles.cardFooter}>
            <View style={styles.cardFooterLeft}>
                <TouchableOpacity>
                    <Icon name='arrow-alt-circle-up' size={25} color={colors.darkPurple} style={{ paddingLeft: 15, paddingRight: 5 }} />
                </TouchableOpacity>
                <Text>{upvotes}</Text>
                <Text> Aprobări</Text>
            </View>
            <View style={styles.rightBottomTag}>

                <TouchableOpacity style={styles.tagButton2} >

                    <Icon
                        type="font-awesome"
                        name={iconSelector(tag)}
                        size={16}
                        style={{ marginRight: 5, paddingTop: 2, color: color }}
                    />
                    <Text>{tag}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>

);


const getHeader = () => {
    return (
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
    );
};

const renderItem = ({ item }) => {

    let time = item.timestamp.toDate();
    let relativeTime = moment(time).fromNow();
    return (
        <Item
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
        props.watchReportsData()
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])


    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <View style={styles.mainPage}>
                    <FlatList
                        data={reportsData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        ListHeaderComponent={getHeader}
                    />
                </View>
            </KeyboardAwareScrollView>
            <NavBar />
            <Image
                source={require("../assets/Feed.png")}
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
    mainPage: {
        width: screenWidth,
    },
    bottomIcon: {
        width: screenHeight / 8.5,
        height: screenHeight / 8.5,
        position: "absolute",
        top: "88%",
    },
    searchBar: {
        marginTop: 50,
        width: "85%",
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
    card: {
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        margin: 10,
        width: "85%",
        height: 250,
        backgroundColor: '#FBF2FE',
        elevation: 5
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",

        height: 70,
        width: '100%'
    },
    cardHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15

    },
    cardHeaderText: {
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 10,
    },
    cardHeaderRight: {
        justifyContent: "center",
        paddingRight: 10
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 140,
    },
    cardDescription: {
        textAlign: 'justify',
        padding: 4,
        fontSize: 10,
        width: 125,
    },
    cardFooter: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardFooterLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tagButton2: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: '#FEFEFE',
        marginTop: 2,
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        height: 28,
        marginRight: 4,
        marginLeft: 4,
        borderWidth: 1,
        borderColor: colors.darkPurple,
        elevation: 1,
    },
    rightBottomTag: {
        width: 110,
        alignItems: "center"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);