const functions = require('firebase-functions');
const { Client } = require('@googlemaps/google-maps-services-js');
const stripeClient = require('stripe')(functions.config().stripe.key);

const { geocodeRequest } = require('./geocode');
const { placesRequest } = require('./places');
const { payRequest } = require('./pay');

const googleClient = new Client({});

exports.geocode = functions.https.onRequest((req, res) => {
	geocodeRequest(req, res, googleClient);
});

exports.placesNearby = functions.https.onRequest((req, res) => {
	placesRequest(req, res, googleClient);
});

exports.pay = functions.https.onRequest((req, res) => {
	payRequest(req, res, stripeClient);
});
