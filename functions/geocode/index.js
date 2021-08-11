const Url = require('url-parse');
const functions = require('firebase-functions');

const { locations: locationsMock } = require('./geocodeMock');

module.exports.geocodeRequest = (req, res, client) => {
	// get the city from the search params (toronto)
	const { city, mock } = new Url(req.url, true).query;
	// if second param is &mock=true it will come through as 'true'
	if (mock === 'true') {
		// find the city in the locationsMock and return the json of geometry
		const locationMock = locationsMock[city.toLowerCase()];
		res.json(locationMock);
	}

	client
		.geocode({
			params: {
				address: city,
				key: functions.config().google.key,
			},
			timeout: 1000,
		})
		.then((r) => {
			return res.json(r.data);
		})
		.catch((e) => {
			res.status(400);
			return res.send(e.response?.data.error_message);
		});
};
