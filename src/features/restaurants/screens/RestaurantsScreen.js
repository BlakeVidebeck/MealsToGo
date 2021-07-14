import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantInfoCard';

// safe area view is for ios - statusbar eg.
const RestaurantScreenContainer = styled(SafeAreaView)`
	flex: 1;
	/* current height of status bar for android */
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
`;

const SearchContainer = styled.View`
	padding: ${(props) => props.theme.space[3]};
`;

const RestaurantListContainer = styled.View`
	flex: 1;
	padding: ${(props) => props.theme.space[3]};
`;

const RestaurantsScreen = () => {
	return (
		<>
			<RestaurantScreenContainer>
				<SearchContainer>
					<Searchbar />
				</SearchContainer>
				<RestaurantListContainer>
					<RestaurantInfoCard />
				</RestaurantListContainer>
			</RestaurantScreenContainer>
		</>
	);
};

export default RestaurantsScreen;
