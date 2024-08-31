import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-modal';
import NextButton from './NextButton';
import { useNavigation } from '@react-navigation/native';

const fastingOption = [
    { name: "Sun", key: 1, value: 100 },
    { name: "Mon", key: 2, value: 10 },
    { name: "Tue", key: 3, value: 40 },
    { name: "Wed", key: 4, value: 67 },
    { name: "Thu", key: 5, value: 32 },
    { name: "Fri", key: 6, value: 40 },
    { name: "Sat", key: 7, value: 25 }
];

export default BottomModel = ({ isVisible, onClose }) => {
    const [touchY, setTouchY] = useState(0);
    const [selectedWeek, setSelectedWeek] = useState(0);
    const navigation = useNavigation();
    const handleGoForward = async () => {
        onClose();
        navigation.navigate('FastingSchedule');
    };

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 8 * 60 * 60000)); // Set endTime 8 hours after startTime

    const incrementTime = () => {
        setStartTime(prevTime => {
            const newStartTime = new Date(prevTime.getTime() + 60 * 60000); // Add 60 minutes
            setEndTime(new Date(newStartTime.getTime() + 8 * 60 * 60000)); // Ensure 8-hour gap
            return newStartTime;
        });
    };

    const decrementTime = () => {
        setStartTime(prevTime => {
            const newStartTime = new Date(prevTime.getTime() - 60 * 60000); // Subtract 60 minutes
            setEndTime(new Date(newStartTime.getTime() + 8 * 60 * 60000)); // Ensure 8-hour gap
            return newStartTime;
        });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            animationInTiming={700}
            animationOutTiming={700}
            backdropOpacity={0.6}
            swipeDirection={['down']}
            style={{ bottom: 0, margin: 0, marginHorizontal: 2, marginTop: 50 }}
        >
            <View
                className='px-3 h-full bg-white bottom-0 w-full rounded-t-3xl'
                onTouchStart={(e) => setTouchY(e.nativeEvent.pageY)}
                onTouchEnd={(e) => {
                    e.nativeEvent.pageY - touchY > 0.5 && onClose();
                }} >
                <TouchableOpacity onPress={() => onClose()} className='rounded-lg bg-gray-700 h-1.5 w-1/4 mt-3 mx-auto' />
                <View className={`mt-6 px-6 `}>
                    <View className={`rounded-3xl bg-white shadow-lg shadow-gray-100 ${Platform.OS == 'android' && "shadow-gray-400"}`} style={{ padding: 10 }}>
                        <View className='mt-6 px-6 flex flex-row justify-between'>
                            {fastingOption.map((item, index) => (
                                <View className='flex justify-center items-center gap-y-2' key={index}>
                                    <View className='bg-[#FFEDE0] w-1 h-32 rounded-xl flex flex-col justify-center items-center'>
                                        <View className={`bg-[#FF9950] w-full rounded-xl`} style={{ height: `${item?.value}%` }} />
                                    </View>
                                    <Text className='text-xs text-black font-medium'>{item?.name}</Text>
                                </View>
                            ))}
                        </View>
                        <View className='mt-6 px-4 flex flex-row gap-x-3'>
                            <View className='flex flex-row gap-x-3 justify-center items-center gap-y-2'>
                                <View className='bg-[#FFEDE0] w-3 h-3 rounded-full'></View>
                                <Text className='text-xs text-black font-medium'>Fasting</Text>
                            </View>
                            <View className='flex flex-row gap-x-3 justify-center items-center gap-y-2'>
                                <View className='bg-[#FF9950] w-3 h-3 rounded-full'></View>
                                <Text className='text-xs text-black font-medium'>Eating time</Text>
                            </View>
                        </View>
                        <View className='mt-6 px-2 flex justify-center'>
                            <Text className='text-xs text-center text-gray-500 font-normal'>Eating time</Text>
                            <View className='flex flex-row gap-x-3 justify-between items-center'>
                                <TouchableOpacity onPress={decrementTime} className='bg-[#FFEDE0] px-1 py-1 rounded-md w-[40px] h-[40px]' style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/common/minus.png')} className="h-[24px] w-[24px]" />
                                </TouchableOpacity>
                                <Text className='text-base text-black py-4 font-medium'>
                                    {formatTime(startTime)} <Text className='text-xs italic text-black font-medium'> to </Text> {formatTime(endTime)}
                                </Text>
                                <TouchableOpacity onPress={incrementTime} className='bg-[#FFEDE0] px-1 py-1 rounded-md w-[40px] h-[40px]' style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/common/pluse.png')} className="h-[24px] w-[24px]" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View className='mt-6 px-2 flex justify-center gap-x-3'>
                        <View className="">
                            <Text className="text-[18px] font-[500] text-black font-Larken" style={{ lineHeight: 19.08 }}>Treat days</Text>
                            <Text className="text-[12px] font-[400] text-black" style={{ lineHeight: 14.4 }}>On those days you take a break from fasting. Yay!</Text>
                            <View className='flex flex-row gap-2  my-3' style={{ alignSelf: 'flex-start' }}>
                                {fastingOption.map((item, index) => (
                                    <TouchableOpacity
                                        style={{ borderColor: '#EDEDED', borderRadius: 8, borderWidth: 1, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: selectedWeek !== index ? "#fff" : "#FF9950" }}
                                        key={index} onPress={() => setSelectedWeek(index)}>
                                        <Text className={`text-white text-xs text-center font-medium ${selectedWeek !== index && 'text-black'}`}>{item.name.substring(0, 2)}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text className="text-[10px] font-normal text-gray-400">We don’t recommend choosing more than 2 treat days.</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="flex items-center">
                <NextButton onPress={() => handleGoForward()} title={'Set time'} mainClassName={'absolute bottom-10'} isContinueBtn={true} />
            </View>
        </Modal>
    );
};