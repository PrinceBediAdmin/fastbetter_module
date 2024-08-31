import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image, Pressable, StyleSheet } from "react-native";
import { ModelBox } from "../../../components/Models/Models";
import NextButton from "../../../components/NextButton";
import { getAxiosWithToken } from "../../../axios/AxiosObj";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PersonalisedWorkoutsModel = ({ isModelOpen, hanldeCloseModel }) => {
    const [TargetWorkoutItems, setTargetWorkoutItems] = useState([]);
    const [WorkoutData, setWorkoutData] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        getScreenData();
        loadSavedSelection();
    }, []);

    const loadSavedSelection = async () => {
        try {
            const savedSelection = await AsyncStorage.getItem('updatedSelection');
            if (savedSelection !== null) {
                setTargetWorkoutItems(JSON.parse(savedSelection));
            }
        } catch (error) {
            console.log('Error loading saved selections:', error);
        }
    };

    const handleSelectItem = (itemId) => {
        let updatedSelection = [...TargetWorkoutItems];
        if (TargetWorkoutItems.includes(itemId)) {
            updatedSelection = updatedSelection.filter((item) => item !== itemId);
        } else {
            updatedSelection.push(itemId);
        }
        AsyncStorage.setItem('updatedSelection', JSON.stringify(updatedSelection))
        setTargetWorkoutItems(updatedSelection);
    };

    const getScreenData = async () => {
        try {
            const response = await getAxiosWithToken({
                method: 'GET',
                url: 'pro/workouttargetzone',
            });

            if (response && response.data) {
                setWorkoutData(response.data);
            }
        } catch (error) {
            console.log('Error in dashboard:', error);
        }
    };

    const handleGoForward = async () => {
        navigation.navigate("TargetWorkout", { targetzone: TargetWorkoutItems });
        hanldeCloseModel();
    };

    return (
        <ModelBox isVisible={isModelOpen} onClose={hanldeCloseModel}>
            <View style={styles.container}>
                <Pressable onPress={hanldeCloseModel} style={styles.closeButton}>
                    <View style={styles.closeIndicator} />
                </Pressable>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {WorkoutData?.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {WorkoutData?.subtitle}
                    </Text>
                </View>
                <View style={styles.content}>
                    <Image source={{ uri: WorkoutData?.backgroundimg }} style={styles.menImage} resizeMode='contain' />
                    <View style={styles.optionsContainer}>
                        {WorkoutData?.targetedbodytype?.map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handleSelectItem(item)}
                                style={[
                                    styles.optionButton,
                                    TargetWorkoutItems.includes(item) && styles.selectedOption
                                ]}
                            >
                                <View style={[
                                    styles.optionIcon,
                                    TargetWorkoutItems.includes(item) && styles.selectedIcon
                                ]}>
                                    {TargetWorkoutItems.includes(item) && (
                                        <Image source={require('../../../assets/uniqueneeds/check.png')} resizeMode="contain" style={styles.checkIcon} />
                                    )}
                                </View>
                                <Text style={[
                                    styles.optionText,
                                    TargetWorkoutItems.includes(item) && styles.selectedText
                                ]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <NextButton onPress={handleGoForward} title="Continue" isContinueBtn={TargetWorkoutItems.length > 0} />
            </View>
        </ModelBox>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: '#FFFCFB',
        width: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    closeButton: {
        width: 100,
        height: 12,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    closeIndicator: {
        width: 52,
        height: 4,
        backgroundColor: "#000",
        alignSelf: 'center',
    },
    header: {
        marginTop: 26,
        width: 342,
        alignSelf: "center"
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 25,
        color: '#000',
        fontFamily: 'Larken',
        fontWeight: '400',
        marginBottom: 2,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 14,
        color: '#000',
        fontWeight: '400',
        marginBottom: 10,
    },
    content: {
        flexDirection: 'row',
        marginTop: 29,
    },
    menImage: {
        width: 193,
        height: 462,
        marginLeft: -50,
    },
    optionsContainer: {
        marginTop: 60,
        marginLeft: 25,
    },
    optionButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 18,
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 16,
        borderRadius: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#fff',
        width: 186,
        height: 69,
    },
    selectedOption: {
        borderColor: '#FF9950',
    },
    optionIcon: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2E2E2',
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: 8,
    },
    selectedIcon: {
        backgroundColor: '#FEF8F4',
        borderColor: '#FF9950',
    },
    checkIcon: {
        width: 16,
        height: 16,
        alignSelf: 'center',
    },
    optionText: {
        textAlign: 'left',
        lineHeight: 19.2,
        fontSize: 16,
        color: '#000',
        fontWeight: '400',
        left: 2,
        width: '80%',
        textTransform: "capitalize"
    },
});

export default PersonalisedWorkoutsModel;
