import React from "react";
import 'react-native-gesture-handler';

//Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createLandingStack } from './helpers/navigation'

//Redux imports
import { Provider } from 'react-redux'
import { store } from './redux/store';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				{createLandingStack()}
			</NavigationContainer>
		</Provider>
	);
}
