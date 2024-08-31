import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import Background from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import NextButton from "../../components/NextButton";
import BottomModel from "../../components/BottomModel";
import Carousel, { Pagination } from 'react-native-snap-carousel';

import bgimage from '../../assets/common/base.png';
import bgimage2 from '../../assets/common/base2.png';
import bgimage3 from '../../assets/common/base3.png';

export default function Fasting() {

  const navigation = useNavigation();
  const [continueBtn, setContinueBtn] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fastingPlans, setFastingPlans] = useState([]);

  useEffect(() => {
    if (dashboardData.fastingsetup) {
      setFastingPlans(dashboardData.fastingsetup);
    }
  }, [dashboardData]);

  const handleGoForward = () => {
    setIsModelOpen(true);
  };

  const handleSelectItem = (itemId) => {
    setSelectedPlan(itemId);
    setContinueBtn(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
  };

  const pagination = (
    <Pagination
      dotsLength={fastingPlans.length}
      activeDotIndex={activeSlide}
      containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      dotStyle={styles.paginationDot}
      inactiveDotStyle={styles.inactivePaginationDot}
      inactiveDotOpacity={0.8}
      inactiveDotScale={0.6}
    />
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.carouselItemContainer}>
      <Image
        source={index === 0 ? bgimage : index === 1 ? bgimage2 : bgimage3}
        style={styles.carouselImage}
        resizeMode='contain'
      />
      <View style={styles.touchableContainer}>
        <TouchableOpacity
          key={index}
          style={[
            styles.touchableItem,
            { borderColor: item.borderColorCode, backgroundColor: item.bgColorCode }
          ]}
          onPress={() => handleSelectItem(index)}
        >
          {item.isRecommended && (
            <View style={styles.recommendedTag}>
              <Text style={styles.recommendedTagText}>Recommended</Text>
            </View>
          )}
          <Text style={styles.planText}>{item.plan}</Text>
          <View style={styles.fastingContainer}>
            <View style={styles.arrowContainer}>
              <Text style={styles.fastingText}>Fasting</Text>
              <Image source={require('../../assets/common/arrowup.png')} style={styles.arrowImage} />
            </View>
            <Text style={styles.fastingWindowText}>{item.fastingWindow}:{item.eatingWindow}</Text>
            <View style={styles.arrowContainer}>
              <Image source={require('../../assets/common/arrowdown.png')} style={styles.arrowImageDown} />
              <Text style={styles.eatingText}>Eating</Text>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {item.startTime12hr}
              <Text> to </Text>
              {item.endTime12hr}
            </Text>
          </View>
          <Text style={styles.titleText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Background>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('FastingSchedule')}
        >
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>

        <View style={styles.carouselContainer}>
          <Carousel
            data={fastingPlans}
            renderItem={renderItem}
            sliderWidth={400}
            itemWidth={400}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <View style={styles.paginationContainer}>
            {pagination}
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Features of the plan</Text>
          {fastingPlans.length > 0 && fastingPlans[selectedPlan - 1]?.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <NextButton
        onPress={handleGoForward}
        title={'Choose'}
        style={styles.nextButton}
        isContinueBtn={continueBtn}
      />
      <BottomModel isVisible={isModelOpen} onClose={handleCloseModel} />
    </Background>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
    marginTop: 45,
  },
  skipButton: {
    alignItems: 'flex-end',
    marginTop: 20,
    marginHorizontal: 24,
  },
  skipText: {
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FE7701',
  },
  carouselContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "#FE7701",
    backgroundColor: '#FE7701',
  },
  inactivePaginationDot: {
    backgroundColor: '#fff',
    borderColor: "#FE7701",
    width: 8,
    height: 8,
    borderRadius: 50,
    borderWidth: 2,
  },
  carouselItemContainer: {
    flex: 1,
    alignItems: 'center',
    width: "100%",
  },
  carouselImage: {
    width: "100%",
    height: 200,
    marginTop: 60,
  },
  touchableContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: 330,
  },
  touchableItem: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 23,
    marginTop: 16,
    height: 180,
    position: "relative",
    alignItems: "center",
  },
  recommendedTag: {
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    backgroundColor: '#FE7701',
    borderRadius: 8
  },
  recommendedTagText: {
    color: 'white',
    padding: 8,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: '700',
  },
  planText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  fastingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
  },
  fastingText: {
    color: '#FE7701',
    fontSize: 10,
    fontWeight: '500',
    marginRight: 4,
  },
  arrowImage: {
    position: 'absolute',
    top: 5,
    right: -5,
    height: 15,
    width: 15,
  },
  fastingWindowText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
    marginHorizontal: 4,
  },
  arrowImageDown: {
    position: 'absolute',
    top: 5,
    left: -5,
    height: 15,
    width: 15,
  },
  eatingText: {
    color: '#FE7701',
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 4,
  },
  timeContainer: {
    width: 222,
    height: 48,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginTop: 3,
  },
  timeText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
    marginTop: 3,
  },
  featuresContainer: {
    paddingHorizontal: 40,
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    lineHeight: 20,
    textAlign: "left",
    fontWeight: Platform.OS === 'android' ? '400' : '500',
    fontFamily: Platform.OS === 'android' ? 'Larken-Bold' : "Larken-Bold",
  },
  featureItem: {
    marginTop: 24,
  },
  featureTitle: {
    fontSize: 12,
    lineHeight: 14.4,
    fontWeight: "700",
    textAlign: "left",
    marginBottom: 4,
    color: "#18192B",
  },
  featureSubtitle: {
    fontSize: 12,
    lineHeight: 14.4,
    fontWeight: "400",
    textAlign: "left",
    color: "#18192B",
  },
  nextButton: {
    marginBottom: 20,
    alignSelf: "center",
  },
});
