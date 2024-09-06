/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Image, Text, Platform} from 'react-native';

const FastingStreakComponent = ({
  fastingValue,
  data,
  title = 'Your fasting streak',
}) => {
  function convertToSeconds(dursanValue) {
    const unit = dursanValue.slice(-1); // Get the last character (unit)
    const value = parseFloat(dursanValue.slice(0, -1)); // Get the numeric part

    if (unit === 'h') {
      return value * 3600; // Convert hours to seconds
    }
    // You can add more units like "m" for minutes if needed
    return null; // Return null if the unit is not recognized
  }

  function isMatching(timeValue, dursanValue) {
    const dursanInSeconds = convertToSeconds(dursanValue);

    if (dursanInSeconds !== null) {
      return timeValue >= dursanInSeconds;
    }
    return false; // If conversion fails, return false
  }

  return (
    <View
      style={{
        marginTop: 32,
        height: 127,
        width: 330,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 30},
        shadowOpacity: 0.1,
        shadowRadius: 60,
        ...Platform.select({
          android: {
            elevation: 4, // Adjust the elevation to match the desired shadow effect
          },
        }),
      }}>
      <Text
        style={{
          color: '#FE7701',
          fontSize: 12,
          fontWeight: '700',
          textAlign: 'left',
        }}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 5,
          marginTop: 16,
        }}>
        {fastingValue.map((item, index) => {
          let fastingStatus = 0;

          if (item?.value === null) {
            fastingStatus = 0;
          } else if (
            isMatching(item?.value, data?.fasting ? data?.fasting + 'h' : '8h')
          ) {
            fastingStatus = 1;
          } else {
            fastingStatus = 2;
          }
          return (
            <View
              key={index}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  fastingStatus === 0
                    ? require('../../assets/afterscreen/home/fastVariants2.png')
                    : fastingStatus === 1
                    ? require('../../assets/afterscreen/home/fastVariants.png')
                    : require('../../assets/afterscreen/home/fastVariants1.png')
                }
                style={{height: 24, width: 24}}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontWeight: '400',
                  marginTop: 1,
                }}>
                {item.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FastingStreakComponent;
