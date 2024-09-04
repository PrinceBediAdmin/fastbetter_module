/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text, View, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TrackScreen from '../screens/after/TrackScreen';

// Screens
import HomeScreen from '../screens/after/HomeScreen';

import {SvgXml} from 'react-native-svg';
import {homeIcon, eatIcon, gymIcon, trackIcon} from '../assets/svg/icons';

const Tab = createBottomTabNavigator();

const GymScreen = () => (
  <View>
    <Text>GYM</Text>
  </View>
);

const EatScreen = () => (
  <View>
    <Text>EAT</Text>
  </View>
);

const DashboardNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#197BBD',
        tabBarInactiveTintColor: '#A7A7A7',
        tabBarStyle: {
          height: Platform.OS === 'android' ? 80 : 100,
          paddingTop: Platform.OS === 'ios' ? 20 : 20,
          elevation: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}>
              <SvgXml
                xml={homeIcon(focused ? '#FF9950' : '#a3a1a8')}
                width={26}
                height={26}
              />
              <Text
                style={{
                  color: focused ? '#FF9950' : '#a3a1a8',
                  marginTop: 4,
                  fontSize: 10,
                }}>
                Home
              </Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginTop: 4,
                  backgroundColor: focused ? '#FF9950' : '#fff',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Gym"
        component={GymScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}>
              <SvgXml
                xml={gymIcon(focused ? '#FF9950' : '#a3a1a8')}
                width={26}
                height={26}
              />
              <Text
                style={{
                  color: focused ? '#FF9950' : '#a3a1a8',
                  marginTop: 4,
                  fontSize: 10,
                }}>
                Gym
              </Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginTop: 4,
                  backgroundColor: focused ? '#FF9950' : '#fff',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Eat"
        component={EatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}>
              <SvgXml
                xml={eatIcon(focused ? '#FF9950' : '#a3a1a8')}
                width={26}
                height={26}
              />
              <Text
                style={{
                  color: focused ? '#FF9950' : '#a3a1a8',
                  marginTop: 4,
                  fontSize: 10,
                }}>
                Eat
              </Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginTop: 4,
                  backgroundColor: focused ? '#FF9950' : '#fff',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
              }}>
              <SvgXml
                xml={trackIcon(focused ? '#FF9950' : '#a3a1a8')}
                width={26}
                height={26}
              />
              <Text
                style={{
                  color: focused ? '#FF9950' : '#a3a1a8',
                  marginTop: 4,
                  fontSize: 10,
                }}>
                Track
              </Text>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginTop: 4,
                  backgroundColor: focused ? '#FF9950' : '#fff',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
