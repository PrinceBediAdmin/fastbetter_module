import React from 'react';
import { View, Image, Text, Platform } from 'react-native';

const FastingStreakComponent = ({ fastingValue }) => {
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
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 0.1,
        shadowRadius: 60,
        ...Platform.select({
          android: {
            elevation: 4, // Adjust the elevation to match the desired shadow effect
          },
        }),
      }}
    >
      <Text style={{ color: '#FE7701', fontSize: 12, fontWeight: '700', textAlign: 'left' }}>Your fasting streak</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5, marginTop: 16 }}>
        {fastingValue.map((item, index) => (
          <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={
                item.value === null
                  ? require('../../assets/afterscreen/home/fastVariants2.png')
                  : item.value === true
                    ? require('../../assets/afterscreen/home/fastVariants.png')
                    : require('../../assets/afterscreen/home/fastVariants1.png')
              }
              style={{ height: 24, width: 24 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 12, color: 'black', fontWeight: '400', marginTop: 1 }}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default FastingStreakComponent;
