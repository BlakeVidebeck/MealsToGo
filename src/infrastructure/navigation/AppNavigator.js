import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RestaurantsNavigator } from './RestaurantsNavigator';
import { MapScreen } from '../../features/map/screens/MapScreen';
import { CheckoutScreen } from '../../features/checkout/screens/CheckoutScreen';

import { CartContextProvider } from '../../services/cart/cartContext';
import { FavouritesContextProvider } from '../../services/favourites/favouritesContext';
import { LocationContextProvider } from '../../services/location/locationContext';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurantsContext';
import { SettingsNavigator } from './SettingsNavigator';
import { CheckoutNavigator } from './CheckoutNavigator';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Restaurants: 'md-restaurant',
	Map: 'md-map',
	Settings: 'md-settings',
	Checkout: 'md-cart',
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
					<CartContextProvider>
						<Tab.Navigator
							screenOptions={createScreenOptions}
							tabBarOptions={{
								activeTintColor: colors.brand.primary,
								inactiveTintColor: colors.brand.muted,
							}}
						>
							<Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
							<Tab.Screen name='Checkout' component={CheckoutNavigator} />
							<Tab.Screen name='Map' component={MapScreen} />
							<Tab.Screen name='Settings' component={SettingsNavigator} />
						</Tab.Navigator>
					</CartContextProvider>
				</RestaurantsContextProvider>
			</LocationContextProvider>
		</FavouritesContextProvider>
	);
};
