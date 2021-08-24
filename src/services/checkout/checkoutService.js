import createStripe from 'stripe-client';
import { host } from '../../utils/env';

const stripe = createStripe(
	'pk_test_51HOsNEEyPPY3KneievjLrbiZba6ElTrqHMdPZP0VPhQgt7BRpHN6mJTDhBmovqkoNeKPXrwTFSUKN4aBjYxddplC00S5CJGUV8'
);

export const cartTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = async (token, amount, name) => {
	try {
		const res = await fetch(`${host}/pay`, {
			body: JSON.stringify({
				token,
				name,
				amount,
			}),
			method: 'POST',
		});
		if (res.status > 200) {
			throw new Error('Something went wrong processing payment');
		}
		return res.json();
	} catch (e) {
		console.log(e.message);
	}
};
