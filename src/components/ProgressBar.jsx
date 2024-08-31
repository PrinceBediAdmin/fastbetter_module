import React from 'react';
import { TouchableOpacity, View, Image, Text, Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as Progress from 'react-native-progress';

export default function ProgressBar({ progressNumber = 1, type = null, typeOnPress }) {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View className={`flex flex-row w-full items-center align-middle justify-between ${Platform.OS == 'android' ? null : 'mt-10'}`} >
            <TouchableOpacity className="h-[15.49px] w-[20px]" onPress={handleBack}>
                <Image source={require('../assets/common/back.png')} className="h-[15.49px] w-[16.54px]" resizeMode='contain' />
            </TouchableOpacity>
            {type !== null && type === 2 ?
                (
                    <View className=""></View>
                ) : (
                    <Progress.Bar progress={progressNumber / 100} width={120} height={8} className="bg-[#FFEDE0] mb-0 right-[6px]" borderWidth={0} color="#FF9950" />
                )
            }
            {type !== null && type === 1 ?
                (
                    <TouchableOpacity className="" onPress={typeOnPress}>
                        <Text className='uppercase text-sm text-[#FE7701] font-[700]'>SKIP</Text>
                    </TouchableOpacity>
                ) : (
                    <View className=""></View>
                )
            }
        </View>
    );
};
