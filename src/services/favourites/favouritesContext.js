import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
	const [favourites, setFavourites] = useState([]);

	const saveFavourites = async (value) => {
		try {
			const favouritesJSON = JSON.stringify(value);
			// save to storage on the phone
			await AsyncStorage.setItem('@favourites', favouritesJSON);
		} catch (e) {
			console.log('error storing', e);
		}
	};

	const loadFavourites = async () => {
		try {
			// load from storage on the phone
			const value = await AsyncStorage.getItem('@favourites');
			if (value !== null) {
				setFavourites(JSON.parse(value));
			}
		} catch (e) {
			console.log('error loading', e);
		}
	};

	const add = (restaurant) => {
		setFavourites([...favourites, restaurant]);
	};

	const remove = (restaurant) => {
		// return all favourites that do not equal the restaurant.placeId
		const newFavourites = favourites.filter(
			(x) => x.placeId !== restaurant.placeId
		);
		setFavourites(newFavourites);
	};

	// on initial mount load the favourites from storage
	useEffect(() => {
		loadFavourites();
	}, []);

	// when the favourites change then save to storage
	useEffect(() => {
		saveFavourites(favourites);
	}, [favourites]);

	return (
		<FavouritesContext.Provider
			value={{
				favourites,
				addToFavourites: add,
				removeFromFavourites: remove,
			}}
		>
			{children}
		</FavouritesContext.Provider>
	);
};
