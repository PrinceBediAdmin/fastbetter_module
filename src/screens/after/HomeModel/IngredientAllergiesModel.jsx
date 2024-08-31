import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Platform, Pressable, FlatList } from "react-native";
import { ModelBox } from "../../../components/Models/Models";

import im11111 from '../../../assets/specificdietarypattern/1.png';
import Egg from '../../../assets/afterscreen/home/Egg.png';
import Milk from '../../../assets/afterscreen/home/Milk.png';
import Nut from '../../../assets/afterscreen/home/Nut.png';
import Soybean from '../../../assets/afterscreen/home/Soybean.png';
import Fish from '../../../assets/afterscreen/home/Fish.png';
import Wheat from '../../../assets/afterscreen/home/Wheat.png';
import Celery from '../../../assets/afterscreen/home/Celery.png';
import Crustacean from '../../../assets/afterscreen/home/Crustacean.png';
import Mustard from '../../../assets/afterscreen/home/Mustard.png';

import NextButton from "../../../components/NextButton";

const SpecificDietaryPatternData = [
    {
        id: 1,
        name: 'Nope',
        src: im11111
    },
    {
        id: 2,
        name: 'Egg',
        src: Egg
    },
    {
        id: 3,
        name: 'Milk',
        src: Milk
    },
    {
        id: 4,
        name: 'Nut',
        src: Nut
    },
    {
        id: 5,
        name: 'Soybean',
        src: Soybean
    },
    {
        id: 6,
        name: 'Fish',
        src: Fish
    },
    {
        id: 7,
        name: 'Wheat',
        src: Wheat
    },
    {
        id: 8,
        name: 'Celery',
        src: Celery
    },
    {
        id: 9,
        name: 'Crustacean',
        src: Crustacean
    },
    {
        id: 10,
        name: 'Mustard',
        src: Mustard
    }
];

const IngredientAllergiesModel = ({
    isModelOpen,
    hanldeCloseModel,
    onHandleClick
}) => {

    const [specificDietaryPatternItems, setSpecificDietaryPatternItems] = useState([]);
    const [errorMsgs, setErrorMsg] = useState('');
    const [continueBtn, setContinueBtn] = useState(false);

    const flatListRef = useRef(null);

    const handleSelectItem = async (itemId) => {

        if (itemId === 1) {
            setSpecificDietaryPatternItems([itemId]);
        } else {
            if (specificDietaryPatternItems.includes(1)) {

                setSpecificDietaryPatternItems(specificDietaryPatternItems.filter(id => id !== 1).concat(itemId));
            } else if (specificDietaryPatternItems.includes(itemId)) {

                setSpecificDietaryPatternItems(specificDietaryPatternItems.filter(id => id !== itemId));
            } else {
                setSpecificDietaryPatternItems([...specificDietaryPatternItems, itemId]);
            }
        }

        setContinueBtn(true)
        setErrorMsg('')
    };

    const handleGoForward = () => {
         
        if (specificDietaryPatternItems.length == 0) {
            setErrorMsg('Please select one item');
        } else {
            onHandleClick(specificDietaryPatternItems);
        }
    };

    const renderItem = ({ item, index, boxClassName = null }) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => handleSelectItem(item?.id)}
                    style={{ marginHorizontal: 10, marginTop: 16 }}
                    className={`flex w-[131px] h-[150px] border border-transparent py-7 px-2 items-center rounded-[30px] shadow-lg shadow-gray-100 bg-white ${boxClassName} ${specificDietaryPatternItems.includes(item.id) ? 'border-[#FF9950] bg-[#FEF8F4]' : ''}`}>
                    {item?.src && <Image source={item?.src} className={`h-[40px] w-[40px] mx-auto`} />}
                    <Text className={`text-center mt-3 text-black py-2 px-2 text-[15px] font-[500] leading-[18.91px] tracking-[0.1px] font-OpenSans_Condensed-Medium ${specificDietaryPatternItems.includes(item.id) && 'font-semibold leading-[19.2px]'}`}>
                        {item?.name}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    };

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel} Directio={null}>
            <View className=' bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]' style={{ flex: 1, alignSelf: 'center' }}>
                <Pressable onPress={hanldeCloseModel} style={{ width: 100, height: 12, marginTop: 10, alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 52, height: 4, backgroundColor: "#000", alignSelf: 'center' }} />
                </Pressable>
                <View style={{ marginTop: 26 }}>
                    <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-2">
                        {"Do you have any\n"}
                        <Text className={`text-[#FE7701] text-[24px] font-LarkenBlod ${Platform.OS == 'ios' && "font-[700]"}`}>{"ingredients allergy"}</Text>
                        {"?"}
                    </Text>
                    <Text className="text-[12px] leading-[14px] text-center font-normal text-black px-1 font-[400] mb-[10px]">{"Choose all that apply"}</Text>
                    {errorMsgs && <Text className="mt-3 mb-1 text-center underline text-red-600 text-xs">{errorMsgs}</Text>}
                    <View style={{ alignSelf: 'center', marginTop: 0, paddingBottom: 70 }}>
                        <FlatList
                            ref={flatListRef}
                            showsVerticalScrollIndicator={false}
                            data={SpecificDietaryPatternData}
                            renderItem={renderItem}
                            numColumns={2}
                            style={{ marginBottom: 0, alignSelf: 'center' }}
                            contentContainerStyle={{ paddingBottom: 250, paddingTop: 20 }}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                </View>
                <NextButton onPress={() => handleGoForward()} title="Set allergens" isContinueBtn={continueBtn} />
            </View>
        </ModelBox>
    );
};

export default IngredientAllergiesModel;