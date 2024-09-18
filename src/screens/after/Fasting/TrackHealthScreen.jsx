/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  Alert,
  Linking,
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
import {
  HealthConnect,
  requestPermission,
  initialize,
  readRecords,
  openHealthConnectSettings,
  isAvailable,
} from 'react-native-health-connect';
import {
  AppInstalledChecker,
  CheckPackageInstallation,
} from 'react-native-check-app-install';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
    subId: 'heartRateResult',
    data: null,
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
    subId: 'weightResult',
    data: null,
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
    subId: 'distanceResult',
    data: null,
  },
  {
    id: 4,
    name: 'B.P',
    value: '80/120',
    type: 'mm/hg',
    img: Walk_icon,
    textColor: '#197BD2',
    bg1: '#E9EFF7',
    bg2: '#D3E3F3',
    subId: 'BloodPressureResult',
    data: null,
  },
  {
    id: 5,
    name: 'total Calories Burned',
    value: '',
    type: '',
    img: Walk_icon,
    textColor: '#197BD2',
    bg1: '#E9EFF7',
    bg2: '#D3E3F3',
    subId: 'totalCaloriesBurnedResult',
    data: null,
  },
  {
    id: 6,
    name: 'steps',
    value: '',
    type: '',
    img: Walk_icon,
    textColor: '#197BD2',
    bg1: '#E9EFF7',
    bg2: '#D3E3F3',
    subId: 'stepsResult',
    data: null,
  },
  {
    id: 7,
    name: 'Nutrition',
    value: '',
    type: '',
    img: Walk_icon,
    textColor: '#197BD2',
    bg1: '#E9EFF7',
    bg2: '#D3E3F3',
    subId: 'Nutrition',
    data: null,
  },
];

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

const TrackHealthScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [ScreenType, setScreenType] = useState(0);
  const flatlistRef = useRef(null);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [ActiveItem, setActiveItem] = useState(1);
  const [AllLocalData, setAllLocalData] = useState(ActivitiesData);
  const [AllWeekLocalData, setAllWeekLocalData] = useState(ActivitiesData);

  const currentDateTime = new Date();

  const [DailySelectData, setDailySelectData] = useState(null);
  const [WeekSelectData, setWeekSelectData] = useState(0);

  const currentMonthKey = getCurrentMonthKey();
  const currentYearKey = getCurrentYearKey();

  const [Monthvalue, setMonthValue] = useState(currentMonthKey.toString());
  const [YearValue, setYearValue] = useState(currentYearKey.toString());

  useEffect(() => {
    getData();
  }, [Monthvalue, YearValue, DailySelectData, ScreenType, WeekSelectData]);

  const getData = async () => {
    const HealthConnectData = await AsyncStorage.getItem('HealthConnectData');
    const HelthDataObject = JSON.parse(HealthConnectData);
    let date = DailySelectData ? new Date(DailySelectData) : currentDateTime;
    if (DailySelectData) {
      date.setDate(date.getDate() + 1);
    }
    const newDateValue = date.toISOString();

    if (HelthDataObject) {
      const getDateOnly = dateTime => dateTime.split('T')[0];
      const dateToMatch = getDateOnly(newDateValue);

      const filteredDataList = HelthDataObject.flatMap(item => ({
        id: item.id,
        data: item.data
          .filter(dataItem => {
            if (dataItem) {
              if (
                item.id === 'heightResult' ||
                item.id === 'weightResult' ||
                item.id === 'BloodPressureResult'
              ) {
                return getDateOnly(dataItem?.time) === dateToMatch;
              } else if (
                item?.id === 'distanceResult' ||
                item?.id === 'heartRateResult' ||
                item?.id === 'totalCaloriesBurnedResult' ||
                item.id === 'stepsResult' ||
                item.id === 'Nutrition'
              ) {
                return getDateOnly(dataItem?.startTime) === dateToMatch;
              } else {
                return false;
              }
            } else {
              return false;
            }
          })
          .sort((a, b) => {
            const dateA = getDateOnly(a.time || a.startTime);
            const dateB = getDateOnly(b.time || b.startTime);
            return dateB.localeCompare(dateA);
          }),
      }));

      const updatedActivitiesData = ActivitiesData.map(activity => {
        const matchingData = filteredDataList.find(
          data =>
            data?.id.toLocaleLowerCase() === activity.subId.toLocaleLowerCase(),
        );
        return {
          ...activity,
          data: matchingData ? matchingData.data : null,
        };
      });

      setAllLocalData(updatedActivitiesData);
      setWeeKData(HelthDataObject, WeekSelectData);
    }
  };

  const setWeeKData = (HelthDataObject, WeekSelectData) => {
    let yearData = null;
    const yearIndex = YearData.findIndex(
      res => parseInt(res.key) === parseInt(YearValue),
    );
    if (yearIndex !== -1) {
      yearData = YearData[yearIndex]?.value;
    }

    const getWeekDateRange = weekNumber => {
      const now = new Date();
      const year = yearData ? parseInt(yearData) : now.getFullYear();
      const month =
        Monthvalue !== null ? parseInt(Monthvalue) - 1 : now.getMonth();
      console.log(YearValue);

      // Calculate the first day of the current month
      const firstDayOfMonth = new Date(year, month, 1);

      // Calculate the start of the week
      const startOfWeek = new Date(firstDayOfMonth);
      startOfWeek.setDate(1 + (weekNumber - 1) * 7);

      // Correct if the startOfWeek is in the previous month
      if (startOfWeek.getMonth() !== month) {
        startOfWeek.setDate(0); // Go to the last day of the previous month
        startOfWeek.setDate(
          startOfWeek.getDate() - (startOfWeek.getDate() - 1),
        );
      }

      // Calculate the end of the week
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return {
        start: startOfWeek.toISOString().split('T')[0],
        end: endOfWeek.toISOString().split('T')[0],
      };
    };

    const {start: weekStart, end: weekEnd} = getWeekDateRange(
      parseInt(WeekSelectData + 1, 10),
    );

    const getDateOnly = dateTime => dateTime.split('T')[0];

    const filteredDataList = HelthDataObject.flatMap(item => ({
      id: item.id,
      data: item.data
        .filter(dataItem => {
          if (dataItem) {
            if (
              item.id === 'heightResult' ||
              item.id === 'weightResult' ||
              item.id === 'BloodPressureResult'
            ) {
              const itemDate = getDateOnly(dataItem.time);
              return itemDate >= weekStart && itemDate <= weekEnd;
            } else if (
              item?.id === 'distanceResult' ||
              item?.id === 'heartRateResult' ||
              item?.id === 'totalCaloriesBurnedResult' ||
              item.id === 'stepsResult' ||
              item.id === 'Nutrition'
            ) {
              const itemDate = getDateOnly(dataItem.startTime);
              return itemDate >= weekStart && itemDate <= weekEnd;
            } else {
              return false;
            }
          } else {
            return false;
          }
        })
        .sort((a, b) => {
          const dateA = getDateOnly(a.time || a.startTime);
          const dateB = getDateOnly(b.time || b.startTime);
          return dateB.localeCompare(dateA);
        }),
    }));

    const updatedActivitiesData = ActivitiesData.map(activity => {
      const matchingData = filteredDataList.find(
        data =>
          data?.id.toLocaleLowerCase() === activity.subId.toLocaleLowerCase(),
      );
      return {
        ...activity,
        data: matchingData ? matchingData.data : null,
      };
    });
    setAllWeekLocalData(updatedActivitiesData);
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const ActivitiesRenderItem = ({item, index}) => {
    if (index >= 3) {
      return null;
    }
    let value = 0;
    if (index === 0) {
      value = item?.data ? item?.data[0]?.samples[0]?.beatsPerMinute || 0 : 0;
    } else if (index === 1) {
      value = item?.data ? item?.data[0]?.weight?.inKilograms || 0 : 0;
    } else if (index === 2) {
      value = item?.data
        ? item?.data?.reduce(
            (acc, item) => acc + item?.distance?.inKilometers,
            0,
          )
        : 0;
    } else {
    }

    const ItemHandle = itemValue => {
      if (itemValue.data && itemValue.data.length > 0) {
        setIsModelOpen(true);
        setActiveItem(itemValue);
      }
    };

    return (
      <TouchableOpacity
        onPress={() => ItemHandle(item)}
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
            source={item?.img}
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
            {item?.name}
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
            {value ? parseFloat(value?.toFixed(2)) : 0}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '700',
              lineHeight: 16.8,
              textAlign: 'center',
              color: item.textColor,
            }}>
            {item?.type}
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
          <TouchableOpacity onPress={() => checkAppInstalled()}>
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
            data={ScreenType === 0 ? AllLocalData : AllWeekLocalData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ActivitiesRenderItem}
            style={{marginTop: 30}}
            contentContainerStyle={{gap: 16}}
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
            <DailyReportView
              isType={ScreenType}
              onSelectData={pre => setDailySelectData(pre)}
              Monthvalue={Monthvalue}
              YearValue={YearValue}
            />
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
            <WeeklyReportView
              isType={ScreenType}
              onSelectData={pre => setWeekSelectData(pre)}
              Monthvalue={Monthvalue}
              YearValue={YearValue}
            />
          </ImageBackground>
          {ActiveView()}
        </View>
      </ScrollView>
    );
  };

  const checkAppInstalled = async () => {
    if (Platform.OS === 'android') {
      try {
        AppInstalledChecker.isAppInstalled('healthdata').then(isInstalled => {
          if (isInstalled) {
            getHealthData();
          } else {
            Alert.alert(
              'App Not Installed',
              'Please install the Health Data app',
              [
                {text: 'OK', onPress: () => openHealthConnectInPlayStore()}, // Button actions
              ],
            );
          }
        });
      } catch (err) {
        console.log('error : ', err);
      }
    }
  };

  const getHealthData = async () => {
    try {
      const initializeCheck = await initializeHealthConnect();
      if (initializeCheck) {
        const permissions = await requestPermission([
          {accessType: 'read', recordType: 'TotalCaloriesBurned'},
          {accessType: 'read', recordType: 'ActiveCaloriesBurned'},
          {accessType: 'read', recordType: 'Steps'},
          {accessType: 'read', recordType: 'HeartRate'},
          {accessType: 'read', recordType: 'Distance'},
          {accessType: 'read', recordType: 'SleepSession'},
          {accessType: 'read', recordType: 'Height'},
          {accessType: 'read', recordType: 'Weight'},
          {accessType: 'read', recordType: 'BloodPressure'},
          {accessType: 'read', recordType: 'Nutrition'},
          {accessType: 'read', recordType: 'RestingHeartRate'},
          {accessType: 'write', recordType: 'RestingHeartRate'},
        ]);

        // Check if all required permissions are granted
        const grantedPermissions = permissions.filter(
          permission => permission?.granted,
        );

        if (grantedPermissions.length >= 0) {
          fetchWatchData();
        } else {
          Alert.alert(
            'Permissions not granted',
            'Please grant the necessary permissions to fetch health data.',
            {text: 'OK', onPress: () => redirectToHealthConnect()},
          );
        }
      } else {
        Alert.alert('Opened Health Connect settings', [
          {text: 'OK', onPress: () => redirectToHealthConnect()}, // Button actions
        ]);
      }
    } catch (error) {
      console.error('Authorization failed', error);
    }
  };

  const redirectToHealthConnect = async () => {
    try {
      await openHealthConnectSettings();
      console.log('Opened Health Connect settings');
    } catch (error) {
      console.error('Failed to open Health Connect settings', error);
    }
  };

  const initializeHealthConnect = async () => {
    try {
      const type = await initialize();
      console.log('HealthConnect initialized', type);
      return type;
    } catch (error) {
      console.error('Initialization failed', error);
      return false;
    }
  };

  const openHealthConnectInPlayStore = () => {
    const url = Platform.select({
      android:
        'https://play.google.com/store/apps/details?id=com.google.android.apps.healthdata',
    });

    Linking.openURL(url).catch(err =>
      console.error('Failed to open Play Store', err),
    );
  };

  const fetchWatchData = async () => {
    try {
      const StartValue = '2024-08-25T03:43:54.898Z';
      const endValue = new Date().toISOString();

      // Helper function to fetch data for each health metric
      const fetchHealthData = async type => {
        const result = await readRecords(type, {
          timeRangeFilter: {
            operator: 'between',
            startTime: StartValue,
            endTime: endValue,
          },
        });
        return result?.records || [];
      };

      // Fetching all health data
      const stepsResult = await fetchHealthData('Steps');
      const totalCaloriesBurnedResult = await fetchHealthData(
        'TotalCaloriesBurned',
      );
      const heartRateResult = await fetchHealthData('HeartRate');
      const distanceResult = await fetchHealthData('Distance');
      const sleepSessionResult = await fetchHealthData('SleepSession');
      const heightResult = await fetchHealthData('Height');
      const weightResult = await fetchHealthData('Weight');
      const BloodPressureResult = await fetchHealthData('BloodPressure');
      const ActiveCaloriesBurned = await fetchHealthData(
        'ActiveCaloriesBurned',
      );
      const Nutrition = await fetchHealthData('Nutrition');
      // Organize health data into an array
      const HealthData = [
        {id: 'stepsResult', data: stepsResult},
        {id: 'totalCaloriesBurnedResult', data: totalCaloriesBurnedResult},
        {id: 'heartRateResult', data: heartRateResult},
        {id: 'distanceResult', data: distanceResult},
        {id: 'sleepSessionResult', data: sleepSessionResult},
        {id: 'weightResult', data: weightResult}, // This should now log properly
        {id: 'heightResult', data: heightResult},
        {id: 'BloodPressureResult', data: BloodPressureResult},
        {id: 'ActiveCaloriesBurned', data: ActiveCaloriesBurned},
        {id: 'Nutrition', data: Nutrition},
      ];
      // Store the health data locally
      if (HealthData.length > 0) {
        LocalStoreData(HealthData, true);
      } else {
        LocalStoreData(null, false);
      }
    } catch (error) {
      LocalStoreData(null, false);
      Alert.alert('Opened Health Connect settings', [
        {text: 'OK', onPress: () => redirectToHealthConnect()}, // Button actions
      ]);
      console.error('Failed to fetch health data', error);
    }
  };

  const LocalStoreData = async (HelthData = null, status = false) => {
    if (status) {
      if (HelthData) {
        await AsyncStorage.setItem(
          'HealthConnectData',
          JSON.stringify(HelthData),
        );
        setTimeout(() => {
          getData();
        }, 1000);
      }
    }
    await AsyncStorage.setItem('WatchConnect', JSON.stringify(status));
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
            {'Track health'}
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
              ScreenType === 0
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
              ScreenType === 1
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
          data={ActiveItem}
          localData={ScreenType === 0 ? AllLocalData : AllWeekLocalData}
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

const formatDate = dateString => {
  const date = new Date(dateString);
  // Array of day names
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Extract day of the week
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Extract day of the month
  const dayOfMonth = date.getDate();

  // Determine suffix for day of the month
  const suffix =
    dayOfMonth % 10 === 1 && dayOfMonth !== 11
      ? 'st'
      : dayOfMonth % 10 === 2 && dayOfMonth !== 12
      ? 'nd'
      : dayOfMonth % 10 === 3 && dayOfMonth !== 13
      ? 'rd'
      : 'th';

  // Format the date as 'DayOfWeek DayOfMonthSuffix'
  return `${dayOfWeek} ${dayOfMonth}${suffix}`;
};

const formatTimeDifference = dataList => {
  let totalMinutes = 0;

  dataList.forEach(item => {
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);

    // Get the difference in milliseconds and convert to minutes
    const diffInMs = endTime - startTime;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert milliseconds to minutes

    totalMinutes += diffInMinutes;
  });

  // Convert total minutes into hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

const formatTimeTo12Hour = timeString => {
  const date = new Date(timeString);
  let hours = date.getUTCHours(); // Get hours in UTC
  const minutes = date.getUTCMinutes(); // Get minutes in UTC

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert 24-hour time to 12-hour time
  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0, set it to 12 (midnight or noon)

  // Format minutes to always show two digits (e.g., '09' instead of '9')
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted time
  return `${hours}:${formattedMinutes}${ampm}`;
};
const calculateCaloriesBurned = (distance, weight) => {
  const caloriesBurned = distance * weight * 1.036;
  return caloriesBurned % 1 === 0
    ? caloriesBurned.toFixed(0)
    : caloriesBurned.toFixed(2);
};

const TrackHealthtModel = ({
  isModelOpen,
  hanldeCloseModel,
  localData = null,
  data = {
    id: 1,
    data: null,
  },
}) => {
  const HeartView = () => {
    let totalbpm = 0;
    let StartDate = null;
    let endTime = null;
    if (parseInt(data?.id) === 1) {
      totalbpm = data?.data
        ? data?.data[0]?.samples[0]?.beatsPerMinute
        : '-- --';
      StartDate = data?.data ? data?.data[0]?.startTime : null;
      endTime = data?.data ? data?.data[0]?.metadata?.lastModifiedTime : null;
    }
    let Bpdata = null;
    if (localData) {
      if (localData[3]?.data && localData[3]?.data?.length > 0) {
        Bpdata = localData ? localData[3]?.data[0] : null;
      }
    }
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
          {totalbpm ? '~ ' + totalbpm + ' bpm' : '----'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.18,
            marginHorizontal: 30,
          }}>
          {formatDate(StartDate)}
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
              {StartDate ? formatTimeTo12Hour(StartDate) : '---'}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 14.4,
                textAlign: 'right',
              }}>
              {endTime ? formatTimeTo12Hour(endTime) : '---'}
              {/* <Text style={{fontWeight: '400'}}>{'pm'}</Text> */}
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
                  {totalbpm ? totalbpm + ' bpm' : '---'}
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
                    {/* {' 65 bpm'} */}
                    {'----'}
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Highest
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    {/* {"145 bpm"} */}
                    {'----'}
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Sleeping
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    {/* {'53 bpm'} */}
                    {'----'}
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    Resting
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    {/* {' 80 bpm'} */}
                    {'----'}
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
                  {/* {' 120/80'} */}
                  {Bpdata
                    ? Bpdata?.systolic?.inMillimetersOfMercury +
                      '/' +
                      Bpdata?.diastolic?.inMillimetersOfMercury
                    : '---'}
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right'}}>
                  {/* {'  at 3.30pm GST'} */}
                  {StartDate
                    ? 'at ' + formatTimeTo12Hour(StartDate) + ' GST'
                    : '----'}
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
                    {Bpdata
                      ? Bpdata?.systolic?.inMillimetersOfMercury + 'mm/hg'
                      : '---'}
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
                    {Bpdata
                      ? Bpdata?.diastolic?.inMillimetersOfMercury + 'mm/hg'
                      : '---'}
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
    let totalKg = 0;
    let StartDate = null;

    if (data?.id === 2) {
      totalKg = data?.data ? data?.data[0]?.weight?.inKilograms : '-- --';
      StartDate = data?.data ? data?.data[0]?.time : null;
    }

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
          {totalKg ? totalKg + ' kg' : '---'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.18,
            marginHorizontal: 30,
          }}>
          {StartDate ? formatDate(StartDate) : '-- --'}
        </Text>
        <View style={{alignSelf: 'center'}}>
          <View className="flex flex-row items-center align-middle justify-between mt-[24px] mb-1">
            <View className="flex flex-row items-center gap-x-2">
              <View className="flex">
                <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                  {'Weight'}
                </Text>
                <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                  {/* {'98 kg'} */}
                  {'---'}
                </Text>
              </View>
              <View className="border h-[15px] border-[#18192B]/80 bg-[#18192B]/80"></View>
              <View className="flex">
                <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                  {'Target weight'}
                </Text>
                <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                  {/* {'75 kg'} */}
                  {'---'}
                </Text>
              </View>
            </View>
            <View className="flex justify-center items-end align-middle">
              <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                {'Goal'}
              </Text>
              <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                {/* {'Dec 25th, 2023'} */}
                {'---'}
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
            <Text style={{fontWeight: '700'}}>
              {totalKg ? totalKg + ' kg' : '---'}
            </Text>
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
                  {totalKg ? totalKg + ' kg' : '---'}
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
                    {/* {'95 kg'} */}
                    {'---'}
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    {'Current'}
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    {totalKg ? totalKg + ' kg' : '---'}
                  </Text>
                </View>
                <View className="flex">
                  <Text className="text-[12px] text-[#18192B]/80 font-[400] leading-[14.18px]">
                    {'Target'}
                  </Text>
                  <Text className="text-[12px] text-[#18192B] font-[700] leading-[14.18px] ">
                    {/* {'75 kg'} */}
                    {'---'}
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
                  {/* {'28.5'} */}
                  {'---'}
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
                    {/* {'5 ft 8 in'} */}
                    {'---'}
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
                    {/* {'98 kg'} */}
                    {'---'}
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
                    {/* {'Male'} */}
                    {'---'}
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
    let totalKilometers = 0;
    let StartDate = new Date();
    let endData = null;
    let ActiveSteps = null;
    let ActiveEnergy = null;
    let calories = null;

    if (parseInt(data?.id) === 3) {
      totalKilometers = data?.data
        ? data?.data.reduce(
            (acc, item) => acc + item?.distance?.inKilometers,
            0,
          )
        : 0;
      StartDate = data?.data
        ? data?.data[data?.data?.length - 1]?.startTime
        : '-- --';
      endData = data?.data ? data?.data[0]?.endTime : '-- --';
      calories = calculateCaloriesBurned(totalKilometers, 60);
    }
    if (localData && localData[5]?.data?.length > 0) {
      ActiveSteps = localData[5]?.data
        ? localData[5].data.reduce((acc, item) => acc + item?.count, 0)
        : 0;
    }

    if (localData && localData[6]?.data?.length > 0) {
      ActiveEnergy = localData[6]?.data
        ? localData[6].data[0].energy?.inKilocalories
        : 0;
    }

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
          {totalKilometers !== null
            ? parseFloat(totalKilometers?.toFixed(2))
            : 2}
          {' km'}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 14.18,
            marginHorizontal: 30,
          }}>
          {formatDate(StartDate)}
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
              {StartDate ? formatTimeTo12Hour(StartDate) : '---'}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 14.4,
                textAlign: 'right',
              }}>
              {endData ? formatTimeTo12Hour(endData) : '---'}
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
                  {data?.data ? formatTimeDifference(data?.data) : '----'}
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  Average
                </Text>
              </View>
            </View>
          </View>

          {/* new design */}

          {/* <View
            className={`flex bg-white w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={Active_icon} className="h-[40px] w-[36.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Steps
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Count
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  {ActiveSteps ? ActiveSteps : '0'}
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{textAlign: 'right', width: 82}}>
                  steps
                </Text>
              </View>
            </View>
          </View> */}

          {/* <View
            className={`flex bg-white w-[330px] px-[24px] py-[24px] rounded-[30px] mb-2 border border-gray-100 shadow-lg shadow-gray-100 sha overflow-hidden-`}
            style={{alignSelf: 'center'}}>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2 justify-center items-center">
                <Image source={Resting_icon} className="h-[40px] w-[36.26px]" />
                <View className="flex justify-start items-start">
                  <Text className="text-black text-base font-semibold leading-[0.1]">
                    Calories
                  </Text>
                  <Text className="text-gray-600 text-[10px] leading-[0.1] -mt-1">
                    Burned
                  </Text>
                </View>
              </View>
              <View className="flex justify-center items-start align-middle">
                <Text
                  className="text-[20px] text-[#FE7701] font-[700] -mt-0.5"
                  style={{textAlign: 'right', width: 150}}>
                  {calories ? calories : 0}
                  {' kcal'}
                </Text>
                <Text
                  className="text-[12px] text-[#18192B] font-[400] -mt-0.5"
                  style={{
                    textAlign: 'right',
                    width: 82,
                    alignSelf: 'flex-end',
                  }}>
                  Average
                </Text>
              </View>
            </View>
          </View> */}

          {/* old design */}

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
                  {/* {" 24.5 kcal"} */}
                  {ActiveEnergy ? parseInt(ActiveEnergy) : 0}
                  {' kcal'}
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
                  {/* {"  1,541 kcal"} */}
                  {'---'}
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

        {parseInt(data?.id) === 1 && HeartView()}
        {parseInt(data?.id) === 2 && WeightView()}
        {parseInt(data?.id) === 3 && WalkView()}
      </View>
    </ModelBox>
  );
};
