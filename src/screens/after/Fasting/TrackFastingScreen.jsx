import React, { useState, useRef, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, Pressable, Dimensions, Platform, FlatList, StyleSheet, ImageBackground } from "react-native";
import Background from "../../../components/Background";
import { useNavigation, useRoute } from '@react-navigation/native';

import { SelectList } from 'react-native-dropdown-select-list'
import down_arrow_Icon from '../../../assets/common/down_arrow_Icon.png'
import bgimage from '../../../assets/common/base.png';
import { format, add } from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';

import { EatingData, fastingValue } from "../../../function/data";
import { PieChart } from "react-native-gifted-charts";
import line_icon from '../../../assets/afterscreen/targetWorkout/line_icon.png'


const Monthdata = [
    { key: '1', value: 'January', },
    { key: '2', value: 'February' },
    { key: '3', value: 'March' },
    { key: '4', value: 'April' },
    { key: '5', value: 'May' },
    { key: '6', value: 'June' },
    { key: '7', value: 'July' },
    { key: '8', value: 'August' },
    { key: '9', value: 'September' },
    { key: '10', value: 'October' },
    { key: '11', value: 'November' },
    { key: '12', value: 'December' },
];

const YearData = [
    { key: '1', value: '2024', },
    { key: '2', value: '2025' },
    { key: '3', value: '2026' },
    { key: '4', value: '2027' },
    { key: '5', value: '2028' },
    { key: '6', value: '2029' },
    { key: '7', value: '2030' },
    { key: '8', value: '2031' },
];

const Item = ({ item, selected, setSelected }) => {
    return (
        <Pressable
            style={{
                height: 60,
                width: 44,
                marginHorizontal: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selected === item.id ? '#FC9B5E' : "transparent",
                borderRadius: 12,
                borderWidth: 0.2,
                borderColor: selected === item.id ? "transparent" : "#CFC5C5"
            }}
            onPress={() => setSelected(item?.id)}>
            <Text
                style={{
                    fontSize: 12, fontWeight: selected === item.id ? '700' : '400', lineHeight: 14.4,
                    color: selected === item.id ? "#fff" : '#555555',
                }}>
                {item?.dateNum}
            </Text>
            <Text
                style={{
                    fontSize: 20, fontWeight: selected === item.id ? '700' : '400', lineHeight: 24,
                    color: selected === item.id ? "#fff" : '#555555',
                }}>
                {item?.dayOfWeek}
            </Text>

        </Pressable>
    );
};

const WeekDayData = [
    { id: 1, name: "Week 1", },
    { id: 2, name: "Week 2", },
    { id: 3, name: "Week 3", },
    { id: 4, name: "Week 4", },
    { id: 5, name: "Week 5", },
];


const weekGraphData = [
    {
        "dateNum": "Mon",
        "dayOfWeek": "01",
        "id": 0,
        "value": 1.5
    }, {
        "dateNum": "Tue",
        "dayOfWeek": "02",
        "id": 1,
        "value": 0.5

    },
    {
        "dateNum": "Wed",
        "dayOfWeek": "03",
        "id": 2,
        "value": 0
    },
    {
        "dateNum": "Thu",
        "dayOfWeek": "04",
        "id": 3,
        "value": 0.5
    },
    {
        "dateNum": "Fri",
        "dayOfWeek": "05",
        "id": 4,
        "value": 0
    },
    {
        "dateNum": "Sat",
        "dayOfWeek": "06",
        "id": 5,
        "value": 0
    },
];


const weekHistryList = [
    { id: 1, date: 'Sun, 15th', Fasting: "15h 25m", EatingTtime: "6h 35m" },
    { id: 2, date: 'Mon, 16th', Fasting: "15h 25m", EatingTtime: "6h 35m" },
    { id: 3, date: 'Tue, 17th', Fasting: "-- --", EatingTtime: "-- --" },
    { id: 4, date: 'Wed, 18th', Fasting: "15h 25m", EatingTtime: "6h 35m" },
    { id: 5, date: 'Thu, 19th', Fasting: "-- --", EatingTtime: "-- --" }
];


const TrackFastingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [monthSelected, setMonthSelected] = useState("");
    const [YearSelected, setYearSelected] = useState("");

    const [ScreenType, setScreenType] = useState(0);
    const flatlistRef = useRef(null);

    const [dateScroll, setDateScroll] = useState([]);
    const [initialIndex, setInitialIndex] = useState(3);
    const [selected, setSelected] = useState(5);
    const [WeekSelected, setWeekSelected] = useState(2);

    useEffect(() => {
        const dates = [];
        const createdDate = Date.parse("2024-05-01T05:00:32.652Z");
        for (let i = 0; i < 28; i++) {
            const resultDate = add(createdDate, {
                days: i,
            });
            const dayOfWeek = format(resultDate, 'dd');
            const dateNum = format(resultDate, 'ccc');

            // const monthNum = format(resultDate, 'LLLL');
            dates.push({
                id: i,
                dayOfWeek,
                dateNum,
                isPassed: i < 7,
                isToday: i <= 7 && 7 - i < 15, // Upto 7 prior days action available
            });
        }
        setDateScroll(dates);
    }, []);


    const onBackPress = () => {
        navigation.goBack();
    };


    const selectDate = (index) => {
        setSelected(index)

    };

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                selected={selected}
                setSelected={() => selectDate(item.id)}
            />
        );
    };

    const DailyView = () => {
        return <ScrollView style={{ flex: 1, width: '100%' }} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={bgimage} resizeMode="contain" style={{ height: 187, paddingVertical: 20, marginBottom: 20, alignItems: 'center', justifyContent: 'center', marginTop: -10 }}>
                    <FlatList
                        ref={flatlistRef}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={initialIndex}
                        horizontal={true}
                        data={dateScroll}
                        renderItem={renderItem}
                        style={{ marginTop: 30 }}
                        keyExtractor={(item) => item.id}
                        getItemLayout={(data, index) => ({
                            length: 50,
                            offset: 50 * index,
                            index,
                        })}
                    />
                </ImageBackground>
                <View style={{ alignItems: 'center', padding: 10 }}>
                    <PieChart
                        data={[{ value: 50, color: '#FFB171' }, { value: 80, color: '#FFDABF' }]}
                        donut
                        width={192}
                        height={192}
                        innerRadius={50}
                        backgroundColor="transparent"
                    />
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center', paddingHorizontal: 54, marginTop: 40, marginBottom: 16, }}>
                    <Image source={line_icon} style={{ flex: 1, height: 2, alignSelf: 'center' }} resizeMode='contain' tintColor={"#18192B"} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, backgroundColor: "#F37335", borderRadius: 5 }} />
                    <Text style={{ color: "#000", fontSize: 30, fontFamily: 'Larken', fontWeight: '700', fontStyle: 'italic', lineHeight: 31.8, marginLeft: 16 }}>{"6h 35 m"}
                        <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 19.2, color: '#FE7701' }}>{"\nEating"}</Text>
                    </Text>
                    <View style={{ width: 10, height: 10, backgroundColor: "#FFDABF", borderRadius: 5, marginLeft: 25 }} />
                    <Text style={{ color: "#000", fontSize: 30, fontFamily: 'Larken', fontWeight: '700', fontStyle: 'italic', lineHeight: 31.8, marginLeft: 16 }}>{"15h 25m"}
                        <Text style={{ fontSize: 16, fontWeight: '600', lineHeight: 19.2, color: '#FF9950' }}>{"\nFasting"}</Text>
                    </Text>
                </View>

            </View>
        </ScrollView>
    };


    const WeekDayRenderItem = ({ item, index }) => {
        return (
            <Pressable
                style={{
                    height: 33,
                    width: 108,
                    marginHorizontal: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: WeekSelected === index ? '#FC9B5E' : "transparent",
                    borderRadius: 12,
                    borderWidth: 0.2,
                    borderColor: WeekSelected === index ? "transparent" : "#CFC5C5"
                }}
                onPress={() => setWeekSelected(index)}>
                <Text
                    style={{
                        fontSize: 12, fontWeight: WeekSelected === index ? '700' : '400', lineHeight: 14.4,
                        color: WeekSelected === index ? "#fff" : '#555555',
                    }}>
                    {item?.name}
                </Text>
            </Pressable>
        );
    };

    const WeekGraphRenderItem = ({ item, index }) => {

        return (
            <View>

                <LinearGradient
                    start={{ x: 0, y: 0.7 }} end={{ x: 1, y: 0 }} colors={['#FFF2E9', '#FFFCFB',]}
                    style={{ width: 40, height: 176, borderRadius: 8, padding: 4, gap: 3 }}>
                    {
                        item.value != 0 && item.value !== 2 && <View style={{ backgroundColor: "#FFE2CD", flex: 1, borderRadius: 8 }} />
                    }

                    <View style={{ backgroundColor: "#FF9950", flex: item.value, borderRadius: 8, }} />
                </LinearGradient>


                <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.4, textAlign: 'center', marginTop: 8 }}>{item.dateNum}</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.4, textAlign: 'center' }}>{item.dayOfWeek}</Text>
            </View>
        )

    };

    const WeekListRenderItem = ({ item, index }) => {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: '400', lineHeight: 16.8, color: '#18192B', flex: 1 }}>{item.date}</Text>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.8, color: '#000', textAlign: 'right' }}>{item.Fasting}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', alignSelf: 'flex-end', gap: 4 }}>
                            <View style={{ width: 5, height: 5, borderRadius: 2, backgroundColor: "#FE7701", justifyContent: "center" }} />
                            <Text style={{ fontSize: 10, fontWeight: '400', lineHeight: 12, color: '#18192B', textAlign: 'right', alignSelf: 'center' }}>{"Fasting"}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 16 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.8, color: '#000', textAlign: 'right' }}>{item.EatingTtime}</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', alignSelf: 'flex-end', gap: 4 }}>
                            <View style={{ width: 5, height: 5, borderRadius: 2, backgroundColor: "#FFE2CD", justifyContent: "center" }} />
                            <Text style={{ fontSize: 10, fontWeight: '400', lineHeight: 12, color: '#18192B', textAlign: 'right', alignSelf: 'center' }}>{"Eating Ttime"}</Text>
                        </View>
                    </View>
                </View>
                {
                    index < weekHistryList.length - 1 &&
                    <Image source={require('../../../assets/loginscreen/line-icon.png')} style={{ flex: 1, height: 2, marginVertical: 8 }} tintColor={"#EDEDED"} />
                }

            </View>

        )
    };

    const WeeklyView = () => {
        return <ScrollView style={{ flex: 1, width: '100%' }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={bgimage} resizeMode="contain" style={{ height: 187, paddingVertical: 20, marginBottom: 20, alignItems: 'center', justifyContent: 'center', marginTop: -30 }}>
                    <FlatList
                        ref={flatlistRef}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={initialIndex}
                        horizontal={true}
                        data={WeekDayData}
                        renderItem={WeekDayRenderItem}
                        style={{ marginTop: 50 }}
                        keyExtractor={(item) => item.id}
                    />
                </ImageBackground>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={weekGraphData}
                    renderItem={WeekGraphRenderItem}
                    style={{ marginTop: 28, marginHorizontal: 31 , alignSelf:'center'}}
                    contentContainerStyle={{ gap: 12.5 ,  }}
                    keyExtractor={(item) => item.id}
                />

                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={weekHistryList}
                    renderItem={WeekListRenderItem}
                    style={{ marginTop: 32, marginHorizontal: 40, marginBottom: 16 }}
                    contentContainerStyle={{ gap: 12.5 }}
                    keyExtractor={(item) => item.id}
                />

                <View className="flex mt-7 h-[127px] shadow-lg shadow-black-100 bg-white rounded-3xl" style={{ marginHorizontal: 30 }}>
                    <Text className="text-[#FE7701] text-[12px] font-[700] text-left mt-5 left-[24px]">Fasting streak</Text>
                    <View className="flex justify-center flex-row gap-x-5 items-center mt-7" style={{alignItems:'center'}}>
                        {fastingValue.map((item, index) => (
                            <View key={index} className="flex justify-center items-center">
                                <Image
                                    source={
                                        item.value === null ?
                                            require('../../../assets/afterscreen/home/fastVariants2.png')
                                            : (
                                                item.value === true ?
                                                    require('../../../assets/afterscreen/home/fastVariants.png')
                                                    :
                                                    require('../../../assets/afterscreen/home/fastVariants1.png')
                                            )
                                    }
                                    className="h-[24px] w-[20.24px]"
                                    resizeMode="contain"
                                />
                                <Text className="text-xs text-black font-semibold mt-1">{item.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <Text className="mt-4 text-[12px] leading-[14px] text-center text-black px-1 font-[400]">{"You’re "}
                    <Text className={`text-[#FE7701] ${Platform.OS == 'ios' && "font-[700]"}`}>{"40% more likely "}</Text>
                    {"to achieve your goal"}
                </Text>

            </View>
        </ScrollView>
    };


    return (
        <Background>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", marginTop: 70, marginHorizontal: 24, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => onBackPress()}>
                        <Image source={require('../../../assets/common/back.png')} className="h-[15.49px] w-[16.54px] top-0" resizeMode='contain' />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: 'Larken', marginHorizontal: 16, flex: 1 }}>{"Track fasting"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 25 }}>
                    <SelectList
                        // onSelect={() => console.log(selected)}
                        setSelected={setMonthSelected}
                        fontFamily='lato'
                        data={Monthdata}
                        search={false}
                        placeholder="January"
                        arrowicon={<Image source={down_arrow_Icon} style={{ width: 11, height: 6 }} />}
                        boxStyles={{
                            width: 120, height: 41, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: "#EDEDED", alignItems: 'center', marginTop: 12,
                            elevation: 3, // Android box shadow
                            shadowColor: 'gray', // iOS box shadow
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                        }}
                        defaultOption={{ key: '1', value: 'January' }}   //default selected option
                    />
                    <SelectList
                        // onSelect={() => console.log(selected)}
                        setSelected={setYearSelected}
                        fontFamily='lato'
                        data={YearData}
                        search={false}
                        placeholder="2024"
                        arrowicon={<Image source={down_arrow_Icon} style={{ width: 11, height: 6 }} />}
                        boxStyles={{
                            width: 96, height: 41, borderRadius: 14, backgroundColor: '#fff', borderWidth: 1, borderColor: "#EDEDED", alignItems: 'center', marginTop: 12,
                            elevation: 3, // Android box shadow
                            shadowColor: 'gray', // iOS box shadow
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                        }} //override default styles
                        defaultOption={{ key: '1', value: '2024' }}   //default selected option
                    />
                </View>
                <View style={{ height: 41, marginTop: 16, marginHorizontal: 30, flexDirection: 'row', backgroundColor: '#FFEDE0', borderRadius: 8, alignItems: 'center', padding: 4 }}>
                    <TouchableOpacity
                        onPress={() => setScreenType(0)}
                        style={ScreenType == 0 ? styles.SelectTypeButton : styles.unSelectTypeButton}>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.8, textAlign: 'center' }}>{"Daily"}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setScreenType(1)}
                        style={ScreenType == 1 ? styles.SelectTypeButton : styles.unSelectTypeButton}>
                        <Text style={{ fontSize: 14, fontWeight: '600', lineHeight: 16.8, textAlign: 'center' }}>{"Weekly"}</Text>

                    </TouchableOpacity>
                </View>
                {ScreenType == 0 ? DailyView() : WeeklyView()}

            </View>
        </Background>
    );

};



const styles = StyleSheet.create({
    SelectTypeButton: {
        flex: 1,
        height: 33,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 8,
    },
    unSelectTypeButton: {
        flex: 1,
        height: 33,
        backgroundColor: '#FFEDE0',
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 3, // Android box shadow
        shadowColor: 'gray', // iOS box shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

});

export default TrackFastingScreen;
