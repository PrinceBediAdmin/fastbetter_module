import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import { setIsInternetConnection } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

export const getDeviceInfo = async () => {
    const device = Platform.OS;
    const deviceVer = DeviceInfo.getSystemVersion();
    const deviceToken = await DeviceInfo.getUniqueId(); // This can act as a unique device token
    return { device, deviceVer, deviceToken };
};

export const getIpAddressAndLocation = async () => {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        return {
            ip: data.ip,
            location: data.city + ', ' + data.region + ', ' + data.country,
        };
    } catch (error) {
        console.error('Error fetching IP address or location:', error);
        return {
            ip: 'Unknown',
            location: 'Unknown',
        };
    }
};

export const getConnectionStatus = async () => {
    const dispatch = useDispatch();
    let isConnected = false;

    try {
        const state = await NetInfo.fetch();
        isConnected = state.isConnected && state.isInternetReachable;

        // Dispatch the connection status to the Redux store
        dispatch(setIsInternetConnection(isConnected));
    } catch (error) {
        console.error("Error checking internet connection:", error);
        isConnected = false;
        // Update the Redux store in case of an error
        dispatch(setIsInternetConnection(false));
    }

    return isConnected;
};