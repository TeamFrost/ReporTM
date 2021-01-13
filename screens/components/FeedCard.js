import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';
import { connect } from 'react-redux';

import { colors, screenWidth } from "../../helpers/style";
import { firebase } from "../../config/firebaseConfig";

const mapStateToProps = (state) => ({
    currentUser: state.auth.user
});

function FeedCard({ userName, userAvatar, adress, time, photo, description, upvotes, tag, color, id, ...props }) {

    const { currentUser } = props

    const onUpvotePress = async () => {
        const reportRef = firebase.firestore().collection('reports').doc(tag).collection('sub_reports').doc(id);
        const unionRes = await reportRef.update({
            upvotes: firebase.firestore.FieldValue.arrayUnion(currentUser.id)
        });
    }

    const iconSelector = (tag) => {
        if (tag === 'groapa') return 'exclamation-triangle'
        if (tag === 'graffiti') return 'spray-can'
        if (tag === 'gunoi') return 'trash'
        if (tag === 'iluminat') return 'lightbulb'
        if (tag === 'poluare') return 'smog'
        if (tag === 'parcare') return 'parking'

    }

    return (
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
                    style={{ width: 160, height: 160 }}
                />
                <Text numberOfLines={10} style={styles.cardDescription}>
                    {description}
                </Text>
            </View>
            <Divider style={{ height: 1, backgroundColor: colors.textGray, width: '90%', alignSelf: "center" }} />
            <View style={styles.cardFooter}>
                <View style={styles.cardFooterLeft}>
                    <TouchableOpacity onPress={onUpvotePress}>
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
                            size={15}
                            style={{ marginRight: 5, paddingTop: 1, color: color }}
                        />
                        <Text>{tag}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        // alignItems: 'center',
        // justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        margin: 10,
        width: "85%",
        height: 275,
        backgroundColor: '#FBF2FE',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        height: 165,
    },
    cardDescription: {
        textAlign: 'center',
        padding: 5,
        fontSize: 12,
        width: screenWidth > 400 ? screenWidth / 2.7 : screenWidth / 2.8,
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
        height: 30,
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

export default connect(mapStateToProps)(FeedCard);