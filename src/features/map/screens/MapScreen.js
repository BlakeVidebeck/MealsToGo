import React, { useContext, useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import { LocationContext } from '../../../services/location/locationContext';
import { RestaurantsContext } from '../../../services/restaurants/restaurantsContext';
import { MapCalloutComponent } from '../components/MapCalloutComponent';

import { Search } from '../components/searchComponent';

const MapContainer = styled(MapView)`
	height: 100%;
	width: 100%;
`;

export const Map = ({ navigation }) => {
	const { location } = useContext(LocationContext);
	const { restaurants = [] } = useContext(RestaurantsContext);

	const [latDelta, setLatDelta] = useState(0);

	const { lat, lng, viewport } = location;

	useEffect(() => {
		const northeastLat = viewport.northeast.lat;
		const southwestLat = viewport.southwest.lat;

		setLatDelta(northeastLat - southwestLat);
	}, [location, viewport]);

	return (
		<>
			<Search />
			<MapContainer
				region={{
					latitude: lat,
					longitude: lng,
					latitudeDelta: latDelta,
					longitudeDelta: 0.02,
				}}
			>
				{restaurants.map((restaurant) => {
					return (
						<MapView.Marker
							key={restaurant.name}
							title={restaurant.name}
							coordinate={{
								latitude: restaurant.geometry.location.lat,
								longitude: restaurant.geometry.location.lng,
							}}
						>
							{/*  on press go to the restaurant details screen */}
							<MapView.Callout
								onPress={() =>
									navigation.navigate('RestaurantDetail', { restaurant })
								}
							>
								<MapCalloutComponent isMap restaurant={restaurant} />
							</MapView.Callout>
						</MapView.Marker>
					);
				})}
			</MapContainer>
		</>
	);
};

export const MapScreen = ({ navigation }) => {
	const { location } = useContext(LocationContext);
	if (!location) {
		return (
			<MapContainer
				region={{
					latitude: 0,
					longitude: 0,
				}}
			/>
		);
	}
	return <Map navigation={navigation} />;
};
