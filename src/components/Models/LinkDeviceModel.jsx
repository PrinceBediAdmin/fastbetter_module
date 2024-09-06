import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Platform, Pressable } from "react-native";
import { ModelBox } from "../../components/Models/Models";
import bottom_bg from '../../assets/diagnosed/bottom_bg.png'
import HealthConnect_Icon from '../../assets/linkDevice/HealthConnect_Icon.png';
import Applehealth_Icon from '../../assets/linkDevice/Applehealth_Icon.png';
import fitbit_icon from '../../assets/linkDevice/fitbit_icon.png';

const LinkDeviceModel = ({
    isModelOpen,
    hanldeCloseModel,
    onItemClick
}) => {

    const Data = [
        { id: 1, title: "Health Connect", subTitle: "Link the FastBetter app with \nhealth connect", image: HealthConnect_Icon, modelTitle: "Health Connect linked" },
        { id: 1, title: "Apple health", subTitle: "Link the FastBetter app with \napple heath", image: Applehealth_Icon, modelTitle: "Apple health linked" },
        { id: 1, title: "Health Connect", subTitle: "Link the FastBetter app with \nfitbit", image: fitbit_icon, modelTitle: "Health Connect linked" }
    ];

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
            <View className='px-3 bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]' style={{ paddingBottom: 70 }}>
                <Pressable onPress={hanldeCloseModel}>
                    <Image source={bottom_bg} style={{ width: "100%", height: 55, position: 'absolute', marginTop: -15, alignSelf: 'center', }} resizeMode='contain' />
                </Pressable>
                <View style={{ marginTop: 62 }}>
                    <Text className="text-[24px] leading-[25px] text-center text-black px-1 font-Larken font-[400] mb-[40px]">
                        {"Link your device \nwith "}
                        <Text className={`text-[#FE7701] text-[24px] font-LarkenBlod ${Platform.OS == 'ios' && "font-[700]"}`}>{"FastBetter "}</Text>
                    </Text>

                    {
                        Data.map((item, index) => {

                            return (
                                <View key={index} className="mt-4 shadow-lg shadow-black-100 bg-white rounded-3xl h-[126]" style={{ marginHorizontal: 30, flexDirection: "row", alignItems: 'center' }}>
                                    <Image source={item.image} style={{ width: 80, height: 80, marginLeft: 24 }} resizeMode='contain' />
                                    <View style={{ flex: 1, marginHorizontal: 16 }}>
                                        <Text style={{ fontSize: 16, fontWeight: "700", lineHeight: 16 }}>{item.title}</Text>
                                        <Text style={{ fontSize: 10, fontWeight: "400", lineHeight: 16 }}>{item.subTitle}</Text>

                                        <TouchableOpacity onPress={() => onItemClick(item.modelTitle)} className={`text-center bg-[#FF995033] py-1.5 rounded-lg w-[90px] mx-a mt-3`} >
                                            <Text className="text-[#FE7701] text-center text-xs font-[700]">Tap to link</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </ModelBox>
    );
}

export default LinkDeviceModel;