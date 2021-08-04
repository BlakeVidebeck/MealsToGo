import React, { useContext } from 'react';
import { Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { SafeArea } from '../../components/utility/SafeAreaComponent';
import { RestaurantsNavigator } from './RestaurantsNavigator';
import { MapScreen } from '../../features/map/screens/MapScreen';

import { AuthenticationContext } from '../../services/authentication/authenticationContext';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Restaurants: 'md-restaurant',
	Map: 'md-map',
	Settings: 'md-settings',
};

const Settings = () => {
	const { onLogout } = useContext(AuthenticationContext);
	return (
		<SafeArea>
			<Text>Settings Screen</Text>
			<Button title='logout' onPress={() => onLogout()} />
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
		<Tab.Navigator
			screenOptions={createScreenOptions}
			tabBarOptions={{
				activeTintColor: 'tomato',
				inactiveTintColor: 'gray',
			}}
		>
			<Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
			<Tab.Screen name='Map' component={MapScreen} />
			<Tab.Screen name='Settings' component={Settings} />
		</Tab.Navigator>
	);
};
