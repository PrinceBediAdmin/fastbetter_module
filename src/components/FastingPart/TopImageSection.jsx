/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import StatsComponent from './StatsComponent';
import FastingStreakComponent from './FastingStreakComponent';
import {fastingValue} from '../../function/data';

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

  useEffect(() => {
    getFastingPlanData();
  }, []);

  useEffect(() => {
    GetFastingData();
  }, []);

  const GetFastingData = async () => {
    const TimeData = await AsyncStorage.getItem('timerData');
    let dataObject = TimeData ? JSON.parse(TimeData) : [];
    console.log(dataObject);
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

      const currentDay = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
      });
      setLocalStorag(storageData);
      // Compare current day with treDay
      const isMatch = currentDay === fastingOption[storageData?.treatDays].name;
      if (isMatch) {
        setSavedTimerValue(false);
        setStartTime('11:59');
        setEndTime('23:59');
      } else {
        const start24 = convertTimeTo24HourFormat(storageData?.startTime);
        const end24 = convertTimeTo24HourFormat(storageData?.endTime);
        if (isTimeMatch(start24, end24)) {
          setSavedTimerValue(false);
          setStartTime(start24);
          setEndTime(end24);
        } else {
          setStartTime(end24);
          setEndTime(start24);
          setSavedTimerValue(true);
        }
      }
    } catch (error) {
      console.error('Error parsing FastingPlan data:', error);
    }
  };

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

  const calculateCountdown = () => {
    if (endTime && startTime) {
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

      return (end - start) / 1000; // in seconds
    } else {
      return null;
    }
  };

  const isWithinTimeRange = () => {
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

        // Load fasting and eating times from AsyncStorage
        if (fastingTime) {
          console.log('Fasting Time:', fastingTime);
        }
        if (eatingTime) {
          console.log('Eating Time:', eatingTime);
        }
      } catch (e) {
        console.error('Failed to load timer state', e);
      }
    };

    fetchTimerState();
  }, []);

  useEffect(() => {
    let interval;

    if (isRunning) {
      if (isWithinTimeRange()) {
        interval = BackgroundTimer.setInterval(() => {
          setTimer(prevTimer => {
            if (prevTimer >= initialCountdown) {
              BackgroundTimer.clearInterval(interval);
              setIsRunning(false);
              // Save fasting or eating time
              return prevTimer;
            }

            const newTime = prevTimer + 1;

            setProgress((newTime / initialCountdown) * 100);
            return newTime;
          });
        }, 1000);
      } else {
        Alert.alert(
          'Not within the time range',
          'The current time is not within the defined range.',
        );
        setIsRunning(false);
      }
    } else if (interval) {
      BackgroundTimer.clearInterval(interval);
    }

    return () => {
      if (interval) {
        BackgroundTimer.clearInterval(interval);
      }
    };
  }, [isRunning, initialCountdown]);

  useEffect(() => {
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

  const handlePlay = () => {
    if (isWithinTimeRange()) {
      const countdown = calculateCountdown();
      if (countdown) {
        setInitialCountdown(countdown);
        setIsRunning(true);
      }
      // setSavedTimerValue(true);
    } else {
      Alert.alert(
        'Not within the time range',
        'The current time is not within the defined range.',
      );
    }
  };

  const handleStop = () => {
    setIsRunning(false);
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
              onPress={!isRunning ? handlePlay : handleStop}
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
        <FastingStreakComponent fastingValue={FastingStreakData} />
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
