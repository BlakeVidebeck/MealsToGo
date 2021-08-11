import React, { useState, createContext, useEffect, useContext } from 'react';

import { restaurantsRequest, restaurantsTransform } from './restaurantsService';

import { LocationContext } from '../location/locationContext';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	// gets the location from locationContext after location api request
	const { location } = useContext(LocationContext);

	const retrieveRestaurants = (loc) => {
		setIsLoading(true);
		setRestaurants([]);
		// request to backend
		restaurantsRequest(loc)
			.then(restaurantsTransform)
			.then((results) => {
				setIsLoading(false);
				setRestaurants(results);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
			});
	};

	useEffect(() => {
		// transforms lat, lng to templete literal string (`43.653225,-79.383186`)
		if (location) {
			const locationString = `${location.lat},${location.lng}`;

			retrieveRestaurants(locationString);
		}
	}, [location]);

	return (
		<RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
			{children}
		</RestaurantsContext.Provider>
	);
};
