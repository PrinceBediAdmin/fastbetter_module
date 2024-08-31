import React, { useRef, useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail } from './utilities';

const EmailInput = ({
  email,
  setEmail,
  style,
  placeholder = 'Email address',
  setContinueBtn
}) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const handleEmailChange = async (enteredEmail) => {
    setErrorMsg(null);
    const isValid = validateEmail(enteredEmail);
    if (isValid) {
      setErrorMsg('');
      setContinueBtn(true);
    } else {
      setContinueBtn(false);
      setErrorMsg('Please enter a valid email address.');
    }
    setEmail(enteredEmail);
    await AsyncStorage.setItem('userEmail', enteredEmail);
  };

  return (
    <TextInput
      value={email || ''}
      onChangeText={handleEmailChange}
      keyboardType="email-address"
      placeholder={placeholder}
      autoCapitalize="none"
      style={[styles.input, style, errorMsg && styles.errorInput]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginHorizontal: 24,
    height: 70,
    borderWidth: 1,
    padding: 20,
    borderColor: '#EDEDED',
    backgroundColor: 'white',
    borderRadius: 16,
    fontSize: 16,
    textTransform: "lowercase",
    fontWeight: '400',
    color: 'black',
  },
  errorInput: {
    borderColor: 'red',
    color: 'red',
  }
});

export default EmailInput;

export const OtpInput = ({ otp, setOtp, setContinueBtn, numberOfDigits = 6, setErrorMsg }) => {
  const otpBoxReference = useRef([]);

  const handleChange = (value, index) => {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);
    setErrorMsg('');

    if (index === numberOfDigits - 1) {
      setContinueBtn(true);
    } else {
      setContinueBtn(false);
    }

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }
    if (e.nativeEvent.key === 'Enter' && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styleForOtpInput.container}>
      {otp?.map((digit, index) => (
        <TextInput
          key={index}
          secureTextEntry={true}
          keyboardType="number-pad"
          placeholder="•"
          placeholderTextColor="#BAB8BD"
          maxLength={1}
          value={digit}
          style={styleForOtpInput.input}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={(e) => handleBackspaceAndEnter(e, index)}
          ref={(ref) => (otpBoxReference.current[index] = ref)}
        />
      ))}
    </View>
  );
};

const styleForOtpInput = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  input: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700',
    height: 69,
    width: 50, // Adjust width based on your design
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
});

export const UserNameInput = ({ value, onChangeText, label = null, placeholder, keyboardType = "default", containerStyle = {} }) => {
  return (
    <View style={[UserNameInputStyles.container, containerStyle]}>
      {label && <Text style={UserNameInputStyles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={UserNameInputStyles.input}
      />
    </View>
  );
};

const UserNameInputStyles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
  },
  label: {
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
  },
  input: {
    height: 70,
    borderWidth: 1,
    padding: 20,
    borderColor: "#EDEDED",
    marginTop: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    fontSize: 16,
    fontWeight: '500',
  },
});

