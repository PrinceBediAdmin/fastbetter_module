import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Platform, Pressable , FlatList } from "react-native";
import { ModelBox } from "../../../components/Models/Models";
import bottom_bg from '../../../assets/diagnosed/bottom_bg.png'
import recipeBook_icon from '../../../assets/afterscreen/logMeal/recipeBook_icon.png'
import CustomMeal_icon from '../../../assets/afterscreen/logMeal/CustomMeal_icon.png'

import { useNavigation, useRoute } from '@react-navigation/native';

const LogMealModel = ({
    isModelOpen,
    hanldeCloseModel,
}) => {
    const flatListRef = useRef(null);
    const navigation = useNavigation();

    const Data = [
        { id: 1, title: "Browse app", subTitle: "Find the recipes from the app & log the meals", image: recipeBook_icon },
        { id: 2, title: "Custom meal", subTitle: "Add your own ingredients to log the meals", image: CustomMeal_icon },
    ];

    const renderItem = ({ item, index, boxClassName = null }) => {

        const onItemHandle =(itemId)=>{
            hanldeCloseModel()
            if(itemId == 1){
               
                navigation.navigate('ExploreEats')
            }else{
                navigation.navigate('MentionMealType')
            }
        }

        return (

            <TouchableOpacity
                onPress={() => onItemHandle(item.id)}
                style={{ marginHorizontal: 10, marginTop: 16 , borderWidth: 0.5 , borderColor:'#CFCFCF' ,}}
                className={`flex w-[160px] h-[200px] py-7 px-2 items-center rounded-[30px] shadow-lg shadow-gray-50 bg-white `}>
                    <Image source={item.image} style={{width: 80 , height: 80}} resizeMode='contain' />
                    <Text style={{marginTop: 16 , fontSize:16 , fontWeight:'700' ,textAlign:"center" , alignSelf:'center'}}>{item.title}</Text>
                    <Image source={require('../../../assets/loginscreen/line-icon.png')} style={{width: 128,  height: 2 , marginVertical: 5}} tintColor={"#DADADA"} />
                    <Text style={{marginTop: 1 , fontSize:10 , fontWeight:'400' , paddingHorizontal: 5 ,textAlign:"center" , alignSelf:'center'}}>{item.subTitle}</Text>
            </TouchableOpacity>

        )
    };

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
            <View className='px-3 bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]' style={{ paddingBottom: 70 }}>
                <Pressable onPress={hanldeCloseModel}>
                    <Image source={bottom_bg} style={{ width: "100%", height: 55, position: 'absolute', marginTop: -15, alignSelf: 'center', }} resizeMode='contain' />
                </Pressable>
                <View style={{ marginTop: 62 }}>
                    <Text className="text-[24px] leading-[25px] text-center text-black px-1 font-Larken font-[400] mb-[40px]">
                        {"Log your "}
                        <Text className={`text-[#FE7701] text-[24px] font-LarkenBlod ${Platform.OS == 'ios' && "font-[700]"}`}>{"meal    "}</Text>
                    </Text>

                    <View style={{ marginTop: 0, }}>
                        <FlatList
                            ref={flatListRef}
                            showsVerticalScrollIndicator={false}
                            data={Data}
                            renderItem={renderItem}
                            numColumns={2}
                            style={{ marginBottom: 0, alignSelf: 'center' }}
                            contentContainerStyle={{ paddingBottom: 10}}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                </View>
            </View>
        </ModelBox>
    );
}

export default LogMealModel;