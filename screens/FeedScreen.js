import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import NavBar from '../helpers/navbar'
import { colors, screenHeight, screenWidth } from "../helpers/style";
import { Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar } from 'react-native-paper';



export default function FeedScreen() {

    const [search, setSearch] = useState('')

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
                <View style={styles.mainPage}>
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


                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardHeaderLeft}>
                                <Avatar.Image size={50} source={require('../assets/Profile.png')} />
                                <View style={styles.cardHeaderText}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Edi One</Text>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Icon name='map-marker-alt' type="font-awesome-5" size={10} style={{ paddingRight: 7 }} />
                                        <Text style={{ fontSize: 12, }}>Str. Episcop Augustin  nr. 3</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                                        <Icon name='clock' type="font-awesome-5" size={10} style={{ paddingRight: 5, marginLeft: -1, color: colors.textGray }} />
                                        <Text style={{ fontSize: 12, color: colors.textGray }}>35 min ago</Text>
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
                                source={require("../assets/Test.png")}
                                style={{ width: 190, height: 130 }}
                            />
                            <Text numberOfLines={10} style={styles.cardDescription}>
                                jXx bQQq FMw oCah andjj Lw UeBkWUB qtakf pdg exYQFdMn YqalF n RZMe NVleV O HwtXT fqOJnFV oIvg ha hM lGmfLX ls gyd lung kdujbH ymmT ZMySdP kCy xcrv Dc mGek NVxDBGK C by Oh Jos XdoSx rTyiZa Pdl OG UiP GAuGjkU mAncA WZsNs eyucM MWtEYCC GrXw cFBCIp dtXdE CCb QFGfN ohKXyMH faAPLAyeF dVz TbPpOn PCbs xv
                            </Text>
                        </View>
                        <Divider style={{ height: 1, backgroundColor: colors.textGray, width: '90%', alignSelf: "center" }} />
                        <View style={styles.cardFooter}>
                            <View style={styles.cardFooterLeft}>
                                <TouchableOpacity>
                                    <Icon name='arrow-alt-circle-up' size={25} color={colors.darkPurple} style={{ paddingLeft: 15, paddingRight: 5 }} />
                                </TouchableOpacity>
                                <Text>15</Text>
                                <Text> Aprobări</Text>
                            </View>
                            <View style={styles.rightBottomTag}>

                                <TouchableOpacity style={styles.tagButton2} >
                                    <Icon
                                        type="font-awesome"
                                        name="trash"
                                        size={16}
                                        style={{ marginRight: 5, paddingTop: 2, color: colors.gunoi }}
                                    />
                                    <Text>Gunoi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


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
        height: screenHeight,
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
        height: "7%",
        alignSelf: "center",

    },
    tagsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "85%",
        height: 50,
        // backgroundColor: "#CA239166"
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