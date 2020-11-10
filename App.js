import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';



export default function App() {
	return (
		// <View style={styles.container}>
		// 	<Image source={require("./assets/Icon.png")} style={styles.icon} />
		// 	<Text style={styles.basetext}>
		// 		Repor<Text style={styles.innertext}>TM</Text>
		// 	</Text>
		// 	<Image
		// 		source={require("./assets/Ellipse_1.png")}
		// 		style={styles.ellipse_1}
		// 	/>
		// 	<Image
		// 		source={require("./assets/Ellipse_2.png")}
		// 		style={styles.ellipse_2}
		// 	/>
		// 	<StatusBar style="auto" />
		// </View>
		<LoginScreen />
		// <RegisterScreen />



	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	ellipse_1: {
		position: "absolute",
		top: "20%",
		right: "0%",
		width: 59,
		height: 124,
	},
	ellipse_2: {
		position: "absolute",
		top: "75%",
		left: "-1%",
		width: 52,
		height: 103,
	},
	icon: {
		width: 200,
		height: 200,
		marginBottom: 30,
	},
	basetext: {
		fontSize: 48,
		fontWeight: "bold",
	},
	innertext: {
		fontWeight: "bold",
		color: "#BB6BD9",
	},
});
