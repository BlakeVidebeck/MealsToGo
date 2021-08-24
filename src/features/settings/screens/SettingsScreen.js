import React, { useContext, useState } from 'react';
import { List, Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { Text } from '../../../components/typography/TextComponent';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { AuthenticationContext } from '../../../services/authentication/authenticationContext';
import {
	AvatarContainer,
	SettingsBackground,
	SettingsItem,
	TransparentSafeArea,
} from '../components/SettingsStyles';
import { colors } from '../../../infrastructure/theme/colors';

export const SettingsScreen = ({ navigation }) => {
	const { onLogout, user } = useContext(AuthenticationContext);
	const [photo, setPhoto] = useState(null);

	// get photo from storage saved in cameraScreen
	const getProfilePicture = async (currentUser) => {
		const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
		setPhoto(photoUri);
	};

	useFocusEffect(
		React.useCallback(() => {
			getProfilePicture(user);
		}, [user])
	);

	return (
		<SettingsBackground>
			<TransparentSafeArea>
				<AvatarContainer>
					<TouchableOpacity onPress={() => navigation.navigate('Camera')}>
						{!photo && (
							<Avatar.Icon
								size={180}
								icon='human'
								backgroundColor={colors.brand.primary}
							/>
						)}
						{photo && (
							<Avatar.Image
								size={180}
								source={{ uri: photo }}
								backgroundColor={colors.brand.primary}
							/>
						)}
					</TouchableOpacity>
					<Spacer position='top' size='large'>
						<Text variant='label'>{user.email}</Text>
					</Spacer>
				</AvatarContainer>
				<List.Section>
					<SettingsItem
						title='Favourites'
						description='View your favourites'
						left={(props) => (
							<List.Icon {...props} color={colors.ui.error} icon='heart' />
						)}
						onPress={() => navigation.navigate('Favourites')}
					/>
					<Spacer />
					<SettingsItem
						title='Payment'
						left={(props) => (
							<List.Icon {...props} color={colors.ui.secondary} icon='cart' />
						)}
						onPress={() => null}
					/>
					<Spacer />
					<SettingsItem
						title='Past Orders'
						left={(props) => (
							<List.Icon
								{...props}
								color={colors.ui.secondary}
								icon='history'
							/>
						)}
						onPress={() => null}
					/>
					<Spacer />
					<SettingsItem
						title='Logout'
						left={(props) => (
							<List.Icon {...props} color={colors.ui.secondary} icon='door' />
						)}
						onPress={onLogout}
					/>
				</List.Section>
			</TransparentSafeArea>
		</SettingsBackground>
	);
};
