import React, { useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { EatingItemCard, FastingCard } from './RenderItems';

export default function MyCarousel({ data, className }) {
    const [activeSlide, setActiveSlide] = useState(0);

    const renderItem = ({ item, index }) => {
        return <FastingCard item={item} index={index} isSelected={activeSlide} />;
    };

    const pagination = (
        <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 50,
                marginHorizontal: 3,
                borderWidth: 1,
                borderColor: "#FE7701",
                backgroundColor: '#FE7701'
            }}
            inactiveDotStyle={{
                backgroundColor: '#fff',
                borderColor: "#FE7701",
                width: 8,
                height: 8,
                borderRadius: 50,
                borderWidth: 2
            }}
            inactiveDotOpacity={0.8}
            inactiveDotScale={0.6}
        />
    );

    return (
        <View>
            <Carousel
                data={data}
                renderItem={renderItem}
                active
                layout={"default"}
                sliderWidth={400}
                itemWidth={400}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <View style={{ position: 'absolute', alignSelf: 'center', bottom: 15 }}>
                {pagination}
            </View>

        </View>
    );
};
export const MyCarouselForHomeScreecn = ({ data, className }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const handleScroll = async (event) => {
        const scrollDistance = await event.nativeEvent.contentOffset.x;
        const maxScrollDistance = await data.length * 60; // Assuming each item has a width of 40 units

        if (scrollDistance >= 0 && scrollDistance <= maxScrollDistance) {
            const slideWidth = 50; // Adjust this according to your item width
            const newActiveSlide = await Math.floor(scrollDistance / slideWidth);
            await setActiveSlide(newActiveSlide);
        }
    };

    const renderItem = ({ item, index }) => {
        return <EatingItemCard item={item} index={index} isSelected={activeSlide} />;
    };

    const pagination = (
        <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            dotStyle={{
                width: 30,
                height: 7,
                borderRadius: 50,
                marginHorizontal: 0,
                borderWidth: 1,
                borderColor: "#18192B",
                backgroundColor: '#18192B'
            }}
            inactiveDotStyle={{
                backgroundColor: '#d1cfd1',
                borderColor: "#d1cfd1",
                width: 10,
                height: 10,
                marginHorizontal: -14,
                borderRadius: 50,
                borderWidth: 2
            }}
            inactiveDotOpacity={0.8}
            inactiveDotScale={0.6}
        />
    );
    return (
        <View>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                scrollToOverflowEnabled
                onScroll={handleScroll}
                onMomentumScrollEnd={handleScroll} // Handle scroll end
                contentContainerStyle={{ paddingHorizontal: 0, flexGrow: 1 }}
            />
            {pagination}
        </View>
    );
};
export const MyCarouselForViewMore = ({ data, ItemCard, ViewMore = null, cardWeight, onPressAction = null }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const handleScroll = async (event) => {
        const scrollDistance = await event.nativeEvent.contentOffset.x;
        const maxScrollDistance = await data.length * 4000; // Assuming each item has a width of 40 units

        if (scrollDistance >= 0 && scrollDistance <= maxScrollDistance) {
            const slideWidth = cardWeight - 15; // Adjust this according to your item width
            const newActiveSlide = Math.floor(scrollDistance / slideWidth);
            setActiveSlide(newActiveSlide);
        }
    };

    const pagination = (
        <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                marginTop: 0,
                // borderWidth: 1,
                padding: 0,
            }}
            dotStyle={{
                width: 30,
                height: 7,
                borderRadius: 50,
                marginHorizontal: 0,
                borderWidth: 1,
                borderColor: "#18192B",
                backgroundColor: '#18192B'
            }}
            inactiveDotStyle={{
                backgroundColor: '#d1cfd1',
                borderColor: "#d1cfd1",
                width: 10,
                height: 10,
                marginHorizontal: -14,
                borderRadius: 50,
                borderWidth: 2
            }}
            inactiveDotOpacity={0.8}
            inactiveDotScale={0.6}
        />
    );

    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', columnGap: 20 }} onScroll={handleScroll}>
                {data.map((item, index) => {
                    return (
                        <ItemCard itemData={item} key={index} />
                    )
                })}
                {/* {isViewMore && (
                    <View className='items-center'>
                        <TouchableOpacity onPress={() => navigation.navigate('WorkoutsCatergoryList')} className='w-[40px] h-[40px] rounded-[8px] bg-[#FFEDE0] flex justify-center items-center'>
                            <Image source={require('../assets/icons/viewMoreIcon.png')} className='w-[24px] h-[24px]' resizeMode='contain' />
                        </TouchableOpacity>
                        <Text className='text-[14px] font-[600] mt-4 text-[#18192B]'>View all</Text>
                    </View>
                )} */}
                {ViewMore && <ViewMore onPressAction={onPressAction} />}
            </ScrollView>
            {pagination}
        </View>
    );
};

export const MyCarouselForGender = ({ carouselRef, data, renderItem, activeSlide, setActiveSlide, itemWidth = 150, sliderWidth = 450 }) => {
    return (
        <Carousel
            ref={carouselRef}
            data={data}
            renderItem={renderItem}
            active
            firstItem={activeSlide}
            layout={"default"}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            inactiveSlideOpacity={0.2}
            onSnapToItem={(index) => setActiveSlide(index)}
        />
    );
};
