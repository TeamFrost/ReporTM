import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import { VictoryPie, VictoryContainer, VictoryLabel } from "victory-native";

import NavBar from '../helpers/navbar';
import { colors, screenHeight, screenWidth } from "../helpers/style";

const Item = ({ photo, title, upvotes }) => (
    <View style={{ height: 45, alignItems: 'center', ...styles.flatListItem }}>
        <View style={{ flex: 1 }}>
            <Avatar.Image size={35} source={{ uri: photo }} />
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
    <Item photo={item.image}
        title={item.adress}
        upvotes={item.upvotes.length}
    />
);

const ItemLegend = ({ color, title, number }) => (
    <View style={{ height: 30, alignItems: 'flex-start', ...styles.flatListItem }}>
        <View
            style={{ width: 18, height: 18, borderRadius: 20, backgroundColor: color, elevation: 4 }}
        >
        </View>
        <View style={{ width: '40%', justifyContent: 'flex-start' }}>
            <Text style={styles.textLegend}>{title}</Text>
        </View>
        <View style={{ width: '30%', alignItems: 'center' }}>
            <Text style={styles.textLegend}>{number}</Text>
        </View>
    </View>
);

const renderItemLegend = ({ item }) => (
    <ItemLegend
        color={item.color}
        title={item.title}
        number={item.y}
    />
);

const mapStateToProps = (state) => ({
    reportsData: state.reports.reportsData,
    user: state.auth.user
});

