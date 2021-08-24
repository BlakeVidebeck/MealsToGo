import React from 'react';

import { Text } from '../../../components/typography/TextComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';
import { CartIcon, CartIconContainer } from '../components/CheckoutStyles';

export const CheckoutSuccessScreen = () => {
	return (
		<SafeArea>
			<CartIconContainer>
				<CartIcon icon='check-bold' />
				<Text variant='label'>Success!</Text>
			</CartIconContainer>
		</SafeArea>
	);
};
