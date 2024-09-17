/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';

const getWeeksInMonth = (year, month) => {
  const weeks = [];
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let start = 1;
  let end = 7 - firstDayOfMonth;

  while (start <= daysInMonth) {
    weeks.push(`Week ${weeks.length + 1}`);
    start = end + 1;
    end = end + 7;
    if (end > daysInMonth) end = daysInMonth;
  }

  return weeks;
};

const getCurrentWeekOfMonth = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const dayOfMonth = now.getDate();
  const weekNumber = Math.ceil((dayOfMonth + startOfMonth.getDay()) / 7);
  return weekNumber - 1;
};

export const WeeklyReportView = ({isType, onSelectData}) => {
  const flatListRef = useRef(null);
  const currentDate = new Date();
  const currentMonthWeeks = getWeeksInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );
  const currentWeekIndex = getCurrentWeekOfMonth();
  const [selectedWeek, setSelectedWeek] = useState(currentWeekIndex);

  const data = [
    {value: 60, label: 'Mon'},
    {value: 80, label: 'Tue'},
    {value: 50, label: 'Wed'},
    {value: 60, label: 'Thu'},
    {value: 70, label: 'Fri'},
    {value: 60, label: 'Sat'},
    {value: 80, label: 'Sun'},
  ];

  const customLineConfig = {
    fillColor: 'rgba(0, 200, 255, 0.1)',
    strokeColor: 'green',
    thickness: 2,
    isCurved: true,
  };

  useEffect(() => {
    onSelectData(currentWeekIndex);
    // Scroll to the current week
    if (flatListRef.current) {
      // flatListRef.current.scrollToIndex({
      //   index: currentWeekIndex + 1,
      //   animated: true,
      //   viewPosition: 0.5,
      // });

      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index:
            currentWeekIndex === 0 ? currentWeekIndex : currentWeekIndex - 1,
          animated: true,
          viewPosition: 0.5,
        });
      }, 500);
    }
  }, [currentWeekIndex, isType]);

  const renderDateItem = ({item, index}) => {
    // eslint-disable-next-line no-unused-vars
    const isCurrentWeek = index === currentWeekIndex;
    const isSelectedWeek = index === selectedWeek;

    const itemHandle = indexValue => {
      if (index <= currentWeekIndex) {
        setSelectedWeek(index);
        onSelectData(index);
      }
    };

    return (
      <Pressable
        style={{
          height: 33,
          width: 109,
          marginHorizontal: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelectedWeek ? '#FC9B5E' : 'transparent',
          borderRadius: 12,
          borderWidth: index > currentWeekIndex ? 0 : 0.2,
          opacity: index > currentWeekIndex ? 0.3 : 1,
          borderColor: isSelectedWeek ? 'transparent' : '#CFC5C5',
          ...(isSelectedWeek && styles.itemSelectShadow),
        }}
        onPress={() => itemHandle(index)}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: isSelectedWeek ? '700' : '400',
            lineHeight: 16.8,
            color: isSelectedWeek ? '#fff' : '#000',
          }}>
          {item}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={{width: '100%', marginBottom: 30}}>
      <FlatList
        ref={flatListRef}
        data={currentMonthWeeks}
        renderItem={renderDateItem}
        keyExtractor={item => item.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginVertical: 20, height: 50}}
        contentContainerStyle={styles.flatListContent}
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  weekItem: {
    width: 80,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F9F9',
    borderRadius: 10,
    // padding: 20,
  },
  weekText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19.5,
    textAlign: 'center',
    color: '#1F3132',
  },
  flatListContent: {
    alignItems: 'center', // Center items verticallyz
    paddingHorizontal: 10,
  },
  itemSelectShadow: {
    elevation: 3, // Android box shadow
    shadowColor: 'gray', // iOS box shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});
