const Url = require('url-parse');
const functions = require('firebase-functions');

const { mocks, addMockImage } = require('./mockPlaces');

const addGoogleImage = (restaurant) => {
	const ref = restaurant.photos[0].photo_reference;
	if (!ref) {
		restaurant.photos = [
			'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
		];
		return restaurant;
	}
	restaurant.photos = [
		`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
			functions.config().google.key
		}`,
	];
	return restaurant;
};

module.exports.placesRequest = (req, res, client) => {
	const { location, mock } = new Url(req.url, true).query;
	if (mock === 'true') {
		const data = mocks[location];
		if (data) data.results = data.results.map(addMockImage);
		res.json(data);
	}

	client
		.placesNearby({
			params: {
				location,
				radius: 1500,
				type: 'restaurant',
				key: functions.config().google.key,
			},
			timeout: 1000,
		})
		.then((r) => {
			r.data.results = r.data.results.map(addGoogleImage);
			return res.json(r.data);
		})
		.catch((e) => {
			res.status(400);
			return res.send(e.response.data.error_message);
		});
};
