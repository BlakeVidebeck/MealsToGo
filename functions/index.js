const functions = require('firebase-functions');
const { Client } = require('@googlemaps/google-maps-services-js');

const { geocodeRequest } = require('./geocode');
const { placesRequest } = require('./places');

const client = new Client({});

exports.geocode = functions.https.onRequest((req, res) => {
	geocodeRequest(req, res, client);
});

exports.placesNearby = functions.https.onRequest((req, res) => {
	placesRequest(req, res, client);
});
