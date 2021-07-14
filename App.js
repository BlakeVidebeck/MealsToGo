import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { theme } from './src/infrastructure/theme/index';
import RestaurantsScreen from './src/features/restaurants/screens/RestaurantsScreen';

export default function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<RestaurantsScreen />
				<ExpoStatusBar style='auto' />
			</ThemeProvider>
		</>
	);
}
