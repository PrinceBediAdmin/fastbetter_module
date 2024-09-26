/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState, useRef, forwardRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
  Platform,
  Pressable,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {ModelBox} from '../../components/Models/Models';
import bottom_bg from '../../assets/diagnosed/bottom_bg.png';
import NextButton from '../../components/NextButton';
import {useNavigation} from '@react-navigation/native';
import connection from '../../assets/afterscreen/Profile/connection.png';
import connection_error from '../../assets/afterscreen/Profile/connection_error.png';
import {
  HealthConnect,
  requestPermission,
  initialize,
  readRecords,
  openHealthConnectSettings,
  isAvailable,
  insertRecords,
  RecordingMethod,
  DeviceType,
} from 'react-native-health-connect';
import {
  AppInstalledChecker,
  CheckPackageInstallation,
} from 'react-native-check-app-install';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import {getAppleHealthData} from './AppleFatchData';
import {authorize} from 'react-native-app-auth';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.HeartRate, // Heart rate
      AppleHealthKit.Constants.Permissions.HeartRateVariability, // Variability (for resting/lowest/highest)
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic, // Systolic BP
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic, // Diastolic BP
      AppleHealthKit.Constants.Permissions.Weight, // Weight
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned, // Active energy
      AppleHealthKit.Constants.Permissions.RestingHeartRate,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
    ],
    write: [], // Add any write permissions if needed
  },
};

// fitbitConfig.js
export const fitbitConfig = {
  clientId: '23PMG8',
  clientSecret: '22f1f5b091aa499824348a7ce98986ef',
  redirectUrl: 'https://fastbetter.com/', // This is a URL defined in your Fitbit developer dashboard
  scopes: ['activity', 'nutrition', 'sleep', 'heartrate', 'profile'], // Scopes for required data
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
  },
};

