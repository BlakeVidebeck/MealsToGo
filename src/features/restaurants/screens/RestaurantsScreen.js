import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import { Spacer } from '../../../components/spacer/SpacerComponent';

// safe area view is for ios - statusbar eg.
const RestaurantScreenContainer = styled(SafeAreaView)`
	flex: 1;
	/* current height of status bar for android */
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
`;

const SearchContainer = styled.View`
	padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
	contentContainerStyle: {
		padding: 16,
	},
})``;

const RestaurantsScreen = () => {
	return (
		<>
			<RestaurantScreenContainer>
				<SearchContainer>
					<Searchbar />
				</SearchContainer>
				<RestaurantList
					data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]}
					renderItem={() => (
						<Spacer position='bottom' size='large'>
							<RestaurantInfoCard />
						</Spacer>
					)}
					keyExtractor={(item) => item.name}
				/>
			</RestaurantScreenContainer>
		</>
	);
};

export default RestaurantsScreen;
