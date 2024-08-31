import { PermissionsAndroid, Platform, Vibration } from 'react-native';

export const requestVibrationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.VIBRATE,
                {
                    title: 'Vibration Permission',
                    message: 'This app needs access to vibrate.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Vibration permission granted');
                // You can now use Vibration.vibrate()
            } else {
                console.log('Vibration permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
};
