import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/appNavigation';
import Toast from 'react-native-toast-message';

import {Platform} from 'react-native';

import appsFlyer from 'react-native-appsflyer';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Permission} from './src/utilities/Permission';

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
    if (Platform.OS === 'android') {
      Permission.checkNotificationPermission();
    } else {
      PushNotificationIOS.requestPermissions();
    }

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
