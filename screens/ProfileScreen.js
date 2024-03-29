import React, { useEffect, useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { VictoryPie, VictoryContainer } from "victory-native";
import { LogBox } from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import { ro, en } from "../helpers/dictionary";
import { screenHeight, screenWidth, themeColors } from "../helpers/style";
import NavBar from './components/NavBar';
import Ellipse1 from "../assets/Ellipse1"
import Ellipse2 from "../assets/Ellipse2"
import StatCheck from "../assets/StatCheck.svg"
import StatReport from "../assets/StatReport.svg"
import StatTag from "../assets/StatTag.svg"
import StatUpvote from "../assets/StatUpvote.svg"
import Profile from "../assets/Profile.svg"

//Golden
import Ach1g from "../assets/Achievements/Golden/Ach1.svg"
import Ach2g from "../assets/Achievements/Golden/Ach2.svg"
import Ach3g from "../assets/Achievements/Golden/Ach3.svg"
import Ach4g from "../assets/Achievements/Golden/Ach4.svg"
import Ach5g from "../assets/Achievements/Golden/Ach5.svg"
import Ach6g from "../assets/Achievements/Golden/Ach6.svg"
import Ach7g from "../assets/Achievements/Golden/Ach7.svg"
import Ach8g from "../assets/Achievements/Golden/Ach8.svg"
import Ach9g from "../assets/Achievements/Golden/Ach9.svg"
import Ach10g from "../assets/Achievements/Golden/Ach10.svg"

//Grey
import Ach1 from "../assets/Achievements/Gray/Ach1.svg"
import Ach2 from "../assets/Achievements/Gray/Ach2.svg"
import Ach3 from "../assets/Achievements/Gray/Ach3.svg"
import Ach4 from "../assets/Achievements/Gray/Ach4.svg"
import Ach5 from "../assets/Achievements/Gray/Ach5.svg"
import Ach6 from "../assets/Achievements/Gray/Ach6.svg"
import Ach7 from "../assets/Achievements/Gray/Ach7.svg"
import Ach8 from "../assets/Achievements/Gray/Ach8.svg"
import Ach9 from "../assets/Achievements/Gray/Ach9.svg"
import Ach10 from "../assets/Achievements/Gray/Ach10.svg"

const mapStateToProps = (state) => ({
    reportsData: state.reports.reportsData,
    user: state.auth.user,
    theme: state.theme,
    language: state.translations.language,
});

function ProfileScreen({ ...props }) {

    const { user, reportsData, navigation, theme, language } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    const onEditProfilePress = () => {
        navigation.navigate('Settings')
    }

    const [profile, setProfile] = useState('https://firebasestorage.googleapis.com/v0/b/reportm-40f3e.appspot.com/o/Profile.png?alt=media&token=1a6adc03-d653-4465-bf47-aabff7f14f29')
    const [username, setUsername] = useState('')
    const [myReports, setMyReports] = useState([])
    const [reportsNumber, setReportsNumber] = useState(0)
    const [upvotesGiven, setUpvotesGiven] = useState(0)
    const [upvotesReceived, setUpvotesReceived] = useState(0)
    const [categoriesReported, setCategoriesReported] = useState(0)
    const [chartData, setChartData] = useState([])

    i18n.fallbacks = true
    i18n.translations = { ro, en }
    i18n.locale = language

    const onlyUnique = (value, index, self) => (self.indexOf(value) === index)

    const chart = [
        { title: i18n.t("catGroapa"), color: "#593480" },
        { title: i18n.t("catGraffiti"), color: "#9457E0" },
        { title: i18n.t("catGunoi"), color: "#BB6BD9" },
        { title: i18n.t("catIluminat"), color: "#FFEB7B" },
        { title: i18n.t("catPoluare"), color: "#ECDAF2" },
        { title: i18n.t("catParcare"), color: "#D4D0D9" },
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
                    case i18n.t("catGroapa"): {
                        let partial = getChartData('groapa', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case i18n.t("catGraffiti"): {
                        let partial = getChartData('graffiti', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case i18n.t("catGunoi"): {
                        let partial = getChartData('gunoi', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case i18n.t("catIluminat"): {
                        let partial = getChartData('iluminat', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case i18n.t("catPoluare"): {
                        let partial = getChartData('poluare', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                    case i18n.t("catParcare"): {
                        let partial = getChartData('parcare', categoryData)
                        chartData.push({ ...partial, title: obj.title, color: obj.color })
                        return;
                    }
                }
            })
            setChartData(chartData)
        }
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [user, theme])

    const Item = ({ photo, title, upvotes, solved }) => (
        <View style={{ height: 47, alignItems: 'center', ...styles.flatListItem }}>
            <View style={{ flex: 1 }}>
                <Avatar.Image size={40} source={{ uri: photo }} style={[solved && styles.solved]} />
            </View>
            <View style={styles.titleArrangeFlatList}>
                <Text style={styles.arangeIcon}>{title}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end", ...styles.rowArange }}>
                <Text style={styles.textDefault}>{upvotes}</Text>
                <Icon name='arrow-alt-circle-up' size={16} style={styles.arrowUp} />
            </View>
        </View >
    );

    const renderItem = ({ item }) => (
        <Item photo={item.image}
            title={item.adress}
            upvotes={item.upvotes.length}
            solved={item.solved}
        />
    );

    const ItemLegend = ({ color, title, number }) => (
        <View style={{ height: 32, alignItems: 'flex-start', ...styles.flatListItem }}>
            <View style={{ ...styles.circleLegend, backgroundColor: color }} />

            <View style={{ width: '45%', justifyContent: 'flex-start' }}>
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

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView style={styles.scrollView}>

                <View style={styles.avatarView}>
                    <Ellipse1 width={35} height={75} style={styles.ellipse1} />
                    <Ellipse2 width={50} height={100} style={styles.ellipse2} />
                    <Avatar.Image style={{ marginTop: 30 }} size={150} source={{ uri: profile }} />
                    <Text style={{ fontSize: 28, ...styles.textDefault }}>{username}</Text>
                    <View style={styles.rowArange}>
                        <Text
                            style={{ textDecorationLine: 'underline', color: colors.textGray }}
                            onPress={onEditProfilePress}
                        >
                            {i18n.t("profileEdit")}
                        </Text>
                        <Icon name='sliders-h' type="font-awesome-5" size={12} style={{ marginLeft: 5, color: colors.textGray }} />
                    </View>
                </View>

                <View style={styles.reportsList}>
                    <View style={styles.rowArange}>
                        <Icon name="list-ul" type="font-awesome-5" size={20} style={styles.arangeIcon} />
                        <Text style={styles.sectionHeaderText}>{i18n.t("profileReports")}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={myReports}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
                            style={{ flex: 1, marginTop: 10 }}
                            nestedScrollEnabled

                        />
                    </View>
                </View>

                <View style={styles.statisticsView}>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 5 }}>
                        <Icon name="chart-bar" type="font-awesome-5" size={24} style={{ ...styles.arangeIcon, marginTop: 3 }} />
                        <Text style={styles.sectionHeaderText}>{i18n.t("profileStat")}</Text>
                    </View>
                    <View style={styles.statisticsCards}>
                        <View style={styles.statisticsCardsRow}>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText}>{i18n.t("profileStatCard1")}</Text>
                                    <Text style={{ ...styles.cardText, fontSize: 18 }}>{reportsNumber}</Text>
                                </View>
                                <StatReport height={40} width={40} style={styles.statPhoto} />
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText}>{i18n.t("profileStatCard2")}</Text>
                                    <Text style={{ ...styles.cardText, fontSize: 18 }}>{upvotesGiven}</Text>
                                </View>
                                <StatCheck height={40} width={40} style={styles.statPhoto} />
                            </LinearGradient>
                        </View>

                        <View style={styles.statisticsCardsRow}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText}>{i18n.t("profileStatCard3")}</Text>
                                    <Text style={{ ...styles.cardText, fontSize: 18 }}>{upvotesReceived}</Text>
                                </View>
                                <StatUpvote height={40} width={40} style={styles.statPhoto} />
                            </LinearGradient>

                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={styles.statCard}>
                                <View style={styles.cardTextView}>
                                    <Text style={styles.cardText}>{i18n.t("profileStatCard4")}</Text>
                                    <Text style={{ ...styles.cardText, fontSize: 18 }}>{categoriesReported}/6</Text>
                                </View>
                                <StatTag height={40} width={40} style={styles.statPhoto} />
                            </LinearGradient>
                        </View>

                    </View>
                </View>
                <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
                    <VictoryPie
                        data={chartData}
                        colorScale={["#593480", "#9457E0", "#BB6BD9", "#FFEB7B", "#ECDAF2", "#D4D0D9"]}
                        labelRadius={screenWidth / 8}
                        padding={{ top: 20 }}
                        height={160}
                        origin={{ x: screenWidth / 3.4 }}
                        radius={screenWidth / 4.7}
                        containerComponent={<VictoryContainer height={200} style={{ flex: 1 }} />}
                        style={{
                            labels: { fill: "white", fontWeight: "bold" },
                            data: { strokeWidth: 0.5, stroke: 'black' }
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
                    <View style={styles.rowArange}>
                        <Icon name="medal" type="font-awesome-5" size={20} style={styles.arangeIcon} />
                        <Text style={styles.sectionHeaderText}>{i18n.t("profileAchievements")}</Text>
                    </View>

                    <View style={styles.achievementsContainer}>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Ach1g width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>{i18n.t("profileAchievement1")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc1")}</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Ach2g width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>{i18n.t("profileAchievement2")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc2")}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Ach3g width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>{i18n.t("profileAchievement3")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc3")}</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Ach4 width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textGray, textTransform: 'uppercase' }}>{i18n.t("profileAchievement4")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc4")}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Ach5g width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>{i18n.t("profileAchievement5")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc5")}</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Ach6 width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textGray, textTransform: 'uppercase' }}>{i18n.t("profileAchievement6")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc6")}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Ach7 width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textGray, textTransform: 'uppercase' }}>{i18n.t("profileAchievement7")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc7")}</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Ach8g width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>{i18n.t("profileAchievement8")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc8")}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={styles.achievementsCardView}>

                            <View style={styles.achievementsCard}>
                                <Ach9 width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text style={{ ...styles.textLegend, color: colors.textGray, textTransform: 'uppercase' }}>{i18n.t("profileAchievement9")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc9")}</Text>
                                </View>
                            </View>

                            <View style={styles.achievementsCard}>
                                <Ach10g width={65} height={65} style={styles.achievements} />
                                <View style={styles.achievementsCardText}>
                                    <Text numberOfLines={1} style={{ ...styles.textLegend, color: colors.textYellow, textTransform: 'uppercase' }}>{i18n.t("profileAchievement10")}</Text>
                                    <Text style={styles.achievementsCardTextDescription}>{i18n.t("profileAchDesc10")}</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>
            <NavBar />
            <StatusBar style="auto" />
            <Profile width={screenHeight / 8.5} height={screenHeight / 8.5} style={styles.bottomIcon} />
        </View >
    );
}

