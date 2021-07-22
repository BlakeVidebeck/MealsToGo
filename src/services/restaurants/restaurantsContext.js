import React, {
	useState,
	createContext,
	useEffect,
	useMemo,
	useContext,
} from 'react';

import { restaurantsRequest, restaurantsTransform } from './restaurantsService';

import { LocationContext } from '../location/locationContext';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { location } = useContext(LocationContext);

	const retrieveRestaurants = (loc) => {
		setIsLoading(true);
		setRestaurants([]);
		// mimic a real api thats why it has 2 second delay
		setTimeout(() => {
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
		}, 2000);
	};

	useEffect(() => {
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
