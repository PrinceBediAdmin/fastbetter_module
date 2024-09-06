import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import Background from '../../components/Background';
import {fastingValue} from '../../function/data';
import Header from '../../components/Header';

import Fasting from '../../components/Fasting';
import TopImageSection from '../../components/FastingPart/TopImageSection';

export default function HomeScreen() {
  const getDashboardData = async () => {};

  useEffect(() => {
    getDashboardData();
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
      </ScrollView>
    </Background>
  );
}
