const Url = require('url-parse');

const { mocks, addMockImage } = require('./mockPlaces');

module.exports.placesRequest = (req, res) => {
	const { location } = new Url(req.url, true).query;
	const data = mocks[location];
	if (data) data.results = data.results.map(addMockImage);

	res.json(data);
};