function ProfileScreen({ ...props }) {

    const { user, reportsData, navigation } = props

    const onEditProfilePress = () => {
        navigation.navigate('Settings')
    }

    const [profile, setProfile] = useState('https://firebasestorage.googleapis.com/v0/b/reportm-40f3e.appspot.com/o/Profile.png?alt=media&token=03f17fb0-6394-43fb-9695-fbc7633d7c19')
    const [username, setUsername] = useState('')
    const [myReports, setMyReports] = useState([])
    const [reportsNumber, setReportsNumber] = useState(0)
    const [upvotesGiven, setUpvotesGiven] = useState(0)
    const [upvotesReceived, setUpvotesReceived] = useState(0)
    const [categoriesReported, setCategoriesReported] = useState(0)
    const [chartData, setChartData] = useState([])

    const onlyUnique = (value, index, self) => (self.indexOf(value) === index)

    const chart = [
        { title: "Groapă", color: "#d37e53" },
        { title: "Graffiti", color: "#593480" },
        { title: "Gunoi", color: "#C0EAFF" },
        { title: "Iluminat", color: "#FFCE3C" },
        { title: "Poluare", color: "#83b1cb" },
        { title: "Parcare", color: "#9c280e" },
    ]

    const getChartData = (category, categoryData) => {
        let sum = 0
        categoryData.forEach((key) => {
            if (key === category)
                sum++
        })
        let label = sum / categoryData.length * 100
        let labelString = ' '
        let labelRes = ' '
        if (label != 0) {
            labelString = label.toString()
            if (labelString.length > 2)
                labelString = labelString.slice(0, 4)
            labelRes = labelString + "%"
        }
        let y = sum
        return { label: labelRes, y: y }
    }

    useEffect(() => {
        if (user) {
            setProfile(user.profile)
            setUsername(user.username)

            let data = reportsData.filter(data => data.author === user.id)
            setMyReports(data)
            setReportsNumber(data.length)

            setUpvotesGiven(user.upvotedreports.length)

            let upvotesSum = 0
            let upvotesData = data.map(data => data.upvotes.length)
            upvotesData.forEach(key => upvotesSum += key)
            setUpvotesReceived(upvotesSum)

            let categoryData = data.map(data => data.parent)

            let uniqueCategories = categoryData.filter(onlyUnique)
            setCategoriesReported(uniqueCategories.length)

            let chartData = []
            chart.forEach((obj) => {
                switch (obj.title) {
                    case "Groapă": {
                        let partial = getChartData('groapa', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case "Graffiti": {
                        let partial = getChartData('graffiti', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case "Gunoi": {
                        let partial = getChartData('gunoi', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case "Iluminat": {
                        let partial = getChartData('iluminat', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case "Poluare": {
                        let partial = getChartData('poluare', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case "Parcare": {
                        let partial = getChartData('parcare', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                }
            })
            setChartData(chartData)
        }
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [user])


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
                    <Avatar.Image style={{ marginTop: 30 }} size={150} source={{ uri: profile }} />
                    <Text style={{ fontSize: 28, fontWeight: "bold" }}>{username}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text
                            style={{ fontSize: 14, textDecorationLine: 'underline', color: colors.textGray }}
                            onPress={onEditProfilePress}
                        >
                            Editează-ți profilul
                        </Text>
                        <Icon name='sliders-h' type="font-awesome-5" size={12} style={{ marginLeft: 5, color: colors.textGray }} />
                    </View>
                </View>

                <View style={styles.reportsList}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Icon name="list-ul" type="font-awesome-5" size={20} style={{ marginLeft: 5 }} />
                        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 5 }}>Sesizările mele</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={myReports}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <Divider style={{ flexDirection: 'column', backgroundColor: colors.textGray }} />}
                            style={{ flex: 1, marginTop: 10 }}
                            nestedScrollEnabled

                        />
                    </View>
                </View>

                <View style={styles.statisticsView}>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 5 }}>
                        <Icon name="chart-bar" type="font-awesome-5" size={24} style={{ marginLeft: 5, marginTop: 3 }} />
                        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 5, }}>Statisticile mele</Text>
                    </View>
                    <View style={styles.statisticsCards}>
                        <View style={styles.statisticsCardsRow}>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText1}>Sesizari raportate</Text>
                                    <Text style={styles.cardText2}>{reportsNumber}</Text>
                                </View>
                                <Image
                                    source={require("../assets/StatReport.png")}
                                    style={styles.statPhoto}
                                />
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText1}>Sesizari votate</Text>
                                    <Text style={styles.cardText2}>{upvotesGiven}</Text>
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
                                    <Text style={styles.cardText2}>{upvotesReceived}</Text>
                                </View>
                                <Image
                                    source={require("../assets/StatUpvote.png")}
                                    style={styles.statPhoto}
                                />
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText1}>Categorii sesizate</Text>
                                    <Text style={styles.cardText2}>{categoriesReported}/6</Text>
                                </View>
                                <Image
                                    source={require("../assets/StatReport.png")}
                                    style={styles.statPhoto}
                                />
                            </LinearGradient>
                        </View>

                    </View>
                </View>
                <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
                    <VictoryPie
                        data={chartData}
                        colorScale={["#d37e53", "#593480", "#C0EAFF", "#FFCE3C", "#83b1cb", "#9c280e"]}
                        labelRadius={screenWidth / 7.5}
                        padding={{ top: 20 }}
                        height={160}
                        origin={{ x: screenWidth / 3.4 }}
                        radius={screenWidth / 4.7}
                        containerComponent={<VictoryContainer height={200} style={{ flex: 1 }} />}
                        style={{
                            labels: { fill: "white", fontSize: 14, fontWeight: "bold" },
                            data: { strokeWidth: 0.5, stroke: 'grey' }
                        }}
                    />

                    <View style={styles.statisticsLegend}>
                        <FlatList
                            data={chartData}
                            renderItem={renderItemLegend}
                            keyExtractor={(item) => item.title}
                        />
                    </View>
                </View>

                <View style={{ ...styles.reportsList, height: 500, marginBottom: 40 }}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Icon name="medal" type="font-awesome-5" size={20} style={{ marginLeft: 5 }} />
                        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 5 }}>Realizările mele</Text>
                    </View>

                    <View style={styles.achievementsContainer}>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement1.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>Bine ai venit</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Te-ai înregistrat pe aplicație</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement2.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>Sesizarea #1</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ai adăugat prima sesizare în aplicație</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement3.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>Probleme++</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ai descoperit pagina de sesizări</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement4.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textGray, textTransform: 'uppercase' }}>Votat!</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ai votat prima problemă în aplicație</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement5.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>fotograf</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ai adaugat 5 poze pentru probleme</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement6.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textGray, textTransform: 'uppercase' }}>selfie</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ți-ai schimbat poza de profil</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement7.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textGray, textTransform: 'uppercase' }}>Influencer</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ai primit 50 de voturi la problema sesizată</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement8.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>inspector</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ai adăugat 10 (Z-E-C-E) probleme în aplicație</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement9.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textGray, textTransform: 'uppercase' }}>UNDE SUNT?</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ai folosit locația curentă în sesizare</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Image source={require("../assets/Achievement10.png")} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>specialist</Text>
                                    <Text style={styles.achievementsCardTextDescription}>Ai adăugat 5 categorii diferite de probleme</Text>
                                </View>
                            </View>

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
        width: '48%',
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
    statisticsLegend: {
        flex: 1,
        alignItems: "center",
    },
    textLegend: {
        fontSize: 14,
        fontWeight: "bold"
    },
    flatListItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    achievementsContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    achievementsCard: {
        width: '49%',
        flexDirection: 'row',
        alignItems: "center"
    },
    achievementsCardView: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    achievementsCardText: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 5,
        marginLeft: 4
    },
    achievementsCardTextDescription: {
        fontSize: 12,
        color: colors.textGray,
        width: '106%',
        textAlign: 'left'
    }
})

export default connect(mapStateToProps)(ProfileScreen);