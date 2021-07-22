import camelize from 'camelize';
import { mocks, mockImages } from './mock/index';

export const restaurantsTransform = ({ results = [] }) => {
	const mappedResults = results.map((restaurant) => {
		// fill in the restaurant images with mock images
		restaurant.photos = restaurant.photos.map((p) => {
			return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
		});

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

export const restaurantsRequest = async (
	location = '37.7749295,-122.4194155'
) => {
	try {
		const mockData = await mocks[location];

		if (!mockData) throw new Error('no mock found');

		return mockData;
	} catch (err) {
		console.log(err);
	}
};
