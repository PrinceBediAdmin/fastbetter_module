import React from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { ModelBox } from "../../../components/Models/Models";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";

const MenuModel = ({
    isModelOpen,
    hanldeCloseModel,
}) => {
    const { userdetails } = useSelector((state) => state.user);
    const navigation = useNavigation();

    const onClickHandle = (screenID) => {
        hanldeCloseModel();
        navigation.navigate(screenID);
    };

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel} directio={null}>
            <View style={styles.modelContainer}>
                <Pressable onPress={hanldeCloseModel} style={styles.pressable}>
                    <View style={styles.pressableInner} />
                </Pressable>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.profileHeader}>
                        <Image source={require('../../../assets/afterscreen/Profile/demoUser.png')} style={styles.profileImage} resizeMode='contain' />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{userdetails?.name}</Text>
                            <Text style={styles.userSubscription}>
                                {"Basic TRF "}
                                <Text style={styles.boldText}>{"(16:8)"}</Text>
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => onClickHandle('ProfileScreen')} style={styles.forwardButton}>
                            <Image source={require('../../../assets/afterscreen/Profile/BackArrow_orange.png')} style={styles.forwardIcon} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator2} />

                </ScrollView>
                <View style={{
                    position: "relative",
                    bottom: 0,
                    marginBottom: 14,
                    alignItems: "center"
                }}>
                    <Text>
                        © 2024. FastBetter. All rights reserved
                    </Text>
                    <Text>
                        V 1.0.0
                    </Text>
                </View>
            </View>
        </ModelBox>
    );
}

const styles = StyleSheet.create({
    modelContainer: {
        flex: 1,
        backgroundColor: '#FFFCFB',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignSelf: 'center'
    },
    pressable: {
        width: 100,
        height: 12,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    pressableInner: {
        width: 52,
        height: 4,
        backgroundColor: "#000",
        alignSelf: 'center'
    },
    scrollView: {
        flex: 1,
        marginTop: 46,
        paddingHorizontal: 30
    },
    profileHeader: {
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 24
    },
    profileImage: {
        height: 40,
        width: 40,
        justifyContent: 'center'
    },
    userInfo: {
        flex: 1,
        marginLeft: 16
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: "#18192B",
        lineHeight: 24
    },
    userSubscription: {
        fontSize: 12,
        fontWeight: '400',
        color: '#18192B',
        lineHeight: 14.4
    },
    boldText: {
        fontWeight: '700'
    },
    forwardButton: {
        backgroundColor: '#FFEDE0',
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderRadius: 8,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forwardButton2: {
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderRadius: 8,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#EDEDED"
    },
    forwardIcon: {
        height: 17.5,
        width: 9.5,
        justifyContent: 'center'
    },
    separator2: {
        width: "80%",
        height: 2,
        backgroundColor: '#F4F4F4',
        alignSelf: 'center',
        marginTop: 17
    },
    separator: {
        width: "100%",
        height: 2,
        backgroundColor: '#F4F4F4',
        alignSelf: 'center',
        marginVertical: 16
    },
    weightInfo: {
        marginTop: 24,
        flexDirection: 'row',
        marginHorizontal: 24,
        justifyContent: "space-between"
    },
    infoText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#18192B',
    },
    verticalSeparator: {
        width: 1,
        height: 20,
        backgroundColor: "#000",
        alignSelf: 'center',
        marginHorizontal: 8
    },
    goalText: {
        textAlign: "right",
        alignSelf: "flex-end"
    },
    chartImage: {
        justifyContent: 'center',
        width: "100%",
        height: 58,
        alignSelf: 'center',
        marginTop: 8
    },
    currentWeight: {
        fontSize: 12,
        fontWeight: '400',
        color: '#18192B',
        textAlign: 'right',
        marginHorizontal: 24,
        marginTop: -10,
    },
    card: {
        shadowColor: '#000000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 30,
        paddingHorizontal: 24,
        paddingVertical: 24,
        marginHorizontal: 2,
        backgroundColor: '#fff',
        marginTop: 24,
    },
    cardRow: {
        // borderWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 2,
        alignItems: 'center'
    },
    cardIcon: {
        height: 19.6,
        width: 19.6,
        justifyContent: 'center'
    },
    cardText: {
        flex: 1,
        marginLeft: 14,
        fontSize: 18,
        color: "#18192B",
        fontWeight: "600",
        lineHeight: 18,
    },
    cardSubtitle: {
        fontWeight: '400',
        fontSize: 12,
        color: '#18192B',
        lineHeight: 16,
        marginTop: 6
    },
    largerCard: {
        // paddingHorizontal: 8,
        // paddingVertical: 4,
        // marginTop: 20,
        marginBottom: 1
    }
});

export default MenuModel;
