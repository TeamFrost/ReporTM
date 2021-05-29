import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import { ro, en } from "../helpers/dictionary";
import { screenHeight, themeColors } from "../helpers/style";
import Ellipse from "../assets/Ellipse"
import Slide1 from "../assets/Slide1";
import Slide2 from "../assets/Slide2";
import Slide3 from "../assets/Slide3";
import Slide4 from "../assets/Slide4";
import Slide5 from "../assets/Slide5";

const slides = [
    {
        key: "1",
        title: i18n.t("introSlide1Title"),
        text: i18n.t("introSlide1Desc"),
    },
    {
        key: "2",
        title: i18n.t("introSlide2Title"),
        text: i18n.t("introSlide2Desc"),
    },
    {
        key: "3",
        title: i18n.t("introSlide3Title"),
        text: i18n.t("introSlide3Desc"),
    },
    {
        key: "4",
        title: i18n.t("introSlide4Title"),
        text: i18n.t("introSlide4Desc"),
    },
    {
        key: "5",
        title: i18n.t("introSlide5Title"),
        text: i18n.t("introSlide5Desc"),
    },
];

const mapStateToProps = (state) => ({ theme: state.theme, language: state.translations.language, });

function IntroScreen({ ...props }) {
    const { navigation, theme, language } = props
    const [styles, setStyles] = useState(styleSheetFactory(themeColors.themeLight))
    const [colors, setColors] = useState(themeColors.themeLight)

    useEffect(() => {
        if (theme) {
            setColors(theme.theme)
            setStyles(styleSheetFactory(theme.theme))
        }
    }, [theme])

    i18n.fallbacks = true
    i18n.translations = { ro, en }
    i18n.locale = language

    const renderNextButton = () => {
        return (
            <View style={styles.nextButton}>
                <Text style={styles.nextText}>{i18n.t('introNext')}</Text>
            </View>
        );
    }
    const renderPrevButton = () => {
        return (
            <View style={{ ...styles.nextButton, marginLeft: 5 }}>
                <Text style={styles.nextText}>{i18n.t('introBack')}</Text>
            </View>
        );
    }
    const renderDoneButton = () => {
        return (
            <View style={styles.nextButton}>
                <Text style={styles.nextText}>{i18n.t('introDone')}</Text>
            </View>
        );
    }
    const renderSkipButton = () => {
        return (
            <View style={{ ...styles.nextButton, marginLeft: 5 }}>
                <Text style={styles.nextText}>{i18n.t('introSkip')}</Text>
            </View>
        );
    }

    const pickSlideImage = (key) => {
        switch (key) {
            case "1": {
                return (
                    <View style={styles.svgGroup}>
                        <Ellipse width={220} height={220} style={styles.svgPart} />
                        <Slide1 width={190} height={190} style={{ ...styles.svgPart, bottom: 10 }} />
                    </View>
                );
            }
            case "2": {
                return (
                    <View style={styles.svgGroup}>
                        <Ellipse width={220} height={220} style={styles.svgPart} />
                        <Slide2 width={190} height={190} style={{ ...styles.svgPart, bottom: 10 }} />
                    </View>
                );
            }
            case "3": {
                return (
                    <View style={styles.svgGroup}>
                        <Ellipse width={220} height={220} style={styles.svgPart} />
                        <Slide3 width={190} height={190} style={{ ...styles.svgPart, bottom: 10 }} />
                    </View>
                );
            }
            case "4": {
                return (
                    <View style={styles.svgGroup}>
                        <Ellipse width={220} height={220} style={styles.svgPart} />
                        <Slide4 width={200} height={200} style={{ ...styles.svgPart, bottom: 10 }} />
                    </View>
                );
            }
            case "5": {
                return (
                    <View style={styles.svgGroup}>
                        <Ellipse width={220} height={220} style={styles.svgPart} />
                        <Slide5 width={200} height={200} style={{ ...styles.svgPart, bottom: 15 }} />
                    </View>
                );
            }
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                {pickSlideImage(item.key)}
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

const styleSheetFactory = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        height: screenHeight,
        width: '100%',
        backgroundColor: colors.introBackground,
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
        color: colors.textColor
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
    },
    svgGroup: {
        height: screenHeight / 2.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    svgPart: {
        position: 'absolute',
        bottom: 0
    }
})

export default connect(mapStateToProps)(IntroScreen);
