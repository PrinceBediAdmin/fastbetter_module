import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Platform, Pressable, FlatList, Dimensions } from "react-native";
import { ModelBox } from "../../../components/Models/Models";
import bottom_bg from '../../../assets/diagnosed/bottom_bg.png'
import NextButton from "../../../components/NextButton";
import WheelPicker from "../../../components/WheelPicker";
import { getNumbersInRange } from "../../../utilities";
const { width, height } = Dimensions.get('window');

const WeighTodayModel = ({
    isModelOpen,
    hanldeCloseModel,
}) => {

    const [continueBtn, setContinueBtn] = useState(true);
    const [targetWeightItems, setTargetWeightItems] = useState(96);
    const [weightType, setWeightType] = useState(1);


    const min = 10;
    const max = 7 * 14 * 2.34;
    const dataArray = getNumbersInRange(min, max);
    const ref = useRef();

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
            <View className='bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]' style={{ paddingBottom: 70, alignSelf: 'center' }}>
                <Pressable onPress={hanldeCloseModel}>
                    <Image source={bottom_bg} style={{ width: "100%", height: 55, position: 'absolute', marginTop: -15, alignSelf: 'center', }} resizeMode='contain' />
                </Pressable>
                <View style={{ marginTop: 62 }}>
                    <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-[10px]">
                        {"How much do you \n"}
                        <Text className={`text-[#FE7701] text-[24px] font-LarkenBlod ${Platform.OS == 'ios' && "font-[700]"}`}>{"weigh today"}</Text>
                        {"?"}
                    </Text>
                    <View className="w-full items-center mt-6">
                        <Text className="text-[80px] -mb-3 leading-[0.2] font-normal text-center text-black font-Larken">
                            {targetWeightItems}
                        </Text>
                        <Text className="text-xl mt-0 text-center font-[400] text-black font-Larken">
                            {weightType === 1 ? "Kg" : "Lbs"}
                        </Text>
                    </View>
                    <View style={{ marginTop: 26, }}>
                        <WheelPicker
                            ref={ref}
                            containerWidth={width} // Changed to containerWidth
                            itemWidth={width < 700 ? 10 : 10} // Adjusted based on screen width
                            itemHeight={height < 700 ? 70 : 60}
                            selectedIndex={targetWeightItems}
                            dataset={dataArray}
                            setIndex={(index) => {
                                setTargetWeightItems(index);
                            }}
                            indicatorStyle={{
                                height: 80, // Adjusted based on screen width
                                top: '10%', // Adjusted based on screen width
                            }}
                            itemSpacing={-1} // Adjust spacing between items
                        />
                    </View>
                    <Text className="text-[10px] leading-[14px] text-center font-normal text-[#18192B] px-1 font-[400] mt-[40px] mb-[70px] ">{"We recommend measuring the weight \nat the same time daily."}</Text>
                </View>
                <NextButton onPress={() => hanldeCloseModel()} title="Update weight" isContinueBtn={continueBtn} />
            </View>
        </ModelBox>
    );
}

export default WeighTodayModel;