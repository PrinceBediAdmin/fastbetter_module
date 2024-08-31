import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const TopImageSection = () => {

  const handleFasting = () => {

  }

  return (
    <View style={{ width: '100%' }}>
      <Image source={require('../../assets/afterscreen/home/base.png')} style={{ height: 200, width: '100%', top: 0 }} resizeMode='contain' />
      <TouchableOpacity onPress={handleFasting} style={{ alignSelf: 'center', justifyContent: 'center', position: 'absolute', bottom: 50, alignItems: 'center', backgroundColor: '#FF9950', marginHorizontal: 'auto', paddingHorizontal: 5, height: 80, borderRadius: 40, width: 80 }}>
        <Image source={require('../../assets/icons/play.png')} style={{ height: 16, width: 14 }} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default TopImageSection;
