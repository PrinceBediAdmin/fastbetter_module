import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import LinkDeviceModel from '../screens/after/HomeModel/LinkDeviceModel';
import HealthLinkedModel from '../screens/after/HomeModel/HealthLinkedModel';

export default function LinkDevice() {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isLinkModelOpen, setIsLinkModelOpen] = useState(false);
    const [isModelTitle, setIsModelTitle] = useState("");

    const hanldeCloseModel = async () => {
        setIsModelOpen(false);
    };
    const handleLinkItenModel = (res) => {
        setIsModelOpen(false)
        setIsModelTitle(res);
        setTimeout(() => {
            setIsLinkModelOpen(true);
        }, 1000);
    };
    const HandleCloseLinkModel = () => {
        setIsLinkModelOpen(false);
        setTimeout(() => {
            setIsModelOpen(true);
        }, 1000);
    };
    return (
        <>
            <View className="flex flex-row pr-3 mt-6 shadow-lg shadow-black-100 bg-white rounded-3xl h-[175px]">
                <View className="w-5/12">
                    <Image source={require('../assets/afterscreen/home/device.png')} style={{ width: 150, height: 176 }} resizeMode="contain" />
                </View>
                <View className="w-6/12 flex justify-center">
                    <Text className="text-black text-base font-[700]" style={{ lineHeight: 16, marginBottom: 4 }}>
                        Link your device with FastBetter
                    </Text>
                    <Text className="text-gray-500 text-[10px] font-[400]" style={{ lineHeight: 11.82, marginBottom: 8 }}>
                        Bring a new level of efficiency to your daily tasks.
                    </Text>
                    <TouchableOpacity onPress={() => setIsModelOpen(true)} className={`text-center bg-[#FF995033] py-1.5 mt-2.5 rounded-lg w-8/12 mx-a`} >
                        <Text className="text-orange-theme text-center text-xs font-medium">Tap to link now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <HealthLinkedModel
                isModelOpen={isLinkModelOpen}
                hanldeCloseModel={() => HandleCloseLinkModel()}
                headerText={isModelTitle}
            />
            <LinkDeviceModel
                isModelOpen={isModelOpen}
                hanldeCloseModel={hanldeCloseModel}
                onItemClick={(pre) => handleLinkItenModel(pre)}
            />
        </>
    );
};

