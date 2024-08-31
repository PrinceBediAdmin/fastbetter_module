import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';

// Hook to filter survey items by category type
export function useFilteredSurveyItems(categoryType) {
  const surveyItems = useSelector((state) => state.user.surveyItems);
  const filteredItems = surveyItems.filter((item) => item.category === categoryType);
  return filteredItems[0];  // Return the first matching item
}

// Function to validate email addresses
export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

// Function to validate phone numbers (10 to 15 digits)
export const validatePhoneNumber = (text) => {
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(text);
};

// Function to validate names (only letters and spaces, at least 2 characters long)
export const validateNameText = (text) => {
  const lettersOnlyRegex = /^[a-zA-Z\s]+$/;
  return lettersOnlyRegex.test(text.trim()) && text.trim().length >= 2;
};

export const maskEmail = (email) => {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
    const maskedPart = email.substring(0, 2) + '*'.repeat(atIndex - 2);
    const maskedEmail = maskedPart + email.substring(atIndex);
    return maskedEmail;
  } else {
    return email; // If there's no "@" symbol, return the original email
  }
};

export const showAlertSuccess = (text2) => {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: text2,
  });
};
export const showAlertError = (text2) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: text2,
  });
};
export const showAlertInfo = (text2) => {
  Toast.show({
    position: 'bottom',
    type: "info",
    text1: "Info",
    text2: text2,
  });
};

export const getNumbersList = (min, max) => {
  const array = [];
  for (let number = min; number <= max; number++) {
    array.push({ id: `${number}`, label: `${number}` });
  }
  return array;
};