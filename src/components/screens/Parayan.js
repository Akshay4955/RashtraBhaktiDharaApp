import React, {useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFirebaseData} from '../../navigation/FirebaseProvider';
import {
  colorEleven,
  colorFifteen,
  colorFour,
  colorNine,
  colorOne,
  colorSix,
  colorThirteen,
  colorTwelve,
  lighterGray,
  textColor,
  white,
} from '../../utils/constants/color';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/constants/Metrics';
import {Headers} from '../../utils/constants/TextConstants';
import CustomBannerAd from '../common/CustomBannerAd';
import ListHeader from '../common/ListHeader';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const Parayan = () => {
  const scrollViewRef = useRef();
  const {firebaseData} = useFirebaseData();
  const ParayanData = firebaseData?.Shivcharitraparayan;

  const fetchLastThreeDaysData = () => {
    const today = new Date();
    const todayNum = today.getDate();
    const dayKeys = [];

    for (let i = 5; i >= 0; i--) {
      let dayNum = todayNum - i;
      if (dayNum <= 0) dayNum += 31;
      dayKeys.push(dayNum);
    }
    const result = [];
    dayKeys.forEach(key => {
      result[key] = ParayanData[key] || '';
    });
    const filteredResult = [];
    for (let i = 5; filteredResult.length < 3; i--) {
      const entry = ParayanData[dayKeys[i]];
      if (entry?.date) filteredResult.push(entry);
    }
    return filteredResult.reverse();
  };

  const readingsData = fetchLastThreeDaysData();
  const initialPage = readingsData.length > 0 ? readingsData.length - 1 : 0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: initialPage * SCREEN_WIDTH,
        animated: false,
      });
    }
  }, [initialPage]);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentPage(page);
  };

  const scrollToPage = pageIndex => {
    scrollViewRef.current?.scrollTo({
      x: pageIndex * SCREEN_WIDTH,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ListHeader header={Headers.Parayan} />
      <View style={styles.indicatorContainer}>
        {readingsData.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => scrollToPage(index)}>
            <View
              style={[
                styles.indicator,
                currentPage === index && styles.indicatorActive,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.pagerView}>
        {readingsData.map((reading, index) => (
          <View key={index} style={styles.page}>
            <ScrollView
              style={styles.contentScrollView}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={true}>
              <Text style={styles.fullDateText}>{reading?.date}</Text>
              <Text style={styles.chapterTitle}>{reading?.title}</Text>
              <View style={styles.divider} />

              {/* Render each shloka */}
              {reading?.shlokas &&
              Array.isArray(reading.shlokas) &&
              reading.shlokas.length > 0 ? (
                reading.shlokas.map((shloka, shlokaIndex) => (
                  <View key={shlokaIndex} style={styles.sectionContainer}>
                    {/* Sanskrit Shlok */}
                    {shloka?.sanskrit && (
                      <Text style={styles.shlokText}>{shloka.sanskrit}</Text>
                    )}

                    {/* Word Meanings */}
                    {shloka?.wordMeanings && shloka.wordMeanings.length > 0 && (
                      <View style={styles.meaningContainer}>
                        <Text style={styles.sectionHeading}>शब्दार्थ:</Text>
                        {shloka.wordMeanings.map((meaning, meaningIndex) => (
                          <View key={meaningIndex} style={styles.meaningRow}>
                            <Text style={styles.wordText}>{meaning.word}:</Text>
                            <Text style={styles.meaningText}>
                              {' '}
                              {meaning.meaning}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* Brief Meaning */}
                    {shloka?.briefMeaning && (
                      <View style={styles.bookMeaningContainer}>
                        <Text style={styles.sectionHeading}>अर्थ:</Text>
                        <Text style={styles.contentText}>
                          {shloka.briefMeaning}
                        </Text>
                      </View>
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.contentText}>आजचे पारायण उपलब्ध नाही</Text>
              )}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <CustomBannerAd />
    </SafeAreaView>
  );
};

export default Parayan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorOne,
  },
  header: {
    backgroundColor: colorNine,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(14),
  },
  fontSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: horizontalScale(12),
  },
  fontSizeLabel: {
    fontSize: moderateScale(20),
    color: white,
    fontFamily: 'Mukta-SemiBold',
  },
  fontButton: {
    backgroundColor: lighterGray,
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(8),
    minWidth: horizontalScale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontButtonActive: {
    backgroundColor: white,
  },
  fontButtonText: {
    color: colorTwelve,
    fontSize: moderateScale(16),
    fontFamily: 'Mukta-Bold',
  },
  mediumA: {
    fontSize: moderateScale(18),
  },
  largeA: {
    fontSize: moderateScale(20),
  },
  fontButtonTextActive: {
    color: colorFifteen,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  contentScrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: moderateScale(20),
    paddingBottom: verticalScale(40),
  },
  fullDateText: {
    fontSize: moderateScale(16),
    color: textColor,
    marginBottom: verticalScale(4),
    fontFamily: 'Mukta-Medium',
  },
  chapterTitle: {
    fontWeight: 'Mukta-Bold',
    fontSize: moderateScale(21),
    color: colorThirteen,
    marginBottom: verticalScale(6),
  },
  divider: {
    height: verticalScale(2),
    backgroundColor: colorFour,
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(1),
  },
  contentText: {
    color: textColor,
    textAlign: 'justify',
    fontFamily: 'Mukta-Medium',
    fontSize: moderateScale(19),
    lineHeight: moderateScale(28),
  },
  sectionContainer: {
    marginBottom: verticalScale(24),
  },
  shlokText: {
    color: colorThirteen,
    fontSize: moderateScale(20),
    fontFamily: 'Mukta-Bold',
    textAlign: 'center',
    lineHeight: moderateScale(32),
    marginBottom: verticalScale(16),
  },
  meaningContainer: {
    marginBottom: verticalScale(12),
  },
  sectionHeading: {
    color: colorTwelve,
    fontSize: moderateScale(18),
    fontFamily: 'Mukta-Bold',
    marginBottom: verticalScale(8),
    marginTop: verticalScale(8),
  },
  meaningRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(6),
    paddingLeft: horizontalScale(8),
  },
  wordText: {
    color: colorEleven,
    fontSize: moderateScale(16),
    fontFamily: 'Mukta-Bold',
  },
  meaningText: {
    color: textColor,
    fontSize: moderateScale(16),
    fontFamily: 'Mukta-Medium',
    flex: 1,
  },
  bookMeaningContainer: {
    marginBottom: verticalScale(12),
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(4),
    gap: horizontalScale(12),
  },
  indicator: {
    width: horizontalScale(10),
    height: verticalScale(10),
    borderRadius: moderateScale(6),
    backgroundColor: colorSix,
  },
  indicatorActive: {
    backgroundColor: colorTwelve,
    width: horizontalScale(24),
  },
});
