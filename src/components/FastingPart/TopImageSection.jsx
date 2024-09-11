/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import StatsComponent from './StatsComponent';
import FastingStreakComponent from './FastingStreakComponent';
import {fastingValue} from '../../function/data';

import BackgroundActions from 'react-native-background-actions';

const options = {
  taskName: 'Timer',
  taskTitle: 'Running Timer',
  taskDesc: 'Your timer is running in the background',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#FE7701',
  linkingURI: 'yourapp://timer', // You can provide a deep link
  parameters: {delay: 1000},
  // Ensure the service runs as a foreground service
  notificationId: 1,
  notification: {
    enabled: true, // Required to run in the foreground
    taskTitle: 'Timer Active',
    taskDesc: 'The timer is currently running',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#FE7701', // Customize the notification color
  },
};

const fastingOption = [
  {name: 'Sun', key: 0, value: 100},
  {name: 'Mon', key: 1, value: 20},
  {name: 'Tue', key: 2, value: 20},
  {name: 'Wed', key: 3, value: 20},
  {name: 'Thu', key: 4, value: 20},
  {name: 'Fri', key: 5, value: 20},
  {name: 'Sat', key: 6, value: 20},
];

const TopImageSection = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initialCountdown, setInitialCountdown] = useState(0);
  const [savedTimerValue, setSavedTimerValue] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [LocalStorag, setLocalStorag] = useState(null);
  const [FastingStreakData, setFastingStreakData] = useState(fastingValue);
  const intervalRef = useRef(null);

  // useEffect(() => {
  //   const handleAppStateChange = nextAppState => {
  //     if (nextAppState === 'active') {
  //       console.log('App is in the foreground', nextAppState);
  //     } else if (nextAppState === 'background') {
  //       setBackgroundTimeValue(new Date().getTime());
  //     }
  //     setAppState(nextAppState);
  //   };

  //   AppState.addEventListener('change', handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  useEffect(() => {
    getFastingPlanData();
    // return () => {
    //   if (intervalRef.current) {
    //     BackgroundTimer.clearInterval(intervalRef.current);
    //     setIsRunning(false);
    //   }
    // };
  }, []);

  useEffect(() => {
    GetFastingData();
  }, [timer]);

  const GetFastingData = async () => {
    const TimeData = await AsyncStorage.getItem('timerData');
    let dataObject = TimeData ? JSON.parse(TimeData) : [];

    function getWeekRange() {
      const currentDate = new Date();
      const firstDayOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1),
      ); // Monday
      const lastDayOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() + 6),
      ); // Sunday

      firstDayOfWeek.setHours(0, 0, 0, 0); // Set to start of the day
      lastDayOfWeek.setHours(23, 59, 59, 999); // Set to end of the day

      return {firstDayOfWeek, lastDayOfWeek};
    }
    const {firstDayOfWeek, lastDayOfWeek} = getWeekRange();

    const filteredData = dataObject.filter(item => {
      const itemDate = new Date(item.date.split('/').reverse().join('-'));
      return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
    });

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

    filteredData.forEach(item => {
      const dayName = getDayName(item.date);
      const matchingDay = fastingValue.find(day => day.name === dayName);
      if (matchingDay) {
        matchingDay.value = item?.fastingTime === 0 ? null : item?.fastingTime;
      }
    });

    setFastingStreakData(fastingValue);
  };

  const getFastingPlanData = async () => {
    try {
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
    } catch (error) {
      console.error('Error parsing FastingPlan data:', error);
    }
  };

  function isEarlierThanCurrentTime(time) {
    const currentTime = new Date();
    const [hours, minutes] = time.split(':').map(Number);

    const inputTime = new Date();
    inputTime.setHours(hours, minutes, 0, 0);

    return inputTime < currentTime;
  }

  const convertTimeTo24HourFormat = timeValue => {
    if (!timeValue) return 'Invalid time';

    const match = timeValue.match(/^(\d{1,2}:\d{2})\s*(AM|PM)$/i);

    if (!match) {
      console.error('Invalid time format:', timeValue);
      return 'Invalid time';
    }

    const time = match[1];
    const modifier = match[2].toUpperCase();

    let [hours, minutes] = time.split(':');

    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Invalid time format:', timeValue);
      return 'Invalid time';
    }

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    // Ensure hours and minutes are double digits
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const isTimeMatch = (startTime = null, endTime = null) => {
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      const now = new Date();
      const start = new Date(now);
      const end = new Date(now);

      start.setHours(startHours, startMinutes, 0, 0);
      end.setHours(endHours, endMinutes, 0, 0);

      if (end < start) {
        end.setDate(end.getDate() + 1);
      }

      return now >= start && now <= end;
    } else {
      return null;
    }
  };

  const calculateCountdown = (TimerStart = null, TimerEnd = null) => {
    if (TimerEnd && TimerStart) {
      const [startHours, startMinutes] = TimerStart.split(':').map(Number);
      const [endHours, endMinutes] = TimerEnd.split(':').map(Number);

      const now = new Date();
      const start = new Date(now);
      const end = new Date(now);

      start.setHours(startHours, startMinutes, 0, 0);
      end.setHours(endHours, endMinutes, 0, 0);

      if (end < start) {
        end.setDate(end.getDate() + 1);
      }

      return (end - start) / 1000; // in seconds
    } else {
      return null;
    }
  };

  const isWithinTimeRange = (TimeStart = null, TimeEnd = null) => {
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      const now = new Date();
      const start = new Date(now);
      const end = new Date(now);

      start.setHours(startHours, startMinutes, 0, 0);
      end.setHours(endHours, endMinutes, 0, 0);

      if (end < start) {
        end.setDate(end.getDate() + 1);
      }

      return now >= start && now <= end;
    } else if (TimeStart && TimeEnd) {
      const [startHours, startMinutes] = TimeStart.split(':').map(Number);
      const [endHours, endMinutes] = TimeEnd.split(':').map(Number);

      const now = new Date();
      const start = new Date(now);
      const end = new Date(now);

      start.setHours(startHours, startMinutes, 0, 0);
      end.setHours(endHours, endMinutes, 0, 0);

      if (end < start) {
        end.setDate(end.getDate() + 1);
      }

      return now >= start && now <= end;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const fetchTimerState = async () => {
      try {
        const savedTimer = await AsyncStorage.getItem('timer');
        const savedIsRunning = await AsyncStorage.getItem('isRunning');
        const savedEndTime = await AsyncStorage.getItem('endTime');
        const fastingTime = await AsyncStorage.getItem('fastingTime');
        const eatingTime = await AsyncStorage.getItem('eatingTime');

        if (savedEndTime) {
          const endTime = new Date(Number(savedEndTime));
          const now = new Date();
          const remainingTime = Math.max((endTime - now) / 1000, 0);
          setTimer(remainingTime);
          setInitialCountdown(remainingTime);
          // setSavedTimerValue(true);
        } else if (savedTimer !== null) {
          const timerValue = Number(savedTimer);
          setTimer(timerValue);
          setInitialCountdown(timerValue);
          // setSavedTimerValue(true);
        } else {
          // setSavedTimerValue(false);
        }

        if (savedIsRunning !== null) {
          setIsRunning(JSON.parse(savedIsRunning));
        }
      } catch (e) {
        console.error('Failed to load timer state', e);
      }
    };

    fetchTimerState();
  }, []);

  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  const startBackgroundTask = async () => {
    try {
      await BackgroundActions.start(veryIntensiveTask, options);
      // setIsRunning(true);
    } catch (err) {
      console.error(err);
    }
  };
  const veryIntensiveTask = async () => {
    await new Promise(async resolve => {
      intervalRef.current = BackgroundTimer.setInterval(() => {
        setTimer(prevTimer => {
          const currentTime = new Date();

          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes();
          const seconds = currentTime.getSeconds();

          const formattedHours = hours.toString().padStart(2, '0');
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');

          const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
          const newValue = `${endTime}:00`;

          if (formattedTime >= newValue) {
            TimeOutHandle();
            resolve(); // Stop the background task when time is up
            return 0;
          }

          const limtValue = savedTimerValue
            ? LocalStorag?.fasting || 14
            : LocalStorag?.eating || 8;
          let newTime = prevTimer + 1;
          const totalSecondsInPeriod = limtValue * 60 * 60;
          console.log(newTime);
          setProgress((newTime / totalSecondsInPeriod) * 100);
          return newTime;
        });
      }, 1000);

      await sleep(1000); // Ensure the loop runs continuously every 1 second
    });
  };

  // Stop background task
  const stopBackgroundTask = async () => {
    if (intervalRef.current) {
      BackgroundTimer.clearInterval(intervalRef.current); // Clear interval
      intervalRef.current = null;
    }
    await BackgroundActions.stop(); // Stop background service
  };

  useEffect(() => {
    if (isRunning) {
      if (isWithinTimeRange()) {
        startBackgroundTask(); // Start the timer as a foreground service
      } else {
        Alert.alert(
          'Not within the time range',
          'The current time is not within the defined range.',
        );
        setIsRunning(false);
      }
    } else {
      stopBackgroundTask();
    }

    return () => {
      BackgroundTimer.clearInterval(intervalRef?.current);
      // stopBackgroundTask();
    };
  }, [isRunning, initialCountdown, endTime]);

  const TimeOutHandle = async () => {
    if (intervalRef?.current) {
      BackgroundTimer.clearInterval(intervalRef?.current);
    }
    stopBackgroundTask();
    setIsRunning(false);
    setTimer(0); // Reset timer to 0
    setProgress(0); // Reset progress to 0
    saveFastingOrEatingTime(); // Save the fasting or eating time if needed
    await AsyncStorage.setItem('timer', '0');
  };

  useEffect(() => {
    if (handlePlayCheck()) {
      TimeOutHandle();
    }
    const saveTimerState = async () => {
      try {
        const endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + timer);

        await AsyncStorage.setItem('timer', timer.toString());
        await AsyncStorage.setItem('isRunning', JSON.stringify(isRunning));
        await AsyncStorage.setItem('endTime', endTime.getTime().toString());
        if (timer !== 0) {
          saveFastingOrEatingTime();
        }
      } catch (e) {
        console.error('Failed to save timer state', e);
      }
    };

    saveTimerState();
  }, [timer, isRunning]);

  const handlePlayCheck = () => {
    const currentTime = new Date();

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const second = currentTime.getSeconds();

    const formattedHours = hours.toString().padStart(2);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSecond = second.toString().padStart(2, '0');

    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSecond}`;

    if (startTime && endTime) {
      return formattedTime > endTime + ':00' ? true : false;
    } else {
      return false;
    }
  };

  const handlePlay = async () => {
    if (handlePlayCheck()) {
      TimeOutHandle();
    }
    const currentDay = new Date().toLocaleDateString('en-US', {
      weekday: 'short',
    });
    const isMatch = currentDay === fastingOption[LocalStorag?.treatDays].name;

    let TimerStart = null;
    let TimerEnd = null;

    if (isMatch) {
      setSavedTimerValue(false);
      TimerStart = '0:01';
      TimerEnd = '23:59';
      setStartTime('0:01');
      setEndTime('23:59');
    } else {
      const start24 = convertTimeTo24HourFormat(LocalStorag?.startTime);
      const end24 = convertTimeTo24HourFormat(LocalStorag?.endTime);

      if (isTimeMatch(start24, end24)) {
        setSavedTimerValue(false);
        setStartTime(start24);
        setEndTime(end24);
        TimerStart = start24;
        TimerEnd = end24;
      } else {
        if (isEarlierThanCurrentTime(start24)) {
          TimerStart = end24;
          TimerEnd = '23:59';
          setStartTime(end24);
          setEndTime('23:59');
        } else {
          TimerStart = '0:01';
          TimerEnd = start24;
          setStartTime('0:01');
          setEndTime(start24);
        }
        setSavedTimerValue(true);
      }
    }

    const countdown = calculateCountdown(TimerStart, TimerEnd);
    if (countdown) {
      setInitialCountdown(countdown);
      setIsRunning(true);
    }
  };

  const handleStop = async () => {
    setIsRunning(false);
    await AsyncStorage.setItem('isRunning', JSON.stringify(false));
  };

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hours}h: ${minutes < 10 ? '0' : ''}${minutes}m: ${
      secs < 10 ? '0' : ''
    }${secs}s`;
  };

  const saveFastingOrEatingTime = async () => {
    try {
      const currentTime = new Date();
      const dateString = currentTime.toLocaleDateString();

      const TimeData = await AsyncStorage.getItem('timerData');
      let dataObject = TimeData ? JSON.parse(TimeData) : [];

      const existingData = dataObject.find(item => item.date === dateString);

      if (existingData) {
        if (savedTimerValue) {
          existingData.fastingTime = timer;
        } else {
          existingData.eatingTime = timer;
        }
      } else {
        if (savedTimerValue) {
          dataObject.push({
            date: dateString,
            fastingTime: timer,
            eatingTime: existingData ? existingData.eatingTime : 0,
          });
        } else {
          dataObject.push({
            date: dateString,
            fastingTime: existingData ? existingData.fastingTime : 0,
            eatingTime: timer,
          });
        }
      }

      await AsyncStorage.setItem('timerData', JSON.stringify(dataObject));
    } catch (e) {
      console.error('Failed to save fasting or eating time', e);
    }
  };

  return (
    <View style={{width: '100%', marginTop: 40}}>
      <Image
        source={
          !isRunning
            ? require('../../assets/afterscreen/home/base.png')
            : !savedTimerValue
            ? require('../../assets/afterscreen/home/base2.png')
            : require('../../assets/afterscreen/home/base3.png')
        }
        style={{height: 200, width: '100%', top: 0}}
        resizeMode="contain"
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          alignSelf: 'center',
        }}>
        <AnimatedCircularProgress
          size={200}
          width={15}
          fill={progress}
          tintColor={
            !isRunning ? '#FA9950' : !savedTimerValue ? '#42F1C1' : '#4CC2F4'
          }
          backgroundColor={
            !isRunning ? '#FEEDE0' : !savedTimerValue ? '#E5FFF9' : '#D9F0FA'
          }
          arcSweepAngle={180}
          rotation={270}>
          {() => (
            <TouchableOpacity
              onPress={() => (!isRunning ? handlePlay() : handleStop())}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 50,
                alignItems: 'center',
                backgroundColor: !isRunning
                  ? '#FA9950'
                  : !savedTimerValue
                  ? '#42F1C1'
                  : '#31B3F1',
                marginHorizontal: 'auto',
                paddingHorizontal: 5,
                height: 80,
                borderRadius: 40,
                width: 80,
              }}>
              <Image
                source={
                  !isRunning
                    ? require('../../assets/icons/play.png')
                    : !savedTimerValue
                    ? require('../../assets/icons/stop.png')
                    : require('../../assets/icons/rePlay.png')
                }
                style={{height: 24, width: 24}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </AnimatedCircularProgress>
      </View>
      <View
        style={{
          borderColor: '#EDEDED',
          borderWidth: 1,
          marginTop: 16,
          marginBottom: 8,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 12,
            fontWeight: '500',
            textAlign: 'center',
          }}>
          {!isRunning
            ? 'Tap to start fasting'
            : savedTimerValue
            ? 'Fasting in progress'
            : 'Eating in progress'}
        </Text>
      </View>
      {isRunning && <Text style={styles.timer}>{formatTime(timer)}</Text>}
      <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
        <StatsComponent
          Fasting={LocalStorag?.fasting ? LocalStorag?.fasting + 'h' : null}
          Eating={LocalStorag?.eating ? LocalStorag?.eating + 'h' : null}
        />
        <FastingStreakComponent
          fastingValue={FastingStreakData}
          data={LocalStorag}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 12,
            lineHeight: 14,
            textAlign: 'center',
            color: 'black',
            paddingHorizontal: 1,
            fontWeight: '400',
          }}>
          <Text
            style={{
              color: '#FE7701',
              ...(Platform.OS === 'ios' && {fontWeight: '700'}),
              fontWeight: '700',
            }}>
            {'Start fasting '}
          </Text>
          {'to achieve your goal weight'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 42,
    marginBottom: 8,
    lineHeight: 50.4,
    fontWeight: '200',
    alignSelf: 'center',
  },
});

export default TopImageSection;
