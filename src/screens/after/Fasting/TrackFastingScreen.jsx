/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Background from '../../../components/Background';
import {useNavigation, useRoute} from '@react-navigation/native';
import bgimage from '../../../assets/common/base.png';
import LinearGradient from 'react-native-linear-gradient';

import {EatingData, fastingValue} from '../../../function/data';
import {PieChart} from 'react-native-gifted-charts';
import line_icon from '../../../assets/afterscreen/targetWorkout/line_icon.png';
import {WeeklyReportView} from './WeeklyReportView';
import {DailyReportView} from './DailyReportView';
import {DateReportView} from './DateReportView';

import AsyncStorage from '@react-native-async-storage/async-storage';

const weekGraphData = [
  {
    dateNum: 'Mon',
    dayOfWeek: '01',
    id: 0,
    value: 1.5,
  },
  {
    dateNum: 'Tue',
    dayOfWeek: '02',
    id: 1,
    value: 0.5,
  },
  {
    dateNum: 'Wed',
    dayOfWeek: '03',
    id: 2,
    value: 0,
  },
  {
    dateNum: 'Thu',
    dayOfWeek: '04',
    id: 3,
    value: 0.5,
  },
  {
    dateNum: 'Fri',
    dayOfWeek: '05',
    id: 4,
    value: 0,
  },
  {
    dateNum: 'Sat',
    dayOfWeek: '06',
    id: 5,
    value: 0,
  },
];

const weekHistryList = [
  {id: 1, date: 'Sun, 15th', Fasting: '15h 25m', EatingTtime: '6h 35m'},
  {id: 2, date: 'Mon, 16th', Fasting: '15h 25m', EatingTtime: '6h 35m'},
  {id: 3, date: 'Tue, 17th', Fasting: '-- --', EatingTtime: '-- --'},
  {id: 4, date: 'Wed, 18th', Fasting: '15h 25m', EatingTtime: '6h 35m'},
  {id: 5, date: 'Thu, 19th', Fasting: '-- --', EatingTtime: '-- --'},
];

const TrackFastingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ScreenType, setScreenType] = useState(0);
  const [DailySelectData, setDailySelectData] = useState(new Date());
  const [FastingData, setFastingData] = useState({});

  useEffect(() => {
    getData();
  }, [DailySelectData]);

  const getData = async () => {
    // Convert the time string to a Date object
    const date = new Date(DailySelectData);
    const day = date.getUTCDate() + 1;
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();

    // Format the date as "D/M/YYYY"
    const newTime = `${day}/${month}/${year}`;

    const StorageData = await AsyncStorage.getItem('timerData');
    const Data = JSON.parse(StorageData);

    const indexFind = Data.findIndex(pre => pre.date === newTime);
    if (indexFind !== -1) {
      setFastingData(Data[indexFind]);
    } else {
      setFastingData(null);
    }
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hours}h: ${minutes < 10 ? '0' : ''}${minutes}m`;
  };

  const DailyView = () => {
    return (
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <View style={{flex: 1, width: '100%'}}>
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
            <DailyReportView
              isType={ScreenType}
              onSelectData={pre => setDailySelectData(pre)}
            />
          </ImageBackground>
          <View style={{alignItems: 'center', padding: 10}}>
            <PieChart
              data={[
                {value: 30, color: '#FFB171', text: '30%'},
                {value: 70, color: '#FFDABF', text: '70%'},
              ]}
              donut
              width={192}
              height={192}
              innerRadius={50}
              //showText
              backgroundColor="transparent"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              paddingHorizontal: 54,
              marginTop: 40,
              marginBottom: 16,
            }}>
            <Image
              source={line_icon}
              style={{flex: 1, height: 2, alignSelf: 'center'}}
              resizeMode="contain"
              tintColor={'#18192B'}
            />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: '#F37335',
                borderRadius: 5,
              }}
            />
            <View style={{marginLeft: 10, width: 120}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 30,
                  fontFamily: 'Larken',
                  fontWeight: '700',
                  fontStyle: 'italic',
                }}>
                {FastingData?.eatingTime
                  ? formatTime(FastingData?.eatingTime)
                  : '----'}
                {/* {'6h 35 m'} */}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  // lineHeight: 19.2,
                  color: '#FE7701',
                }}>
                {' '}
                {'Eating'}
              </Text>
            </View>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: '#FFDABF',
                borderRadius: 5,
                marginLeft: 25,
              }}
            />
            <View style={{marginLeft: 10, width: 120}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 30,
                  fontFamily: 'Larken',
                  fontWeight: '700',
                  fontStyle: 'italic',
                  // lineHeight: 31.8,
                }}>
                {FastingData?.fastingTime
                  ? formatTime(FastingData?.fastingTime)
                  : '----'}
                {/* {'15h 25m'} */}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  // lineHeight: 19.2,
                  color: '#FF9950',
                }}>
                {'Fasting'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  const WeekGraphRenderItem = ({item, index}) => {
    return (
      <View>
        <LinearGradient
          start={{x: 0, y: 0.7}}
          end={{x: 1, y: 0}}
          colors={['#FFF2E9', '#FFFCFB']}
          style={{width: 40, height: 176, borderRadius: 8, padding: 4, gap: 3}}>
          {item.value != 0 && item.value !== 2 && (
            <View
              style={{backgroundColor: '#FFE2CD', flex: 1, borderRadius: 8}}
            />
          )}

          <View
            style={{
              backgroundColor: '#FF9950',
              flex: item.value,
              borderRadius: 8,
            }}
          />
        </LinearGradient>

        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.4,
            textAlign: 'center',
            marginTop: 8,
          }}>
          {item.dateNum}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.4,
            textAlign: 'center',
          }}>
          {item.dayOfWeek}
        </Text>
      </View>
    );
  };

  const WeekListRenderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              lineHeight: 16.8,
              color: '#18192B',
              flex: 1,
            }}>
            {item.date}
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 16.8,
                color: '#000',
                textAlign: 'right',
              }}>
              {item.Fasting}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                gap: 4,
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 2,
                  backgroundColor: '#FE7701',
                  justifyContent: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '400',
                  lineHeight: 12,
                  color: '#18192B',
                  textAlign: 'right',
                  alignSelf: 'center',
                }}>
                {'Fasting'}
              </Text>
            </View>
          </View>
          <View style={{marginLeft: 16}}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                lineHeight: 16.8,
                color: '#000',
                textAlign: 'right',
              }}>
              {item.EatingTtime}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                gap: 4,
              }}>
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 2,
                  backgroundColor: '#FFE2CD',
                  justifyContent: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '400',
                  lineHeight: 12,
                  color: '#18192B',
                  textAlign: 'right',
                  alignSelf: 'center',
                }}>
                {'Eating Ttime'}
              </Text>
            </View>
          </View>
        </View>
        {index < weekHistryList.length - 1 && (
          <Image
            source={require('../../../assets/loginscreen/line-icon.png')}
            style={{flex: 1, height: 2, marginVertical: 8}}
            tintColor={'#EDEDED'}
          />
        )}
      </View>
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

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={weekGraphData}
            renderItem={WeekGraphRenderItem}
            style={{marginTop: 28, marginHorizontal: 31, alignSelf: 'center'}}
            contentContainerStyle={{gap: 12.5}}
            keyExtractor={item => item.id}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={weekHistryList}
            renderItem={WeekListRenderItem}
            style={{marginTop: 32, marginHorizontal: 40, marginBottom: 16}}
            contentContainerStyle={{gap: 12.5}}
            keyExtractor={item => item.id}
          />

          <View
            className="flex mt-7 h-[127px] shadow-lg shadow-black-100 bg-white rounded-3xl"
            style={{marginHorizontal: 30}}>
            <Text className="text-[#FE7701] text-[12px] font-[700] text-left mt-5 left-[24px]">
              Fasting streak
            </Text>
            <View
              className="flex justify-center flex-row gap-x-5 items-center mt-7"
              style={{alignItems: 'center'}}>
              {fastingValue.map((item, index) => (
                <View key={index} className="flex justify-center items-center">
                  <Image
                    source={
                      item.value === null
                        ? require('../../../assets/afterscreen/home/fastVariants2.png')
                        : item.value === true
                        ? require('../../../assets/afterscreen/home/fastVariants.png')
                        : require('../../../assets/afterscreen/home/fastVariants1.png')
                    }
                    className="h-[24px] w-[20.24px]"
                    resizeMode="contain"
                  />
                  <Text className="text-xs text-black font-semibold mt-1">
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <Text className="mt-4 text-[12px] leading-[14px] text-center text-black px-1 font-[400]">
            {'You’re '}
            <Text
              className={`text-[#FE7701] ${
                Platform.OS == 'ios' && 'font-[700]'
              }`}>
              {'40% more likely '}
            </Text>
            {'to achieve your goal'}
          </Text>
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
            marginTop: Platform.OS === 'android' ? 20 : 70,
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
            {'Track fasting'}
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
  dropdown: {
    width: 120,
    height: 41,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EDEDED',
    alignItems: 'center',
    marginTop: 12,
    elevation: 3, // Android box shadow
    shadowColor: 'gray', // iOS box shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
    lineHeight: 14.4,
    fontWeight: '600',
    fontStyle: 'italic',
    marginLeft: 10,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 12,
    lineHeight: 14.4,
    fontWeight: '600',
    fontStyle: 'italic',
    marginLeft: 15,
    color: '#000',
  },
  iconStyle: {
    width: 12,
    height: 16,
    marginRight: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  itemText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    fontStyle: 'italic',
    lineHeight: 14.4,
  },
  itemContainer: {
    padding: 10,
    // alignItems: 'center',
  },
});

export default TrackFastingScreen;
