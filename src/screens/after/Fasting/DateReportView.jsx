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
import {Dropdown} from 'react-native-element-dropdown';

import down_arrow_Icon from '../../../assets/common/down_arrow_Icon.png';

const Monthdata = [
  {key: '1', value: 'January'},
  {key: '2', value: 'February'},
  {key: '3', value: 'March'},
  {key: '4', value: 'April'},
  {key: '5', value: 'May'},
  {key: '6', value: 'June'},
  {key: '7', value: 'July'},
  {key: '8', value: 'August'},
  {key: '9', value: 'September'},
  {key: '10', value: 'October'},
  {key: '11', value: 'November'},
  {key: '12', value: 'December'},
];

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

const getCurrentMonthKey = () => {
  const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
  const currentMonth = Monthdata[currentMonthIndex];
  return currentMonth ? currentMonth.key : null;
};

const getCurrentYearKey = () => {
  const currentYear = new Date().getFullYear(); // Get the current year (e.g., 2024)
  const yearObject = YearData.find(
    year => year.value === currentYear.toString(),
  );
  return yearObject ? yearObject.key : null;
};

export const DateReportView = ({onSelectMonth, onSelectYear}) => {
  const currentMonthKey = getCurrentMonthKey();
  const currentYearKey = getCurrentYearKey();
  const [Monthvalue, setMonthValue] = useState(currentMonthKey.toString());
  const [isMonthFocus, setIsMonthFocus] = useState(false);

  const [YearValue, setYearValue] = useState(currentYearKey.toString());
  const [isYearFocus, setIsYearFocus] = useState(false);

  const handleDropDown = item => {
    setYearValue(item?.key);
    onSelectYear(item?.key);
    setIsYearFocus(false);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginTop: 25,
      }}>
      <Dropdown
        style={[styles.dropdown, isMonthFocus && {borderColor: 'gray'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={Monthdata}
        maxHeight={300}
        labelField="value"
        valueField="key"
        placeholder={!isMonthFocus ? 'Select item' : '...'}
        value={Monthvalue}
        onFocus={() => setIsMonthFocus(true)}
        onBlur={() => setIsMonthFocus(false)}
        onChange={item => {
          setMonthValue(item?.key);
          onSelectMonth(item?.key);
          setIsMonthFocus(false);
        }}
        renderRightIcon={() => (
          <Image
            source={down_arrow_Icon}
            style={{width: 11, height: 6, marginRight: 10}}
          />
        )}
        renderItem={item => {
          return item ? (
            <View style={styles.itemContainer}>
              <Text
                style={{
                  ...styles.itemText,
                  color:
                    Monthdata[Monthvalue - 1]?.value === item?.value
                      ? 'Green'
                      : 'black',
                }}>
                {item?.value}
              </Text>
            </View>
          ) : null;
        }}
      />
      <Dropdown
        style={[
          styles.dropdown,
          {width: 92},
          isYearFocus && {borderColor: 'gray'},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={YearData}
        maxHeight={300}
        labelField="value"
        valueField="key"
        placeholder={!isYearFocus ? '---' : '...'}
        value={YearValue}
        onFocus={() => setIsYearFocus(true)}
        onBlur={() => setIsYearFocus(false)}
        onChange={item => handleDropDown(item)}
        renderRightIcon={() => (
          <Image
            source={down_arrow_Icon}
            style={{width: 11, height: 6, marginRight: 10}}
          />
        )}
        renderItem={item => {
          return item ? (
            <View style={styles.itemContainer}>
              <Text
                style={{
                  ...styles.itemText,
                  color:
                    YearData[YearValue - 1]?.value === item?.value
                      ? 'Green'
                      : 'black',
                }}>
                {item?.value}
              </Text>
            </View>
          ) : null;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    width: 120,
    height: 41,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EDEDED',
    alignItems: 'center',
    marginTop: 12,
    elevation: 3, // Android box shadow
    shadowColor: 'gray', // iOS box shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
    lineHeight: 14.4,
    fontWeight: '600',
    fontStyle: 'italic',
    marginLeft: 10,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 12,
    lineHeight: 14.4,
    fontWeight: '600',
    fontStyle: 'italic',
    marginLeft: 15,
    color: '#000',
  },
  iconStyle: {
    width: 12,
    height: 16,
    marginRight: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  itemText: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
    fontStyle: 'italic',
    lineHeight: 14.4,
  },
  itemContainer: {
    padding: 10,
    // alignItems: 'center',
  },
});
