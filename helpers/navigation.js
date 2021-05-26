import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ReportScreen from '../screens/ReportScreen';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import SuccessScreen from '../screens/SuccessScreen';
import DrawerContent from '../screens/DrawerContent';
import IntroScreen from '../screens/IntroScreen';

const LandingStack = createStackNavigator();
const LoginStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MapStack = createStackNavigator();
const ReportStack = createStackNavigator();
const FeedStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const HelpStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const createDrawer = () =>
    <Drawer.Navigator
        initialRouteName='HomeStack'
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
    <LandingStack.Navigator
        screenOptions={{
            headerShown: false,
            gestureEnabled: false
        }}>
        <LandingStack.Screen name="Landing" component={LandingScreen} />
        <LandingStack.Screen name="LoginStack" component={createLoginStack} />
        <LandingStack.Screen name="Drawer" component={createDrawer} />
    </LandingStack.Navigator>

const createLoginStack = () =>
    <LoginStack.Navigator
        screenOptions={{
            headerShown: false,
            gestureEnabled: false
        }}>
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Drawer" component={createDrawer} />
        <LoginStack.Screen name="Register" component={RegisterScreen} />
        <LoginStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </LoginStack.Navigator>

const createHomeStack = () =>
    <HomeStack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false
        }}>
        <HomeStack.Screen name="Intro" component={IntroScreen} />
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Map" component={MapScreen} />
        <HomeStack.Screen name="Report" component={ReportScreen} />
        <HomeStack.Screen name="Feed" component={FeedScreen} />
        <HomeStack.Screen name="Profile" component={ProfileScreen} />
        <HomeStack.Screen name="Settings" component={SettingsScreen} />
        <HomeStack.Screen name="Help" component={HelpScreen} />
        <HomeStack.Screen name="Success" component={SuccessScreen} />
    </HomeStack.Navigator>

const createMapStack = () =>
    <MapStack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <MapStack.Screen name="Map" component={MapScreen} />
    </MapStack.Navigator>

const createReportStack = () =>
    <ReportStack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <ReportStack.Screen name="Report" component={ReportScreen} />
        <ReportStack.Screen name="Success" component={SuccessScreen} />
        <ReportStack.Screen name="Home" component={HomeScreen} />
    </ReportStack.Navigator>

const createFeedStack = () =>
    <FeedStack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <FeedStack.Screen name="Feed" component={FeedScreen} />
    </FeedStack.Navigator>

const createProfileStack = () =>
    <ProfileStack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>

const createSettingsStack = () =>
    <SettingsStack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>

const createHelpStack = () =>
    <HelpStack.Navigator
        screenOptions={{
            headerShown: false
        }}>
        <HelpStack.Screen name="Help" component={HelpScreen} />
        <HelpStack.Screen name="Intro" component={IntroScreen} />
    </HelpStack.Navigator>