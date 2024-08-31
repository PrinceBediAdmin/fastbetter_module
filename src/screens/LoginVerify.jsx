import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import Background from "../components/Background";
import { useNavigation } from "@react-navigation/native";
import { maskEmail } from "../function/function";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from "../components/ProgressBar";
import { OtpInput } from "../controllers/TextFields";
import { getLoginUserEmailWithOtp } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { ErrorText } from "../components/OnBoardingComponent";

export default function LoginVerify() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [errorMsgs, setErrorMsg] = useState("");
  const [continueBtn, setContinueBtn] = useState(false);
  const numberOfDigits = 6;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleOtp = async () => {
    if (!continueBtn) {
      setErrorMsg("Please enter your valid OTP.");
      return;
    }
    try {
      const loginOtpResponse = await dispatch(
        getLoginUserEmailWithOtp({ email: userEmail, otp: otp.join("") })
      ).unwrap();
      if (loginOtpResponse) {
        navigation.navigate("DashboardNavigation");
      }
    } catch (error) {
      console.log("loginResponse error :", error);
      setErrorMsg(
        error?.error?.message ||
        "An unexpected error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    const fetchStoredEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    };

    fetchStoredEmail();
  }, []);

  return (
    <Background>
      <Pressable
        style={styles.container}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={styles.progressContainer}>
          <ProgressBar progressNumber={83} type={2} />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Verify</Text>
          <Text style={styles.subtitle}>
            A 6 digit code has been sent
          </Text>
          <Text style={styles.emailText}>
            to {maskEmail(userEmail)}
          </Text>
        </View>
        <ErrorText errorMsgs={errorMsgs} />
        <OtpInput
          otp={otp}
          setOtp={setOtp}
          setContinueBtn={setContinueBtn}
          numberOfDigits={numberOfDigits}
          setErrorMsg={setErrorMsg}
        />
        {!isKeyboardVisible && (
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleOtp}
              style={[
                styles.submitButton,
                continueBtn
                  ? styles.submitButtonActive
                  : styles.submitButtonInactive,
              ]}
              disabled={!continueBtn}
            >
              <Text style={styles.submitButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.accountText}>
              Don’t have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CountryScreen");
              }}
            >
              <Text style={styles.createAccountText}>Create one</Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  progressContainer: {
    marginHorizontal: 24,
  },
  headerContainer: {
    marginHorizontal: 24,
    marginTop: 32,
  },
  title: {
    fontSize: 40,
    color: "#000",
    fontWeight: Platform.OS === 'android' ? '400' : '400',
    fontFamily: Platform.OS === 'android' ? 'Larken-Medium' : "Larken-Light",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: "#606060",
    fontWeight: "normal",
  },
  emailText: {
    fontSize: 16,
    marginTop: -4,
    color: "#606060",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    position: "absolute",
    bottom: Platform.OS === 'android' ? 10 : 50,
    width: "100%",
  },
  errorMsg: {
    marginBottom: 16,
    textDecorationLine: "underline",
    color: "#FF0000",
    fontSize: 12,
  },
  submitButton: {
    height: 70,
    borderRadius: 16,
    width: 278,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  submitButtonActive: {
    backgroundColor: "#FF9950",
  },
  submitButtonInactive: {
    backgroundColor: "#D3D3D3",
  },
  submitButtonText: {
    color: "#FFFCFB",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Larken", // Update font family as needed
  },
  accountText: {
    fontSize: 16,
    lineHeight: 19.2,
    color: "#18192B",
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 8,
  },
  createAccountText: {
    fontSize: 16,
    color: "#18192B",
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
