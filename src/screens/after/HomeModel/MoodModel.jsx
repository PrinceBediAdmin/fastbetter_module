import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Platform, Pressable, FlatList, Dimensions } from "react-native";
import { ModelBox } from "../../../components/Models/Models";
import bottom_bg from '../../../assets/diagnosed/bottom_bg.png'
import NextButton from "../../../components/NextButton";
import { getNumbersInRange } from "../../../utilities";

import { MyCarouselForGender } from "../../../components/MyCarousel";
const { width, height } = Dimensions.get('window');

import Good from '../../../assets/afterscreen/Mood/Good.png';
import Angry from '../../../assets/afterscreen/Mood/Angry.png';
import Happy from '../../../assets/afterscreen/Mood/Happy.png';
import Sad from '../../../assets/afterscreen/Mood/Sad.png';
import Spectacular from '../../../assets/afterscreen/Mood/Spectacular.png';
import Upset from '../../../assets/afterscreen/Mood/Upset.png';

import Carousel, { Pagination } from 'react-native-snap-carousel';

const MoodData = [
    { id: 1, name: "Good", image: Good },
    { id: 2, name: "Angry", image: Angry },
    { id: 3, name: "Happy", image: Happy },
    { id: 4, name: "Sad", image: Sad },
    { id: 5, name: "Spectacular", image: Spectacular },
    { id: 6, name: "Upset", image: Upset },
]

const MoodModel = ({
    isModelOpen,
    hanldeCloseModel,
}) => {

    const [continueBtn, setContinueBtn] = useState(true);
    const [MoodTypeItems, setMoodTypeItems] = useState(1);
    const [MoodAarry, setMoodAarry] = useState(MoodData);
    const [SelectItem, setSelectItem] = useState(null);
    const carouselRef = useRef(null);

    const pagination = (
        <Pagination
            dotsLength={MoodData.length}
            activeDotIndex={SelectItem}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            dotStyle={{
                width: 30,
                height: 7,
                borderRadius: 50,
                marginHorizontal: 0,
                borderWidth: 1,
                borderColor: "#18192B",
                backgroundColor: '#18192B'
            }}
            inactiveDotStyle={{
                backgroundColor: '#d1cfd1',
                borderColor: "#d1cfd1",
                width: 10,
                height: 10,
                marginHorizontal: -14,
                borderRadius: 50,
                borderWidth: 2
            }}
            inactiveDotOpacity={0.8}
            inactiveDotScale={0.6}
        />
    );
    
    useEffect(() => {
        // Scroll to the selected item when SelectItem changes
        if (SelectItem != null) {
            if (carouselRef.current) {
                carouselRef.current.snapToItem(SelectItem);
            }
        }

    }, [SelectItem]);

    const renderItem = ({ item, index }) => {
        const onSelectedHandlen = (itemIndex) => {
            setSelectItem(itemIndex);
        };

        return (
            <Pressable onPress={() => onSelectedHandlen(index)} key={index}>
                <View className="flex flex-row justify-center gap-0" key={index}>
                    <Image
                        source={item.image}
                        className="w-[144px] h-[144px]"
                        resizeMode="contain"
                    />

                </View>
                {
                    MoodTypeItems == index && <Text style={{ textAlign: 'center', marginTop: 20, color: '#18192B', fontWeight: "700", fontSize: 24, fontFamily: "Larken" }}>{item.name}</Text>
                }
            </Pressable>
        );
    };

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
            <View className='bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]' style={{ paddingBottom: 70, alignSelf: 'center' }}>
                <Pressable onPress={hanldeCloseModel}>
                    <Image source={bottom_bg} style={{ width: "100%", height: 55, position: 'absolute', marginTop: -15, alignSelf: 'center', }} resizeMode='contain' />
                </Pressable>
                <View style={{ marginTop: 62 }}>
                    <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-[10px]">
                        {"How are you \n"}
                        <Text className={`text-[#FE7701] text-[24px] font-LarkenBlod ${Platform.OS == 'ios' && "font-[700]"}`}>{"feeling today"}</Text>
                        {"?"}
                    </Text>
                    <ScrollView
                        className="mb-10" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 0, alignSelf: "center" }}>
                        <View className="text-center mb-5 mt-5">
                            <MyCarouselForGender carouselRef={carouselRef} renderItem={renderItem} data={MoodAarry} activeSlide={MoodTypeItems} setActiveSlide={setMoodTypeItems} itemWidth={160} />
                            {pagination}
                        </View>
                    </ScrollView>
                </View>
                <NextButton onPress={() => hanldeCloseModel()} title="Update my mood" isContinueBtn={continueBtn} />
            </View>
        </ModelBox>
    );
}

export default MoodModel;


