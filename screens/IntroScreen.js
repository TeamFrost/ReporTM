import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import Svg from 'react-native-svg';
import { colors, screenHeight } from "../helpers/style";


const slides = [
    {
        key: "1",
        title: "Identificarea unei probleme",
        text: "În momentul în care sesizezi o problemă în oraș este foarte usor să o faci mai vizibilă către cetățeni și administrație. Trebuie doar să îți deschizi telefonul și să pornești \nReporTM.",
        image: require('../assets/Slide1.png')
    },
    {
        key: "2",
        title: "Locația problemei",
        text: "Adăugarea locației pe hartă este un pas foarte importat și se poate face în două moduri: \n\n ‣ prin oferirea locației curente, caz în care se apasă pe butonul ⦿ de lângă locație din formular. \n\n  ‣ prin oferirea unei locații specifice. Pentru a face asta utilizatorul trebuie să meargă pe ecranul HARTĂ și să țină apăsat pe o locație până ce este redirecționat pe pagina de raportare.",
        image: require('../assets/Slide2.png')
    },
    {
        key: "3",
        title: "Categoria din care face parte",
        text: "Mai departe, trebui să alegi în ce categorie se încadrează problema ta dintre cele 6 disponibile: \n\n ‣ Gropi \n‣ Gunoi \n‣ Graffiti \n‣ Iluminat \n‣ Poluare \n‣ Parcare \n ",
        image: require('../assets/Slide3.png')
    },
    {
        key: "4",
        title: "Imaginea",
        text: "Adăugarea unei fotografii este esențială pentru a oferi credibilitate sesizării, dar și pentru a o face mai bine înțeleasă de ceilalți utilizatori. \n\n Poți face o poză cu telefonul pe loc sau poți alege una pe care o ai deja în galerie. După încărcare va apărea o iconiță verde ✓, care confirmă încărcarea cu succes.",
        image: require('../assets/Slide4.png')
    },
    {
        key: "5",
        title: "Descrierea",
        text: "Ultimul pas înainte de a trimite formularul este de a oferi un context sesizării și de a descrie în câteva cuvinte problema.\n\n Ceva scurt și la obiect care să prezinte situația ar finaliza în mod adecvat raportarea.",
        image: require('../assets/Slide5.png')
    },
];

export default function IntroScreen({ ...props }) {
    const { navigation } = props

    const renderNextButton = () => {
        return (
            <View style={styles.nextButton}>
                <Text style={styles.nextText}>Înainte</Text>
            </View>
        );
    }
    const renderPrevButton = () => {
        return (
            <View style={{ ...styles.nextButton, marginLeft: 5 }}>
                <Text style={styles.nextText}>Înapoi</Text>
            </View>
        );
    }
    const renderDoneButton = () => {
        return (
            <View style={styles.nextButton}>
                <Text style={styles.nextText}>Gata</Text>
            </View>
        );
    }
    const renderSkipButton = () => {
        return (
            <View style={{ ...styles.nextButton, marginLeft: 5 }}>
                <Text style={styles.nextText}>Sari</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Image source={item.image} style={{ marginTop: screenHeight / 10 }} />
                <View style={styles.textView}>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={{ ...styles.text, fontSize: 16, fontWeight: "normal", position: "absolute", top: screenHeight / 8 }}>{item.text}</Text>
                </View>
            </View>
        );
    }


    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            activeDotStyle={styles.dot}
            dotStyle={styles.dotInactive}
            showNextButton
            showPrevButton
            showSkipButton
            renderNextButton={renderNextButton}
            renderPrevButton={renderPrevButton}
            renderDoneButton={renderDoneButton}
            renderSkipButton={renderSkipButton}
            onDone={() => { navigation.navigate("Home") }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: screenHeight,
        width: '100%',
        backgroundColor: colors.introLightPurple,
        alignItems: "center",
    },
    textView: {
        height: screenHeight / 2,
        width: '80%',
        alignItems: "center",
    },
    text: {
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 20,
    },
    dot: {
        backgroundColor: colors.darkPurple,
    },
    dotInactive: {
        borderWidth: 1,
        borderColor: colors.darkPurple,
    },
    nextButton: {
        width: 70,
        height: 30,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 5,
        marginRight: 5
    },
    nextText: {
        fontSize: 20,
        color: colors.darkPurple,
        fontWeight: 'bold'
    }
})
