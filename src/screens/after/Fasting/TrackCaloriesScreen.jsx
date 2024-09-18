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
import heart_Icon from '../../../assets/afterscreen/targetWorkout/heart_Icon.png';

import {eat_EatsCatergoryList, eat_CabsList} from '../../../function/data';
import {ModelBox} from '../../../components/Models/Models';
import * as Progress from 'react-native-progress';

import {LineChart} from 'react-native-chart-kit';
import graph_value_bg from '../../../assets/afterscreen/targetWorkout/graph_value_bg.png';
import {DailyReportView} from './DailyReportView';
import {WeeklyReportView} from './WeeklyReportView';
import {DateReportView} from './DateReportView';

const ChartData = {
  // labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

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
    value: 1,
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
    value: 2,
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

const TrackCaloriesView = () => {
  const TrackCaloriesRenderItem = ({item, index}) => {
    return (
      <View
        // onPress={() => null}

        className={` shadow-sm shadow-slate-300 overflow-hidden`}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            fontFamily: 'Larken',
            lineHeight: 25.44,
          }}>
          {'Meal: ' + item.key}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.18,
            marginBottom: 20,
          }}>
          {item?.time}
        </Text>

        <Image
          source={item.img}
          style={{width: '100%', height: 180, borderRadius: 30}}
        />
        {item.like && (
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#FFEDE0',
              position: 'absolute',
              right: 20,
              top: 70,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={heart_Icon}
              style={{width: 20, height: 17, borderRadius: 30}}
            />
          </TouchableOpacity>
        )}

        <View className="px-4 py-2 pb-4">
          <Text className="text-[12px] text-black leading-[16.8px] font-[600]">
            {item.name}
          </Text>
          <View className="flex flex-row items-center mt-[8px]">
            <Text className="text-[10px] text-[#FE7701] leading-[16.8px] font-[600]">
              {item.kcal}
            </Text>
            <View className="mx-2 h-[4px] w-[4px] rounded-full bg-[#18192B]/50"></View>
            <Text className="text-[10px] text-[#18192B]/50 leading-[16.8px] font-[400]">
              {item.type}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={false}
      data={eat_EatsCatergoryList.data}
      renderItem={TrackCaloriesRenderItem}
      style={{marginTop: 28, marginHorizontal: 30}}
      contentContainerStyle={{gap: 12.5, paddingBottom: 100}}
      keyExtractor={item => item.id}
    />
  );
};

const Monthdata = [
  {key: '1', value: 'January'},
  {key: '2', value: 'February'},
  {key: '3', value: 'March'},
  {key: '4', value: 'April'},
  {key: '5', value: 'May'},
  {key: '6', value: 'June'},
  {key: '7', value: 'July'},
  {key: '8', value: 'August'},
  {key: '9', value: 'September'},
  {key: '10', value: 'October'},
  {key: '11', value: 'November'},
  {key: '12', value: 'December'},
];

const YearData = [
  {key: '1', value: '2024'},
  {key: '2', value: '2025'},
  {key: '3', value: '2026'},
  {key: '4', value: '2027'},
  {key: '5', value: '2028'},
  {key: '6', value: '2029'},
  {key: '7', value: '2030'},
  {key: '8', value: '2031'},
];

const getCurrentMonthKey = () => {
  const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
  const currentMonth = Monthdata[currentMonthIndex];
  return currentMonth ? currentMonth.key : null;
};

const getCurrentYearKey = () => {
  const currentYear = new Date().getFullYear(); // Get the current year (e.g., 2024)
  const yearObject = YearData.find(
    year => year.value === currentYear.toString(),
  );
  return yearObject ? yearObject.key : null;
};

const TrackCaloriesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [ScreenType, setScreenType] = useState(0);

  const [WeekSelected, setWeekSelected] = useState(2);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const currentMonthKey = getCurrentMonthKey();
  const currentYearKey = getCurrentYearKey();

  const [Monthvalue, setMonthValue] = useState(currentMonthKey.toString());
  const [YearValue, setYearValue] = useState(currentYearKey.toString());

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
              Monthvalue={Monthvalue}
              YearValue={YearValue}
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
            {'298 kcal '}
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
            {'Data from your eating logs'}
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
                      {indexData + ' cal'}
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
            className={`flex bg-white  mt-4 w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-sm shadow-slate-300 sha overflow-hidden`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image
                  source={require('../../../assets/afterscreen/home/kcal.png')}
                  className="h-[40px] w-[36.26px]"
                />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Calories
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Sun, 15th Nov
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row items-center align-middle justify-between mt-[41px] mb-3">
              <View className="flex flex-row items-center gap-x-2">
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Intake
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    1,100 kcal
                  </Text>
                </View>
                <View className="border h-[15px] border-[#18192B]/80 bg-[#18192B]/80"></View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Required
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    1,700 kcal
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-end align-middle">
                <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                  Recommended
                </Text>
                <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                  2,000 kcal
                </Text>
              </View>
            </View>
            <Progress.Bar
              progress={45 / 100}
              borderRadius={4}
              width={282}
              height={4}
              className="bg-[#FFEDE0] mt-3 mx-auto"
              borderWidth={0}
              color="#FF9950"
            />
          </View>

          <View
            className="flex flex-row mt-[8px]"
            style={{alignSelf: 'center'}}>
            {eat_CabsList.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`flex w-[104.67px] h-[80px] border border-[${item.color}]/30 rounded-[16px] flex-row mr-[8px]`}
                  style={{
                    borderColor: item.color,
                  }}>
                  <View
                    className={`items-center justify-center bg-[${item.color}]/10 rounded-l-[16px] w-[30px] h-[78px]`}
                    style={{backgroundColor: item.bg}}>
                    <Text
                      className={`-rotate-90 leading-[14px] text-[10px] font-[700] w-[80px]`}
                      style={{
                        color: item.color,
                        textAlign: 'center',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                  <View className="justify-center items-start ml-[8px] py-[14px]">
                    <Text className="leading-[23.8px] text-[24px] text-[#18192B] font-[300]">
                      25
                    </Text>
                    <Text className="leading-[11.1px] text-[12px] text-[#18192B] font-[400]">
                      gm
                    </Text>
                    <Progress.Bar
                      progress={45 / 100}
                      borderRadius={4}
                      width={50}
                      height={4}
                      className="bg-[#FFEDE0] mt-3 mx-auto"
                      borderWidth={0}
                      color={item.color}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          {TrackCaloriesView()}
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
          }}>
          {item.value != 0 && item.value !== 2 && <View style={{flex: 1}} />}
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
        <TouchableOpacity
          onPress={() => setIsModelOpen(true)}
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
          <Image
            source={require('../../../assets/common/forwardArrow.png')}
            style={{width: 9.5, height: 17.48, marginLeft: 23}}
          />
        </TouchableOpacity>
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
            {'14,588 kcal '}
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
            {'Data from your workout logs '}
          </Text>

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
            {'Track calories'}
          </Text>
        </View>
        <DateReportView
          onSelectMonth={pre => setMonthValue(pre)}
          onSelectYear={pre => setYearValue(pre)}
        />
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
        <TrackCaloriesListModel
          isModelOpen={isModelOpen}
          hanldeCloseModel={() => setIsModelOpen(false)}
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

export default TrackCaloriesScreen;

const TrackCaloriesListModel = ({
  isModelOpen,
  hanldeCloseModel,
  itemName = 'Meal: 1',
}) => {
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

        {/* <Text style={{ fontSize: 24, fontFamily: 'Larken', fontWeight: '700', lineHeight: 25.44, marginHorizontal: 30, marginTop: 30 }}>{itemName}</Text>
                <Text style={{ fontSize: 12, fontWeight: '400', lineHeight: 14.18, marginHorizontal: 30 }}>{"8.00am to 11.30am"}</Text> */}

        {TrackCaloriesView()}
      </View>
    </ModelBox>
  );
};
