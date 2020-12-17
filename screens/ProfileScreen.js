import React, { useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { LogBox } from 'react-native';

import NavBar from '../helpers/navbar'
import { colors, screenHeight } from "../helpers/style";

const DATA = [
    {
        id: "1",
        photo: require('../assets/Test.png'),
        title: 'Str. Episcop Augustin Pacha, nr. 3',
        upvotes: 12,
    },
    {
        id: "2",
        photo: require('../assets/Test2.png'),
        title: 'Bulevardul Vasile Pârvan, nr. 2',
        upvotes: 5,
    },
    {
        id: "3",
        photo: require('../assets/Test3.png'),
        title: 'Str. Piața Iancu Huniade',
        upvotes: 21,
    },
    {
        id: "4",
        photo: require('../assets/Test4.png'),
        title: 'Str. Cozia 14',
        upvotes: 191,
    },
]

const Item = ({ photo, title, upvotes }) => (
    <View style={{ flexDirection: 'row', flex: 1, height: 45, alignItems: 'center', justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
            <Avatar.Image size={35} source={photo} />
        </View>
        <View style={{ flex: 5, flexDirection: "row", justifyContent: "flex-start", width: '100%' }}>
            <Text style={{ fontSize: 14, marginLeft: 5 }}>{title}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "flex-end" }}>
            <Text style={{ fontWeight: "bold" }}>{upvotes}</Text>
            <Icon name='arrow-alt-circle-up' size={16} style={{ marginRight: 10, marginLeft: 2 }} />
        </View>
    </View >
);

const renderItem = ({ item }) => (
    <Item photo={item.photo}
        title={item.title}
        upvotes={item.upvotes}
    />
);

export default function ProfileScreen() {

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%', height: '100%' }}
                keyboardShouldPersistTaps="always">

                <View style={styles.avatarView}>
                    <Image
                        source={require("../assets/Ellipse_1.png")}
                        style={styles.ellipse1}
                    />
                    <Image
                        source={require("../assets/Ellipse_2.png")}
                        style={styles.ellipse2}
                    />
                    <Avatar.Image style={{ marginTop: 30 }} size={150} source={require("../assets/avatarPhoto.jpg")} />
                    <Text style={{ fontSize: 28, fontWeight: "bold" }}>Eduard One</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{ fontSize: 14, textDecorationLine: 'underline', color: colors.textGray }}
                            onPress={() => console.log('Editam')}
                        >Editează-ți profilul</Text>
                        <Icon name='sliders-h' type="font-awesome-5" size={12} style={{ marginLeft: 5, color: colors.textGray }} />
                    </View>
                </View>

                <View style={styles.reportsList}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Sesizarile mele</Text>
                        <Icon name="pencil-alt" type="font-awesome-5" size={20} style={{ marginLeft: 5 }} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <Divider style={{ flexDirection: 'column', backgroundColor: colors.textGray }} />}
                            style={{ flex: 1, marginTop: 10 }}
                        />
                    </View>
                </View>

                <View style={styles.statisticsView}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Statistici</Text>
                        <Icon name="chart-bar" type="font-awesome-5" size={24} style={{ marginLeft: 5, marginTop: 3 }} />
                    </View>
                    <View style={styles.statisticsCards}>
                        <View style={styles.statisticsCardsRow}>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText1}>Sesizari raportate</Text>
                                    <Text style={styles.cardText2}>10</Text>
                                </View>
                                <Image
                                    source={require("../assets/StatReport.png")}
                                    style={styles.statPhoto}
                                />
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText1}>Sesizari votate</Text>
                                    <Text style={styles.cardText2}>64</Text>
                                </View>
                                <Image
                                    source={require("../assets/StatCheck.png")}
                                    style={styles.statPhoto}
                                />
                            </LinearGradient>
                        </View>

                        <View style={styles.statisticsCardsRow}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText1}>Voturi primite</Text>
                                    <Text style={styles.cardText2}>154</Text>
                                </View>
                                <Image
                                    source={require("../assets/StatUpvote.png")}
                                    style={styles.statPhoto}
                                />
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText1}>Categorii sesizate</Text>
                                    <Text style={styles.cardText2}>2/6</Text>
                                </View>
                                <Image
                                    source={require("../assets/StatReport.png")}
                                    style={styles.statPhoto}
                                />
                            </LinearGradient>
                        </View>

                    </View>
                </View>

            </KeyboardAwareScrollView>
            <NavBar />
            <StatusBar style="auto" />
            <Image
                source={require("../assets/Profile.png")}
                style={styles.bottomIcon}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "space-between",
    },
    bottomIcon: {
        width: screenHeight / 8.5,
        height: screenHeight / 8.5,
        position: "absolute",
        top: "88%",
    },
    ellipse1: {
        position: "absolute",
        top: "35%",
        right: "0%",
        width: 35,
        height: 75,
    },
    ellipse2: {
        position: "absolute",
        top: "50%",
        left: "-1%",
        width: 50,
        height: 100,
    },
    avatarView: {
        flex: 1,
        height: screenHeight / 2.8,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    reportsList: {
        flex: 1,
        flexDirection: "column",
        height: screenHeight / 4.1,
        width: '85%',
        alignSelf: "center",
        paddingTop: 20,
    },
    statisticsView: {
        flex: 1,
        flexDirection: "column",
        height: 250,
        width: '85%',
        alignSelf: "center",
        paddingTop: 20,
    },
    statisticsCards: {
        height: 150,
        marginTop: 10,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    statisticsCardsRow: {
        flexDirection: "row",
        height: 65,
        justifyContent: "space-between"
    },
    statCard: {
        width: 165,
        height: 65,
        backgroundColor: colors.purple,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        elevation: 1
    },
    statPhoto: {
        height: 40,
        width: 40,
        marginRight: 8
    },
    cardTextView: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 15,
        alignItems: "flex-start",
    },
    cardText1: {
        fontSize: 11,
        fontWeight: "bold",
        color: colors.white
    },
    cardText2: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.white
    },
})