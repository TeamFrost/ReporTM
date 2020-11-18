import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, SafeAreaView, StyleSheet, TouchableHighlight } from "react-native";

export default function HomeScreen({ navigation }) {

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
                    onPress={() => console.log('Pressed1!')}
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
                    onPress={() => console.log('Pressed2!')}
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
                    onPress={() => console.log('Pressed3!')}
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
                    onPress={() => console.log('Pressed4!')}
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
                    onPress={() => console.log('Pressed5!')}
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
                    onPress={() => console.log('Pressed6!')}
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
            </View>
            <Image
                source={require("../assets/Home.png")}
                style={styles.icon}
            />
            <StatusBar style="auto" />
        </View>
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
        marginTop: "15%",
        margin: "10%",
        marginBottom: "0%"

    },
    description: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 18,
        textAlign: 'center'
    },
    bottomMenu: {
        backgroundColor: "#cacaca",
        width: '100%',
        height: '10%',
    },
    icon: {
        width: 100,
        height: 100,
        position: "absolute",
        top: "87%",
    },
    paper: {
        backgroundColor: "#ECDAF27F",
        width: 140,
        height: 130,
        borderRadius: 20,
        flexDirection: "column",
        alignItems: "center",
    },
    paperView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: '100%'
    },
    iconPaper: {
        marginTop: 15,
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
        marginLeft: 10,
        marginRight: 10,
        fontStyle: "italic"

    }

})