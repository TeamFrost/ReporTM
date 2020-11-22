import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';

import { firebase } from './config/firebaseConfig';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ReportScreen from './screens/ReportScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpScreen from './screens/HelpScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

	const [user, setUser] = useState(null)

	useEffect(() => {
		const usersRef = firebase.firestore().collection('users');
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				usersRef
					.doc(user.uid)
					.get()
					.then((document) => {
						const userData = document.data()
						setUser(userData)
					})
					.catch((error) => {
						setLoading(false)

					})
			}
		})
	}, []);


	const createLandingStack = () =>
		<Stack.Navigator
			initialRouteName="Landing"
			screenOptions={{
				headerShown: false,
				gestureEnabled: false
			}}>
			<Stack.Screen name="Landing" component={LandingScreen} />
			<Stack.Screen name="Drawer" component={createDrawer} />
			<Stack.Screen name="LoginStack" component={createLoginStack} />

		</Stack.Navigator>

	const createLoginStack = () =>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			{user ? (
				<Stack.Screen name="Drawer" component={createDrawer} />
			) : (
					<>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Register" component={RegisterScreen} />
					</>

				)}
		</Stack.Navigator>

	const createHomeStack = () =>
		<Stack.Navigator
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
			<Stack.Screen name="Drawer" component={createDrawer} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>

	const createMapStack = () =>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Map" component={MapScreen} />
			<Stack.Screen name="HomeStack" component={createHomeStack} />
			<Stack.Screen name="Drawer" component={createDrawer} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>

	const createReportStack = () =>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Report" component={ReportScreen} />
			<Stack.Screen name="HomeStack" component={createHomeStack} />
			<Stack.Screen name="Drawer" component={createDrawer} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>

	const createFeedStack = () =>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Feed" component={FeedScreen} />
			<Stack.Screen name="HomeStack" component={createHomeStack} />
			<Stack.Screen name="Drawer" component={createDrawer} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>

	const createProfileStack = () =>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Profile" component={ProfileScreen} />
			<Stack.Screen name="HomeStack" component={createHomeStack} />
			<Stack.Screen name="Drawer" component={createDrawer} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>

	const createSettingsStack = () =>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Settings" component={SettingsScreen} />
			<Stack.Screen name="HomeStack" component={createHomeStack} />
			<Stack.Screen name="Drawer" component={createDrawer} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>

	const createHelpStack = () =>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Help" component={HelpScreen} />
			<Stack.Screen name="HomeStack" component={createHomeStack} />
			<Stack.Screen name="Drawer" component={createDrawer} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>

	const DrawerContent = (props) => {
		return (
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
				<DrawerItem label="Deconectare" onPress={() => {
					firebase.auth().signOut()
						.then(
							props.navigation.reset({
								index: 0,
								routes: [{ name: 'Login' }],
							}))
						.catch(error => {
							alert(error)
						});
				}} />
			</DrawerContentScrollView>
		);
	}

	const createDrawer = () =>
		<Drawer.Navigator
			initialRouteName="HomeStack"
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

	return (
		<NavigationContainer initialRouteName="LandingStack">
			{createLandingStack()}
		</NavigationContainer>
	);
}
