import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

import { Spacer } from '../spacer/SpacerComponent';
import { CompactRestaurantInfo } from '../restaurant/CompactRestaurantInfo';
import { Text } from '../typography/TextComponent';

const FavouritesWrapper = styled(Card)`
	padding: 10px;
	z-index: 999;
	border-radius: 15px;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
	if (!favourites.length) {
		return null;
	}
	return (
		<FavouritesWrapper elevation={3}>
			<Spacer position='left' size='medium'>
				<Text variant='caption'>Favourites</Text>
			</Spacer>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{favourites.map((restaurant) => {
					const key = restaurant.name;
					return (
						<Spacer key={key} position='left' size='medium'>
							<TouchableOpacity
								onPress={() =>
									onNavigate('RestaurantDetail', {
										restaurant,
									})
								}
							>
								<CompactRestaurantInfo restaurant={restaurant} />
							</TouchableOpacity>
						</Spacer>
					);
				})}
			</ScrollView>
		</FavouritesWrapper>
	);
};
