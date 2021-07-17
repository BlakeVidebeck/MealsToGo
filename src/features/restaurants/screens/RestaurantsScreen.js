import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';

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
			<SafeArea>
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
			</SafeArea>
		</>
	);
};

export default RestaurantsScreen;
