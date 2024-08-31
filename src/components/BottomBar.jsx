import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { SvgXml } from 'react-native-svg';
import { homeIcon, eatIcon, gymIcon, trackIcon } from '../assets/svg/icons';

export default BottomBar = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const isCurrentPage = (pageName) => {
        return route.name === pageName;
    }

    return (
        <View className="flex-row flex items-center justify-evenly bg-white absolute w-full pb-2 pt-3 bottom-0 ">
            <TouchableOpacity
                className={`flex-col items-center justify-center bg-white ${isCurrentPage('HomeScreen') && 'border-b-2 border-b-white'}`}
                onPress={() => navigation.navigate('HomeScreen')}
            >
                <SvgXml xml={homeIcon(isCurrentPage('HomeScreen') ? '#FF9950' : '#a3a1a8')} width={26} height={26} />
                <Text className={`text-[#a3a1a8] font-medium mt-1 text-xs ${isCurrentPage('HomeScreen') && 'text-[#FF9950]'}`}>
                    Home
                </Text>
                <View className={`w-2 h-2 rounded-full mt-2 ${isCurrentPage('HomeScreen') ? 'bg-[#FF9950]' : 'bg-[#fff]'}`}></View>
            </TouchableOpacity>

            <TouchableOpacity
                className={`flex-col items-center justify-center bg-white ${isCurrentPage('GymScreen') && 'border-b-2 border-b-white'}`}
                onPress={() => navigation.navigate('GymScreen')}
            >
                <SvgXml xml={gymIcon(isCurrentPage('GymScreen') ? '#FF9950' : '#a3a1a8')} width={26} height={26} />
                <Text className={`text-[#a3a1a8] font-medium mt-1 text-xs ${isCurrentPage('GymScreen') && 'text-[#FF9950]'}`}>
                    Gym
                </Text>
                <View className={`w-2 h-2 rounded-full mt-2 ${isCurrentPage('GymScreen') ? 'bg-[#FF9950]' : 'bg-[#fff]'}`}></View>
            </TouchableOpacity>

            <TouchableOpacity
                className={`flex-col items-center justify-center bg-white ${isCurrentPage('EatScreen') && 'border-b-2 border-b-white'}`}
                onPress={() => navigation.navigate('EatScreen')}
            >
                <SvgXml xml={eatIcon(isCurrentPage('EatScreen') ? '#FF9950' : '#a3a1a8')} width={26} height={26} />
                <Text className={`text-[#a3a1a8] font-medium mt-1 text-xs ${isCurrentPage('EatScreen') && 'text-[#FF9950]'}`}>
                    Eat
                </Text>
                <View className={`w-2 h-2 rounded-full mt-2 ${isCurrentPage('EatScreen') ? 'bg-[#FF9950]' : 'bg-[#fff]'}`}></View>
            </TouchableOpacity>

            <TouchableOpacity
                className={`flex-col items-center justify-center bg-white ${isCurrentPage('TrackScreen') && 'border-b-2 border-b-white'}`}
                onPress={() => navigation.navigate('TrackScreen')}
            >
                <SvgXml xml={trackIcon(isCurrentPage('TrackScreen') ? '#FF9950' : '#a3a1a8')} width={26} height={26} />
                <Text className={`text-[#a3a1a8] font-medium mt-1 text-xs ${isCurrentPage('TrackScreen') && 'text-[#FF9950]'}`}>
                    Track
                </Text>
                <View className={`w-2 h-2 rounded-full mt-2 ${isCurrentPage('TrackScreen') ? 'bg-[#FF9950]' : 'bg-[#fff]'}`}></View>
            </TouchableOpacity>
        </View>
    );
};

