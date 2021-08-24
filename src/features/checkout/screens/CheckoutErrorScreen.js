import React from 'react';

import { Text } from '../../../components/typography/TextComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';
import { colors } from '../../../infrastructure/theme/colors';
import { CartIcon, CartIconContainer } from '../components/CheckoutStyles';

export const CheckoutErrorScreen = ({ route }) => {
	const { error = '' } = route.params;
	return (
		<SafeArea>
			<CartIconContainer>
				<CartIcon icon='close' bg={colors.ui.error} />
				<Text variant='label'>{error}!</Text>
			</CartIconContainer>
		</SafeArea>
	);
};
