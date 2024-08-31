import React from 'react';
import { View, StatusBar } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';

export default function Background({ barMode = 'dark', children, className = null, statusBarTranslucent = false, statusBarBgColor = '#FFFCFB' }) {
    const changeBottomBarColor = async () => {
        await SystemNavigationBar.setNavigationColor('#FFFCFB');
        await SystemNavigationBar.setBarMode(`${barMode}`);
    }
    changeBottomBarColor();
    return (
        <View className={`bg-[#FFFCFB] dark:bg-black h-full ${className && className}`}>
            <StatusBar backgroundColor={statusBarBgColor} translucent={statusBarTranslucent} barStyle={'dark-content'} />
            {children}
        </View>
    );
};
