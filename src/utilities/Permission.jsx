import {Platform, PermissionsAndroid} from 'react-native';
import RNPermissions, {
  openSettings,
  PERMISSIONS,
  RESULTS,
  check,
} from 'react-native-permissions';

export const checkNotificationPermission = async () => {
  try {
    const result = await check(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS
        : PERMISSIONS.IOS.NOTIFICATIONS,
    );
    if (result != 'granted' && result != 'limited') {
      requestNotificationPermission();
    }
  } catch (error) {
    console.error('Error checking notification permission:', error);
  }
};

export const requestNotificationPermission = async () => {
  try {
    const result = await RNPermissions.request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS
        : PERMISSIONS.IOS.NOTIFICATIONS,
    );
    // if (result != "granted" && result != "limited") {
    //     openSettings();
    // }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }
};

export const Permission = {
  checkNotificationPermission,
  requestNotificationPermission,
};
