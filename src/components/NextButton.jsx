import LottieView from 'lottie-react-native';
import React from 'react';
import { TouchableOpacity, Text, View, Platform, StyleSheet } from 'react-native';

export default function NextButton({
    onPress,
    title = "Next",
    btnStyle = {},
    mainStyle = {},
    errorMsg = null,
    isContinueBtn = false,
    textColor = '#FFFCFB',
    isLoading = false
}) {
    return (
        <View style={[styles.container, mainStyle]}>
            {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
            <TouchableOpacity
                onPress={onPress}
                style={[
                    styles.button,
                    isContinueBtn && styles.continueBtn,
                    btnStyle,
                ]}
                disabled={isLoading} // Disable button when loading
            >
                {isLoading ? (
                    <LottieView
                        source={require("../assets/lottiefiles/loading.json")}
                        autoPlay
                        loop
                        colorFilters={[
                            {
                                keypath: "Spoon 2",
                                color: "#fff",
                            },
                            {
                                keypath: "Spoon",
                                color: "#fff",
                            },
                            {
                                keypath: "Group 9",
                                color: "#fff",
                            },
                            {
                                keypath: "Group 6",
                                color: "#fff",
                            },
                            {
                                keypath: "Group 8",
                                color: "#fff",
                            },
                            {
                                keypath: "Group 7",
                                color: "#fff",
                            },
                        ]}
                        style={styles.animation}
                    />
                ) : (
                    <Text style={[styles.buttonText, { color: textColor }]}>
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 20,
        bottom: 30,
    },
    animation: {
        width: 190,
        height: 190,
    },
    errorText: {
        marginBottom: 5,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'red',
        fontSize: 12,
    },
    button: {
        width: 278,
        height: 70,
        marginHorizontal: 'auto',
        paddingVertical: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: '#DADADA',
        alignSelf: 'center',
    },
    continueBtn: {
        backgroundColor: '#FF9950', // Theme color for the continue button
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Larken-Medium',
        fontWeight: Platform.OS === 'ios' ? '700' : 'normal',
    },
});
