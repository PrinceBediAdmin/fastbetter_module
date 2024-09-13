import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoadingScreen from '../screens/LoadingScreen';

// Fasting
import Fasting from '../screens/fasting/Fasting';
import FastingSchedule from '../screens/fasting/FastingSchedule';

import TrackFastingScreen from '../screens/after/Fasting/TrackFastingScreen';
import TrackWorkoutScreen from '../screens/after/Fasting/TrackWorkoutScreen';
import TrackCaloriesScreen from '../screens/after/Fasting/TrackCaloriesScreen';
import TrackWaterScreen from '../screens/after/Fasting/TrackWaterScreen';
import TrackHealthScreen from '../screens/after/Fasting/TrackHealthScreen';

import DashboardNavigation from './DashboardNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [screenName, setScreenName] = useState('Fasting');

  useEffect(() => {
    navHandle();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const navHandle = async () => {
    const loginType = await AsyncStorage.getItem('loginType');
    if (JSON.parse(loginType)) {
      setScreenName('DashboardNavigation');
    }
  };

  const disabledHeader = {headerShown: false};
  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator initialRouteName={screenName}>
          <Stack.Screen
            name="Fasting"
            options={disabledHeader}
            component={Fasting}
          />
          <Stack.Screen
            name="FastingSchedule"
            options={disabledHeader}
            component={FastingSchedule}
          />
          <Stack.Screen
            name="DashboardNavigation"
            options={disabledHeader}
            component={DashboardNavigation}
          />

          <Stack.Screen
            name="TrackFastingScreen"
            options={disabledHeader}
            component={TrackFastingScreen}
          />
          <Stack.Screen
            name="TrackWorkoutScreen"
            options={disabledHeader}
            component={TrackWorkoutScreen}
          />
          <Stack.Screen
            name="TrackCaloriesScreen"
            options={disabledHeader}
            component={TrackCaloriesScreen}
          />
          <Stack.Screen
            name="TrackWaterScreen"
            options={disabledHeader}
            component={TrackWaterScreen}
          />
          <Stack.Screen
            name="TrackHealthScreen"
            options={disabledHeader}
            component={TrackHealthScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
