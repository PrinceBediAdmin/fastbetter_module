import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import Background from "../../components/Background";
import { fastingValue } from "../../function/data";
import Header from "../../components/Header";
import Personalised_workouts from '../../assets/afterscreen/home/Personalised_workouts.png'

//model
import PersonalisedWorkoutsModel from "./HomeModel/PersonalisedWorkoutsModel";
import Fasting from "../../components/Fasting";
import { getAxiosWithToken } from "../../axios/AxiosObj";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import LinkDevice from "../../components/LinkDevice";


const glassesData = [
  { id: 1, isActive: false },
  { id: 2, isActive: false },
  { id: 3, isActive: false },
  { id: 4, isActive: false },
  { id: 5, isActive: false },
  { id: 6, isActive: false },
  { id: 7, isActive: false },
  { id: 8, isActive: false },
  { id: 9, isActive: false },
  { id: 10, isActive: false },
  { id: 11, isActive: false },
  { id: 12, isActive: false },
  { id: 13, isActive: false },
  { id: 14, isActive: false },
]


export default function HomeScreen() {

  const navigation = useNavigation();


  const getDashboardData = async () => {
    let fastingsetup = true
    try {

      if (fastingsetup) {
        await navigation.navigate('Fasting')
      }
      console.log(response.data.fastingsetup);
    } catch (error) {
      console.log(error)
      console.log('Error in dashboard:', error);
    }
  }

  useEffect(() => {
    getDashboardData();
  }, [])

  return (
    <Background statusBarTranslucent={true} statusBarBgColor="#dcbdb300">
      <Header />
      <ScrollView className="mb-0 w-full" showsVerticalScrollIndicator={false}>
        <Fasting fastingValue={fastingValue} />

        <View className="px-6 mb-24">
          <LinkDevice />
        </View>
      </ScrollView>


    </Background>
  );
}
