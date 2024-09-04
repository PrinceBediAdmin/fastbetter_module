import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import Background from '../../components/Background';
import {useNavigation} from '@react-navigation/native';
import NextButton from '../../components/NextButton';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import BottomModel from '../../components/BottomModel';
import bgimage from '../../assets/common/base.png';
import bgimage2 from '../../assets/common/base2.png';
import bgimage3 from '../../assets/common/base3.png';

const fastingPlans = [
  {
    id: 1,
    name: 'Classic TRF',
    subname: 'Tap to customise your eating window',
    startTime: '6:30 AM',
    endTime: '10:30 PM',
    fasting: 16,
    eating: 8,
    isRecommended: true,
    image: bgimage,
    bordercolorCode: 'borderOrange',
    bgColorCode: 'bgLightOrange',
    treatDays: 0,
  },
  {
    id: 2,
    name: 'Basic TRF',
    subname: 'Tap to customise your eating window',
    startTime: '9:30 AM',
    endTime: '7:30 PM',
    fasting: 14,
    eating: 10,
    isRecommended: false,
    image: bgimage2,
    bordercolorCode: 'borderTeal',
    bgColorCode: 'bgLightTeal',
    treatDays: 0,
  },
  {
    id: 3,
    name: 'Prolonged TRF',
    subname: 'Tap to customise your eating window',
    startTime: '9:00 AM',
    endTime: '3:00 PM',
    fasting: 18,
    eating: 6,
    isRecommended: false,
    image: bgimage3,
    bordercolorCode: 'borderBlue',
    bgColorCode: 'bgLightBlue',
    treatDays: 0,
  },
];

