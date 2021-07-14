import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantInfoCard';

const RestaurantsScreen = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const onChangeSearch = (query) => setSearchQuery(query);
	return (
		<>
			{/* safe area view is for ios - statusbar eg. */}
			<SafeAreaView style={styles.container}>
				<View style={styles.search}>
					<Searchbar
						placeholder='Search'
						onChangeText={onChangeSearch}
						value={searchQuery}
					/>
				</View>
				<View style={styles.list}>
					<RestaurantInfoCard />
				</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// current height of status bar for android
		marginTop: StatusBar.currentHeight,
	},
	search: {
		padding: 16,
	},
	list: {
		backgroundColor: 'blue',
		flex: 1,
		padding: 16,
	},
});

export default RestaurantsScreen;
