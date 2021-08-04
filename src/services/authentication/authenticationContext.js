import React, { useState, createContext } from 'react';

import { loginRequest, registerRequest } from './authenticationService';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const onLogin = async (email, password) => {
		try {
			setIsLoading(true);
			const u = await loginRequest(email, password);
			setUser(u);
			setIsLoading(false);
		} catch (e) {
			setIsLoading(false);
			setError(e.message);
		}
	};

	const onRegister = async (email, password, repeatedPassword) => {
		try {
			setIsLoading(true);
			if (password !== repeatedPassword) {
				throw new Error('Passwords do not match');
			} else {
				const u = await registerRequest(email, password);
				setUser(u);
				setIsLoading(false);
			}
		} catch (e) {
			setIsLoading(false);
			setError(e.message);
		}
	};

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: !!user,
				user,
				isLoading,
				error,
				onLogin,
				onRegister,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
