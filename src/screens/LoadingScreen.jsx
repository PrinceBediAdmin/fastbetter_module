import LottieView from "lottie-react-native";
import React from "react";
import { View, StatusBar, Image } from "react-native";
import SystemNavigationBar from 'react-native-system-navigation-bar';

export default function LoadingScreen() {
  const changeBottomBarColor = async () => {
    await SystemNavigationBar.setNavigationColor('#fed7aa');
    await SystemNavigationBar.setBarMode('dark');
  }
  changeBottomBarColor();
  return (
    <View className="flex-1 bg-orange-200 justify-center items-center">
      <StatusBar backgroundColor={'#fed7aa'} barStyle={'dark-content'} />
      <Image resizeMode="contain" source={require('../assets/app_img/logo.png')} className="mt-1 w-[238px] h-[74px]" />
    </View>
  );
}
