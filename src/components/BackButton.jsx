import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
    const navigation = useNavigation();
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity onPress={handleBack} className='flex align-middle items-center absolute top-2 left-2 flex-row px-2 py-1 gap-1'>
            <Text className='text-black text-base font-medium'>Back</Text>
        </TouchableOpacity>
    );
};


export function BackButtonWithTitle({ title = "Explore", ViewStyles = {} }) {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={[BackButtonWithTitleStyles.header, ViewStyles]}>
            <TouchableOpacity onPress={handleBack}>
                <Image source={require('../assets/icons/backIcon.png')} style={BackButtonWithTitleStyles.backIcon} />
            </TouchableOpacity>
            <Text style={BackButtonWithTitleStyles.headerTitle}>{title}</Text>
        </View>
    );
}

const BackButtonWithTitleStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },
    backIcon: {
        height: 16,
        width: 17,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        fontFamily: 'Larken-Medium',
        marginLeft: 16,
        color: "#18192B",
        textTransform:"capitalize"
    },
});