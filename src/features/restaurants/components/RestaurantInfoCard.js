import React from 'react';
import { SvgXml } from 'react-native-svg';

import { Spacer } from '../../../components/spacer/SpacerComponent';
import { Text } from '../../../components/typography/TextComponent';
import star from '../../../../assets/star';
import open from '../../../../assets/open';
import {
	Address,
	Icon,
	Info,
	Rating,
	RestaurantCard,
	RestaurantCardCover,
	Section,
	SectionEnd,
} from './RestaurantInfoCardStyles';
import { Favourite } from '../../../components/favourites/FavouriteComponent';

const RestaurantInfoCard = ({ restaurant = {} }) => {
	const {
		name = 'Some Restaurant',
		icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
		photos = [
			'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
		],
		address = '100 some random street',
		isOpenNow = true,
		rating = 4,
		isClosedTemp = true,
		placeId,
	} = restaurant;

	// creates an array based on the number of reviews ( 4 star eg.) and rounds it down(3.2 = 3)
	const ratingArray = Array.from(new Array(Math.floor(rating)));

	return (
		<RestaurantCard elevation={2}>
			<Favourite restaurant={restaurant} />
			<RestaurantCardCover key={name} source={{ uri: photos[0] }} />
			<Info>
				<Text variant='label'>{name}</Text>
				<Section>
					<Rating>
						{ratingArray.map((_, i) => (
							<SvgXml
								key={`star-${placeId}-${i}`}
								xml={star}
								width={20}
								height={20}
							/>
						))}
					</Rating>
					<SectionEnd>
						{isClosedTemp && <Text variant='error'>CLOSED TEMPORARILY</Text>}
						<Spacer position='left' size='large'>
							{isOpenNow && <SvgXml xml={open} width={20} height={20} />}
						</Spacer>
						<Spacer position='left' size='large'>
							<Icon source={{ uri: icon }} />
						</Spacer>
					</SectionEnd>
				</Section>
				<Address>{address}</Address>
			</Info>
		</RestaurantCard>
	);
};

export default RestaurantInfoCard;
