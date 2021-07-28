import React from 'react';
import { Text } from 'react-native';

import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';

import { RestaurantsScreen } from '../../features/restaurants/screens/RestaurantsScreen';

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
				component={() => <Text>Restaurant Detail</Text>}
			/>
		</RestaurantsStack.Navigator>
	);
};