const styleSheetFactory = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
        justifyContent: "space-between",
    },
    bottomIcon: {
        position: "absolute",
        top: "88%",
    },
    ellipse1: {
        position: "absolute",
        top: "35%",
        right: "0%",
    },
    ellipse2: {
        position: "absolute",
        top: "50%",
        left: "-1%",
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
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        elevation: 1
    },
    statPhoto: {
        marginRight: 8
    },
    cardTextView: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 15,
        alignItems: "flex-start",
    },
    cardText: {
        fontSize: 11,
        fontWeight: "bold",
        color: colors.white
    },
    statisticsLegend: {
        flex: 1,
        alignItems: "center",
    },
    textLegend: {
        color: colors.textColor,
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
    },
    achievements: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
    },
    circleLegend: {
        width: 20,
        height: 20,
        borderRadius: 10,
        elevation: 4,
    },
    solved: {
        borderWidth: 3,
        borderColor: colors.upvotePressed,
        overflow: 'hidden'
    },
    rowArange: {
        flexDirection: 'row',
        alignItems: "center",
    },
    arrowUp: {
        marginRight: 10,
        marginLeft: 2,
        color: colors.textColor
    },
    scrollView: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    textDefault: {
        fontWeight: "bold",
        color: colors.textColor
    },
    sectionHeaderText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 5,
        color: colors.textColor
    },
    arangeIcon: {
        marginLeft: 5,
        color: colors.textColor
    },
    divider: {
        flexDirection: 'column',
        backgroundColor: colors.textGray
    },
    titleArrangeFlatList: {
        flex: 5,
        flexDirection: "row",
        width: '100%',
        justifyContent: "flex-start",
    }
})

export default connect(mapStateToProps)(ProfileScreen);