const HealthLinkedModel = ({
  isModelOpen,
  hanldeCloseModel,
  headerText,
  updateWatch,
}) => {
  const [ScreenType, setScreenType] = useState(0);
  const [subErrorMsg, setsubErrorMsg] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  );
  const navigation = useNavigation();

  const DeviceConn = () => {
    return (
      <View style={{marginTop: 37}}>
        <Image
          source={connection}
          style={{alignSelf: 'center', width: 80, height: 80}}
          resizeMode="contain"
        />

        <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-[10px] mt-[24px]">
          {headerText}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: 16,
            marginHorizontal: 40,
            marginTop: 16,
            marginBottom: 80,
          }}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        </Text>
      </View>
    );
  };

  const DeviceConnError = () => {
    return (
      <View style={{marginTop: 37}}>
        <Image
          source={connection_error}
          style={{alignSelf: 'center', width: 80, height: 80}}
          resizeMode="contain"
        />

        <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-[10px] mt-[24px]">
          {'Oops.. there is some issue'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: 16,
            marginHorizontal: 40,
            marginTop: 16,
            marginBottom: 80,
          }}>
          {subErrorMsg}
        </Text>
      </View>
    );
  };

  const onButtonHandle = async () => {
    if (headerText === 'Health Connect linked') {
      if (ScreenType === 0) {
        if (Platform.OS === 'android') {
          checkAppInstalled('googleFit');
        }
      } else {
        if (Platform.OS === 'android') {
          AppInstalledChecker.isAppInstalled('healthdata').then(isInstalled => {
            if (isInstalled) {
              redirectToHealthConnect();
            } else {
              openHealthConnectInPlayStore('healthdata');
              LocalStoreData(null, false);
            }
          });
        }
        setScreenType(0);
      }
    } else if (headerText === 'Apple health linked') {
      AppleInitHealth();
    } else {
      if (ScreenType === 0) {
        if (Platform.OS === 'android') {
          checkAppInstalled('FitbitMobile');
        }
      } else {
        if (Platform.OS === 'android') {
          AppInstalledChecker.isAppInstalled('FitbitMobile').then(
            isInstalled => {
              if (isInstalled) {
                fitbitAppInstalled(1);
              } else {
                openHealthConnectInPlayStore('FitbitMobile');
                LocalStoreData(null, false);
              }
            },
          );
        }
        setScreenType(0);
      }
    }
  };

  //<-apple->
  const AppleInitHealth = async () => {
    if (Platform.OS === 'ios') {
      AppleHealthKit.initHealthKit(permissions, (err, results) => {
        if (err) {
          console.log('error initializing HealthKit: ', err);
          setScreenType(1);
          return;
        } else {
          fetchAppleData();
        }
      });
    }
  };

  const fetchAppleData = async () => {
    const HealthData = await getAppleHealthData();
    LocalStoreData(HealthData, true);
    hanldeCloseModel('success');
  };

  //<-apple->
  const redirectToHealthConnect = async () => {
    try {
      await openHealthConnectSettings();
      console.log('Opened Health Connect settings');
    } catch (error) {
      console.error('Failed to open Health Connect settings', error);
    }
  };

  const checkAppInstalled = async (AppName = '') => {
    try {
      AppInstalledChecker.isAppInstalledAndroid('healthdata').then(
        isInstalled => {
          if (isInstalled) {
            if (AppName === 'FitbitMobile') {
              fitbitAppInstalled();
            } else {
              getHealthData();
            }
          } else {
            setScreenType(1);
            setsubErrorMsg(
              'Health Connect is not installed. Redirecting to Play Store...',
            );
          }
        },
      );
    } catch (err) {}
  };

  const googleFitAppInstalled = async (type = 0) => {
    try {
      AppInstalledChecker.isAppInstalledAndroid('FitbitMobile').then(
        isInstalled => {
          if (isInstalled) {
            if (type === 1) {
              redirectToHealthConnect();
            } else {
              getHealthData();
            }
          } else {
            openHealthConnectInPlayStore('FitbitMobile');
            setScreenType(1);
            setsubErrorMsg(
              'Fitbit app is not installed. Redirecting to Play Store...',
            );
          }
        },
      );
    } catch (err) {}
  };

  const fitbitAppInstalled = async (type = 0) => {
    try {
      AppInstalledChecker.isAppInstalledAndroid('FitbitMobile').then(
        isInstalled => {
          if (isInstalled) {
            if (type === 1) {
              redirectToHealthConnect();
            } else {
              getHealthData();
            }
          } else {
            openHealthConnectInPlayStore('FitbitMobile');
            setScreenType(1);
            setsubErrorMsg(
              'Fitbit app is not installed. Redirecting to Play Store...',
            );
          }
        },
      );
    } catch (err) {}
  };

  const getHealthData = async () => {
    try {
      const initializeCheck = await initializeHealthConnect();
      if (initializeCheck) {
        const permissions = await requestPermission([
          {accessType: 'read', recordType: 'TotalCaloriesBurned'},
          {accessType: 'read', recordType: 'ActiveCaloriesBurned'},
          {accessType: 'read', recordType: 'Steps'},
          {accessType: 'read', recordType: 'HeartRate'},
          {accessType: 'read', recordType: 'Distance'},
          {accessType: 'read', recordType: 'SleepSession'},
          {accessType: 'read', recordType: 'Height'},
          {accessType: 'read', recordType: 'Weight'},
          {accessType: 'read', recordType: 'BloodPressure'},
          {accessType: 'read', recordType: 'Nutrition'},
          {accessType: 'write', recordType: 'RestingHeartRate'},
        ]);
        const grantedPermissions = permissions.filter(
          permission => permission.granted,
        );

        if (grantedPermissions.length >= 0) {
          // setRestingHeartRate(55);
          fetchWatchData();
        } else {
          setScreenType(1);
          setsubErrorMsg('Opened Health Connect settings');
        }
      } else {
        setScreenType(1);
        setsubErrorMsg('Opened Health Connect settings');
      }
    } catch (error) {
      console.error('Authorization failed', error);
    }
  };

  const initializeHealthConnect = async () => {
    try {
      const type = await initialize();
      console.log('HealthConnect initialized', type);
      return type;
    } catch (error) {
      console.error('Initialization failed', error);
      return false;
    }
  };

  const openHealthConnectInPlayStore = (urlName = 'healthdata') => {
    const healthdataUrl =
      'https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata';
    const fitbitUrl =
      'https://play.google.com/store/apps/details?id=com.fitbit.FitbitMobile&hl=en';
    const googleFitUrl =
      'https://play.google.com/store/apps/details?id=com.google.android.apps.fitness&hl=en';

    const url = Platform.select({
      android: urlName === 'healthdata' ? healthdataUrl : fitbitUrl,
    });

    Linking.openURL(url).catch(err =>
      console.error('Failed to open Play Store', err),
    );
  };

  const fetchWatchData = async () => {
    try {
      const StartValue = '2024-08-25T03:43:54.898Z';
      const endValue = new Date().toISOString();

      // Helper function to fetch data for each health metric
      const fetchHealthData = async type => {
        const result = await readRecords(type, {
          timeRangeFilter: {
            operator: 'between',
            startTime: StartValue,
            endTime: endValue,
          },
        });
        return result?.records || [];
      };

      // Fetching all health data
      const stepsResult = await fetchHealthData('Steps');
      const totalCaloriesBurnedResult = await fetchHealthData(
        'TotalCaloriesBurned',
      );
      const heartRateResult = await fetchHealthData('HeartRate');
      const distanceResult = await fetchHealthData('Distance');
      const sleepSessionResult = await fetchHealthData('SleepSession');
      const heightResult = await fetchHealthData('Height');
      const weightResult = await fetchHealthData('Weight');
      const BloodPressureResult = await fetchHealthData('BloodPressure');
      const ActiveCaloriesBurned = await fetchHealthData(
        'ActiveCaloriesBurned',
      );
      const Nutrition = await fetchHealthData('Nutrition');
      // Organize health data into an array
      const HealthData = [
        {id: 'stepsResult', data: stepsResult},
        {id: 'totalCaloriesBurnedResult', data: totalCaloriesBurnedResult},
        {id: 'heartRateResult', data: heartRateResult},
        {id: 'distanceResult', data: distanceResult},
        {id: 'sleepSessionResult', data: sleepSessionResult},
        {id: 'weightResult', data: weightResult}, // This should now log properly
        {id: 'heightResult', data: heightResult},
        {id: 'BloodPressureResult', data: BloodPressureResult},
        {id: 'ActiveCaloriesBurned', data: ActiveCaloriesBurned},
        {id: 'Nutrition', data: Nutrition},
      ];
      LocalStoreData(HealthData, true);
      hanldeCloseModel('success');
    } catch (error) {
      setScreenType(1);
      LocalStoreData(null, false);
      setsubErrorMsg('Opened Health Connect settings');
      console.error('Failed to fetch health data', error);
    }
  };

  const LocalStoreData = async (HelthData = null, status = false) => {
    if (status) {
      if (HelthData) {
        await AsyncStorage.setItem(
          'HealthConnectData',
          JSON.stringify(HelthData),
        );
      }
    }
    await AsyncStorage.setItem('WatchConnect', JSON.stringify(status));
  };

  return (
    <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
      <View
        className="bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]"
        style={{paddingBottom: 70, alignSelf: 'center'}}>
        <Pressable onPress={hanldeCloseModel}>
          <Image
            source={bottom_bg}
            style={{
              width: '100%',
              height: 55,
              position: 'absolute',
              marginTop: -15,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </Pressable>

        {ScreenType === 0 ? DeviceConn() : DeviceConnError()}
        <NextButton
          onPress={() => onButtonHandle()}
          title={ScreenType === 0 ? 'Start syncing' : 'Try linking again'}
          isContinueBtn={true}
        />
      </View>
    </ModelBox>
  );
};

export default HealthLinkedModel;
