import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import Background from '../../components/Background';
import {fastingValue} from '../../function/data';
import Header from '../../components/Header';

import Fasting from '../../components/Fasting';

export default function HomeScreen() {
  const getDashboardData = async () => {};

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <Background statusBarTranslucent={true} statusBarBgColor="#dcbdb300">
      <Header />
      <ScrollView className="mb-0 w-full" showsVerticalScrollIndicator={false}>
        <Fasting fastingValue={fastingValue} />
      </ScrollView>
    </Background>
  );
}
