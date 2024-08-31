import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Keyboard, StyleSheet, Platform } from 'react-native';
import Background from '../components/Background';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { getLoginUserEmail } from "../redux/userSlice";
import EmailInput from '../controllers/TextFields';
import SubmitActionButton from '../controllers/Buttons';
import SocialLogin, { LoginWithLine } from '../components/SocialLogin';
import { ErrorText, OnBoardingBackground } from '../components/OnBoardingComponent';

export default function LoginScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.user); // Adjust the selector as needed

    const [userEmail, setUserEmail] = useState('');
    const [errorMsgs, setErrorMsg] = useState('');
    const [continueBtn, setContinueBtn] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    const handleOtp = async () => {
        setErrorMsg('');
        if (!continueBtn) {
            setErrorMsg('Please enter your valid email address.');
            return false;
        }
        try {
            const loginResponse = await dispatch(getLoginUserEmail({ email: userEmail })).unwrap();
            if (loginResponse && loginResponse.message) {
                navigation.navigate('LoginVerify');
            }
        } catch (error) {
            console.log('loginResponse error :', error);
            setErrorMsg(error?.error?.message || 'An unexpected error occurred. Please try again.');
        }
    };

    useEffect(() => {
        const fetchStoredEmail = async () => {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            if (storedEmail) {
                setUserEmail(storedEmail);
                setContinueBtn(true);
                setErrorMsg('');
            }
        };
        fetchStoredEmail();
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Background>
            <OnBoardingBackground>
                <View style={styles.header}>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.subtitle}>Unlock your</Text>
                    <Text style={styles.boldSubtitle}>Best Self!</Text>
                </View>
                <ErrorText errorMsgs={errorMsgs} />
                <View style={styles.inputContainer}>
                    <EmailInput style={{ width: 342, marginHorizontal: 10, }} email={userEmail} setContinueBtn={setContinueBtn} setEmail={setUserEmail} />
                </View>
                <LoginWithLine style={{ width: 342, alignSelf: "center" }} />
                <SocialLogin setUserEmail={setUserEmail} userEmail={userEmail} isFacebookLogin={true} isGoogleLogin={true} />
                {!isKeyboardVisible && (
                    <View style={styles.footer}>
                        <SubmitActionButton
                            ButtonStyle={{ alignSelf: "center" }}
                            Title="Send OTP"
                            handleAction={handleOtp}
                            isContinueBtn={continueBtn}
                        />
                        <Text style={styles.accountText}>Don’t have an account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('CountryScreen'); }}>
                            <Text style={styles.createAccountText}>Create one</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </OnBoardingBackground>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 100,
    },
    header: {
        marginHorizontal: 10,
        marginTop: Platform.OS === 'android' ? 20 : 70,
    },
    title: {
        fontSize: 40,
        color: '#000',
        fontWeight: Platform.OS === 'android' ? '400' : '400',
        fontFamily: Platform.OS === 'android' ? 'Larken-Medium' : "Larken-Light",
    },
    subtitle: {
        fontSize: 16,
        marginTop: 8,
        color: '#606060',
        fontWeight: 'normal',
    },
    boldSubtitle: {
        fontSize: 16,
        marginTop: -4,
        color: '#606060',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    footer: {
        position: 'absolute',
        bottom: Platform.OS === 'android' ? 10 : 50,
        width: '100%',
        alignSelf: 'center',
    },
    accountText: {
        fontSize: 16,
        color: '#18192B',
        textAlign: 'center',
        fontWeight: '400',
    },
    createAccountText: {
        fontSize: 16,
        color: '#18192B',
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
});
