import camelize from 'camelize';
import { host } from '../../utils/env';

export const restaurantsRequest = (location) => {
	// returns restaurants from the passed in location lat, lng
	return fetch(`${host}/placesNearby?location=${location}`).then((res) =>
		res.json()
	);
};

export const restaurantsTransform = ({ results = [] }) => {
	const mappedResults = results.map((restaurant) => {
		return {
			// spead in the restaurant and add 2 properties based on the data if open or closed
			...restaurant,
			address: restaurant.vicinity,
			isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
			isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
		};
	});

	return camelize(mappedResults);
};
