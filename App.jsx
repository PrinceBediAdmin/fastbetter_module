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

import appsFlyer from 'react-native-appsflyer';

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

export const appsFlyerKey = {
  isDebug: true,
  devKey: 'EdUywoA7KQSqeLcJqKJn8F',
  appId: '6473776196',
  onInstallConversionDataListener: true, //Optional
  onDeepLinkListener: true, //Optional
  timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
};

const App = () => {
  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   checkNotificationPermission(pre => {
    //     requestNotificationPermission();
    //   });
    // }

    appsFlyer.initSdk(
      appsFlyerKey,
      result => {
        console.log('AF Init : ' + result);
      },
      error => {
        console.log('AF Init error : ', error);
      },
    );
  }, []);

  return (
    <>
      <AppNavigation />
      <Toast />
    </>
  );
};

export default App;
