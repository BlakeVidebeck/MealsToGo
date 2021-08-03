import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ThemeProvider } from 'styled-components/native';

import {
	useFonts as useOswald,
	Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

import { theme } from './src/infrastructure/theme/index';
import { Navigation } from './src/infrastructure/navigation';

import { RestaurantsContextProvider } from './src/services/restaurants/restaurantsContext';
import { LocationContextProvider } from './src/services/location/locationContext';
import { FavouritesContextProvider } from './src/services/favourites/favouritesContext';
import { AuthenticationContextProvider } from './src/services/authentication/authenticationContext';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyCPum7L-ST0aXpj_66UVjNJxUd5dk9H_as',
	authDomain: 'mealstogo-6cc2c.firebaseapp.com',
	projectId: 'mealstogo-6cc2c',
	storageBucket: 'mealstogo-6cc2c.appspot.com',
	messagingSenderId: '871681825824',
	appId: '1:871681825824:web:5f3ff18ead565c13323045',
};
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default function App() {
	const [oswaldLoaded] = useOswald({
		Oswald_400Regular,
	});
	const [latoLoaded] = useLato({
		Lato_400Regular,
	});

	if (!oswaldLoaded || !latoLoaded) {
		return null;
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<AuthenticationContextProvider>
					<FavouritesContextProvider>
						<LocationContextProvider>
							<RestaurantsContextProvider>
								<Navigation />
							</RestaurantsContextProvider>
						</LocationContextProvider>
					</FavouritesContextProvider>
				</AuthenticationContextProvider>
			</ThemeProvider>
			<ExpoStatusBar style='auto' />
		</>
	);
}
