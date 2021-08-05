import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';
import { Search } from '../components/searchComponent';

import { RestaurantsContext } from '../../../services/restaurants/restaurantsContext';
import { FavouritesContext } from '../../../services/favourites/favouritesContext';
import { FavouritesBar } from '../../../components/favourites/FavouritesBarComponent';
import {
	Loading,
	LoadingContainer,
	RestaurantList,
} from '../components/RestaurantScreenStyles';

export const RestaurantsScreen = ({ navigation }) => {
	// navigate gets passed down as a prop to restaurant screen from the naviagtor
	const { restaurants, isLoading } = useContext(RestaurantsContext);
	const { favourites } = useContext(FavouritesContext);
	const [isToggled, setIsToggled] = useState(false);

	return (
		<>
			<SafeArea>
				{isLoading && (
					<LoadingContainer>
						<Loading size={50} animating={true} color={Colors.blue300} />
					</LoadingContainer>
				)}
				{/* search bar */}
				<Search
					isFavouritesToggled={isToggled}
					onFavouritesToggle={() => setIsToggled(!isToggled)}
				/>
				{/*  favourites bar */}
				{isToggled && (
					<FavouritesBar
						favourites={favourites}
						onNavigate={navigation.navigate}
					/>
				)}
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
