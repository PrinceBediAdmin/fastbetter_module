/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Platform,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Background from '../../../components/Background';
import {useNavigation, useRoute} from '@react-navigation/native';
import bgimage from '../../../assets/common/base.png';
import heart_icon2 from '../../../assets/afterscreen/targetWorkout/heart_icon2.png';
import Weight_icon from '../../../assets/afterscreen/targetWorkout/Weight.png';
import BMI_icon from '../../../assets/afterscreen/targetWorkout/BMI_icon.png';
import Walk_icon from '../../../assets/afterscreen/targetWorkout/Walk.png';
import Resting_icon from '../../../assets/afterscreen/targetWorkout/Resting_icon.png';
import Active_icon from '../../../assets/afterscreen/targetWorkout/Active_icon.png';
import graph1 from '../../../assets/afterscreen/targetWorkout/graph1.png';
import graph2 from '../../../assets/afterscreen/targetWorkout/graph2.png';
import Sync_retry from '../../../assets/afterscreen/targetWorkout/Sync_retry.png';
import {ModelBox} from '../../../components/Models/Models';
import {DateReportView} from './DateReportView';
import {DailyReportView} from './DailyReportView';
import {WeeklyReportView} from './WeeklyReportView';

const ActivitiesData = [
  {
    id: 1,
    name: 'Heart',
    value: '83',
    type: 'bpm',
    img: heart_icon2,
    textColor: '#E91717',
    bg1: '#FDE5E4',
    bg2: '#FBD0CF',
  },
  {
    id: 2,
    name: 'Weight',
    value: '82',
    type: 'kg',
    img: Weight_icon,
    textColor: '#0DB1AD',
    bg1: '#E7F4F3',
    bg2: '#D2EDEC',
  },
  {
    id: 3,
    name: 'Walk',
    value: '2.3',
    type: 'km',
    img: Walk_icon,
    textColor: '#197BD2',
    bg1: '#E9EFF7',
    bg2: '#D3E3F3',
  },
];

const TrackHealthScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [ScreenType, setScreenType] = useState(0);
  const flatlistRef = useRef(null);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [ActiveItemId, setActiveItemId] = useState(1);

  const onBackPress = () => {
    navigation.goBack();
  };

  const ActivitiesRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => (setIsModelOpen(true), setActiveItemId(item.id))}
        style={{
          width: 153,
          height: 160,
          borderRadius: 30,
          marginHorizontal: 8,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: item.bg1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            padding: 8,
          }}>
          <Image
            source={item.img}
            style={{width: 40, height: 40, marginBottom: 4}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              lineHeight: 16.8,
              textAlign: 'center',
              color: item.textColor,
            }}>
            {item.name}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: item.bg2,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            padding: 8,
          }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: '300',
              lineHeight: 48,
              textAlign: 'center',
              color: item.textColor,
            }}>
            {item.value}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              lineHeight: 16.8,
              textAlign: 'center',
              color: item.textColor,
            }}>
            {item.type}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ActiveView = () => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Larken',
              marginHorizontal: 30,
              color: '#000',
              lineHeight: 25.44,
            }}>
            {'Your Activities\n'}
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 14.18,
                marginHorizontal: 30,
                color: '#18192B',
              }}>
              {'Sun, 15th Nov '}
            </Text>
          </Text>
          <TouchableOpacity>
            <Image
              source={Sync_retry}
              style={{width: 24, height: 24, marginRight: 30}}
            />
          </TouchableOpacity>
        </View>

        <View style={{alignSelf: 'center'}}>
          <FlatList
            ref={flatlistRef}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            data={ActivitiesData}
            renderItem={ActivitiesRenderItem}
            style={{marginTop: 30}}
            contentContainerStyle={{gap: 16}}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  };

  const DailyView = () => {
    return (
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <ImageBackground
            source={bgimage}
            resizeMode="contain"
            style={{
              height: 187,
              paddingVertical: 20,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -10,
            }}>
            <DailyReportView isType={ScreenType} />
          </ImageBackground>

          {ActiveView()}
        </View>
      </ScrollView>
    );
  };

  const WeeklyView = () => {
    return (
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={{flex: 1}}>
          <ImageBackground
            source={bgimage}
            resizeMode="contain"
            style={{
              height: 187,
              paddingVertical: 20,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -30,
            }}>
            <WeeklyReportView isType={ScreenType} />
          </ImageBackground>
          {ActiveView()}
        </View>
      </ScrollView>
    );
  };

  return (
    <Background>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 70,
            marginHorizontal: 24,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => onBackPress()}>
            <Image
              source={require('../../../assets/common/back.png')}
              className="h-[15.49px] w-[16.54px] top-0"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              fontFamily: 'Larken',
              marginHorizontal: 16,
              flex: 1,
            }}>
            {'Track health'}
          </Text>
        </View>
        <DateReportView />
        <View
          style={{
            height: 41,
            marginTop: 16,
            marginHorizontal: 30,
            flexDirection: 'row',
            backgroundColor: '#FFEDE0',
            borderRadius: 8,
            alignItems: 'center',
            padding: 4,
          }}>
          <TouchableOpacity
            onPress={() => setScreenType(0)}
            style={
              ScreenType == 0
                ? styles.SelectTypeButton
                : styles.unSelectTypeButton
            }>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 16.8,
                textAlign: 'center',
              }}>
              {'Daily'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setScreenType(1)}
            style={
              ScreenType == 1
                ? styles.SelectTypeButton
                : styles.unSelectTypeButton
            }>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 16.8,
                textAlign: 'center',
              }}>
              {'Weekly'}
            </Text>
          </TouchableOpacity>
        </View>
        {ScreenType === 0 ? DailyView() : WeeklyView()}
        <TrackHealthtModel
          isModelOpen={isModelOpen}
          hanldeCloseModel={() => setIsModelOpen(false)}
          type={ActiveItemId}
        />
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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default TrackHealthScreen;

