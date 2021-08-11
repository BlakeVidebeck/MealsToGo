import camelize from 'camelize';

export const locationRequest = async (searchTerm) => {
	// makes a api request to the backend to get location geocode based on searchTerm (toronto)
	return fetch(
		`http://localhost:5001/mealstogo-6cc2c/us-central1/geocode?city=${searchTerm}`
	).then((res) => res.json());
};

export const locationTransform = (result) => {
	// transform the json to get lat, lng and viewport
	const formattedResponse = camelize(result);
	const { geometry = {} } = formattedResponse.results[0];
	const { lat, lng } = geometry.location;

	return { lat, lng, viewport: geometry.viewport };
};
