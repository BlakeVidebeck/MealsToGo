const functions = require('firebase-functions');
const { geocodeRequest } = require('./geocode');

exports.geocode = functions.https.onRequest((req, res) => {
	geocodeRequest(req, res);
});
