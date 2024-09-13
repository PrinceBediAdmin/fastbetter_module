/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState, useRef, forwardRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import {ModelBox} from '../../components/Models/Models';
import bottom_bg from '../../assets/diagnosed/bottom_bg.png';
import NextButton from '../../components/NextButton';

import connection from '../../assets/afterscreen/Profile/connection.png';
import connection_error from '../../assets/afterscreen/Profile/connection_error.png';

const HealthLinkedModel = ({isModelOpen, hanldeCloseModel, headerText}) => {
  const [ScreenType, setScreenType] = useState(0);

  const DeviceConn = () => {
    return (
      <View style={{marginTop: 37}}>
        <Image
          source={connection}
          style={{alignSelf: 'center', width: 80, height: 80}}
          resizeMode="contain"
        />

        <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-[10px] mt-[24px]">
          {headerText}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: 16,
            marginHorizontal: 40,
            marginTop: 16,
            marginBottom: 80,
          }}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        </Text>
      </View>
    );
  };

  const DeviceConnError = () => {
    return (
      <View style={{marginTop: 37}}>
        <Image
          source={connection_error}
          style={{alignSelf: 'center', width: 80, height: 80}}
          resizeMode="contain"
        />

        <Text className="text-[24px] leading-[25px] text-center font-normal text-black px-1 font-Larken font-[400] mb-[10px] mt-[24px]">
          {'Oops.. there is some issue'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            lineHeight: 16,
            marginHorizontal: 40,
            marginTop: 16,
            marginBottom: 80,
          }}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        </Text>
      </View>
    );
  };

  const onButtonHandle = () => {
    if (ScreenType === 0) {
      setScreenType(1);
    } else {
      setScreenType(0);
    }
  };

  return (
    <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
      <View
        className="bg-[#FFFCFB] bottom-0 w-full rounded-t-[40px]"
        style={{paddingBottom: 70, alignSelf: 'center'}}>
        <Pressable onPress={hanldeCloseModel}>
          <Image
            source={bottom_bg}
            style={{
              width: '100%',
              height: 55,
              position: 'absolute',
              marginTop: -15,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </Pressable>

        {ScreenType === 0 ? DeviceConn() : DeviceConnError()}
        <NextButton
          onPress={() => onButtonHandle()}
          title={ScreenType === 0 ? 'Start syncing' : 'Try linking again'}
          isContinueBtn={true}
        />
      </View>
    </ModelBox>
  );
};

export default HealthLinkedModel;
