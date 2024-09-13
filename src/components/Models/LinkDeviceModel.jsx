/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Pressable,
  Alert,
  Linking,
} from 'react-native';
import {ModelBox} from '../../components/Models/Models';
import bottom_bg from '../../assets/diagnosed/bottom_bg.png';
import HealthConnect_Icon from '../../assets/linkDevice/HealthConnect_Icon.png';
import Applehealth_Icon from '../../assets/linkDevice/Applehealth_Icon.png';
import fitbit_icon from '../../assets/linkDevice/fitbit_icon.png';
import AppleHealthKit from 'react-native-health';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {PermissionsAndroid} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const LinkDeviceModel = ({isModelOpen, hanldeCloseModel, onItemClick}) => {
  const Data = [
    {
      id: 1,
      title: 'Health Connect',
      subTitle: 'Link the FastBetter app with \nhealth connect',
      image: HealthConnect_Icon,
      modelTitle: 'Health Connect linked',
    },
    {
      id: 2,
      title: 'Apple health',
      subTitle: 'Link the FastBetter app with \napple heath',
      image: Applehealth_Icon,
      modelTitle: 'Apple health linked',
    },
    {
      id: 3,
      title: 'Fitbit',
      subTitle: 'Link the FastBetter app with \nfitbit',
      image: fitbit_icon,
      modelTitle: 'Health Connect linked',
    },
  ];

  const signInAndGetUserInfo = async () => {
    try {
      // Sign in
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // Extract user information
      const {user} = userInfo;
      console.log('User Info:', user);
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Id Token:', user.idToken);
    } catch (error) {
      console.error('Error signing in', error);
    }
  };

  useEffect(() => {
    requestActivityRecognitionPermission();
  }, []);

  // Function to revoke Google Fit access
  const revokeGoogleFitAccess = async () => {
    await GoogleFit.disconnect(); // Retrieve the OAuth token

    // console.log(token);
    // if (token) {
    //   // Call Google's revoke endpoint
    //   const revokeUrl = `https://accounts.google.com/o/oauth2/revoke?token=${token}`;
    //   Linking.openURL(revokeUrl)
    //     .then(() => {
    //       console.log('Successfully revoked Google Fit access');
    //       // Perform any additional cleanup, such as clearing stored data
    //     })
    //     .catch(error => {
    //       console.warn('Error revoking Google Fit access:', error);
    //     });
    // } else {
    //   console.warn('No token available to revoke');
    // }
  };

  async function requestActivityRecognitionPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: 'Activity Recognition Permission',
          message:
            'This app needs access to your activity data to track steps.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access activity recognition');
      } else {
        console.log('Activity recognition permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const googleConnect = () => {
    const options = {
      scopes: [
        //Scopes.FITNESS_ACTIVITY_READ,
        //Scopes.FITNESS_BODY_READ,
        // Scopes.FITNESS_BODY_WRITE,
        // Scopes.FITNESS_LOCATION_READ,
        // Scopes.FITNESS_SLEEP_READ,
      ],
    };

    GoogleFit.checkIsAuthorized().then(() => {
      console.log(JSON.stringify(GoogleFit));
      if (!GoogleFit.isAuthorized) {
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              Alert.alert(
                '' + authResult.success,
                '.' + JSON.stringify(authResult.success),
              );
              fetchHeightData();

              console.log('Authorization successful');
            } else {
              Alert.alert(
                '' + authResult.success,
                '.' + JSON.stringify(authResult),
              );
              console.log('Authorization failed', authResult);
            }
          })
          .catch(error => {
            console.error('Authorization error', error);
          });
      } else {
        //saveHeightData(1.75);
        fetchHeightData();
      }
    });
  };

  const saveHeightData = async height => {
    try {
      const endDate = new Date().toISOString(); // Current time
      const startDate = new Date(endDate).toISOString(); // Use the same time for the current entry

      const heightSample = {
        startDate,
        endDate,
        value: height, // Height in meters
        // Add additional fields if needed
      };

      // Save height data
      await GoogleFit.saveHeight({
        ...heightSample,
        type: 'HEIGHT', // Specify the type of body sample
      });

      console.log('Height data saved successfully');
    } catch (error) {
      console.error('Error saving height data', error);
    }
  };

  const fetchHealthData = async () => {
    try {
      const today = new Date();
      const startDate = new Date(
        today.setDate(today.getDate() - 7),
      ).toISOString(); // 1 week ago
      const endDate = new Date().toISOString(); // today

      // Fetch daily step count
      const stepCount = await GoogleFit.getDailyStepCountSamples({
        startDate,
        endDate,
      });
      console.log('Step Count Data:', stepCount);

      // Fetch sleep data
      const sleepData = await GoogleFit.getSleepSamples({startDate, endDate});
      console.log('Sleep Data:', sleepData);

      // Fetch heart rate data
      const heartRateData = await GoogleFit.getHeartRateSamples({
        startDate,
        endDate,
      });
      console.log('Heart Rate Data:', heartRateData);

      // Fetch sessions data (if available)
      const sessionsData = await GoogleFit.getSessions({startDate, endDate});
      console.log('Sessions Data:', sessionsData);
    } catch (error) {
      console.error('Error fetching health data', error);
    }
  };

  const fetchHeightData = () => {
    const today = new Date();
    const startDate = new Date(
      today.setDate(today.getDate() - 7),
    ).toISOString(); // 1 week ago
    const endDate = new Date().toISOString(); // today
    GoogleFit.getSleepSamples({
      startDate,
      endDate,
    })
      .then(res => {
        console.log(' Data:', res);
        // Process the data as needed
      })
      .catch(err => {
        console.error('Error fetching height data', err);
        Alert.alert('Error', 'Failed to fetch height data.');
      });
  };

  const fetchStepCountData = async () => {
    const today = new Date();
    const startDate = new Date(
      today.setDate(today.getDate() - 7),
    ).toISOString(); // 1 week ago
    const endDate = new Date().toISOString(); // today

    GoogleFit.getDailyStepCountSamples({
      startDate,
      endDate,
    })
      .then(res => {
        console.log('Step Count Data:', res);
        // Process the data as needed
      })
      .catch(err => {
        console.error('Error fetching step count data', err);
        Alert.alert('Error', 'Failed to fetch step count data.');
      });
  };

  const onClickHandle = (itemValue, index) => {
    if (index === 0) {
      googleConnect();
    } else if (index === 1) {
      // onItemClick(itemValue.modelTitle);
      AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
        if (err) {
          console.log('Error initializing HealthKit: ', err);
          return;
        }
        console.log('HealthKit initialized: ', results);
      });
    } else {
      // signInAndGetUserInfo();
      revokeGoogleFitAccess();
    }
  };

  const healthKitOptions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.StepCount,
        AppleHealthKit.Constants.Permissions.Workout,
        AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      ],
      write: [
        AppleHealthKit.Constants.Permissions.Workout,
        AppleHealthKit.Constants.Permissions.StepCount,
        AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      ],
    },
  };

  return (
    <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
      <View
        className="px-3 bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]"
        style={{paddingBottom: 70}}>
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
        <View style={{marginTop: 62}}>
          <Text className="text-[24px] leading-[25px] text-center text-black px-1 font-Larken font-[400] mb-[40px]">
            {'Link your device \nwith '}
            <Text
              className={`text-[#FE7701] text-[24px] font-LarkenBlod ${
                Platform.OS == 'ios' && 'font-[700]'
              }`}>
              {'FastBetter '}
            </Text>
          </Text>

          {Data.map((item, index) => {
            if (index === 1 && Platform.OS === 'android') {
              return null;
            }
            return (
              <View
                key={index}
                className="mt-4 shadow-lg shadow-black-100 bg-white rounded-3xl h-[126]"
                style={{
                  marginHorizontal: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={item.image}
                  style={{width: 80, height: 80, marginLeft: 24}}
                  resizeMode="contain"
                />
                <View style={{flex: 1, marginHorizontal: 16}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '700', lineHeight: 16}}>
                    {item.title}
                  </Text>
                  <Text
                    style={{fontSize: 10, fontWeight: '400', lineHeight: 16}}>
                    {item.subTitle}
                  </Text>

                  <TouchableOpacity
                    onPress={() => onClickHandle(item, index)}
                    className={`text-center bg-[#FF995033] py-1.5 rounded-lg w-[90px] mx-a mt-3`}>
                    <Text className="text-[#FE7701] text-center text-xs font-[700]">
                      Tap to link
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ModelBox>
  );
};

export default LinkDeviceModel;
