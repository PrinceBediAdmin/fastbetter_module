import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { themeColors } from '../utilities/theme';
const { btnDisableBgColor, btnBgColor, btnDisableTextColor, primaryColor, white } = themeColors

const SubmitActionButton = ({
  Title = 'Send OTP',
  TitleStyle,
  ButtonStyle,
  handleAction,
  isContinueBtn
}) => {
  return (
    <TouchableOpacity
      onPress={handleAction}
      style={[
        styles.button,
        ButtonStyle,
        isContinueBtn ? styles.continueBtn : styles.disabledBtn
      ]}
    >
      <Text style={[styles.title, TitleStyle]}>
        {Title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderRadius: 20,
    width: 278,
    marginHorizontal: 'auto',
    marginBottom: 24,
  },
  continueBtn: {
    backgroundColor: btnBgColor, // Assuming this is the orange theme color
  },
  disabledBtn: {
    backgroundColor: btnDisableBgColor, // Assuming this is the gray color
  },
  title: {
    color: '#FFFCFB',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Larken', // Make sure this font is correctly linked in your project
  }
});

export default SubmitActionButton;
