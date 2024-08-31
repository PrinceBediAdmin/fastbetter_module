import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import MenuModel from "../screens/after/Models/MenuModel";

const Header = ({ viewClassName }) => {
    const { userdetails } = useSelector((state) => state.user);

    const navigation = useNavigation();
    const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);

    return (
        <View>
            <View style={[styles.headerContainer, viewClassName]}>
                <View style={styles.userInfoContainer}>
                    <TouchableOpacity onPress={() => setIsProfileModelOpen(true)}>
                        <Image source={require('../assets/icons/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={styles.greetingText}>
                        Hi, <Text style={styles.userName}>{userdetails?.name}</Text>
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notificationContainer}>
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationBadgeText}>3</Text>
                    </View>
                    <Image source={require('../assets/icons/bell.png')} style={styles.bellIcon} />
                </TouchableOpacity>
            </View>

            <MenuModel
                isModelOpen={isProfileModelOpen}
                hanldeCloseModel={() => setIsProfileModelOpen(false)}
                onSubscriptionOpen={() => handleSubscription()} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        marginTop: 80,
        marginBottom: 3,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 12,
    },
    menuIcon: {
        height: 17,
        width: 17,
    },
    greetingText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    userName: {
        fontWeight: '700',
    },
    notificationContainer: {
        position: 'relative',
    },
    notificationBadge: {
        backgroundColor: "#FF5050",
        borderRadius: 25,
        width: 14,
        height: 14,
        position: "absolute",
        right: -3,
        top: -5,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    notificationBadgeText: {
        color: "white",
        fontSize: 10,
    },
    bellIcon: {
        height: 19.38,
        width: 18.81,
    },
});

export default Header;
