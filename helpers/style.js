import { Dimensions } from "react-native";

export const screenHeight = Math.round(Dimensions.get('window').height);
export const screenWidth = Math.round(Dimensions.get('window').width);

// export const colors = {
//     white: '#FFF',
//     black: '#000',
//     darkPurple: '#593480',
//     lightPurple: '#ECDAF27F',
//     linkBlue: '#0000F0',
//     pressedLightPurple: '#ECDAF2D0',
//     pressedWhite: '#FEFEFE',
//     purple: '#BB6BD9',
//     purple2: '#B269CD',
//     red: "#D35933",
//     searchBarGray: '#E4E0E9',
//     shadowGray: '#CCC',
//     textGray: '#8F92A1',
//     textHelpGray: '#ADADAD',
//     textYellow: '#FFC61B',
//     introLightPurple: '#F8F5FC',


//     groapa: "#d37e53",
//     graffiti: "#593480",
//     gunoi: "#C0EAFF",
//     iluminat: "#FFCE3C",
//     poluare: "#83b1cb",
//     parcare: "#9c280e",
// }

const themeLight = {
    white: '#FFF',
    backgroundColor: "#FFFFFF",
    navColor: "#FEFEFE",
    navIconColor: "#593480",
    navStroke: "#593480",
    textColor: "#000000",
    homeCardsColor: "#ECDAF27F",
    drawerColor: "#ECDAF27F",
    drawerSectionColor: "#BB6BD9",
    pressedHomeCardsColor: "#ECDAF2D0",
    purple: "#BB6BD9",
    darkPurple: "#593480",
    alwaysDarkPurple: "#593480",
    textGray: "#8F92A1",
    textYellow: "#FFC61B",
    searchBarGray: "#E4E0E9",
    tooltipWhite: "#FFFFFF", //searchBarInput, buttons & tooltip
    input: "#FFFFFF",
    inputBorder: "#8F92A1",
    divider: "#8F92A1",
    modalCancel: "#D35933",
    modalColor: "#FCFCFC",
    modalTextHelp: "#ADADAD",
    feedCards: "#FBF2FE",
    upvotePressed: "#6CAF5F",
    linkBlue: "#0000F0",
    introBackground: "#F8F5FC",
    shadowGray: "#CCC",


    groapa: "#d37e53",
    graffiti: "#593480",
    gunoi: "#C0EAFF",
    iluminat: "#FFCE3C",
    poluare: "#83b1cb",
    parcare: "#9c280e",
}

const themeDark = {
    white: '#FFFFFF',
    backgroundColor: "#242424",
    navColor: "#121212",
    navIconColor: "#FFFFFF",
    navStroke: "#000000",
    textColor: "#FFFFFF",
    homeCardsColor: "#505050",
    drawerColor: "#121212",
    drawerSectionColor: "#593480",
    pressedHomeCardsColor: "#50505080",
    purple: "#BB6BD9",
    darkPurple: "#BB6BD9",
    alwaysDarkPurple: "#593480",
    textGray: "#DBDBDB",
    textYellow: "#FFC61B",
    searchBarGray: "#505050",
    tooltipWhite: "#121212", //searchBarInput, buttons & tooltip
    input: "#505050",
    inputBorder: "#9E9E9E",
    divider: "#FFFFFF",
    modalCancel: "#CF6679",
    modalColor: "#121212",
    modalTextHelp: "#DBDBDB",
    feedCards: "#121212",
    upvotePressed: "#6CAF5F",
    linkBlue: "#8A8AFF",
    introBackground: "#242424",
    shadowGray: "#000",

    groapa: "#d37e53",
    graffiti: "#593480",
    gunoi: "#C0EAFF",
    iluminat: "#FFCE3C",
    poluare: "#83b1cb",
    parcare: "#9c280e",
}

//harta pe dark

export const colors = themeDark;

export const mapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
];