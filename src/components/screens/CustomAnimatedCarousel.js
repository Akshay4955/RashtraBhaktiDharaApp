import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  horizontalScale,
  verticalScale,
  windowWidth,
} from '../../utils/constants/Metrics';
import {colorEleven} from '../../utils/constants/color';

const Dots = React.memo(({currentIndex, carouselData}) => (
  <View
    style={{
      width: windowWidth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      marginTop: 8,
    }}>
    {carouselData?.map((item, index) => (
      <View
        key={index}
        style={[
          {
            backgroundColor:
              currentIndex === index ? colorEleven : 'transparent',
          },
          {
            borderRadius: 16,
            width: 12,
            height: 12,
            borderWidth: 2,
            borderColor: colorEleven,
            marginHorizontal: 4,
          },
        ]}
      />
    ))}
  </View>
));

const CustomAnimatedCarousel = props => {
  const {focused, isModalVisible, data, renderItem} = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleProgressChange = useCallback((_, absoluteProgress) => {
    const roundedIndex = Math.round(absoluteProgress);
    setCurrentIndex(prevIndex => {
      if (roundedIndex !== prevIndex) {
        return roundedIndex;
      }
      return prevIndex;
    });
  }, []);

  const carouselElement = useMemo(() => {
    return (
      <Carousel
        loop
        width={horizontalScale(380)}
        height={verticalScale(240)}
        autoPlay={focused && !isModalVisible}
        data={data?.images}
        scrollAnimationDuration={3000}
        renderItem={renderItem}
        pagingEnabled
        onProgressChange={handleProgressChange}
      />
    );
  }, [data?.images, renderItem, focused, isModalVisible, handleProgressChange]);

  return (
    <>
      {carouselElement}
      <Dots currentIndex={currentIndex} carouselData={data?.images} />
    </>
  );
};

export default React.memo(CustomAnimatedCarousel);
