import React, { useState, createContext, useEffect } from 'react';

import { locationRequest, locationTransform } from './locationService';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
	const [location, setLocation] = useState(null);
	const [keyword, setKeyword] = useState('san francisco');
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onSearch = (searchKeyword) => {
		setIsLoading(true);
		setKeyword(searchKeyword);
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

	useEffect(() => {
		onSearch(keyword);
	}, []);

	return (
		<LocationContext.Provider
			value={{
				isLoading,
				error,
				location,
				search: () => null,
				keyword,
			}}
		>
			{children}
		</LocationContext.Provider>
	);
};
