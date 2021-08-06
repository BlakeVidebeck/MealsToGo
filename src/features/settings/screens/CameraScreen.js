import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ProfileCamera } from '../components/CameraScreenStyles';
import { Text } from '../../../components/typography/TextComponent';

import { AuthenticationContext } from '../../../services/authentication/authenticationContext';

export const CameraScreen = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState(null);
	const cameraRef = useRef();
	const { user } = useContext(AuthenticationContext);

	const snap = async () => {
		if (cameraRef) {
			const photo = await cameraRef.current.takePictureAsync();
			AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
			navigation.goBack();
		}
	};

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<TouchableOpacity onPress={snap}>
			<ProfileCamera
				ref={(camera) => (cameraRef.current = camera)}
				type={Camera.Constants.Type.front}
				ratio='16:9'
			/>
		</TouchableOpacity>
	);
};
