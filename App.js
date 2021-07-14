import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
	return (
		<>
			{/* safe area view is for ios - statusbar eg. */}
			<SafeAreaView style={styles.container}>
				<View style={styles.search}>
					<Text>search</Text>
				</View>
				<View style={styles.list}>
					<Text>list</Text>
				</View>
			</SafeAreaView>
			<ExpoStatusBar style='auto' />
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// current height of status bar for android
		marginTop: StatusBar.currentHeight,
	},
	search: {
		backgroundColor: 'green',
		padding: 16,
	},
	list: {
		backgroundColor: 'blue',
		flex: 1,
		padding: 16,
	},
});
