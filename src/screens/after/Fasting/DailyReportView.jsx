/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';

const YearData = [
  {key: '1', value: '2024'},
  {key: '2', value: '2025'},
  {key: '3', value: '2026'},
  {key: '4', value: '2027'},
  {key: '5', value: '2028'},
  {key: '6', value: '2029'},
  {key: '7', value: '2030'},
  {key: '8', value: '2031'},
];

export const DailyReportView = ({
  isType,
  onSelectData,
  YearValue = null,
  Monthvalue = null,
}) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    generateDateArray();
  }, [Monthvalue, YearValue]);

  useEffect(() => {
    if (dates?.length > 0 && flatListRef?.current) {
      scrollToCurrentDate();
    }
  }, [dates]);

  const generateDateArray = () => {
    let yearData = null;
    const yearIndex = YearData.findIndex(
      res => parseInt(res.key) === parseInt(YearValue),
    );
    if (yearIndex !== -1) {
      yearData = YearData[yearIndex]?.value;
    }

    const dateArray = [];
    const currentDate = new Date();
    const monthIndex = Monthvalue
      ? parseInt(Monthvalue) - 1
      : currentDate.getMonth(); // Months are 0-indexed
    const year = yearData ? parseInt(yearData) : currentDate.getFullYear();
    const startDate = new Date(year, monthIndex, 1);
    const endDate = new Date(year, monthIndex + 1, 0);
    let date = new Date(startDate);
    while (date <= endDate) {
      dateArray.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDates(dateArray);

    setSelectedDate(new Date()); // Initialize selected date to current date
  };

  const scrollToCurrentDate = () => {
    const today = new Date();
    const currentIndex = dates.findIndex(
      date =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    );

    if (currentIndex !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: currentIndex >= 5 ? currentIndex - 2 : currentIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }, 500); // Add a slight delay to ensure the list has been rendered
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

    const currentDate = new Date();

    const itemHandle = itemValue => {
      if (item <= currentDate) {
        setSelectedDate(itemValue);
        onSelectData(itemValue);
      }
    };

    return (
      <Pressable
        onPress={() => itemHandle(item)}
        style={{
          height: 60,
          width: 44,
          marginHorizontal: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected(item) ? '#FC9B5E' : 'transparent',
          borderRadius: 12,
          borderWidth: item <= currentDate ? 0.2 : 0,
          opacity: item <= currentDate ? 1 : 0.3,
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
