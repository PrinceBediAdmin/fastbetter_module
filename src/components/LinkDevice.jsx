/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Linking,
  Platform,
} from 'react-native';
import LinkDeviceModel from './Models/LinkDeviceModel';
import HealthLinkedModel from './Models/HealthLinkedModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  HealthConnect,
  requestPermission,
  initialize,
  readRecords,
  openHealthConnectSettings,
  isAvailable,
} from 'react-native-health-connect';
import {
  AppInstalledChecker,
  CheckPackageInstallation,
} from 'react-native-check-app-install';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import {getAppleHealthData} from './Models/AppleFatchData';

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

export default function LinkDevice() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLinkModelOpen, setIsLinkModelOpen] = useState(false);
  const [isModelTitle, setIsModelTitle] = useState('');
  const [status, setStatus] = useState(false);
  const [connectMsg, setConnectMsg] = useState({
    title: 'Link your device with FastBetter',
    subTitle: 'Bring a new level of efficiency to your daily tasks.',
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkWatchStatus();
    } else {
      AppleWatchStatus();
    }
  }, []);

  const AppleWatchStatus = async () => {
    const WatchConnect = await AsyncStorage.getItem('WatchConnect');
    if (JSON.parse(WatchConnect)) {
      AppleHealthKit.initHealthKit(permissions, (err, results) => {
        if (err) {
          setStatus(false);
          setConnectMsg({
            title: 'Link your device with FastBetter',
            subTitle: 'Bring a new level of efficiency to your daily tasks.',
          });
          fetchAppleData();
          console.log('error initializing HealthKit: ', err);
          return;
        } else {
          setStatus(true);
          setConnectMsg({
            title: 'Syncing with your health connect',
            subTitle:
              'Your health connect stats are being synced, to change fo to settings.',
          });
        }
      });
    } else {
      setStatus(false);
      setConnectMsg({
        title: 'Link your device with FastBetter',
        subTitle: 'Bring a new level of efficiency to your daily tasks.',
      });
    }
  };

  const fetchAppleData = async () => {
    const HealthData = await getAppleHealthData();
    LocalStoreData(HealthData, true);
  };

  const checkWatchStatus = async () => {
    const WatchConnect = await AsyncStorage.getItem('WatchConnect');
    AppInstalledChecker.isAppInstalled('healthdata').then(isInstalled => {
      if (isInstalled) {
        if (JSON.parse(WatchConnect)) {
          getinitializeCheck();
        } else {
          setStatus(false);
          setConnectMsg({
            title: 'Link your device with FastBetter',
            subTitle: 'Bring a new level of efficiency to your daily tasks.',
          });
        }
      } else {
        setStatus(false);
        setConnectMsg({
          title: 'Link your device with FastBetter',
          subTitle: 'Bring a new level of efficiency to your daily tasks.',
        });
      }
    });
  };

  const initializeHealthConnect = async () => {
    try {
      const type = await initialize();
      console.log('HealthConnect initialized', type);
      if (type) {
        return type;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Initialization failed', error);
      return false;
    }
  };

  const getinitializeCheck = async () => {
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
      ]);
      const grantedPermissions = permissions.filter(
        permission => permission.granted,
      );

      if (grantedPermissions.length >= 0) {
        fetchWatchData();
      } else {
        setStatus(false);
        setConnectMsg({
          title: 'Link your device with FastBetter',
          subTitle: 'Bring a new level of efficiency to your daily tasks.',
        });
      }
    } else {
      setStatus(false);
      setConnectMsg({
        title: 'Link your device with FastBetter',
        subTitle: 'Bring a new level of efficiency to your daily tasks.',
      });
    }
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
    } catch (error) {
      setStatus(false);
      setConnectMsg({
        title: 'Link your device with FastBetter',
        subTitle: 'Bring a new level of efficiency to your daily tasks.',
      });
    }
  };

  const LocalStoreData = async (HelthData = null, status = false) => {
    if (status) {
      setStatus(true);
      setConnectMsg({
        title: 'Syncing with your health connect',
        subTitle:
          'Your health connect stats are being synced, to change fo to settings.',
      });
      if (HelthData) {
        await AsyncStorage.setItem(
          'HealthConnectData',
          JSON.stringify(HelthData),
        );
      }
    }
    await AsyncStorage.setItem('WatchConnect', JSON.stringify(status));
  };

  const hanldeCloseModel = async () => {
    setIsModelOpen(false);
  };

  const handleLinkItenModel = res => {
    setIsModelOpen(false);
    setIsModelTitle(res);
    setTimeout(() => {
      setIsLinkModelOpen(true);
    }, 1000);
  };

  const HandleCloseLinkModel = res => {
    setIsLinkModelOpen(false);
    if (res !== 'success') {
      setTimeout(() => {
        setIsModelOpen(true);
      }, 1000);
    } else {
      setStatus(true);
      setConnectMsg({
        title: 'Syncing with your data',
        subTitle:
          'Your connect stats are being synced, to change fo to settings.',
      });
    }
  };

  return (
    <>
      <View className="flex flex-row pr-3 mt-6 shadow-lg shadow-black-100 bg-white rounded-3xl h-[175px]">
        <View className="w-5/12">
          <Image
            source={
              status
                ? require('../assets/afterscreen/track/apple-watch.png')
                : require('../assets/afterscreen/home/device.png')
            }
            style={{width: 150, height: 176}}
            resizeMode="contain"
          />
        </View>
        <View className="w-6/12 flex justify-center" style={{marginLeft: 10}}>
          <Text
            className="text-black text-base font-[700]"
            style={{lineHeight: 16, marginBottom: 4}}>
            {connectMsg?.title}
          </Text>
          <Text
            className="text-gray-500 text-[10px] font-[400]"
            style={{lineHeight: 11.82, marginBottom: 8}}>
            {connectMsg?.subTitle}
          </Text>
          {!status && (
            <TouchableOpacity
              onPress={() => setIsModelOpen(true)}
              className={`text-center bg-[#FF995033] py-1.5 mt-2.5 rounded-lg w-8/12 mx-a`}>
              <Text className="text-orange-theme text-center text-xs font-medium">
                Tap to link now
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <HealthLinkedModel
        isModelOpen={isLinkModelOpen}
        hanldeCloseModel={res => HandleCloseLinkModel(res)}
        headerText={isModelTitle}
      />
      <LinkDeviceModel
        isModelOpen={isModelOpen}
        hanldeCloseModel={hanldeCloseModel}
        onItemClick={pre => handleLinkItenModel(pre)}
      />
    </>
  );
}
