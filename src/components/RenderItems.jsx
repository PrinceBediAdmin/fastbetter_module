import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

export const FastingCard = ({ item, index, isSelected }) => {
    return (
        <TouchableOpacity
            key={index}
            className={`flex w-full border mt-4 border-[#23F1C0] py-3 px-2 rounded-3xl ${(isSelected === index) && 'border-[#FF9950]'}`}
        >
            {item.isRecommended && (
                <View className='w-full flex justify-center items-center relative'>
                    <Text className='text-center text-white bg-orange-theme text-[10px] font-semibold -top-7 rounded-xl px-3 py-2 absolute'>
                        Recommended
                    </Text>
                </View>
            )}
            <View className="flex flex-row items-center justify-center mt-3">
                <Text className={`text-center text-black text-xs font-medium`}>
                    {item.name}
                </Text>
            </View>
            <View className="flex flex-row w-full justify-center items-center mt-2">
                <View className={`flex flex-row justify-end mr-0 relative`}>
                    <Text className='text-[#FE7701] text-xs font-medium mr-4 mb-8'>Fasting</Text>
                    <Image source={require('../assets/common/arrowup.png')} className="h-auto w-auto absolute top-2.5 -right-1" />
                </View>
                <Text className={`text-left text-black text-4xl font-medium ml-0`}>{item.fasting}:{item.eating}</Text>
                <View className={`flex flex-row justify-start mr-0 relative`}>
                    <Image source={require('../assets/common/arrowdown.png')} className="h-auto w-auto absolute top-3 left-0" />
                    <Text className='text-[#FE7701] text-xs font-medium ml-4 mt-8'>Eating</Text>
                </View>
            </View>
            <View className="flex flex-row mx-auto w-8/12 justify-center mt-1">
                <Text className={`text-left text-black text-lg font-medium`}>{item.startTime}:{item.endTime}</Text>
            </View>
            <View className="flex flex-row mx-auto w-8/12 justify-center mt-2 mb-1.5">
                <Text className={`text-center mt-0 text-black text-[10px] font-normal`}>
                    {item.subname}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export const EatingItemCard = ({ item, index }) => {
    return (
        <TouchableOpacity
            key={index}
            className={`flex bg-white w-[140px] h-[190px] mr-3 mt-4 rounded-3xl mb-2 shadow-sm shadow-slate-300 sha overflow-hidden`}
        >
            <Image source={item.imgSrc} className="h-[108px] w-[140px]" resizeMode='contain'/>
            <View className='px-4 py-2 pb-3.5'>
                <Text className='text-[10px]'>{item?.type}</Text>
                <Text className='text-[10px] text-black font-medium'>{item?.name}</Text>
                <Text className='text-xs mt-3 text-orange-theme font-medium'>{item?.cal} Cal</Text>
            </View>
        </TouchableOpacity>
    );
};
