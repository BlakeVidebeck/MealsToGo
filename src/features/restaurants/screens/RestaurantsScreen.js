import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors } from 'react-native-paper';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { Text } from '../../../components/typography/TextComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';
import { Search } from '../components/searchComponent';
import { FadeInView } from '../../../components/animations/fadeAnimation';

import { LocationContext } from '../../../services/location/locationContext';
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
	const { error: locationError } = useContext(LocationContext);
	const {
		restaurants,
		isLoading,
		error: restaurantError,
	} = useContext(RestaurantsContext);
	const { favourites } = useContext(FavouritesContext);
	const [isToggled, setIsToggled] = useState(false);
	const hasError = !!restaurantError || !!locationError;

	return (
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
			{/* handling error */}
			{hasError && (
				<Spacer position='left' size='large'>
					<Text variant='error'>Something went wrong retrieving the data</Text>
				</Spacer>
			)}
			{/* if error then dont show restaurant list */}
			{!hasError && (
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
									<FadeInView>
										<RestaurantInfoCard restaurant={item} />
									</FadeInView>
								</Spacer>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item) => item.name}
				/>
			)}
		</SafeArea>
	);
};
