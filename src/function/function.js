import Toast from 'react-native-toast-message';
import { Text } from 'react-native';

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

export const FormError = ({ touched, error }) => {
    return touched && error ? <Text style={{ color: 'red' }}>{error}</Text> : null;
};

export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const formatDate = (dateString) => {
    // Parse the input date string using moment
    const parsedDate = moment(dateString);

    // Format the date according to the desired format
    const formattedDate = parsedDate.format('HH:mm DD, MMM YYYY');

    return formattedDate;
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

// Function to color a specific keyword within a string
export const colorizeKeyword = (text, keyword, style, className) => {
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
    const coloredText = parts.map((part, index) => (
        <Text key={index} className={`${className} ${index === 1 && style}`}>
            {part}
        </Text>
    ));
    return coloredText;
};

export const validateNameText = (text) => {
    const lettersOnlyRegex = /^[a-zA-Z\s]*$/;
    return lettersOnlyRegex.test(text) && text.length >= 2;
};

export const getTimeFromDate = (date) => {
    return date.getHours() * 60 + date.getMinutes();
}
export function filterSurveyItemsByCategory(surveyItems, categoryType) {
    return surveyItems.filter((item) => item.category === categoryType);
}