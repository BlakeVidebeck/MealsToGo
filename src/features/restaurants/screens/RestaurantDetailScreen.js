import React, { useState, useContext } from 'react';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { Spacer } from '../../../components/spacer/SpacerComponent';

import { SafeArea } from '../../../components/utility/SafeAreaComponent';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import { OrderButton } from '../components/RestaurantScreenStyles';
import { CartContext } from '../../../services/cart/cartContext';

export const RestaurantDetailScreen = ({ navigation, route }) => {
	const [breakfastExpanded, setBreakfastExpanded] = useState(false);
	const [lunchExpanded, setLunchExpanded] = useState(false);
	const [dinnerExpanded, setDinnerExpanded] = useState(false);
	const [drinksExpanded, setDrinksExpanded] = useState(false);

	// the route.params was the restaurant that was clicked on
	const { restaurant } = route.params;
	const { addToCart } = useContext(CartContext);

	return (
		<SafeArea>
			<RestaurantInfoCard restaurant={restaurant} />
			<ScrollView>
				<List.Accordion
					title='Breakfast'
					left={(props) => <List.Icon {...props} icon='bread-slice' />}
					expanded={breakfastExpanded}
					onPress={() => setBreakfastExpanded(!breakfastExpanded)}
				>
					<List.Item title='Eggs Benedict' />
					<Divider />
					<List.Item title='Classic Breakfast' />
					<Divider />
					<List.Item title='French Toast' />
					<Divider />
				</List.Accordion>
				<Divider />
				<List.Accordion
					title='Lunch'
					left={(props) => <List.Icon {...props} icon='hamburger' />}
					expanded={lunchExpanded}
					onPress={() => setLunchExpanded(!lunchExpanded)}
				>
					<List.Item title='Classic Cheeseburger' />
					<Divider />
					<List.Item title='Fish and Chips' />
					<Divider />
					<List.Item title='Meatlovers Pizza' />
					<Divider />
				</List.Accordion>
				<Divider />
				<List.Accordion
					title='Dinner'
					left={(props) => <List.Icon {...props} icon='food-variant' />}
					expanded={dinnerExpanded}
					onPress={() => setDinnerExpanded(!dinnerExpanded)}
				>
					<List.Item title='Pork Belly' />
					<Divider />
					<List.Item title='Sirloin Steak' />
					<Divider />
					<List.Item title='Butter Chicken' />
					<Divider />
				</List.Accordion>
				<Divider />
				<List.Accordion
					title='Drinks'
					left={(props) => <List.Icon {...props} icon='cup' />}
					expanded={drinksExpanded}
					onPress={() => setDrinksExpanded(!drinksExpanded)}
				>
					<List.Item title='Beer' />
					<Divider />
					<List.Item title='Wine' />
					<Divider />
					<List.Item title='Juice' />
					<Divider />
				</List.Accordion>
			</ScrollView>
			<Spacer position='bottom' size='large'>
				<OrderButton
					icon='cash-usd'
					mode='contained'
					onPress={() => {
						// send to the add to cart funtion in cart context
						addToCart({ item: 'special', price: 1299 }, restaurant);
						// navigate to the checkout screen
						navigation.navigate('Checkout');
					}}
				>
					Order Special only $12.99!
				</OrderButton>
			</Spacer>
		</SafeArea>
	);
};
