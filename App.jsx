import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/appNavigation';
import Toast from 'react-native-toast-message';
// import RNPermissions, {
//   openSettings,
//   PERMISSIONS,
//   RESULTS,
//   check,
// } from 'react-native-permissions';
import {Platform} from 'react-native';

// export const checkNotificationPermission = async () => {
//   try {
//     const result = await check(
//       Platform.OS === 'android'
//         ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS
//         : PERMISSIONS.IOS.NOTIFICATIONS,
//     );
//     if (result != 'granted' && result != 'limited') {
//       requestNotificationPermission();
//     }
//   } catch (error) {
//     console.error('Error checking notification permission:', error);
//   }
// };

// export const requestNotificationPermission = async () => {
//   try {
//     const result = await RNPermissions.request(
//       Platform.OS === 'android'
//         ? PERMISSIONS.ANDROID.POST_NOTIFICATIONS
//         : PERMISSIONS.IOS.NOTIFICATIONS,
//     );
//     // if (result != "granted" && result != "limited") {
//     //     openSettings();
//     // }
//   } catch (error) {
//     console.error('Error requesting notification permission:', error);
//   }
// };

const App = () => {
  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   checkNotificationPermission(pre => {
    //     requestNotificationPermission();
    //   });
    // }
  }, []);

  return (
    <>
      <AppNavigation />
      <Toast />
    </>
  );
};

export default App;
