import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { colors } from '../../../infrastructure/theme/colors';

export const RestaurantList = styled(FlatList).attrs({
	contentContainerStyle: {
		padding: 16,
	},
})``;

export const Loading = styled(ActivityIndicator)`
	margin-left: -25px;
`;

export const LoadingContainer = styled.View`
	position: absolute;
	top: 50%;
	left: 50%;
`;

export const OrderButton = styled(Button).attrs({
	color: colors.brand.primary,
})`
	padding: ${(props) => props.theme.space[2]};
	width: 80%;
	align-self: center;
`;
