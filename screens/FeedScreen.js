import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import NavBar from '../helpers/navbar'
import { colors, screenHeight, screenWidth } from "../helpers/style";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        backgroundColor: "#F9F4FB",
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

})