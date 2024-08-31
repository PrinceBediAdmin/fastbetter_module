import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from '../screens/LoadingScreen';

// Fasting 
import Fasting from '../screens/fasting/Fasting';
import FastingSchedule from '../screens/fasting/FastingSchedule';


import DashboardNavigation from './DashboardNavigation';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const disabledHeader = { headerShown: false }
  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator initialRouteName={'DashboardNavigation'}>

          <Stack.Screen name="Fasting" options={disabledHeader} component={Fasting} />          
          <Stack.Screen name="FastingSchedule" options={disabledHeader} component={FastingSchedule} />
          <Stack.Screen name="DashboardNavigation" options={disabledHeader} component={DashboardNavigation} />

        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
