const Url = require('url-parse');
const functions = require('firebase-functions');

const { mocks, addMockImage } = require('./mockPlaces');

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
			r.data.results = r.data.results.map(addMockImage);
			return res.json(r.data);
		})
		.catch((e) => {
			res.status(400);
			return res.send(e.response.data.error_message);
		});
};
