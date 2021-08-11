import { Platform } from 'react-native';

const liveHost = 'https://us-central1-mealstogo-6cc2c.cloudfunctions.net';
const localHost = 'http://localhost:5001/mealstogo-6cc2c/us-central1';

export const isAndroid = Platform.OS === 'android';

export const isDevelopment = process.env.NODE_ENV === 'development';
// if true then get info from mock data rather than live data
export const isMock = true;

export const host = !isDevelopment || isAndroid ? liveHost : localHost;
