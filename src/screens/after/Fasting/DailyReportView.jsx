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

export const DailyReportView = ({isType, onSelectData}) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    generateDateArray();
  }, []);

  useEffect(() => {
    if (dates?.length > 0 && flatListRef?.current) {
      scrollToCurrentDate();
    }
  }, [dates, isType]);

  const generateDateArray = () => {
    const dateArray = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    let date = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0);

    while (date <= endDate) {
      dateArray.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDates(dateArray);
    //onSelectData(currentDate);
    setSelectedDate(currentDate); // Initialize selected date to current date
  };

  const scrollToCurrentDate = () => {
    const today = new Date();
    const index = dates.findIndex(
      date =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    );

    if (index !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }, 100); // Add a slight delay to ensure the list has been rendered
    }
  };

  const getItemLayout = (data, index) => ({
    length: 70, // Estimated item width
    offset: 70 * index,
    index,
  });

  const handleScrollToIndexFailed = info => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
        viewPosition: 0.5,
      });
    });
  };

  const isSelected = date => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const renderDateItem = ({item}) => {
    const dayName = item.toLocaleDateString('en-US', {weekday: 'short'});
    const dateText = item.getDate();

    const CurrentDate = new Date();

    const Itemhandle = itemValue => {
      if (item <= CurrentDate) {
        setSelectedDate(itemValue);
        onSelectData(itemValue);
      }
    };

    return (
      <Pressable
        onPress={() => Itemhandle(item)}
        style={{
          height: 60,
          width: 44,
          marginHorizontal: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected(item) ? '#FC9B5E' : 'transparent',
          borderRadius: 12,
          borderWidth: item <= CurrentDate ? 0.2 : 0,
          opacity: item <= CurrentDate ? 1 : 0.3,
          borderColor: isSelected(item) ? 'transparent' : '#CFC5C5',
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: isSelected(item) ? '700' : '400',
            lineHeight: 14.4,
            color: isSelected(item) ? '#fff' : '#555555',
          }}>
          {dayName}
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: isSelected(item) ? '700' : '400',
            lineHeight: 24,
            color: isSelected(item) ? '#fff' : '#555555',
          }}>
          {dateText}
        </Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={dates}
      renderItem={renderDateItem}
      keyExtractor={item => item.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{marginVertical: 20}}
      contentContainerStyle={{alignItems: 'center'}}
      getItemLayout={getItemLayout}
      onScrollToIndexFailed={handleScrollToIndexFailed}
    />
  );
};

const styles = StyleSheet.create({});
