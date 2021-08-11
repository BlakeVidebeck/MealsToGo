import camelize from 'camelize';

export const locationRequest = async (searchTerm) => {
	return fetch(
		`http://localhost:5001/mealstogo-6cc2c/us-central1/geocode?city=${searchTerm}`
	).then((res) => res.json());
};

export const locationTransform = (result) => {
	const formattedResponse = camelize(result);
	const { geometry = {} } = formattedResponse.results[0];
	const { lat, lng } = geometry.location;

	return { lat, lng, viewport: geometry.viewport };
};