export default function Fasting() {
  const navigation = useNavigation();
  const [continueBtn, setContinueBtn] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fastingData, setFastingData] = useState(fastingPlans || []);

  const handleGoForward = () => {
    navigation.navigate('FastingSchedule');
  };

  const handleUpdateModel = updateData => {
    const updatedFastingPlans = fastingData?.map(plan =>
      plan?.id === updateData?.id ? {...plan, ...updateData} : plan,
    );
    // console.log(updatedFastingPlans);
    setFastingData(updatedFastingPlans);
    setIsModelOpen(false);
  };

  const handleSelectItem = itemId => {
    setIsModelOpen(true);
    setSelectedPlan(itemId);
    setContinueBtn(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
  };

  const pagination = (
    <Pagination
      dotsLength={fastingData?.length}
      activeDotIndex={activeSlide}
      containerStyle={styles.paginationContainer}
      dotStyle={styles.activeDot}
      inactiveDotStyle={styles.inactiveDot}
      inactiveDotOpacity={0.8}
      inactiveDotScale={0.6}
    />
  );

  const renderItem = ({item}) => {
    return (
      <View style={{width: '100%', height: 300}}>
        <Image
          source={item?.image}
          style={styles.planImage}
          resizeMode="contain"
        />
        {item?.isRecommended && (
          <View style={styles.recommendedContainer}>
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        )}
        <View style={styles.planContainer}>
          <TouchableOpacity
            onPress={() => handleSelectItem(item.id)}
            style={[
              styles.planTouchable,
              styles[item.bordercolorCode],
              styles[item.bgColorCode],
            ]}>
            <View style={styles.planNameContainer}>
              <Text style={styles.planNameText}>{item.name}</Text>
            </View>
            <View style={styles.fastingEatingContainer}>
              <View style={styles.fastingContainer}>
                <Text style={styles.fastingText}>Fasting</Text>
                <Image
                  source={require('../../assets/common/arrowup.png')}
                  style={styles.arrowUp}
                />
              </View>
              <Text style={styles.planDurationText}>
                {item.fasting}:{item.eating}
              </Text>
              <View style={styles.eatingContainer}>
                <Image
                  source={require('../../assets/common/arrowdown.png')}
                  style={styles.arrowDown}
                />
                <Text style={styles.eatingText}>Eating</Text>
              </View>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {item.startTime} - {item.endTime}
              </Text>
            </View>
            <View style={styles.subNameContainer}>
              <Text style={styles.subNameText}>{item.subname}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Background statusBarTranslucent={false}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('FastingSchedule')}>
          <Text style={styles.skipButtonText}>SKIP</Text>
        </TouchableOpacity>

        <View style={styles.carouselContainer}>
          <Carousel
            data={fastingData}
            renderItem={renderItem}
            layout={'default'}
            sliderWidth={400}
            itemWidth={400}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <View style={styles.paginationWrapper}>{pagination}</View>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Features of the plan</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>It’s flexible</Text>
            <Text style={styles.featureDescription}>
              This plan doesn’t require a lot of effort, just have a late
              breakfast or an early dinner
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Helps boost metabolism</Text>
            <Text style={styles.featureDescription}>
              The 16:8 plan may boost your metabolism by up to 14%
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Helps in disease prevention</Text>
            <Text style={styles.featureDescription}>
              This plan may be helpful in the prevention of type 2 diabetes or
              other obesity-related conditions
            </Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>
              Helps improve learning and memory
            </Text>
            <Text style={styles.featureDescription}>
              Intermittent fasting may help in generating new neurons in adult
              hippocampus
            </Text>
          </View>
        </View>
      </ScrollView>
      <NextButton
        onPress={handleGoForward}
        title={'Choose'}
        mainClassName={'absolute bottom-10'}
        isContinueBtn={continueBtn}
      />
      <BottomModel
        isVisible={isModelOpen}
        onClose={handleCloseModel}
        data={fastingData[activeSlide]}
        onUpdate={pre => handleUpdateModel(pre)}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
    paddingTop: Platform.OS === 'android' ? 0 : 10,
    backgroundColor: '#fff',
  },
  skipButton: {
    alignItems: 'flex-end',
    marginTop: 34,
    marginHorizontal: 24,
  },
  skipButtonText: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '500',
    color: '#FE7701',
  },
  carouselContainer: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  carouselItemContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 0,
  },
  planImage: {
    width: '100%',
    height: 270,
    marginTop: 60,
  },
  planContainer: {
    position: 'absolute',
    alignSelf: 'center',
    paddingTop: 15,
  },
  planTouchable: {
    flex: 1,
    width: '100%',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  borderOrange: {
    borderColor: '#FF9950',
    borderWidth: 1,
  },
  borderTeal: {
    borderColor: '#23F1C0',
    borderWidth: 1,
  },
  borderBlue: {
    borderColor: '#23B3F1',
    borderWidth: 1,
  },
  bgLightOrange: {
    backgroundColor: '#FEF8F4',
  },
  bgLightTeal: {
    backgroundColor: '#EDFFFB',
  },
  bgLightBlue: {
    backgroundColor: '#E2F6FF',
  },
  recommendedContainer: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#FE7701',
    fontSize: 10,
    fontWeight: '600',
    borderRadius: 8,
    padding: 8,
    top: 0,
  },
  recommendedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14.4,
  },
  planNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  planNameText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 12,
    fontWeight: '500',
  },
  fastingEatingContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  fastingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 0,
    position: 'relative',
  },
  fastingText: {
    color: '#FE7701',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 16,
    marginBottom: 32,
  },
  arrowUp: {
    position: 'absolute',
    top: 10,
    right: -2,
  },
  planDurationText: {
    textAlign: 'left',
    color: 'black',
    fontSize: 32,
    fontWeight: '500',
    marginLeft: 0,
  },
  eatingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 0,
    position: 'relative',
  },
  arrowDown: {
    position: 'absolute',
    top: 12,
    left: 0,
  },
  eatingText: {
    color: '#FE7701',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 32,
  },
  timeContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 36,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  timeText: {
    textAlign: 'left',
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  subNameContainer: {
    flexDirection: 'row',
    width: '66%',
    justifyContent: 'center',
    marginTop: 8,
    alignSelf: 'center',
    marginBottom: 12,
  },
  subNameText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 10,
    fontWeight: '400',
  },
  paginationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#FE7701',
    backgroundColor: '#FE7701',
  },
  inactiveDot: {
    backgroundColor: '#fff',
    borderColor: '#FE7701',
    width: 8,
    height: 8,
    borderRadius: 50,
    borderWidth: 2,
  },
  paginationWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 15,
  },
  featuresContainer: {
    paddingHorizontal: 40,
    marginBottom: 90,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  featureItem: {
    marginTop: 20,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
});
