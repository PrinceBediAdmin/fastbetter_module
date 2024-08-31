import React from 'react';
import { Text, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Header from "../components/Header";

//screen
import HomeScreen from '../screens/after/HomeScreen';

import { SvgXml } from 'react-native-svg';
import { homeIcon, eatIcon, gymIcon, trackIcon } from '../assets/svg/icons';


const Tab = createBottomTabNavigator();

const DashboardNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#197BBD",
                tabBarInactiveTintColor: "#A7A7A7",
                tabBarStyle: {
                    height: Platform.OS === 'android' ? 100 : 100,
                    paddingTop: Platform.OS === 'ios' ? 20 : 20,
                    elevation: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#fff",
                    // elevation: 5, // Android box shadow
                    // shadowColor: 'black', // iOS box shadow
                    // shadowOffset: { width: 0, height: 2 },
                    // shadowOpacity: 0.2,
                    // shadowRadius: 4,
                },
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTitleStyle: {
                    },
                    header: ({ focused }) => {
                        return <Header />
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                className={`flex-col items-center justify-center bg-white ${focused && 'border-b-2 border-b-white'}`}
                            >
                                <SvgXml xml={homeIcon(focused ? '#FF9950' : '#a3a1a8')} width={26} height={26} />
                                <Text className={`text-[#a3a1a8] font-medium mt-1 text-xs ${focused && 'text-[#FF9950]'}`}>
                                    Home
                                </Text>
                                <View className={`w-2 h-2 rounded-full mt-2 ${focused ? 'bg-[#FF9950]' : 'bg-[#fff]'}`}></View>
                            </View>
                        );
                    },

                }}
            />
            <Tab.Screen
                name="Gym"
                component={
                    <View style={{ alignItems: "center" }}>
                        <Text>GYM</Text>
                    </View>
                }
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    header: ({ focused }) => {
                        return <Header />
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                className={`flex-col items-center justify-center bg-white ${focused && 'border-b-2 border-b-white'}`}
                            >
                                <SvgXml xml={gymIcon(focused ? '#FF9950' : '#a3a1a8')} width={26} height={26} />
                                <Text className={`text-[#a3a1a8] font-medium mt-1 text-xs ${focused && 'text-[#FF9950]'}`}>
                                    Gym
                                </Text>
                                <View className={`w-2 h-2 rounded-full mt-2 ${focused ? 'bg-[#FF9950]' : 'bg-[#fff]'}`}></View>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Eat"
                component={<View style={{ alignItems: "center" }}>
                    <Text>EAT</Text>
                </View>}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    header: ({ focused }) => {
                        return <Header />
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                className={`flex-col items-center justify-center bg-white ${focused && 'border-b-2 border-b-white'}`}
                            >
                                <SvgXml xml={eatIcon(focused ? '#FF9950' : '#a3a1a8')} width={26} height={26} />
                                <Text className={`text-[#a3a1a8] font-medium mt-1 text-xs ${focused && 'text-[#FF9950]'}`}>
                                    Eat
                                </Text>
                                <View className={`w-2 h-2 rounded-full mt-2 ${focused ? 'bg-[#FF9950]' : 'bg-[#fff]'}`}></View>
                            </View>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="Track"
                component={
                    <View style={{ alignItems: "center" }}>
                    <Text>Track</Text>
                </View>
                }
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    header: ({ focused }) => {
                        return <Header />
                    },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View
                                className={`flex-col items-center justify-center bg-white ${focused && 'border-b-2 border-b-white'}`}
                            >
                                <SvgXml xml={trackIcon(focused ? '#FF9950' : '#a3a1a8')} width={26} height={26} />
                                <Text className={`text-[#a3a1a8] font-medium mt-1 text-xs ${focused && 'text-[#FF9950]'}`}>
                                    Track
                                </Text>
                                <View className={`w-2 h-2 rounded-full mt-2 ${focused ? 'bg-[#FF9950]' : 'bg-[#fff]'}`}></View>
                            </View>
                        );
                    },
                }}
            />

        </Tab.Navigator>
    );
};


export default DashboardNavigation;
