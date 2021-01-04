import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Image, TouchableOpacity, Switch, Modal, Platform, TouchableHighlight } from "react-native";
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavBar from '../helpers/navbar'
import { colors, screenHeight } from "../helpers/style";
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider } from 'react-native-elements';

export default function SettingsScreen() {

    const [isSwitch, setIsSwitch] = useState(false);
    const [isSwitchDark, setIsSwitchDark] = useState(false);
    const [value, setValueState] = useState('Română');
    const toggleSwitch = () => setIsSwitch(previousState => !previousState);
    const toggleSwitchDark = () => setIsSwitchDark(previousState => !previousState);
    const [pickerVisibility, setPickerVisibility] = useState(false)

    const togglePicker = () => {
        setPickerVisibility(!pickerVisibility)
    }

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
                    <Avatar.Image size={150} source={require("../assets/ProfilePlus.png")} />
                    <View style={styles.avatarTextDiv}>
                        <Text
                            style={styles.avatarText}
                            onPress={() => alert('Incarca poza')}
                        >Încarcă o poză de profil</Text>
                        <Icon name='camera' type="font-awesome-5" size={14} style={{ marginLeft: 5, marginTop: 2, color: colors.textGray }} />
                    </View>
                </View>

                <View style={styles.nameDiv}>
                    <Text style={styles.nameText}>Schimbă numele</Text>
                    <Text style={{ marginLeft: 8 }}>Numele tau curent este: Edi One</Text>
                    <Input
                        placeholder='Scrie aici noul nume'
                        rightIcon={<Icon
                            name='check'
                            size={16}
                            color={colors.textGray}
                        />}
                        inputStyle={{ fontStyle: 'italic' }}
                        containerStyle={{ height: 65 }}
                        errorMessage='ENTER A VALID NAME HERE'
                    />
                    <TouchableOpacity style={styles.confirmButton}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={{ ...styles.confirmButton, width: '100%' }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttonText}>Confirmă schimbarea</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>

                <View style={{ ...styles.nameDiv, height: screenHeight / 2.6, }}>
                    <Text style={styles.nameText}>Schimbă parola</Text>
                    <Input
                        placeholder='Parola veche'
                        rightIcon={<Icon
                            name='check'
                            size={16}
                            color={colors.textGray}
                        />}
                        inputStyle={{ fontStyle: 'italic' }}
                        secureTextEntry={true}
                        containerStyle={{ height: 65 }}
                    />
                    <Input
                        placeholder='Parola nouă'
                        rightIcon={<Icon
                            name='check'
                            size={16}
                            color={colors.textGray}
                        />}
                        secureTextEntry={true}
                        inputStyle={{ fontStyle: 'italic' }}
                        containerStyle={{ height: 65 }}
                    />
                    <Input
                        placeholder='Confirmă parola nouă'
                        rightIcon={<Icon
                            name='check'
                            size={16}
                            color={colors.textGray}
                        />}
                        secureTextEntry={true}
                        inputStyle={{ fontStyle: 'italic' }}
                        containerStyle={{ height: 65 }}

                    />
                    <TouchableOpacity style={styles.confirmButton}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#C17BDB', '#9853C5', '#6C4397']} style={{ ...styles.confirmButton, width: '100%' }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.buttonText}>Confirmă schimbarea</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{ ...styles.nameDiv, justifyContent: 'flex-start', height: screenHeight / 2.8 }}>
                    <Text style={{ ...styles.nameText, marginTop: 5 }}>Notificări</Text>
                    <View style={styles.switchDiv}>
                        <Text style={{ marginLeft: 8 }}>Vreau să primesc notificări de la aplicație</Text>
                        <Switch
                            style={{ transform: Platform.OS ? 'andriod'[{ scaleX: 1.3 }, { scaleY: 1.3 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
                            trackColor={{ false: "#767577", true: "#34C759" }}
                            thumbColor={isSwitch ? colors.white : colors.white}
                            ios_backgroundColor="#767577"
                            onValueChange={toggleSwitch}
                            value={isSwitch}
                        />
                    </View>

                    <Text style={{ ...styles.nameText, marginTop: 5 }}>Dark mode</Text>
                    <View style={styles.switchDiv}>
                        <Text style={{ marginLeft: 8 }}>Activează modul întunecat</Text>
                        <Switch
                            style={{ transform: Platform.OS ? 'andriod'[{ scaleX: 1.3 }, { scaleY: 1.3 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
                            trackColor={{ false: "#767577", true: "#34C759" }}
                            thumbColor={isSwitch ? colors.white : colors.white}
                            ios_backgroundColor="#767577"
                            onValueChange={toggleSwitchDark}
                            value={isSwitchDark}
                        />
                    </View>

                    <Text style={{ ...styles.nameText, marginTop: 5 }}>Alege limba</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.categorySection}>{value}</Text>
                        <Icon style={styles.searchIcon}
                            name="sort-down"
                            size={24}
                            color={colors.black}
                            onPress={() => togglePicker()}
                        />
                    </View>
                    <Divider style={styles.divider} />
                    <Modal visible={pickerVisibility} animationType={"slide"} transparent={true}>
                        <View style={{
                            alignSelf: "center",
                            margin: 20, padding: 20,
                            backgroundColor: "#fbfbfb",
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: "65%",
                            width: "85%",

                        }}>
                            <Text style={{ color: colors.textHelpGray }}>Alege o limbă</Text>
                            <TouchableHighlight
                                underlayColor={colors.lightPurple}
                                onPress={() => {
                                    setValueState("Româna");
                                    togglePicker()
                                }}
                                style={{
                                    padding: 6,
                                    width: "85%",
                                    alignItems: "center",
                                    borderRadius: 20,
                                }}
                            >
                                <Text style={{ fontSize: 18 }}>Română</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                underlayColor='none'
                                onPress={() =>
                                    togglePicker()
                                }
                                style={{
                                    paddingTop: 4,
                                    paddingBottom: 4
                                }}
                            >
                                <Text style={{ color: colors.red, fontSize: 18 }}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </Modal>
                </View>

            </KeyboardAwareScrollView>
            <NavBar />
            <StatusBar style="auto" />
            <Image
                source={require("../assets/Settings.png")}
                style={styles.bottomIcon}
            />
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
    bottomIcon: {
        width: screenHeight / 8.5,
        height: screenHeight / 8.5,
        position: "absolute",
        top: "88%",
    },
    avatarView: {
        flex: 1,
        height: screenHeight / 2.8,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    ellipse1: {
        position: "absolute",
        top: "25%",
        right: "0%",
        width: 35,
        height: 75,
    },
    ellipse2: {
        position: "absolute",
        top: "58%",
        left: "-1%",
        width: 50,
        height: 100,
    },
    avatarTextDiv: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    avatarText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        color: colors.textGray
    },
    nameDiv: {
        flex: 1,
        height: screenHeight / 4.3,
        alignSelf: 'center',
        width: "85%",
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    nameText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 8

    },
    confirmButton: {
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        width: '55%',
        alignSelf: "center",
        marginTop: 5
    },
    buttonText: {
        fontSize: 14,
        color: colors.white,
        fontWeight: "bold",
    },
    switchDiv: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    categorySection: {
        flex: 8.9,
        fontSize: 16,
        alignSelf: "flex-end",
        marginBottom: '2%',
        marginLeft: 8,
        marginTop: 10
    },
    searchIcon: {
        flex: 1.1,
        alignSelf: "center",
        marginLeft: 10,
        paddingBottom: 5
    },
    divider: {
        backgroundColor: colors.textGray,
        marginBottom: "7%",
        width: "95%",
        alignSelf: "center"
    },


})