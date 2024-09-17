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
import {PermissionsAndroid} from 'react-native';

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
      modelTitle: 'Fitbit Connect linked',
    },
  ];

  const filteredData =
    Platform.OS === 'android'
      ? Data.filter(item => item.title !== 'Apple health')
      : Data.filter(item => item.title !== 'Health Connect');

  useEffect(() => {
    requestActivityRecognitionPermission();
  }, []);

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
  const onClickHandle = (itemValue, index) => {
    onItemClick(itemValue.modelTitle);
    // if (index === 0) {

    // } else if (index === 1) {
    //   AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
    //     if (err) {
    //       console.log('Error initializing HealthKit: ', err);
    //       return;
    //     }
    //     console.log('HealthKit initialized: ', results);
    //   });
    // } else {
    // }
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

          {filteredData.map((item, index) => {
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
