import React, { useEffect, useRef, useState } from "react";
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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

	const [loading, setLoading] = useState(true)
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
						setLoading(false)
						setUser(userData)
					})
					.catch((error) => {
						setLoading(false)
					});
			} else {
				setLoading(false)
			}
		});
	}, []);

	if (loading) {
		return (
			<></>
		)
	}

	const createHomeStack = () =>
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name="Landing" component={LandingScreen} />

			{user ? (
				<>
					<Stack.Screen
						name="Drawer"
						children={createDrawer}
					/>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Map" component={MapScreen} />
					<Stack.Screen name="Report" component={ReportScreen} />
					<Stack.Screen name="Feed" component={FeedScreen} />
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen name="Settings" component={SettingsScreen} />
					<Stack.Screen name="Help" component={HelpScreen} />

				</>
			) : (
					<>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Register" component={RegisterScreen} />
					</>
				)}
		</Stack.Navigator>

	createDrawer = () =>
		<Drawer.Navigator>
			<Drawer.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Acasă"
				}}
			/>
			<Drawer.Screen
				name="Map"
				component={MapScreen}
				options={{
					title: "Hartă"
				}} />

			<Drawer.Screen
				name="Report"
				component={ReportScreen}
				options={{
					title: "Raportează problemă"
				}}
			/>

			<Drawer.Screen
				name="Feed"
				component={FeedScreen}
				options={{
					title: "Sesizări"
				}}
			/>
			<Drawer.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					title: "Profilul meu"
				}}
			/>
			<Drawer.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					title: "Setări"
				}}
			/>
			<Drawer.Screen
				name="Help"
				component={HelpScreen} options={{
					title: "Ajutor"
				}}
			/>
			{/* <Drawer.Screen
				name="Logout"
				options={{
					title: "Deconectare"
				}}
			/> */}
		</Drawer.Navigator>


	return (
		<NavigationContainer>
			{createHomeStack()}
		</NavigationContainer>
	);
}
