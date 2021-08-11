const Url = require('url-parse');

const { locations: locationsMock } = require('./geocodeMock');

module.exports.geocodeRequest = (req, res) => {
	const { city } = new Url(req.url, true).query;
	const locationMock = locationsMock[city.toLowerCase()];

	res.json(locationMock);
};
