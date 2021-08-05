import React, { useContext } from 'react';
import { List, Avatar } from 'react-native-paper';

import { Text } from '../../../components/typography/TextComponent';
import { Spacer } from '../../../components/spacer/SpacerComponent';
import { SafeArea } from '../../../components/utility/SafeAreaComponent';
import { AuthenticationContext } from '../../../services/authentication/authenticationContext';
import { AvatarContainer, SettingsItem } from '../components/SettingsStyles';

export const SettingsScreen = ({ navigation }) => {
	const { onLogout, user } = useContext(AuthenticationContext);

	return (
		<SafeArea>
			<AvatarContainer>
				<Avatar.Icon size={180} icon='human' backgroundColor='#2182BD' />
				<Spacer position='top' size='large'>
					<Text variant='label'>{user.email}</Text>
				</Spacer>
			</AvatarContainer>
			<List.Section>
				<SettingsItem
					title='Favourites'
					description='View your favourites'
					left={(props) => <List.Icon {...props} color='black' icon='heart' />}
					onPress={() => navigation.navigate('Favourites')}
				/>
				<SettingsItem
					title='Logout'
					left={(props) => <List.Icon {...props} color='black' icon='door' />}
					onPress={onLogout}
				/>
			</List.Section>
		</SafeArea>
	);
};
