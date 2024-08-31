import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Platform, Pressable, FlatList, Dimensions } from "react-native";
import { ModelBox } from "../../../components/Models/Models";
import bottom_bg from '../../../assets/diagnosed/bottom_bg.png'
import NextButton from "../../../components/NextButton";
import { getNumbersInRange } from "../../../utilities";
const { width, height } = Dimensions.get('window');

const BloodPressureModel = ({
    isModelOpen,
    hanldeCloseModel,
}) => {

    const [continueBtn, setContinueBtn] = useState(true);
    const [sysArray, setSysArray] = useState(getNumbersInRange(0, 200));
    const [sysIndex, setSysIndex] = useState(120);

    const [diaArray, setDiaArray] = useState(getNumbersInRange(0, 200));
    const [diaIndex, setDiaIndex] = useState(80);
    const ref = useRef();

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel} Directio={null}>
            <View className='bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]' style={{ paddingBottom: 70, alignSelf: 'center' }}>
                <Pressable onPress={hanldeCloseModel}>
                    <Image source={bottom_bg} style={{ width: "100%", height: 55, position: 'absolute', marginTop: -15, alignSelf: 'center', }} resizeMode='contain' />
                </Pressable>
                <View style={{ marginTop: 62 }}>
                    <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-[10px]">
                        {"What is your \n"}
                        <Text className={`text-[#FE7701] text-[24px] font-LarkenBlod ${Platform.OS == 'ios' && "font-[700]"}`}>{"blood pressure today"}</Text>
                        {"?"}
                    </Text>

                    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                        <Text className="text-[14px] leading-[16px] text-right font-normal text-[#18192B] px-1 font-[600] " style={{ alignSelf: "center" , marginRight: 10}}>{"Sys\n"}
                            <Text className="font-[400]" style={{ fontStyle: 'italic' }}>{"mm/hg"}</Text>
                        </Text>
                        <WheelPicker
                            ref={ref}
                            itemWidth={80}
                            itemHeight={height < 700 ? 70 : 60}
                            containerHeight={height < 700 ? 300 : 200}
                            selectedIndex={sysIndex}
                            dataset={sysArray}
                            setIndex={(index) => setSysIndex(index)}
                            indicatorStyle={{
                                width: 60,
                                left: '10%',
                            }}
                        />
                        <Text style={{ fontSize: 24, fontWeight: '300', alignSelf: "center", marginHorizontal: 20 }}>{"/"}</Text>
                       
                        <WheelPicker
                            ref={ref}
                            itemWidth={80}
                            itemHeight={height < 700 ? 70 : 60}
                            containerHeight={height < 700 ? 300 : 200}
                            selectedIndex={diaIndex}
                            dataset={diaArray}
                            setIndex={(index) => setDiaIndex(index)}
                            indicatorStyle={{
                                width: 60,
                                left: '10%',
                            }}
                        />
                          <Text className="text-[14px] leading-[16px] text-left font-normal text-[#18192B] px-1 font-[600] " style={{ alignSelf: "center" ,marginLeft: 10}}>{"Dia\n"}
                            <Text className="font-[400]" style={{ fontStyle: 'italic' }}>{"mm/hg"}</Text>
                        </Text>

                    </View>




                    <Text className="text-[10px] leading-[14px] text-center font-normal text-[#18192B] px-1 font-[400] mt-[40px] mb-[70px] ">{"We recommend measuring the blood pressue \nat the same time daily."}</Text>
                </View>
                <NextButton onPress={() => hanldeCloseModel()} title="Update blood pressure" isContinueBtn={continueBtn} />
            </View>
        </ModelBox>
    );
}

export default BloodPressureModel;


const WheelPicker = forwardRef(
    (
        {
            selectedIndex,
            dataset,
            extraData,
            containerHeight = 400,
            itemHeight = 100,
            itemWidth = 200,
            setIndex,
            containerStyle,
            activeTextStyle = {
                fontSize: 65,
                // fontFamily: 'Roboto-Regular',
                color: '#197BBD',
            },
            inactiveTextStyle = {
                fontSize: 45,
                width: 100,
                color: "#4B4B4B",
            },
            itemStyle = {
                height: itemHeight,
                alignItems: 'center',
                justifyContent: 'center',
            },
            indicatorStyle = {
                width: 120,
                left: 40,
            },
        },
        ref,
    ) => {
        const Item = ({ indexOfElement, title }) => (
            <View style={selectedIndex == indexOfElement ? {
                height: itemHeight,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5, // Android box shadow
                shadowColor: 'black', // iOS box shadow
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0,
                shadowRadius: 2,
            } : {
                height: itemHeight,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Pressable
                    onPress={() => {
                        ref.current.scrollToIndex({
                            index: indexOfElement,
                            viewPosition: 0,
                        });
                        setIndex(indexOfElement);
                    }}>

                    <Text style={{ ...inactiveTextStyle, textAlign: 'center', color: selectedIndex == indexOfElement ? "#000" : "#EBEBEB", fontSize: selectedIndex == indexOfElement ? 40 : 26, }} className="font-Larken">{title}</Text>
                </Pressable>
            </View>
        );
        const renderItem = ({ item, index }) => (
            <Item title={item} indexOfElement={index} />
        );
        return (
            <View
                style={{
                    ...containerStyle,
                    height: containerHeight,
                    width: itemWidth,
                }}>
                <FlatList
                    ref={ref}
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={10}
                    windowSize={2}
                    initialScrollIndex={selectedIndex}
                    data={dataset}
                    extraData={extraData}
                    renderItem={renderItem}
                    decelerationRate={'fast'}
                    getItemLayout={(data, index) => ({
                        length: itemHeight,
                        offset: itemHeight * index,
                        index,
                    })}
                    keyExtractor={(item) => item}
                    snapToInterval={itemHeight}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingTop: containerHeight / 2 - itemHeight / 2,
                        paddingBottom: containerHeight / 2 - itemHeight / 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onMomentumScrollEnd={(ev) => {
                        const newIndex = Math.round(
                            ev.nativeEvent.contentOffset.y / itemHeight,
                        );
                        setIndex(newIndex);
                    }}
                />
            </View>
        );
    },
);