const TrackHealthtModel = ({
  isModelOpen,
  hanldeCloseModel,
  itemName = '~ 83 bpm',
  type = 1,
}) => {
  const HeartView = () => {
    return (
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Larken',
            fontWeight: '700',
            lineHeight: 25.44,
            marginHorizontal: 30,
            marginTop: 30,
          }}>
          {itemName}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.18,
            marginHorizontal: 30,
          }}>
          {'Sun, 15th'}
        </Text>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={graph1}
            style={{width: 330, height: 60, marginVertical: 24}}
          />
          <View style={{flexDirection: 'row', marginBottom: 24}}>
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 14.4,
                textAlign: 'left',
              }}>
              {'8.00'}
              <Text style={{fontWeight: '400'}}>{'am'}</Text>
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 14.4,
                textAlign: 'right',
              }}>
              {'11.00'}
              <Text style={{fontWeight: '400'}}>{'pm'}</Text>
            </Text>
          </View>

          <View
            className={`flex bg-white w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={heart_icon2} className="h-[40px] w-[36.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Pulse rate
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Summary
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  83 bpm
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  Average
                </Text>
              </View>
            </View>
            <View
              style={{height: 1, backgroundColor: '#F4F4F4', marginTop: 17}}
            />
            <View
              className="flex flex-row items-center align-middle  mt-[24px] mb-3"
              style={{alignSelf: 'center'}}>
              <View className="flex flex-row items-center gap-x-6">
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Lowest
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    65 bpm
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Highest
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    145 bpm
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Sleeping
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    53 bpm
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Resting
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    80 bpm
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            className={`flex bg-white  mt-4 w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={heart_icon2} className="h-[40px] w-[36.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    B.P.
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Summary
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  120/80
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right'}}>
                  at 3.30pm GST
                </Text>
              </View>
            </View>
            <View
              style={{height: 1, backgroundColor: '#F4F4F4', marginTop: 17}}
            />
            <View
              className="flex flex-row items-center align-middle  mt-[24px] mb-3"
              style={{alignSelf: 'center'}}>
              <View className="flex flex-row items-center gap-x-8">
                <View className="flex">
                  <Text
                    className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]"
                    style={{textAlign: 'center'}}>
                    Sys
                  </Text>
                  <Text
                    className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] "
                    style={{textAlign: 'center'}}>
                    120 mm/hg
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]"
                    style={{textAlign: 'center'}}>
                    Dia
                  </Text>
                  <Text
                    className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] "
                    style={{textAlign: 'center'}}>
                    80 mm/hg
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const WeightView = () => {
    return (
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Larken',
            fontWeight: '700',
            lineHeight: 25.44,
            marginHorizontal: 30,
            marginTop: 30,
          }}>
          {'82 kg'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.18,
            marginHorizontal: 30,
          }}>
          {'Sun, 15th'}
        </Text>
        <View style={{alignSelf: 'center'}}>
          <View className="flex flex-row items-center align-middle justify-between mt-[24px] mb-1">
            <View className="flex flex-row items-center gap-x-2">
              <View className="flex">
                <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                  {'Weight'}
                </Text>
                <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                  {'98 kg'}
                </Text>
              </View>
              <View className="border h-[15px] border-[#18192B]/80 bg-[#18192B]/80"></View>
              <View className="flex">
                <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                  {'Target weight'}
                </Text>
                <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                  {'75 kg'}
                </Text>
              </View>
            </View>
            <View className="flex justify-center items-end align-middle">
              <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                {'Goal'}
              </Text>
              <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                {'Dec 25th, 2023'}
              </Text>
            </View>
          </View>

          <Image
            source={require('../../../assets/afterscreen/Profile/Chart.png')}
            style={{width: 330, height: 60, marginBottom: 0}}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 14.4,
              textAlign: 'right',
              marginBottom: 24,
            }}>
            {'Current weight: '}
            <Text style={{fontWeight: '700'}}>{'82 kg'}</Text>
          </Text>

          <View
            className={`flex bg-white w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={Weight_icon} className="h-[40px] w-[36.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    {'Weight'}
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Summary
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', alignSelf: 'flex-end'}}>
                  {'82 kg'}
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right', alignSelf: 'flex-end'}}>
                  {'Current weight'}
                </Text>
              </View>
            </View>
            <View
              style={{height: 1, backgroundColor: '#F4F4F4', marginTop: 17}}
            />
            <View
              className="flex flex-row items-center align-middle  mt-[24px] mb-3"
              style={{alignSelf: 'center'}}>
              <View className="flex flex-row items-center gap-x-10">
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    {'Initial'}
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    {'95 kg'}
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    {'Current'}
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    {'82 kg'}
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    {'Target'}
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    {'75 kg'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            className={`flex bg-white  mt-4 w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={BMI_icon} className="h-[40px] w-[32.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    {'BMI'}
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Summary
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', alignSelf: 'flex-end'}}>
                  {'28.5'}
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right', alignSelf: 'flex-end'}}>
                  {'Overweight'}
                </Text>
              </View>
            </View>
            <View
              style={{height: 1, backgroundColor: '#F4F4F4', marginTop: 17}}
            />
            <View
              className="flex flex-row items-center align-middle  mt-[24px] mb-3"
              style={{alignSelf: 'center'}}>
              <View className="flex flex-row items-center gap-x-8">
                <View className="flex">
                  <Text
                    className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]"
                    style={{textAlign: 'center'}}>
                    {'Height'}
                  </Text>
                  <Text
                    className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] "
                    style={{textAlign: 'center'}}>
                    {'5 ft 8 in'}
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]"
                    style={{textAlign: 'center'}}>
                    {'Weight'}
                  </Text>
                  <Text
                    className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] "
                    style={{textAlign: 'center'}}>
                    {'98 kg'}
                  </Text>
                </View>
                <View className="flex">
                  <Text
                    className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]"
                    style={{textAlign: 'center'}}>
                    {'Gender'}
                  </Text>
                  <Text
                    className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] "
                    style={{textAlign: 'center'}}>
                    {'Male'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const WalkView = () => {
    return (
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Larken',
            fontWeight: '700',
            lineHeight: 25.44,
            marginHorizontal: 30,
            marginTop: 30,
          }}>
          {'2.3 km'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.18,
            marginHorizontal: 30,
          }}>
          {'Sun, 15th'}
        </Text>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={graph2}
            style={{width: 330, height: 60, marginVertical: 24}}
          />
          <View style={{flexDirection: 'row', marginBottom: 24}}>
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 14.4,
                textAlign: 'left',
              }}>
              {'10.00'}
              <Text style={{fontWeight: '400'}}>{'am'}</Text>
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 14.4,
                textAlign: 'right',
              }}>
              {'12.30'}
              <Text style={{fontWeight: '400'}}>{'pm'}</Text>
            </Text>
          </View>

          <View
            className={`flex bg-white w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={Walk_icon} className="h-[40px] w-[36.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Walking
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Time spent
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  2h 30m
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  Average
                </Text>
              </View>
            </View>
          </View>

          <View
            className={`flex bg-white w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={Active_icon} className="h-[40px] w-[36.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Active
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Energy
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  24.5 kcal
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  Average
                </Text>
              </View>
            </View>
          </View>

          <View
            className={`flex bg-white w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={Resting_icon} className="h-[40px] w-[36.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Resting
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Energy
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  1,541 kcal
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  Average
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <ModelBox
      isVisible={isModelOpen}
      onClose={hanldeCloseModel}
      Directio={null}>
      <View
        className=" bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]"
        style={{flex: 1, alignSelf: 'center'}}>
        <Pressable
          onPress={hanldeCloseModel}
          style={{
            width: 100,
            height: 12,
            marginTop: 10,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 52,
              height: 4,
              backgroundColor: '#000',
              alignSelf: 'center',
            }}
          />
        </Pressable>

        {type == 1 && HeartView()}
        {type == 2 && WeightView()}
        {type == 3 && WalkView()}
      </View>
    </ModelBox>
  );
};
