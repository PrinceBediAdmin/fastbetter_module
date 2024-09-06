import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Background from '../../components/Background';
import {fastingValue} from '../../function/data';
import Header from '../../components/Header';

import Fasting from '../../components/Fasting';
import LinkDevice from '../../components/LinkDevice';
import TopImageSection from '../../components/FastingPart/TopImageSection';
import AppleHealthKit from 'react-native-health';

export default function HomeScreen() {
  const getDashboardData = async () => {
    // Request permissions
    AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
      if (err) {
        console.log('Error initializing HealthKit: ', err);
        return;
      }

      console.log('HealthKit initialized: ', results);
    });
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

  useEffect(() => {
    // getDashboardData();
  }, []);

  return (
    <Background statusBarTranslucent={true} statusBarBgColor="#dcbdb300">
      <Header />
      <ScrollView
        className="mb-0 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 70}}>
        {/* <Fasting fastingValue={fastingValue} /> */}
        <TopImageSection />
        <View className="px-6 mb-24">
          <LinkDevice />
        </View>
      </ScrollView>
    </Background>
  );
}
