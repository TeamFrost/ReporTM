import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, StyleSheet, TouchableHighlight, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const screenHeight = Math.round(Dimensions.get('window').height);



export default function HomeScreen() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/Ellipse_1.png")}
                style={styles.ellipse_1}
            />
            <Image
                source={require("../assets/Ellipse_2.png")}
                style={styles.ellipse_2}
            />
            <View style={styles.textbox}>
                <Text style={styles.basetext}>
                    Repor<Text style={styles.innertext}>TM</Text>
                </Text>
                <Text style={styles.description}>
                    Ajută-ți orașul să devină mai bun prin semnalarea problemelor întâlnite. Cu ajutorul acestei aplicații îți poți face vocea auzită și poți face parte din schimbare!
                </Text>
            </View>

            <View style={styles.paperView}>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Map')}
                    underlayColor="#ECDAF2D0"
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Map.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Hartă</Text>
                        <Text style={styles.descriptionPaper}>Vezi harta problemelor din oraș</Text>
                    </View>

                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Report')}
                    underlayColor="#ECDAF2D0"
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Flag.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Raportează</Text>
                        <Text style={styles.descriptionPaper}>Raportează o problemă întâlnită</Text>
                    </View>
                </TouchableHighlight>

            </View>

            <View style={styles.paperView}>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Feed')}
                    underlayColor="#ECDAF2D0"
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Sesizari.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Sesizări</Text>
                        <Text style={styles.descriptionPaper}>Toate sesizările utilizatorilor</Text>
                    </View>

                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Profile')}
                    underlayColor="#ECDAF2D0"
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Profile.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Profilul meu</Text>
                        <Text style={styles.descriptionPaper}>Vezi informațiile despre utilizator</Text>
                    </View>
                </TouchableHighlight>

            </View>
            <View style={styles.paperView}>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Settings')}
                    underlayColor="#ECDAF2D0"
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Setari.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Setări</Text>
                        <Text style={styles.descriptionPaper}>Setări aplicație</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => navigation.navigate('Help')}
                    underlayColor="#ECDAF2D0"
                    style={{ borderRadius: 20 }}
                >
                    <View style={styles.paper}>
                        <Image
                            source={require("../assets/Ajutor.png")}
                            style={styles.iconPaper}
                        />
                        <Text style={styles.titlePaper}>Ajutor</Text>
                        <Text style={styles.descriptionPaper}>Află cum să folosești aplicația</Text>
                    </View>
                </TouchableHighlight>

            </View>
            <View style={styles.bottomMenu}>

                <TouchableHighlight
                    // onPress={() => console.log('PressedMenu!')}
                    // onPress={() => {
                    //     navigation.dispatch(DrawerActions.openDrawer());
                    // }}
                    style={{ flex: 1 }}>
                    <View style={styles.bottomMenuTouchable}>
                        <Icon
                            name='md-menu'
                            size={30}
                            color='#593480'
                            style={{ marginRight: 25 }}
                        />
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => console.log('PressedHome!')}
                    style={{ flex: 1 }}>
                    <View style={styles.bottomMenuTouchable}>
                        <Icon
                            name='md-home'
                            size={30}
                            color='#593480'
                            style={{ marginLeft: 25 }}
                        />
                    </View>
                </TouchableHighlight>

            </View>

            <Image
                source={require("../assets/Home.png")}
                style={styles.bottomIcon}
            />

            <StatusBar style="auto" />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ellipse_1: {
        position: "absolute",
        top: "7%",
        right: "0%",
        width: 29,
        height: 61,
    },
    ellipse_2: {
        position: "absolute",
        top: "10%",
        left: "-1%",
        width: 31,
        height: 61,
    },
    basetext: {
        fontSize: 52,
        fontWeight: "bold",
    },
    innertext: {
        fontWeight: "bold",
        color: "#BB6BD9",
    },
    textbox: {
        alignItems: "center",
        marginTop: "9%",
        margin: "10%",
        marginBottom: "2%"
    },
    description: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center'
    },
    paperView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: '100%'
    },
    paper: {
        backgroundColor: "#ECDAF27F",
        width: 150,
        height: 130,
        borderRadius: 20,
        flexDirection: "column",
        alignItems: "center",
    },
    iconPaper: {
        marginTop: 13,
        width: 50,
        height: 50,
    },
    titlePaper: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5
    },
    descriptionPaper: {
        fontSize: 11,
        fontWeight: "400",
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        fontStyle: "italic"
    },
    bottomMenu: {
        flexDirection: 'row',
        width: '100%',
        height: '8%',
        borderTopColor: '#593480',
        borderTopWidth: 0.5,
    },
    bottomIcon: {
        width: screenHeight / 8.3,
        height: screenHeight / 8.3,
        position: "absolute",
        top: "88%",
    },
    bottomMenuTouchable: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fefefe"
    }

})