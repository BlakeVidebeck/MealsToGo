const Url = require('url-parse');

const { locations: locationsMock } = require('./geocodeMock');

module.exports.geocodeRequest = (req, res) => {
	// get the city from the search params (toronto)
	const { city } = new Url(req.url, true).query;
	// find the city in the locationsMock and return the json of geometry
	const locationMock = locationsMock[city.toLowerCase()];

	res.json(locationMock);
};
