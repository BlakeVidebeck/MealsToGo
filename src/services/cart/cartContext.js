import React, { useContext, useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../authentication/authenticationContext';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
	const { user } = useContext(AuthenticationContext);

	const [cart, setCart] = useState([]);
	const [restaurant, setRestaurant] = useState(null);
	const [sum, setSum] = useState(0);

	// save cart to async storage
	const saveCart = async (rst, crt, uid) => {
		try {
			const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
			await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
		} catch (e) {
			console.log(e.message);
		}
	};

	// load cart from async storage
	const loadCart = async (uid) => {
		try {
			const value = await AsyncStorage.getItem(`@cart-${uid}`);
			if (value !== null) {
				const { restaurant: rst, cart: crt } = JSON.parse(value);
				setRestaurant(rst);
				setCart(crt);
			}
		} catch (e) {
			console.log(e.message);
		}
	};

	useEffect(() => {
		if (user && user.uid) {
			loadCart(user.uid);
		}
	}, [user]);

	useEffect(() => {
		if (user && user.uid) {
			saveCart(restaurant, cart, user.uid);
		}
	}, [restaurant, cart, user]);

	useEffect(() => {
		if (!cart.length) {
			setSum(0);
			return;
		}
		const newSum = cart.reduce((acc, { price }) => {
			return (acc += price);
		}, 0);
		setSum(newSum);
	}, [cart]);

	const add = (item, rst) => {
		// if no restaurant or the ids dont match then set state to new restaurant / cart
		if (!restaurant || restaurant.placeId !== rst.placeId) {
			setRestaurant(rst);
			setCart([item]);
		} else {
			// other wise return the cart with the product
			setCart([...cart, item]);
		}
	};

	const clear = () => {
		setCart([]);
		setRestaurant(null);
	};

	return (
		<CartContext.Provider
			value={{
				addToCart: add,
				clearCart: clear,
				restaurant,
				cart,
				sum,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
