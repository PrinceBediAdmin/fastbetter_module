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
          checkAppInstalled();
        }
      } else {
        if (Platform.OS === 'android') {
          AppInstalledChecker.isAppInstalled('healthdata').then(isInstalled => {
            if (isInstalled) {
              redirectToHealthConnect();
            } else {
              openHealthConnectInPlayStore();
              LocalStoreData(null, false);
            }
          });
        }
        setScreenType(0);
      }
    } else if (headerText === 'Apple health linked') {
      if (ScreenType === 0) {
        setScreenType(1);
      } else {
        setScreenType(0);
      }
    } else {
      if (ScreenType === 0) {
        setScreenType(1);
      } else {
        setScreenType(0);
      }
    }
  };

  const redirectToHealthConnect = async () => {
    try {
      await openHealthConnectSettings();
      console.log('Opened Health Connect settings');
    } catch (error) {
      console.error('Failed to open Health Connect settings', error);
    }
  };

  const checkAppInstalled = async () => {
    try {
      AppInstalledChecker.isAppInstalled('healthdata').then(isInstalled => {
        if (isInstalled) {
          getHealthData();
        } else {
          setScreenType(1);
          setsubErrorMsg(
            'Health Connect is not installed. Redirecting to Play Store...',
          );
        }
      });
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
  // const setRestingHeartRate = async restingHeartRateValue => {
  //   try {
  //     const records = [
  //       {
  //         recordType: 'RestingHeartRate', // Ensure this record type is supported
  //         heartRate: {unit: 'beats_per_minute', value: restingHeartRateValue}, // Resting heart rate value
  //         startTime: new Date().toISOString(), // Time the resting heart rate was recorded
  //         endTime: new Date().toISOString(), // Same as start time for instant measurement
  //         metadata: {
  //           recordingMethod:
  //             RecordingMethod.RECORDING_METHOD_AUTOMATICALLY_RECORDED, // Example metadata
  //           device: {
  //             manufacturer: 'Google',
  //             model: 'Pixel 4',
  //             type: DeviceType.TYPE_PHONE,
  //           },
  //         },
  //       },
  //     ];
  //     console.log('Attempting to insert records:', records);
  //     const ids = await insertRecords(records);
  //     console.log(`Resting heart rate of ${ids} bpm has been set.`);
  //   } catch (error) {
  //     console.error('Error setting resting heart rate:', error);
  //   }
  // };

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

  const openHealthConnectInPlayStore = () => {
    const url = Platform.select({
      android:
        'https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata',
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
