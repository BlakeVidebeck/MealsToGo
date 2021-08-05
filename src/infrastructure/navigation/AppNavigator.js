import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RestaurantsNavigator } from './RestaurantsNavigator';
import { MapScreen } from '../../features/map/screens/MapScreen';

import { FavouritesContextProvider } from '../../services/favourites/favouritesContext';
import { LocationContextProvider } from '../../services/location/locationContext';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurantsContext';
import { SettingsNavigator } from './SettingsNavigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Restaurants: 'md-restaurant',
	Map: 'md-map',
	Settings: 'md-settings',
};
const createScreenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];
	return {
		tabBarIcon: ({ size, color }) => (
			<Ionicons name={iconName} size={size} color={color} />
		),
	};
};

export const AppNavigator = () => {
	return (
		<FavouritesContextProvider>
			<LocationContextProvider>
				<RestaurantsContextProvider>
					<Tab.Navigator
						screenOptions={createScreenOptions}
						tabBarOptions={{
							activeTintColor: 'tomato',
							inactiveTintColor: 'gray',
						}}
					>
						<Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
						<Tab.Screen name='Map' component={MapScreen} />
						<Tab.Screen name='Settings' component={SettingsNavigator} />
					</Tab.Navigator>
				</RestaurantsContextProvider>
			</LocationContextProvider>
		</FavouritesContextProvider>
	);
};
