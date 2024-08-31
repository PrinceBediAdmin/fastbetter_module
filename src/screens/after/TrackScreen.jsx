import React, { useState, useRef } from "react";
import { ScrollView, Image, View, Text, TouchableOpacity, FlatList } from "react-native";
import Background from "../../components/Background";
import BottomBar from "../../components/BottomBar";
import Header from "../../components/Header";

import { useNavigation, useRoute } from '@react-navigation/native';

import fasting from '../../assets/afterscreen/track/fasting.png';
import workout from '../../assets/afterscreen/track/workout.png';
import calories from '../../assets/afterscreen/track/calories.png';
import water from '../../assets/afterscreen/track/water.png';
import health from '../../assets/afterscreen/track/health.png';

const TrackData = [
  { id: 1, name: "Fasting", img: fasting },
  { id: 2, name: "Workout", img: workout },
  { id: 3, name: "Calories", img: calories },
  { id: 4, name: "Water", img: water },
  { id: 5, name: "Health", img: health },
]

export default function TrackScreen() {
  const [isConnect, setIsConnect] = useState(false)
  const navigation = useNavigation();
  const flatListRef = useRef(null);


  const renderItem = ({ item, index }) => {

    const onItemHandle = (ItemId) => {
      switch (ItemId) {
        case 1:
          navigation.navigate("TrackFastingScreen")
          break;
        case 2:
          navigation.navigate("TrackWorkoutScreen")
          break;
        case 3:
          navigation.navigate("TrackCaloriesScreen")
          break;
        case 4:
          navigation.navigate("TrackWaterScreen")
          break;
        case 5:
          navigation.navigate("TrackHealthScreen")
          break;
      }
    };

    return (
      <TouchableOpacity
        style={{ marginHorizontal: 4 }}
        onPress={() => onItemHandle(item.id)} className={`bg-white flex w-[104.67px] h-[120px] border border-gray-100 py-5 px-3 justify-center items-center rounded-3xl shadow-xl shadow-gray-100`}>
        <Image source={item?.img} className="h-auto w-auto mx-auto" />
        <Text className={`text-center mt-3 text-black text-xs font-semibold`}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  };

  return (
    <Background statusBarTranslucent={true} statusBarBgColor="#dcbdb300">
      <Header />
      <Image source={require('../../assets/afterscreen/track/trackbg.png')} className="h-full w-full -z-10 absolute top-0" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 30 }}>
          <View className="flex flex-row pr-3 mt-[86px] mb-2 shadow-xl shadow-gray-200 bg-white rounded-3xl">
            <View className="w-5/12 mr-3">
              <Image source={isConnect ? require('../../assets/afterscreen/track/apple-watch.png') : require('../../assets/afterscreen/home/device.png')} className="h-40 w-40" />
            </View>
            <View className="w-7/12 flex justify-center pr-10 pl-2">
              <Text className="text-black text-[16px] font-[700] leading-[16px]">
                {isConnect ? "Syncing with your Apple watch" : "Link your device with FastBetter"}
              </Text>
              <Text className="text-gray-500 text-[10px] font-[400] leading-[11.82px] mt-[4px]">
                {isConnect ? "Your health stats are being synced, to change fo to settings." : "Bring a new level of efficiency to your daily tasks."}
              </Text>
              {!isConnect &&
                <TouchableOpacity onPress={() => setIsConnect(true)} className={`text-center bg-[#FF995033] py-1.5 mt-[16px] rounded-lg w-9/12 mx-a`} >
                  <Text className="text-orange-theme text-center text-[10px] font-medium">Tap to link now</Text>
                </TouchableOpacity>
              }
            </View>
          </View>
          <View className="flex mt-[24px]">
            <View className="px-2 py-2.5">
              <Text style={{ fontSize: 24, fontWeight: '700', fontFamily: 'Larken', lineHeight: 25.44 }}>Track</Text>
              <Text className="text-[12px] font-[400] text-[#18192B]">Select below & view historic data</Text>
            </View>
            <FlatList
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={TrackData}
              renderItem={renderItem}
              numColumns={3}
              style={{ marginLeft: -5 }}
              contentContainerStyle={{ gap: 8, paddingBottom: 100, }}
              keyExtractor={(item, index) => index.toString()} />

            {/* <View className="flex flex-row flex-wrap gap-2.5 mt-[16px]">
              <TouchableOpacity onPress={()=>navigation.navigate("TrackFastingScreen")} className={`bg-white flex w-[105px] h-[120px] border border-gray-100 py-5 px-3 justify-center items-center rounded-3xl shadow-xl shadow-gray-100`}>
                <Image source={require('../../assets/afterscreen/track/fasting.png')} className="h-auto w-auto mx-auto" />
                <Text className={`text-center mt-3 text-black text-xs font-semibold`}>
                  Fasting
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("TrackWorkoutScreen")} className={`bg-white flex w-[105px] h-[120px] border border-gray-100 py-5 px-3 justify-center items-center rounded-3xl shadow-xl shadow-gray-100`}>
                <Image source={require('../../assets/afterscreen/track/workout.png')} className="h-auto w-auto mx-auto" />
                <Text className={`text-center mt-3 text-black text-xs font-semibold`}>
                  Workout
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("TrackCaloriesScreen")} className={` bg-white flex w-[105px] h-[120px] border border-gray-100 py-5 px-3 justify-center items-center rounded-3xl shadow-xl shadow-gray-100`}>
                <Image source={require('../../assets/afterscreen/track/calories.png')} className="h-auto w-auto mx-auto" />
                <Text className={`text-center mt-3 text-black text-xs font-semibold`}>
                  Calories
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigation.navigate("TrackWaterScreen")} className={`flex w-[105px] h-[120px] border border-gray-100 py-5 px-3 justify-center items-center rounded-3xl shadow-xl shadow-gray-100 bg-white`}>
                <Image source={require('../../assets/afterscreen/track/water.png')} className="h-auto w-auto mx-auto" />
                <Text className={`text-center mt-3 text-black text-xs font-semibold`}>
                  Water
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate("TrackHealthScreen")} className={`flex w-[105px] h-[120px] border border-gray-100 py-5 px-3 justify-center items-center rounded-3xl shadow-xl shadow-gray-100 bg-white`}>
                <Image source={require('../../assets/afterscreen/track/health.png')} className="h-auto w-auto mx-auto" />
                <Text className={`text-center mt-3 text-black text-xs font-semibold`}>
                  Health
                </Text>
              </TouchableOpacity>

            </View> */}
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
