import React, { useState, createContext, useEffect } from 'react';

import { locationRequest, locationTransform } from './locationService';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
	const [location, setLocation] = useState(null);
	const [keyword, setKeyword] = useState('San Francisco');
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onSearch = (searchKeyword) => {
		setIsLoading(true);
		setKeyword(searchKeyword);
		// if search is empty then dont do api call
		if (!searchKeyword.length) return;
		locationRequest(searchKeyword.toLowerCase())
			.then(locationTransform)
			.then((result) => {
				setIsLoading(false);
				setLocation(result);
			})
			.catch((e) => {
				setIsLoading(false);
				setError(e);
			});
	};

	return (
		<LocationContext.Provider
			value={{
				isLoading,
				error,
				location,
				search: onSearch,
				keyword,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};
