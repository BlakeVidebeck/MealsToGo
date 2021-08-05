import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../authentication/authenticationContext';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
	const { user } = useContext(AuthenticationContext);

	const [favourites, setFavourites] = useState([]);

	const saveFavourites = async (fav, uid) => {
		try {
			const favouritesJSON = JSON.stringify(fav);
			// save to storage on the phone
			await AsyncStorage.setItem(`@favourites-${uid}`, favouritesJSON);
		} catch (e) {
			console.log('error storing', e);
		}
	};

	const loadFavourites = async (uid) => {
		try {
			// load from storage on the phone
			const value = await AsyncStorage.getItem(`@favourites-${uid}`);
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
		if (user && user.uid) loadFavourites(user.uid);
	}, [user]);

	// when the favourites change then save to storage
	useEffect(() => {
		if (user && user.uid && favourites.length)
			saveFavourites(favourites, user.uid);
	}, [favourites, user]);

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
