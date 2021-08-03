import React, { useState, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { loginRequest } from './authenticationService';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const onLogin = async (email, password) => {
		try {
			setIsLoading(true);
			const u = loginRequest(email, password);
			setUser(u);
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			setError(error);
		}
	};

	return (
		<AuthenticationContext.Provider value={{ user, isLoading, error, onLogin }}>
			{children}
		</AuthenticationContext.Provider>
	);
};
