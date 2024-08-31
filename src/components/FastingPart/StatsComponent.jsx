import React from 'react';
import { View, Image, Text } from 'react-native';

const StatItem = ({ source, title, value }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
    <Image source={source} style={{ height: 24, width: 24 }} resizeMode="contain" />
    <View style={{ justifyContent: 'start', alignItems: 'start', marginLeft: 8 }}>
      <Text style={{ color: '#18192B', opacity: 0.6, fontSize: 12, lineHeight: 14.18, fontWeight: 400 }}>{title}</Text>
      <Text style={{ color: '#18192B', fontSize: 12, fontWeight: '700', lineHeight: 14.18 }}>{value}</Text>
    </View>
  </View>
);

const StatsComponent = () => {
  return (
    <View
      style={{
        marginHorizontal: "auto",
        width: 243,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <StatItem source={require('../../assets/afterscreen/home/fasting.png')} title="Fasting" value="16h" />
      <StatItem source={require('../../assets/afterscreen/home/eating.png')} title="Eating" value="8h" />
      <StatItem source={require('../../assets/afterscreen/home/goal.png')} title="Goal" value="75kg" />
    </View>
  );
};

export default StatsComponent;
