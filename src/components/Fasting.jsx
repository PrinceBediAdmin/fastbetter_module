import React from 'react';
import {View, Text, Platform} from 'react-native';
import TopImageSection from './FastingPart/TopImageSection';
import StatsComponent from './FastingPart/StatsComponent';
import FastingStreakComponent from './FastingPart/FastingStreakComponent';

const Fasting = ({fastingValue}) => {
  // console.log(fastingValue)
  return (
    <View>
      <TopImageSection />
      <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
        {/* <StatsComponent /> */}
        <FastingStreakComponent fastingValue={fastingValue} />
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            lineHeight: 14,
            textAlign: 'center',
            color: 'black',
            paddingHorizontal: 1,
            fontWeight: '400',
          }}>
          <Text
            style={{
              color: '#FE7701',
              ...(Platform.OS === 'ios' && {fontWeight: '700'}),
              fontWeight: '700',
            }}>
            {'Start fasting '}
          </Text>
          {'to achieve your goal weight'}
        </Text>
      </View>
    </View>
  );
};

export default Fasting;
