import camelize from 'camelize';

import { locations } from './locationMock';

export const locationRequest = async (searchTerm) => {
	try {
		const locationMock = await locations[searchTerm];

		if (!locationMock) throw new Error('Location not found');

		return locationMock;
	} catch (e) {
		console.log(e);
	}
};

export const locationTransform = (result) => {
	const formattedResponse = camelize(result);
	const { geometry = {} } = formattedResponse.results[0];
	const { lat, lng } = geometry.location;

	return { lat, lng, viewport: geometry.viewport };
};
