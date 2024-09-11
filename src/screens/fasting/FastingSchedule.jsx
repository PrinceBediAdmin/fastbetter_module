import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Background from '../../components/Background';
import {useNavigation} from '@react-navigation/native';
import NextButton from '../../components/NextButton';
import ProgressBar from '../../components/ProgressBar';
import {getAxiosWithToken} from '../../axios/AxiosObj';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FastingSchedule() {
  const navigation = useNavigation();
  const [fastingScheduleData, setFastingScheduleData] = useState({
    fasting1: {
      eatingwindow: 'Morning',
      timeRange: '7:00 AM - 12:00 PM',
      activities: [
        {
          title: 'Have your first meal',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        },
        {
          title: 'Get ready to fast',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        },
      ],
    },
    fasting2: {
      eatingwindow: 'Day',
      timeRange: '12:00 PM - 5:00 PM',
      activities: [
        {
          title: 'Have your last meal',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        },
        {
          title: 'Control your hunger',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        },
      ],
    },
    fasting3: {
      eatingwindow: 'Evening',
      timeRange: '5:00 PM - 9:00 PM',
      activities: [
        {
          title: 'Enjoy burning fat',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        },
      ],
    },
    title: 'We recommend this',
    subtitle: 'fasting schedule',
  });

  const handleGoForward = async () => {
    navigation.navigate('DashboardNavigation');
    await AsyncStorage.removeItem('timer');
    await AsyncStorage.removeItem('isRunning');
    await AsyncStorage.removeItem('endTime');
    await AsyncStorage.removeItem('timerData');
    await AsyncStorage.setItem('loginType', JSON.stringify(true));
  };

  if (!fastingScheduleData) {
    return <Text>Loading...</Text>;
  }

  return (
    <Background statusBarBgColor="" statusBarTranslucent={false}>
      <View className="px-4 top-5">
        <ProgressBar progressNumber={100} type={2} />
      </View>
      <View className="mt-8 mb-2 flex flex-row justify-center items-center flex-wrap">
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Larken',
            lineHeight: 25.44,
            color: '#000',
            textAlign: 'center',
            fontWeight: '400',
          }}>
          {fastingScheduleData.title + '\n'}
          <Text style={{fontWeight: '700', color: '#FE7701'}}>
            {fastingScheduleData.subtitle}
          </Text>
        </Text>
      </View>
      <ScrollView
        style={{flex: 1, marginBottom: 110}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 150}}>
        {Object.keys(fastingScheduleData)
          .filter(key => key.startsWith('fasting'))
          .map((key, index) => (
            <View
              key={index}
              style={{
                marginTop: 16,
                alignSelf: 'center',
                padding: 24,
                width: '80%',
              }}
              className={`rounded-3xl bg-white shadow-lg shadow-gray-100 ${
                Platform.OS == 'android' && 'shadow-gray-400'
              }`}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/common/evening.png')}
                  className="h-auto w-auto"
                  resizeMode="contain"
                />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 20,
                    fontWeight: '600',
                    lineHeight: 24,
                    marginLeft: 14,
                    color: '#18192B',
                  }}>
                  {fastingScheduleData[key].eatingwindow + '\n'}
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '600',
                      lineHeight: 19.4,
                      color: '#18192B',
                      opacity: 80,
                    }}>
                    ({fastingScheduleData[key].timeRange})
                  </Text>
                </Text>
              </View>
              <View
                style={{height: 2, backgroundColor: '#F4F4F4', marginTop: 16}}
              />
              {fastingScheduleData[key].activities.map((activity, idx) => (
                <View key={idx}>
                  <Text
                    className="text-sm font-semibold text-[#FE7701] mb-1.5"
                    style={{marginTop: 24, fontWeight: 700}}>
                    {activity.title}
                  </Text>
                  <Text
                    className="text-xs font-normal text-black"
                    style={{fontWeight: 400}}>
                    {activity.subtitle}
                  </Text>
                </View>
              ))}
            </View>
          ))}
      </ScrollView>

      <View className="flex items-center">
        <NextButton
          onPress={handleGoForward}
          title={'Finish'}
          mainClassName={'absolute bottom-10'}
          isContinueBtn={true}
        />
      </View>
    </Background>
  );
}
