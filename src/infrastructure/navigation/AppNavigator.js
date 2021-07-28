import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { SafeArea } from '../../components/utility/SafeAreaComponent';
import { RestaurantsNavigator } from './RestaurantsNavigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Restaurants: 'md-restaurant',
	Map: 'md-map',
	Settings: 'md-settings',
};

const Settings = () => {
	return (
		<SafeArea>
			<Text>Settings Screen</Text>
		</SafeArea>
	);
};

const Map = () => {
	return (
		<SafeArea>
			<Text>Map Screen</Text>
		</SafeArea>
	);
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
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={createScreenOptions}
				tabBarOptions={{
					activeTintColor: 'tomato',
					inactiveTintColor: 'gray',
				}}
			>
				<Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
				<Tab.Screen name='Map' component={Map} />
				<Tab.Screen name='Settings' component={Settings} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};
