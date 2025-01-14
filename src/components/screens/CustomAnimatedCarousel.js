import React, {useState} from 'react';
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

  const handleProgressChange = (_, absoluteProgress) => {
    const roundedIndex = Math.round(absoluteProgress);
    if (roundedIndex !== currentIndex) {
      setCurrentIndex(roundedIndex);
    }
  };

  const MemoizedCarousel = React.useMemo(() => {
    return (
      <Carousel
        loop
        width={horizontalScale(380)}
        height={verticalScale(280)}
        autoPlay={focused && !isModalVisible}
        data={data?.images}
        scrollAnimationDuration={3000}
        renderItem={renderItem}
        pagingEnabled
        onProgressChange={handleProgressChange}
      />
    );
  }, [data, renderItem, focused]);

  return (
    <>
      {MemoizedCarousel}
      <Dots currentIndex={currentIndex} carouselData={data?.images} />
    </>
  );
};

export default React.memo(CustomAnimatedCarousel);
