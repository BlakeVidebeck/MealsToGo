import React from 'react';

import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';

import { RestaurantsScreen } from '../../features/restaurants/screens/RestaurantsScreen';
import { RestaurantDetailScreen } from '../../features/restaurants/screens/RestaurantDetailScreen';

const RestaurantsStack = createStackNavigator();

export const RestaurantsNavigator = () => {
	return (
		<RestaurantsStack.Navigator
			headerMode='none'
			screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
		>
			<RestaurantsStack.Screen
				name='Restaurants'
				component={RestaurantsScreen}
			/>
			<RestaurantsStack.Screen
				name='RestaurantDetail'
				component={RestaurantDetailScreen}
			/>
		</RestaurantsStack.Navigator>
	);
};
