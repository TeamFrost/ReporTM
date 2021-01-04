import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ReportScreen from '../screens/ReportScreen';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import DrawerContent from '../screens/DrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const createDrawer = () =>
    <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
    >
        <Drawer.Screen
            name="HomeStack"
            component={createHomeStack}
            options={{
                title: "Acasă"
            }}
        />
        <Drawer.Screen
            name="MapStack"
            component={createMapStack}
            options={{
                title: "Hartă"
            }} />

        <Drawer.Screen
            name="ReportStack"
            component={createReportStack}
            options={{
                title: "Raportează problemă"
            }}
        />
        <Drawer.Screen
            name="FeedStack"
            component={createFeedStack}
            options={{
                title: "Sesizări"
            }}
        />
        <Drawer.Screen
            name="ProfileStack"
            component={createProfileStack}
            options={{
                title: "Profilul meu"
            }}
        />
        <Drawer.Screen
            name="SettingsStack"
            component={createSettingsStack}
            options={{
                title: "Setări"
            }}
        />
        <Drawer.Screen
            name="HelpStack"
            component={createHelpStack}
            options={{
                title: "Ajutor"
            }}
        />
    </Drawer.Navigator>

export const createLandingStack = () =>
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            gestureEnabled: false
        }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Drawer" component={createDrawer} />
    </Stack.Navigator>

const createHomeStack = () =>
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>

const createMapStack = () =>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>

const createReportStack = () =>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>

const createFeedStack = () =>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Feed" component={FeedScreen} />
    </Stack.Navigator>

const createProfileStack = () =>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>

const createSettingsStack = () =>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>

const createHelpStack = () =>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>