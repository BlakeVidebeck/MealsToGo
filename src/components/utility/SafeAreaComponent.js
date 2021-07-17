import styled from 'styled-components/native';
import { SafeAreaView, StatusBar } from 'react-native';

// safe area view is for ios - statusbar eg.
export const SafeArea = styled(SafeAreaView)`
	flex: 1;
	/* current height of status bar for android */
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
`;
