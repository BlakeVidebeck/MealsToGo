import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';
import { Search } from '../components/searchComponent';

import { RestaurantsContext } from '../../../services/restaurants/restaurantsContext';

const RestaurantList = styled(FlatList).attrs({
	contentContainerStyle: {
		padding: 16,
	},
})``;

const Loading = styled(ActivityIndicator)`
	margin-left: -25px;
`;

const LoadingContainer = styled.View`
	position: absolute;
	top: 50%;
	left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
	// navigate gets passed down as a prop to restaurant screen from the naviagtor
	const { restaurants, isLoading, error } = useContext(RestaurantsContext);

	return (
		<>
			<SafeArea>
				{isLoading && (
					<LoadingContainer>
						<Loading size={50} animating={true} color={Colors.blue300} />
					</LoadingContainer>
				)}
				<Search />
				<RestaurantList
					data={restaurants}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('RestaurantDetail', {
										restaurant: item,
									})
								}
							>
								<Spacer position='bottom' size='large'>
									<RestaurantInfoCard restaurant={item} />
								</Spacer>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item) => item.name}
				/>
			</SafeArea>
		</>
	);
};
