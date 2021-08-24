import React from 'react';
import { LiteCreditCardInput } from 'react-native-credit-card-input';
import { cartTokenRequest } from '../../../services/checkout/checkoutService';

export const CreditCardInput = ({ name, onSuccess, onError }) => {
	// get credit card info and send if complete
	const onChange = async (formData) => {
		const { values, status } = formData;

		// set the values of status to be an array and see if any of them say 'incomplete'
		const isIncomplete = Object.values(status).includes('incomplete');
		const expiry = values.expiry.split('/');

		const card = {
			number: values.number,
			exp_month: expiry[0],
			exp_year: expiry[1],
			cvc: values.cvc,
			name,
		};
		// create stripe token
		if (!isIncomplete) {
			try {
				const info = await cartTokenRequest(card);
				// the info that comes back set the card token in the checkout screen
				onSuccess(info);
			} catch (e) {
				onError(e.message);
			}
		}
	};

	return <LiteCreditCardInput onChange={onChange} />;
};
