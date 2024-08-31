import React, { useEffect } from "react";
import { Image, View, Text, TouchableOpacity, StatusBar, Platform } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import SystemNavigationBar from "react-native-system-navigation-bar";

export default function StarterScreen() {
  const navigation = useNavigation()
  const changeBottomBarColor = async () => {
    try {
      await SystemNavigationBar.setBarMode('light', 'navigation');
      await SystemNavigationBar.setNavigationColor('rgba(255, 153, 80, 1)');
    } catch (error) {
      console.error('Error changing navigation bar color:', error);
    }
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      changeBottomBarColor();
    });

    return unsubscribeFocus;
  }, [navigation]);

  return (
    <View className={`bg-[#FFFCFB] dark:bg-black h-screen `}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View className="flex h-full justify-between w-full relative z-10 py-20 pb-[60px] items-center">
        <Image resizeMode="contain" source={require('../assets/app_img/logo.png')} className="mt-1 w-[238px] h-[74px]" />
        <View className="text-center mx-auto w-full flex flex-col">
          <View className="text-center mx-auto w-[280px] flex flex-col gap-y-[8px]">
            <TouchableOpacity onPress={() => navigation.navigate('WhatYourName')} className="bg-[#FF9950] w-[278px] h-[70px] mx-auto justify-center text-center rounded-[16px]" >
              <Text
                style={{
                  fontWeight: Platform.OS === 'android' ? '400' : '700',
                  fontFamily: Platform.OS === 'android' ? 'Larken-Bold' : "Larken-Bold",
                }}
                className="text-white text-center text-[20px] font-[700] font-Larken leading-[21.2px]"
              >
                Begin your journey
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} className="bg-[#FFFFFF] w-[278px] h-[70px] mx-auto text-center justify-center rounded-[16px]" >
              <Text
                style={{
                  fontWeight: Platform.OS === 'android' ? '400' : '700',
                  fontFamily: Platform.OS === 'android' ? 'Larken-Bold' : "Larken-Bold",
                }}
                className="text-black dark:text-white text-center text-[20px] font-[700] leading-[21.2px] font-Larken"
              >
                Already a member
              </Text>
            </TouchableOpacity>
          </View>
          <View className="text-center mt-[24px]">
            <Text className="text-white text-center leading-[28.8px] text-[24px] font-[400]" >Intermittent Fasting </Text>
            <Text className="text-white text-center text-[24px] leading-[28.8px] font-[700]">Made Simple</Text>
          </View>
        </View>
      </View>
      <Image style={{ width: 400, height: 706, position: 'absolute', bottom: 0, alignSelf: 'center' }} resizeMode="contain" source={require('../assets/starterscreen/selfie_girl.png')} />
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['rgba(255, 255, 255, 0)', 'rgba(255, 153, 80, 1)']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 800 }}
      />
    </View>
  );
}

