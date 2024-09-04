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

const TopImageSection = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initialCountdown, setInitialCountdown] = useState(0);
  const [savedTimerValue, setSavedTimerValue] = useState(false);

  const startTime = '9:58';
  const endTime = '15:00';

  const calculateCountdown = () => {
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
  };

  const isWithinTimeRange = () => {
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
  };

  useEffect(() => {
    const fetchTimerState = async () => {
      try {
        const savedTimer = await AsyncStorage.getItem('timer');
        const savedIsRunning = await AsyncStorage.getItem('isRunning');
        const savedEndTime = await AsyncStorage.getItem('endTime');

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

  useEffect(() => {
    let interval;

    if (isRunning) {
      if (isWithinTimeRange()) {
        interval = BackgroundTimer.setInterval(() => {
          setTimer(prevTimer => {
            if (prevTimer <= 0) {
              BackgroundTimer.clearInterval(interval);
              setIsRunning(false);
              return 0;
            }

            const newTime = prevTimer - 1;

            setProgress(
              100 - ((initialCountdown - newTime) / initialCountdown) * 100,
            );
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
      } catch (e) {
        console.error('Failed to save timer state', e);
      }
    };

    saveTimerState();
  }, [timer, isRunning]);

  const handlePlay = () => {
    if (isWithinTimeRange()) {
      const countdown = calculateCountdown();
      setInitialCountdown(countdown);
      setTimer(countdown);
      setIsRunning(true);
      //setSavedTimerValue(true);
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
            !isRunning ? '#FEEDE0' : !savedTimerValue ? '#E5FFF9' : '#4CC2F4'
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
      {timer !== 0 && <Text style={styles.timer}>{formatTime(timer)}</Text>}
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
