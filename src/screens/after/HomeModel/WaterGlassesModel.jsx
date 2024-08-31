import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Platform, Pressable, FlatList } from "react-native";
import { ModelBox } from "../../../components/Models/Models";
import bottom_bg from '../../../assets/diagnosed/bottom_bg.png'
import NextButton from "../../../components/NextButton";

const WaterGlassesModel = ({
    isModelOpen,
    hanldeCloseModel,
}) => {

    const [glasses, setGlasses] = useState(0);
    const [continueBtn, setContinueBtn] = useState(false);


    const onChanges = (pre) => {
        switch (pre) {
            case 1:
                if (glasses > 0) {
                    setGlasses((pre) => pre - 1);
                }
                break;
            default:
                if (glasses >= 0) {
                    setGlasses((pre) => pre + 1);
                }
                break;
        };
    };

    useEffect(() => {
        if (glasses > 0) {
            setContinueBtn(true);
        } else {
            setContinueBtn(false);
        }
    }, [glasses]);

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
            <View className='bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]' style={{ paddingBottom: 70, alignSelf: 'center' }}>
                <Pressable onPress={hanldeCloseModel}>
                    <Image source={bottom_bg} style={{ width: "100%", height: 55, position: 'absolute', marginTop: -15, alignSelf: 'center', }} resizeMode='contain' />
                </Pressable>
                <View style={{ marginTop: 62 }}>
                    <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-[10px]">
                        {"How much water did you \n"}
                        <Text className={`text-[#FE7701] text-[24px] font-LarkenBlod ${Platform.OS == 'ios' && "font-[700]"}`}>{"consumed"}</Text>
                        {"?"}
                    </Text>
                    <Text className="text-[12px] leading-[14px] text-center font-normal text-black px-1 font-[400] mb-[10px]">{"Mention the number of glasses"}</Text>

                    <View style={{ flexDirection: "row", alignSelf: 'center', justifyContent: "center", alignItems: 'center', marginTop: 40 }}>
                        <TouchableOpacity onPress={() => onChanges(1)} className='bg-[#FFEDE0] px-1 py-1 rounded-md h-[40px] w-[40px]' style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/common/minus.png')} className="h-[24px] w-[24px]" style={{ justifyContent: 'center' }} />
                        </TouchableOpacity>
                        <View style={{ marginHorizontal: 75 }}>
                            <Text className="text-[80px] leading-[84px] text-center text-[#18192B] px-1 font-[400]">{glasses}</Text>
                            <Text className="text-[24px] leading-[25px] text-center text-[#18192B] px-1 font-Larken font-[400]">{"glasses"}</Text>
                        </View>

                        <TouchableOpacity onPress={() => onChanges(2)} className='bg-[#FFEDE0] px-1 py-1 rounded-md h-[40px] w-[40px]' style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../../assets/common/pluse.png')} className="h-[24px] w-[24px]" style={{ justifyContent: 'center' }} />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-[12px] leading-[14px] text-center font-normal text-[#18192B] px-1 font-[400] mt-[40px] mb-[80px]">{"1 glass = "}
                        <Text className="font-[700]">{"250 ml"}</Text>
                    </Text>
                </View>
                <NextButton onPress={() => hanldeCloseModel()} title="Update water log" isContinueBtn={continueBtn} />
            </View>
        </ModelBox>
    );
}

export default WaterGlassesModel;