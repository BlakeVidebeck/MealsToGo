import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import { Spacer } from '../../../components/spacer/SpacerComponent';
import { Text } from '../../../components/typography/TextComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';

import { FavouritesContext } from '../../../services/favourites/favouritesContext';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard';
import { RestaurantList } from '../../restaurants/components/RestaurantScreenStyles';
import { NoFavouritesArea } from '../components/FavouritesScreenStyles';

export const FavouritesScreen = ({ navigation }) => {
	const { favourites } = useContext(FavouritesContext);

	return favourites.length ? (
		<SafeArea>
			<RestaurantList
				data={favourites}
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
	) : (
		<NoFavouritesArea>
			<Text>No Favourites yet</Text>
		</NoFavouritesArea>
	);
};
