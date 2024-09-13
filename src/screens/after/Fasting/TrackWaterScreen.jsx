/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Dimensions,
  Platform,
  FlatList,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Background from '../../../components/Background';
import {useNavigation, useRoute} from '@react-navigation/native';

import {SelectList} from 'react-native-dropdown-select-list';
import down_arrow_Icon from '../../../assets/common/down_arrow_Icon.png';
import bgimage from '../../../assets/common/base.png';
import {format, add} from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';

import glasses from '../../../assets/afterscreen/home/glasses.png';
import water_glasses from '../../../assets/afterscreen/home/water_glasses.png';

import {LineChart} from 'react-native-chart-kit';
import graph_value_bg from '../../../assets/afterscreen/targetWorkout/graph_value_bg.png';
import {DateReportView} from './DateReportView';
import {DailyReportView} from './DailyReportView';
import {WeeklyReportView} from './WeeklyReportView';

const ChartData = {
  // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const glassesData = [
  {id: 1, isActive: true},
  {id: 2, isActive: true},
  {id: 3, isActive: true},
  {id: 4, isActive: true},
  {id: 5, isActive: true},
  {id: 6, isActive: true},
  {id: 7, isActive: true},
  {id: 8, isActive: true},
  {id: 9, isActive: false},
  {id: 10, isActive: false},
  {id: 11, isActive: false},
  {id: 12, isActive: false},
  {id: 13, isActive: false},
  {id: 14, isActive: false},
];

const weekGraphData = [
  {
    dateNum: 'Mon',
    dayOfWeek: '01',
    id: 0,
    value: 63,
  },
  {
    dateNum: 'Tue',
    dayOfWeek: '02',
    id: 1,
    value: 131,
  },
  {
    dateNum: 'Wed',
    dayOfWeek: '03',
    id: 2,
    value: 91,
  },
  {
    dateNum: 'Thu',
    dayOfWeek: '04',
    id: 3,
    value: 148,
  },
  {
    dateNum: 'Fri',
    dayOfWeek: '05',
    id: 4,
    value: 115,
  },
  {
    dateNum: 'Sat',
    dayOfWeek: '06',
    id: 5,
    value: 63,
  },
];

const weekHistryList = [
  {
    id: 1,
    date: 'Sun, 15th',
    Burnt: '378 cal',
    Fasting: '15h 25m',
    EatingTtime: '6h 35m',
  },
  {
    id: 2,
    date: 'Mon, 16th',
    Burnt: '378 cal',
    Fasting: '15h 25m',
    EatingTtime: '6h 35m',
  },
  {
    id: 3,
    date: 'Tue, 17th',
    Burnt: '-- --',
    Fasting: '-- --',
    EatingTtime: '-- --',
  },
  {
    id: 4,
    date: 'Wed, 18th',
    Burnt: '378 cal',
    Fasting: '15h 25m',
    EatingTtime: '6h 35m',
  },
  {
    id: 5,
    date: 'Thu, 19th',
    Burnt: '-- --',
    Fasting: '-- --',
    EatingTtime: '-- --',
  },
];

const TrackWaterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ScreenType, setScreenType] = useState(0);

  const onBackPress = () => {
    navigation.goBack();
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
            <DailyReportView
              isType={ScreenType}
              onSelectData={pre => console.log(pre)}
            />
          </ImageBackground>

          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Larken',
              marginHorizontal: 30,
              color: '#FE7701',
              lineHeight: 25.44,
            }}>
            {'18,950 ml '}
            <Text style={{color: '#000', fontWeight: '400'}}>{'consumed'}</Text>
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 14.18,
              marginHorizontal: 30,
              color: '#18192B',
            }}>
            {'Data from your water intake logs '}
          </Text>

          <LineChart
            data={ChartData}
            width={Dimensions.get('window').width} // from react-native
            height={150}
            xAxisThickness={0} // Hide the bottom values
            yAxisThickness={0}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              backgroundGradientToOpacity: 0.5,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `#ffa726`,
              labelColor: (opacity = 1) => `#fff`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '0',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 0,
              borderRadius: 16,
              marginLeft: -20,
              marginTop: 61,
            }}
            renderDotContent={({x, y, index, indexData}) => (
              <View>
                {index == ChartData?.datasets[0]?.data.length - 2 && (
                  <ImageBackground
                    key={index}
                    source={graph_value_bg}
                    className="shadow-lg shadow-black-100"
                    style={{
                      position: 'absolute',
                      top: y - 40,
                      left: x - 12,
                      width: 58,
                      height: 36,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontFamily: 'Larken',
                        fontWeight: '700',
                        fontStyle: 'italic',
                      }}>
                      {indexData + ' ml'}
                    </Text>
                  </ImageBackground>
                )}
              </View>
            )}
          />
          <View style={{flexDirection: 'row', marginHorizontal: 30}}>
            <Text
              style={{
                flex: 1,
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 14.4,
              }}>
              {'3.00'}
              <Text style={{fontWeight: '400', lineHeight: 14.4}}>{'pm'}</Text>
            </Text>
            <Text style={{fontSize: 12, fontWeight: '700', lineHeight: 14.4}}>
              {'11.30'}
              <Text style={{fontWeight: '400', lineHeight: 14.4}}>{'pm'}</Text>
            </Text>
          </View>

          <View
            className={`flex bg-white px-5 py-3 rounded-3xl mb-2 border border-gray-100 shadow-sm shadow-slate-300 sha overflow-hidden`}
            style={{marginHorizontal: 30, marginTop: 30}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image
                  source={require('../../../assets/afterscreen/home/water.png')}
                  className="h-auto w-auto"
                />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Consumption
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Sun, 15th Nov
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{height: 1, backgroundColor: '#F4F4F4', marginTop: 17}}
            />

            <View className="flex flex-row items-center align-middle justify-between mt-6 mb-3">
              <View className="flex flex-row items-center gap-x-2">
                <View className="flex flex-row items-center">
                  <View>
                    <Text className="text-xs">Intake</Text>
                    <Text className="text-xs text-black font-[700] -mt-0.5">
                      2,200 ml
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center">
                  <View
                    className="w-[1.5px] h-[20px] bg-[#000]"
                    style={{marginRight: 8}}
                  />
                  <View>
                    <Text className="text-xs">Required</Text>
                    <Text className="text-xs text-black font-[700] -mt-0.5">
                      2,500 ml
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text className="text-xs">Recommended</Text>
                <Text
                  className="text-xs text-black font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  5,000 ml
                </Text>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 16,
                  flexDirection: 'row',
                  gap: 8,
                }}>
                {glassesData.map((item, index) => {
                  return (
                    <Image
                      source={!item.isActive ? glasses : water_glasses}
                      style={{width: 16, height: 24}}
                    />
                  );
                })}
              </View>
            </ScrollView>
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
          style={{
            width: 40,
            height: 176,
            borderRadius: 8,
            padding: 4,
            gap: 3,
            borderWidth: 1,
            borderColor: '#FFF2EA',
            justifyContent: 'flex-end',
          }}>
          {/* {
                        item.value != 0 && item.value !== 2 && <View style={{ flex: 1, }} />
                    } */}
          <View
            style={{
              backgroundColor: '#FF9950',
              height: item.value,
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
              {item.Burnt}
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
                {'Burnt'}
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
            <WeeklyReportView
              isType={ScreenType}
              onSelectData={pre => console.log(pre)}
            />
          </ImageBackground>

          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              fontFamily: 'Larken',
              marginHorizontal: 30,
              color: '#FE7701',
              lineHeight: 25.44,
            }}>
            {'18,950 ml '}
            <Text style={{color: '#000', fontWeight: '400'}}>{'consumed'}</Text>
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              lineHeight: 14.18,
              marginHorizontal: 30,
              color: '#18192B',
            }}>
            {'Data from your water intake logs '}
          </Text>
          <View style={{alignItems: 'center'}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={weekGraphData}
              renderItem={WeekGraphRenderItem}
              style={{marginTop: 28, marginHorizontal: 31}}
              contentContainerStyle={{gap: 12.5}}
              keyExtractor={item => item.id}
            />
          </View>

          <View
            className={`flex bg-white px-5 py-3 rounded-3xl mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{marginHorizontal: 30, marginTop: 30}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image
                  source={require('../../../assets/afterscreen/home/water.png')}
                  className="h-auto w-auto"
                />
                <View
                  className="flex justify-start items-start"
                  style={{paddingLeft: 10}}>
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Consumption
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Sun, 15th Nov
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{height: 1, backgroundColor: '#F4F4F4', marginTop: 17}}
            />

            <View className="flex flex-row items-center align-middle justify-between mt-6 mb-3">
              <View className="flex flex-row items-center gap-x-2">
                <View className="flex flex-row items-center">
                  <View>
                    <Text className="text-xs">Intake</Text>
                    <Text className="text-xs text-black font-[700] -mt-0.5">
                      18,950 ml
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center">
                  <View
                    className="w-[1.5px] h-[20px] bg-[#000]"
                    style={{marginRight: 8}}
                  />
                  <View>
                    <Text className="text-xs">Required</Text>
                    <Text className="text-xs text-black font-[700] -mt-0.5">
                      2,500 ml
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text className="text-xs">Recommended</Text>
                <Text
                  className="text-xs text-black font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  1,000 ml
                </Text>
              </View>
            </View>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={weekHistryList}
            renderItem={WeekListRenderItem}
            style={{marginTop: 32, marginHorizontal: 40, marginBottom: 16}}
            contentContainerStyle={{gap: 12.5}}
            keyExtractor={item => item.id}
          />
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
            {'Track water'}
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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default TrackWaterScreen;
