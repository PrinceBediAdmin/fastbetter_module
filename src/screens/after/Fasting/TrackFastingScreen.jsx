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
import FastingStreakComponent from '../../../components/FastingPart/FastingStreakComponent';

// const weekGraphData = [
//   {
//     dateNum: 'Mon',
//     dayOfWeek: '01',
//     id: 0,
//     value: 1,
//   },
//   {
//     dateNum: 'Tue',
//     dayOfWeek: '02',
//     id: 1,
//     value: 0.5,
//   },
//   {
//     dateNum: 'Wed',
//     dayOfWeek: '03',
//     id: 2,
//     value: 0,
//   },
//   {
//     dateNum: 'Thu',
//     dayOfWeek: '04',
//     id: 3,
//     value: 0.5,
//   },
//   {
//     dateNum: 'Fri',
//     dayOfWeek: '05',
//     id: 4,
//     value: 0,
//   },
//   {
//     dateNum: 'Sat',
//     dayOfWeek: '06',
//     id: 5,
//     value: 0,
//   },
// ];

// const weekHistryList = [
//   {id: 1, date: 'Sun, 15th', Fasting: '15h 25m', EatingTtime: '6h 35m'},
//   {id: 2, date: 'Mon, 16th', Fasting: '15h 25m', EatingTtime: '6h 35m'},
//   {id: 3, date: 'Tue, 17th', Fasting: '-- --', EatingTtime: '-- --'},
//   {id: 4, date: 'Wed, 18th', Fasting: '15h 25m', EatingTtime: '6h 35m'},
//   {id: 5, date: 'Thu, 19th', Fasting: '-- --', EatingTtime: '-- --'},
// ];

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

const TrackFastingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ScreenType, setScreenType] = useState(0);

  const [DailySelectData, setDailySelectData] = useState(null);
  const [WeekSelectData, setWeekSelectData] = useState(0);
  const [FastingData, setFastingData] = useState({});

  const currentMonthKey = getCurrentMonthKey();
  const currentYearKey = getCurrentYearKey();

  const [Monthvalue, setMonthValue] = useState(currentMonthKey.toString());
  const [YearValue, setYearValue] = useState(currentYearKey.toString());
  const [weekHistryList, setWeekHistryList] = useState([]);
  const [graphData, setGraphData] = useState([
    {value: 0, color: '#FFB171', text: '0%'},
    {value: 0, color: '#FFDABF', text: '0%'},
  ]);
  const [weekGraphData, setWeekGraphData] = useState([]);
  const [LocalStorag, setLocalStorag] = useState(null);
  const [FastingStreakData, setFastingStreakData] = useState(fastingValue);

  useEffect(() => {
    getData();
  }, [DailySelectData, Monthvalue, YearValue]);

  useEffect(() => {
    getFastingPlan();
  }, []);

  const getFastingPlan = async () => {
    const data = await AsyncStorage.getItem('FastingPlan');
    if (!data) {
      console.error('No FastingPlan data found in AsyncStorage');
      return;
    }
    const storageData = JSON.parse(data);
    if (!storageData) {
      console.error('Invalid FastingPlan data');
      return;
    }

    setLocalStorag(storageData);
  };

  useEffect(() => {
    getWeekData();
  }, [WeekSelectData, Monthvalue, YearValue]);

  const getWeekData = async () => {
    const StorageData = await AsyncStorage.getItem('timerData');
    const Data = JSON.parse(StorageData);

    let dataList = Data || [];

    const MonthName = Monthvalue;
    const YearName = YearData[YearValue - 1]?.value;

    const getWeekOfMonth = date => {
      const day = date.getDate();
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const dayOfWeek = startOfMonth.getDay();
      return Math.ceil((day + dayOfWeek) / 7);
    };

    const filteredDataByMonthYear = dataList.filter(item => {
      const [day, month, year] = item.date.split('/').map(Number);
      return year === parseInt(YearName) && month === parseInt(MonthName);
    });

    const weekData = filteredDataByMonthYear.reduce((acc, item) => {
      const [day, month, year] = item.date.split('/').map(Number);
      const dateObj = new Date(year, month - 1, day);
      const weekOfMonth = getWeekOfMonth(dateObj);

      // Group data by the week of the month
      if (!acc[weekOfMonth]) {
        acc[weekOfMonth] = [];
      }
      acc[weekOfMonth].push(item);
      return acc;
    }, {});

    const weekSpecificData = weekData[WeekSelectData + 1] || [];
    setWeekHistryList(weekSpecificData);

    const fastingValue = [
      {name: 'Sun', key: 1, value: null},
      {name: 'Mon', key: 2, value: null},
      {name: 'Tue', key: 3, value: null},
      {name: 'Wed', key: 4, value: null},
      {name: 'Thu', key: 5, value: null},
      {name: 'Fri', key: 6, value: null},
      {name: 'Sat', key: 7, value: null},
    ];

    function getDayName(dateString) {
      const dateParts = dateString.split('/').reverse().join('-'); // Convert "dd/mm/yyyy" to "yyyy-mm-dd"
      const date = new Date(dateParts);

      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return daysOfWeek[date.getDay()];
    }

    weekSpecificData.forEach(item => {
      const dayName = getDayName(item.date);
      const matchingDay = fastingValue.find(day => day.name === dayName);
      if (matchingDay) {
        matchingDay.value = item?.fastingTime === 0 ? null : item?.fastingTime;
      }
    });
    setFastingStreakData(fastingValue);

    const result = getGraphData(weekSpecificData, WeekSelectData + 1);
    setWeekGraphData(result);
  };

  const getGraphData = (dataList, weektype = 1) => {
    function getStartOfWeek(date) {
      const day = date.getDay();
      const diff = day === 0 ? 6 : day - 1; // Sunday se Monday tak ka difference
      return new Date(date.setDate(date.getDate() - diff));
    }

    const newData = dataList.filter(entry => {
      const [day, month, year] = entry.date.split('/').map(Number);
      const date = new Date(year, month - 1, day);

      const startDate = new Date(year, month - 1, 1);
      const startOfWeek = getStartOfWeek(startDate);

      const desiredWeekStart = new Date(
        startOfWeek.setDate(startOfWeek.getDate() + weektype * 7),
      );
      const desiredWeekEnd = new Date(desiredWeekStart);
      desiredWeekEnd.setDate(desiredWeekStart.getDate() + 6);

      return date >= desiredWeekStart && date <= desiredWeekEnd;
    });

    const MonthName = Monthvalue;
    const YearName = YearData[YearValue - 1]?.value;

    const MonthData = MonthList(MonthName, YearName);

    const updatedDataList = MonthData.map(item => {
      // Find the matching date in ApiData based on the dayOfWeek
      const matchedApiData = newData.find(apiItem => {
        // Extract day from ApiData date (assuming DD/MM/YYYY format)
        const apiDay = apiItem.date.split('/')[0];
        return apiDay === item.dayOfWeek; // Compare with dayOfWeek in dataList
      });

      // If match is found, update the value with fastingTime from ApiData
      if (matchedApiData) {
        return {
          ...item,
          value: matchedApiData.fastingTime,
        };
      }

      // Return the original item if no match is found
      return item;
    });

    const filteredWeekData = getFilterData(updatedDataList, weektype);
    return filteredWeekData;
  };

  const getFilterData = (dataList, weekNumber) => {
    const daysPerWeek = 7;

    // Calculate the start and end index for the given week
    const startIndex = (weekNumber - 1) * daysPerWeek;
    const endIndex = startIndex + daysPerWeek;

    // Slice the dataList to get the data for the specified week
    return dataList.slice(startIndex, endIndex);
  };

  const MonthList = (monthNumber = '9', yearName = '2024') => {
    // Function to get the number of days in a month
    function getDaysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    }

    // Function to get the day of the week for a date
    function getDayOfWeek(date) {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return daysOfWeek[date.getDay()];
    }

    // Create the array
    const data = [];
    const numDays = getDaysInMonth(parseInt(monthNumber), parseInt(yearName));
    for (let i = 1; i <= numDays; i++) {
      const date = new Date(parseInt(yearName), parseInt(monthNumber) - 1, i);
      const dayOfWeek = getDayOfWeek(date);
      data.push({
        dateNum: dayOfWeek,
        dayOfWeek: i.toString().padStart(1),
        id: i - 1,
        value: 0,
      });
    }
    return data;
  };

  const getData = async () => {
    const currentDateTime = new Date().toISOString();
    const StorageData = await AsyncStorage.getItem('timerData');
    const Data = JSON.parse(StorageData);
    console.log(Data);
    const date = DailySelectData
      ? new Date(DailySelectData)
      : new Date(currentDateTime);
    const day = DailySelectData ? date.getUTCDate() + 1 : date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const newTime = `${day}/${Monthvalue}/${YearData[YearValue - 1]?.value}`;
    if (Data) {
      const indexFind = Data.findIndex(pre => pre?.date === newTime);

      if (indexFind !== -1) {
        setFastingData(Data[indexFind]);

        const eating = getTimePer(Data[indexFind]?.eatingTime);
        const fasting = getTimePer(Data[indexFind]?.fastingTime);

        const GrapData = [
          {
            value: eating || 0,
            color: '#FFB171',
          },
          {
            value: eating ? 100 - eating : 0.1,
            color: '#FFDABF',
          },
        ];

        setGraphData(GrapData);
      } else {
        setFastingData(Data[0]);
        setFastingData(null);
        setGraphData([
          {
            value: 0,
            color: '#FFB171',
          },
          {
            value: 0.1,
            color: '#FFDABF',
          },
        ]);
      }
    } else {
      setFastingData(null);
      setGraphData([
        {
          value: 0,
          color: '#FFB171',
        },
        {
          value: 0.1,
          color: '#FFDABF',
        },
      ]);
    }
  };

  const getTimePer = timeValue => {
    const formatValue = formatTime(timeValue);
    const [hours, minutes] = formatValue
      .split(':')
      .map(item => parseInt(item.replace(/[^\d]/g, ''), 10));

    // Convert the time to total minutes
    const totalMinutes = hours * 60 + minutes;

    // Total minutes in 24 hours
    const totalMinutesInDay = 24 * 60; // 1440 minutes

    // Calculate the percentage
    const percentage = (totalMinutes / totalMinutesInDay) * 100;
    return parseFloat(percentage.toFixed(2));
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

  const formatDate = dateValue => {
    const [day, month, year] = dateValue.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.toLocaleString('en-US', {weekday: 'short'});
    const newValue = `${dayOfWeek}, ${day}${'th'}`;

    return newValue;
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
              data={graphData}
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
                  fontSize: 25,
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
                  fontSize: 25,
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

  const convertTimeToMinutes = time => {
    const [hoursPart, minutesPart] = time.split(':').map(part => part.trim());
    const hours = parseInt(hoursPart.replace('h', ''), 10) || 0;
    const minutes = parseInt(minutesPart.replace('m', ''), 10) || 0;
    return hours * 60 + minutes;
  };

  const WeekGraphRenderItem = ({item, index}) => {
    const totalMinutes = convertTimeToMinutes(formatTime(item?.value));
    const totalMinutesInDay = 24 * 60;
    const percentage = (totalMinutes / totalMinutesInDay) * 100;

    return (
      <View>
        <LinearGradient
          start={{x: 0, y: 0.7}}
          end={{x: 1, y: 0}}
          colors={['#FFF2E9', '#FFFCFB']}
          style={{width: 40, height: 176, borderRadius: 8, padding: 4, gap: 3}}>
          <View
            style={{
              width: '90%',
              height: item?.value ? parseInt(percentage) + '%' : '0%',
              backgroundColor: '#FF9950',
              position: 'absolute',
              alignSelf: 'center',
              bottom: 0,
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
            // justifyContent: 'space-between',
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
            {formatDate(item?.date)}
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
              {formatTime(item?.fastingTime)}
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
              {formatTime(item?.eatingTime)}
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
          <View>
            <Image
              style={{width: '100%', height: 187, marginTop: -60, zIndex: 0}}
              source={bgimage}
            />
            <View style={{position: 'absolute', zIndex: 1}}>
              <WeeklyReportView
                isType={ScreenType}
                onSelectData={pre => setWeekSelectData(pre)}
              />
            </View>
          </View>
          {/* <ImageBackground
            source={bgimage}
            resizeMode="contain"
            style={{
              height: 187,
              paddingVertical: 0,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -30,
            }}>
            <WeeklyReportView
              isType={ScreenType}
              onSelectData={pre => setWeekSelectData(pre)}
            />
          </ImageBackground> */}

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

          <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
            <FastingStreakComponent
              fastingValue={FastingStreakData}
              data={LocalStorag}
              title={'Fasting streak'}
            />
          </View>

          {/* <View
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
          </View> */}
          {/* <Text className="mt-4 text-[12px] leading-[14px] text-center text-black px-1 font-[400]">
            {'You’re '}
            <Text
              className={`text-[#FE7701] ${
                Platform.OS == 'ios' && 'font-[700]'
              }`}>
              {'40% more likely '}
            </Text>
            {'to achieve your goal'}
          </Text> */}
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
