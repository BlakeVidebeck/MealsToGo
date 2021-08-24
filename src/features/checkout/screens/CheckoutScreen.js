import React, { useContext, useState } from 'react';

import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { Text } from '../../../components/typography/TextComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';

import { CartContext } from '../../../services/cart/cartContext';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard';
import {
	CartIcon,
	CartIconContainer,
	ClearButton,
	NameInput,
	PayButton,
	PaymentProcessing,
} from '../components/CheckoutStyles';
import { CreditCardInput } from '../components/CreditCardComponent';
import { payRequest } from '../../../services/checkout/checkoutService';

export const CheckoutScreen = ({ navigation }) => {
	const { cart, restaurant, sum, clearCart } = useContext(CartContext);
	const [name, setName] = useState('');
	const [card, setCard] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const onPay = async () => {
		try {
			setIsLoading(true);
			if (!card || !card.id) {
				setIsLoading(false);
				navigation.navigate('CheckoutError', {
					error: 'Please fill in a valid credit card',
				});
				return;
			}
			// await the payment req from stripe
			await payRequest(card.id, sum, name);
			setIsLoading(false);
			clearCart();
			navigation.navigate('CheckoutSuccess');
		} catch (e) {
			setIsLoading(false);
			navigation.navigate('CheckoutError', { error: e.message });
		}
	};

	if (!cart.length || !restaurant) {
		return (
			<SafeArea>
				<CartIconContainer>
					<CartIcon icon='cart-off' />
					<Text>Your cart is empty!</Text>
				</CartIconContainer>
			</SafeArea>
		);
	}

	return (
		<SafeArea>
			<RestaurantInfoCard restaurant={restaurant} />
			{isLoading && <PaymentProcessing />}
			<ScrollView>
				<Spacer position='left' size='medium'>
					<Spacer position='top' size='large'>
						<Text>Your Order</Text>
					</Spacer>
					<List.Section>
						{cart.map(({ item, price }, i) => {
							return (
								<List.Item
									title={`${item} - $${price / 100}`}
									key={`item-${i}`}
								/>
							);
						})}
					</List.Section>
					<Text>Total: ${sum / 100}</Text>
				</Spacer>
				{/* Credit card info */}
				<NameInput label='Name' value={name} onChangeText={(t) => setName(t)} />
				<Divider />
				<Spacer position='top' size='large' />
				<Spacer position='top' size='large'>
					{!!name.length && (
						<CreditCardInput
							name={name}
							onSuccess={setCard}
							onError={() =>
								navigation.navigate('CheckoutError', {
									error: 'Something went wrong processing your credit card',
								})
							}
						/>
					)}
				</Spacer>
				{/* Pay button */}
				<Spacer position='top' size='xxl' />
				<PayButton
					disabled={isLoading}
					icon='cash-usd'
					mode='contained'
					onPress={onPay}
				>
					Pay
				</PayButton>
				{/* Clear Button */}
				<Spacer position='top' size='large' />
				<ClearButton
					disabled={isLoading}
					icon='cart-off'
					mode='contained'
					onPress={clearCart}
				>
					Clear Cart
				</ClearButton>
			</ScrollView>
		</SafeArea>
	);
};
