import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Progress from 'react-native-progress';
import fire from '../assets/common/fire.png';

export const WorkoutsItemCard = ({ itemData }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('WorkoutsCatergoryDetails')}
            style={{ borderWidth: 0.2, borderColor: '#CFCFCF' }}
            className={`flex bg-white w-[160px] h-[190px] mr-3 mt-4 rounded-[30px] mb-2 shadow-sm shadow-gray-50 `}
        >
            <Image source={itemData.img} className="h-[108px] w-[160px] rounded-t-[30px]" resizeMode='contain' />
            <View className='px-4 py-2 pb-4'>
                <Text className='text-[10px]'>{itemData.type}</Text>
                <Text className='text-[12px] text-black font-[700]'>{itemData.name}</Text>
                <Text className='text-[12px] text-orange-theme font-[600]'>{itemData.routines}</Text>
            </View>
        </TouchableOpacity>
    );
};
export const WorkoutsItemCardExplore = ({ itemData, style = {} }) => {
    const navigation = useNavigation();
    return (
        <View style={style}>
            <TouchableOpacity
                onPress={() => navigation.navigate('CatergoryDetails', { targetBody: itemData?.targetedBodyType })}
                style={WorkoutsItemCardExploreStyles.card}
            >
                <Image
                    source={{ uri: itemData?.imageUrl }}
                    style={WorkoutsItemCardExploreStyles.image}
                    resizeMode="stretch"
                />
                <View style={WorkoutsItemCardExploreStyles.textContainer}>
                    <Text style={WorkoutsItemCardExploreStyles.contentType}>{itemData?.category}</Text>
                    <Text style={WorkoutsItemCardExploreStyles.name}>{itemData?.name}</Text>
                    <Image
                        source={require('../assets/loginscreen/line-icon.png')}
                        style={WorkoutsItemCardExploreStyles.separator}
                        tintColor="#DADADA"
                        resizeMode="contain"
                    />
                    <Text style={WorkoutsItemCardExploreStyles.articles}>{itemData?.repetition} routines</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export const EatsItemCard = ({ itemData }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('WorkoutsCatergoryDetails')}
            className={`flex bg-white w-[250px] mr-3 mt-1 rounded-[30px] mb-2 shadow-sm shadow-slate-300 overflow-hidden`}
        >
            <Image source={itemData.img} className="h-[180px] w-[250px] rounded-t-[30px]" resizeMode='contain' />
            <View className='px-4 py-2 pb-4'>
                <Text className='text-[12px] text-black leading-[16.8px] font-[600]'>{itemData.name}</Text>
                <View className='flex flex-row items-center mt-[8px]'>
                    <Text className='text-[10px] text-[#FE7701] leading-[16.8px] font-[600]'>{itemData.kcal}</Text>
                    <View className='mx-2 h-[4px] w-[4px] rounded-full bg-[#18192B]/50'></View>
                    <Text className='text-[10px] text-[#18192B]/50 leading-[16.8px] font-[400]'>{itemData.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export const ExploreEatsItemCard = ({ itemData }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ExploreSubEats')}
            style={{ borderWidth: 0.2, borderColor: '#CFCFCF' }}
            className={`flex bg-white w-[160px] mr-3 mt-4 rounded-[30px] rounded-b-[20px] mb-2 shadow-sm shadow-gray-50 `}
        >
            <Image source={itemData.img} className="h-[108px] w-[160px] rounded-t-[30px]" resizeMode='contain' />
            <View className='px-4 py-2 pb-4'>
                <Text className='text-[10px]'>{itemData.type}</Text>
                <Text className='text-[12px] text-black font-[700]'>{itemData.name}</Text>
                <Text className='text-[12px] text-orange-theme mt-[16px] font-[600]'>{itemData.recipes}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const ExploreEatsItemCardBig = ({ itemData, img, kcal, type, title, onPress, isFavorite }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('EatCatergoryDetails')}
            style={{ borderWidth: 0.2, borderColor: '#CFCFCF' }}
            className={`flex bg-white w-[330px] mr-3 mx-auto mt-4 rounded-[30px] rounded-b-[20px] mb-2 shadow-sm shadow-gray-50 `}
        >
            <Image source={itemData.img} className="h-[180px] w-[330px] rounded-t-[30px]" resizeMode='contain' />
            <View className='px-[16px] py-2 mt-[] pb-4'>
                <Text className='text-[14px] text-[#000000] leading-[16.8px] font-[600]'>{itemData.name}</Text>
                <View className='flex flex-row items-center mt-[8px]'>
                    <Text className='text-[10px] text-[#FE7701] leading-[16.8px] font-[600]'>{itemData.kcal}</Text>
                    <View className='mx-2 h-[4px] w-[4px] rounded-full bg-[#18192B]/50'></View>
                    <Text className='text-[10px] text-[#18192B]/50 leading-[16.8px] font-[400]'>{itemData.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const ExploreEatsItemCardBig2 = ({ img, kcal, type, title, onPress, isFavorite }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ borderWidth: 0.2, borderColor: '#CFCFCF' }}
            className={`flex bg-white w-[330px] mr-3 mx-auto mt-4 rounded-[30px] rounded-b-[20px] mb-2 shadow-sm shadow-gray-50 `}
        >
            <Image source={img} className="h-[180px] w-[330px] rounded-t-[30px]" resizeMode='cover' />
            <View className='px-[16px] py-2 mt-[] pb-4'>
                <Text className='text-[14px] text-[#000000] leading-[16.8px] font-[600] capitalize'>{title}</Text>
                <View className='flex flex-row items-center mt-[8px]'>
                    <Text className='text-[10px] text-[#FE7701] leading-[16.8px] font-[600]'>{kcal}</Text>
                    <View className='mx-2 h-[4px] w-[4px] rounded-full bg-[#18192B]/50'></View>
                    <Text className='text-[10px] text-[#18192B]/50 leading-[16.8px] font-[400] capitalize'>{type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export const NutritionIntakeCard = ({ onPress }) => {
    return (
        <View style={NutritionIntakeCardStyle.calorieBox}>
            <View style={NutritionIntakeCardStyle.calorieHeader}>
                <View style={NutritionIntakeCardStyle.calorieHeaderContent}>
                    <Image source={require('../assets/afterscreen/home/kcal.png')} style={NutritionIntakeCardStyle.calorieIcon} />
                    <View style={NutritionIntakeCardStyle.calorieInfo}>
                        <Text style={NutritionIntakeCardStyle.calorieTitle}>Calories</Text>
                        <Text style={NutritionIntakeCardStyle.calorieTime}>Last logged at 3:35pm</Text>
                    </View>
                </View>
                <TouchableOpacity style={NutritionIntakeCardStyle.logButton} onPress={onPress}>
                    <Image source={require('../assets/common/pluse.png')} style={NutritionIntakeCardStyle.logButtonIcon} />
                </TouchableOpacity>
            </View>
            <View style={NutritionIntakeCardStyle.calorieValues}>
                <View style={NutritionIntakeCardStyle.calorieValuesContent}>
                    <View>
                        <Text style={NutritionIntakeCardStyle.intakeLabel}>Intake</Text>
                        <Text style={NutritionIntakeCardStyle.intakeValue}>{100} kcal</Text>
                    </View>
                    <View style={NutritionIntakeCardStyle.separator}></View>
                    <View>
                        <Text style={NutritionIntakeCardStyle.requiredLabel}>Required</Text>
                        <Text style={NutritionIntakeCardStyle.requiredValue}>{"100"} kcal</Text>
                    </View>
                </View>
                <View style={NutritionIntakeCardStyle.recommendedBox}>
                    <Text style={NutritionIntakeCardStyle.recommendedLabel}>Recommended</Text>
                    <Text style={NutritionIntakeCardStyle.recommendedValue}>2,000 kcal</Text>
                </View>
            </View>
            <Progress.Bar progress={80 / 100} borderRadius={4} width={282} height={4} style={NutritionIntakeCardStyle.progressBar} borderWidth={0} color="#FF9950" />
        </View>
    )
}

export const PlanCard = ({ id, name, subTitle, pricePerWeek, price, discountPrice, onPress, isSelected, currency }) => {
    const [priceInt, priceDecimal] = price.toString().split('.');
    const [pricePerWeekInt, pricePerWeekDecimal] = pricePerWeek.toString().split('.');
    const [discountPriceInt, discountPriceDecimal] = discountPrice.toString().split('.');
    const discountPercentage = ((price - discountPrice) / price * 100).toFixed(0); // Calculate the discount percentage
    const currency_symbols = { usd: '$', gbp: '£', cad: '$', aud: '$' }
    const currencySymbol = currency_symbols[currency.toLowerCase()] || '$'; // Fallback to '$' if currency is not in the list
    return (
        <TouchableOpacity
            key={id}
            onPress={onPress}
            style={[
                PlanCardStyle.planCard,
                isSelected && PlanCardStyle.selectedPlanCard,
            ]}>
            <View style={PlanCardStyle.planHeader}>
                <View style={[
                    PlanCardStyle.planIconContainer,
                    isSelected && PlanCardStyle.selectedPlanIconContainer
                ]}>
                    <Image source={fire} style={PlanCardStyle.planIcon} resizeMode='contain' />
                </View>
                <View style={PlanCardStyle.planDetails}>
                    <Text style={PlanCardStyle.planName}>
                        {name}
                    </Text>
                    <Text style={PlanCardStyle.planSubname}>
                        {subTitle}
                    </Text>
                </View>
                <View style={PlanCardStyle.planDiscount}>
                    <Text style={[
                        PlanCardStyle.discountText,
                        isSelected && PlanCardStyle.selectedDiscountText
                    ]}>
                        {discountPercentage}% off
                    </Text>
                </View>
            </View>
            <View style={PlanCardStyle.priceContainer}>
                <Text style={PlanCardStyle.regularPrice}>
                    {currencySymbol}{priceInt}.
                    <Text style={PlanCardStyle.smallText}>{priceDecimal || '00'}</Text>
                </Text>
                <Text style={PlanCardStyle.discountPrice}>
                    {currencySymbol}{discountPriceInt}.
                    <Text style={PlanCardStyle.smallText}>{discountPriceDecimal}</Text>
                </Text>
            </View>
            <View style={PlanCardStyle.weeklyPriceContainer}>
                <Text style={[
                    PlanCardStyle.weeklyPrice,
                    isSelected && PlanCardStyle.selectedWeeklyPrice
                ]}>
                    only {currencySymbol}{pricePerWeekInt}.
                    <Text style={PlanCardStyle.extraSmallText}>{pricePerWeekDecimal} </Text>
                    per week
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export const FastingCard = ({ item, index, isSelected }) => {
    return (
        <TouchableOpacity
            key={index}
            className={`flex w-full border mt-4 border-[#23F1C0] py-3 px-2 rounded-3xl ${(isSelected === index) && 'border-[#FF9950]'}`}
        >
            {item.isRecommended && (
                <View className='w-full flex justify-center items-center relative'>
                    <Text className='text-center text-white bg-orange-theme text-[10px] font-semibold -top-7 rounded-xl px-3 py-2 absolute'>
                        Recommended
                    </Text>
                </View>
            )}
            <View className="flex flex-row items-center justify-center mt-3">
                <Text className={`text-center text-black text-xs font-medium`}>
                    {item.name}
                </Text>
            </View>
            <View className="flex flex-row w-full justify-center items-center mt-2">
                <View className={`flex flex-row justify-end mr-0 relative`}>
                    <Text className='text-[#FE7701] text-xs font-medium mr-4 mb-8'>Fasting</Text>
                    <Image source={require('../assets/common/arrowup.png')} className="h-auto w-auto absolute top-2.5 -right-1" />
                </View>
                <Text className={`text-left text-black text-4xl font-medium ml-0`}>{item.fasting}:{item.eating}</Text>
                <View className={`flex flex-row justify-start mr-0 relative`}>
                    <Image source={require('../assets/common/arrowdown.png')} className="h-auto w-auto absolute top-3 left-0" />
                    <Text className='text-[#FE7701] text-xs font-medium ml-4 mt-8'>Eating</Text>
                </View>
            </View>
            <View className="flex flex-row mx-auto w-8/12 justify-center mt-1">
                <Text className={`text-left text-black text-lg font-medium`}>{item.startTime}:{item.endTime}</Text>
            </View>
            <View className="flex flex-row mx-auto w-8/12 justify-center mt-2 mb-1.5">
                <Text className={`text-center mt-0 text-black text-[10px] font-normal`}>
                    {item.subname}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

// styles
const WorkoutsItemCardExploreStyles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#CFCFCF4D',
        backgroundColor: 'white',
        width: 160,
        height: 190,
        borderRadius: 30,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    image: {
        height: 108,
        width: 158,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    textContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        paddingBottom: 8,
    },
    contentType: {
        opacity: 60,
        fontSize: 12,
        lineHeight: 14.4,
        textTransform: 'capitalize',
        // color: '#18192B',
        fontWeight: '400',
    },
    name: {
        fontSize: 12,
        lineHeight: 14.4,
        color: '#18192B',
        fontWeight: '700',
        textTransform: 'capitalize',
    },
    separator: {
        height: 2,
        marginVertical: 8,
        marginBottom: 6,
        alignSelf: 'center',
        marginHorizontal: 16,
        width: 128,
    },
    articles: {
        fontSize: 12,
        color: '#F57C00',
        fontWeight: '600',
    },
});
const NutritionIntakeCardStyle = StyleSheet.create({
    calorieBox: {
        backgroundColor: 'white',
        marginTop: 4,
        borderRadius: 30,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        padding: 24,
        marginBottom: 8,
    },
    calorieHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    calorieHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    calorieIcon: {
        height: 36,
        width: 36,
    },
    calorieInfo: {
        gap: 6,
    },
    calorieTitle: {
        fontSize: 16,
        fontWeight: '900',
        color: 'black',
    },
    calorieTime: {
        fontSize: 10,
        fontWeight: '400',
    },
    logButton: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#FF995033',
        borderRadius: 30,
    },
    logButtonIcon: {
        height: 18,
        width: 18,
    },
    calorieValues: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        gap: 12,
        justifyContent: "space-between"
    },
    calorieValuesContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    intakeLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: 'black',
    },
    intakeValue: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black',
    },
    separator: {
        width: 1,
        height: 22,
        backgroundColor: '#d3d3d3',
        marginHorizontal: 8,
    },
    requiredLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: 'black',
    },
    requiredValue: {
        fontSize: 18,
        fontWeight: '900',
        color: 'black',
    },
    recommendedBox: {
        // backgroundColor: '#FF995033',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 8,
        textAlign: "right"
    },
    recommendedLabel: {
        fontSize: 10,
        fontWeight: '400',
        color: 'black',
        textAlign: "right"
    },
    recommendedValue: {
        fontSize: 12,
        fontWeight: '700',
        color: 'black',
        textAlign: "right"
    },
    progressBar: {
        marginTop: 12,
    },
})
const PlanCardStyle = StyleSheet.create({
    planCard: {
        width: 330,
        height: 180,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#EDEDED',
        paddingVertical: 3,
        paddingHorizontal: 24,
        borderRadius: 30,
    },
    selectedPlanCard: {
        borderColor: '#FF9950',
        backgroundColor: '#FEF8F4',
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    planIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 2,
        backgroundColor: '#FFEDE0',
        width: 56,
        height: 56,
        alignItems: 'center'
    },
    selectedPlanIconContainer: {
        backgroundColor: '#fe7701a3',
    },
    planIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 'auto',
    },
    planDetails: {
        right: 2,
        width: 145,
    },
    planName: {
        textAlign: 'left',
        marginTop: 0,
        color: 'black',
        fontSize: 24,
        lineHeight: 28.8,
        fontWeight: '700',
    },
    planSubname: {
        textAlign: 'left',
        marginTop: 0,
        color: 'black',
        fontSize: 12,
        fontWeight: '400',
    },
    planDiscount: {
        backgroundColor: '#FE7701',
        borderRadius: 8,
        width: 60,
        height: 30,
    },
    discountText: {
        textAlign: 'left',
        marginTop: 0,
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 12,
        fontWeight: 'semibold',
    },
    selectedDiscountText: {
        fontWeight: 'medium',
    },
    priceContainer: {
        width: 282,
        marginHorizontal: 'auto',
        height: 48,
        backgroundColor: '#fff',
        borderColor: '#EDEDED',
        borderWidth: 0.3,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        columnGap: 16
    },
    regularPrice: {
        textAlign: 'left',
        color: '#DADADA',
        fontSize: 20,
        fontWeight: '700',
    },
    smallText: {
        fontSize: 12,
        fontWeight: '700',
    },
    discountPrice: {
        textAlign: 'left',
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 2,
    },
    weeklyPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 3,
        marginTop: 8,
        marginBottom: 1.5,
    },
    weeklyPrice: {
        textAlign: 'left',
        marginTop: 0,
        color: 'black',
        fontSize: 10,
        fontWeight: 'normal',
    },
    selectedWeeklyPrice: {
        fontWeight: 'medium',
    },
    extraSmallText: {
        fontSize: 8,
        fontWeight: '700',
    },
})