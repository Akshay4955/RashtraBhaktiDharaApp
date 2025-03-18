import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {PoemCss as styles} from '../../styles/screens/PoemCss';
import {formatData} from '../../utils/commonUtils';
import {moderateScale, verticalScale} from '../../utils/constants/Metrics';
import {
  colorNine,
  colorOne,
  colorThree,
  textColor,
} from '../../utils/constants/color';
import Logger from '../../utils/logUtility/Logger';
import PoemHeader from './PoemHeader';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-2249316745492384/6186159072';
const Shlok = ({route}) => {
  const {poem} = route?.params;
  const navigation = useNavigation();
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [copyButtonPosition, setCopyButtonPosition] = useState({x: 0, y: 0});
  const [selectedText, setSelectedText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndexes, setHighlightedIndexes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionListRef = useRef();

  const stanzas = useMemo(() => {
    const formattedContent = formatData(poem.content);
    return formattedContent.split('\n\n');
  }, [poem.content]);

  useEffect(() => {
    if (!searchQuery) {
      setHighlightedIndexes([]);
      setCurrentIndex(0);
      return;
    }

    const indexes = [];

    stanzas.forEach((stanza, stanzaIndex) => {
      if (stanza.toLowerCase().includes(searchQuery.toLowerCase())) {
        indexes.push({stanzaIndex});
      }
    });

    if (indexes.length > 0) {
      setHighlightedIndexes(indexes);
      setCurrentIndex(0);
      scrollToMatch(0, indexes);
    } else {
      setHighlightedIndexes([]);
      setCurrentIndex(0);
    }
  }, [searchQuery]);

  const scrollToMatch = (index, indexes = highlightedIndexes) => {
    if (
      !indexes ||
      indexes.length === 0 ||
      index >= indexes.length ||
      !sectionListRef.current
    ) {
      Logger.log('Invalid scroll attempt');
      return;
    }

    const {stanzaIndex} = indexes[index];
    if (stanzaIndex <= stanzas?.length - 3) {
      sectionListRef.current.scrollToIndex({
        index: stanzaIndex,
        animated: true,
        viewPosition: 0.5,
      });
    } else {
      sectionListRef.current.scrollToEnd({animated: true});
    }
  };

  const handleNextMatch = useCallback(() => {
    if (highlightedIndexes.length === 0) return;
    const nextIndex = (currentIndex + 1) % highlightedIndexes.length;
    setCurrentIndex(nextIndex);
    scrollToMatch(nextIndex);
  }, [highlightedIndexes, currentIndex]);

  const handlePreviousMatch = useCallback(() => {
    if (highlightedIndexes.length === 0) return;
    const prevIndex =
      (currentIndex - 1 + highlightedIndexes.length) %
      highlightedIndexes.length;
    setCurrentIndex(prevIndex);
    scrollToMatch(prevIndex);
  }, [highlightedIndexes, currentIndex]);

  const handleLongPress = (event, text) => {
    const {pageX, pageY} = event.nativeEvent;
    setCopyButtonPosition({x: pageX, y: pageY});
    setShowCopyButton(true);
    setSelectedText(text);
  };

  const handleCopy = () => {
    Clipboard.setString(selectedText);
    setShowCopyButton(false);
    ToastAndroid.show('माहिती यशस्वीरित्या कॉपी केली..!!', ToastAndroid.SHORT);
  };

  const HighlightedText = React.memo(({line, query}) => {
    if (!query)
      return (
        <TouchableWithoutFeedback onLongPress={e => handleLongPress(e, line)}>
          <Text style={styles.contentText}>{line}</Text>
        </TouchableWithoutFeedback>
      );

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = line.split(regex);

    return (
      <TouchableWithoutFeedback onLongPress={e => handleLongPress(e, line)}>
        <Text style={styles.contentText}>
          {parts.map((part, index) => {
            return part.toLowerCase() === query.toLowerCase() ? (
              <Text key={index} style={styles.highlight}>
                {part}
              </Text>
            ) : (
              <Text key={index}>{part}</Text>
            );
          })}
        </Text>
      </TouchableWithoutFeedback>
    );
  });

  return (
    <LinearGradient
      style={styles.mainView}
      colors={[colorNine, colorThree]}
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name={'arrow-back'} size={moderateScale(34)} color={textColor} />
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="शोधा...!!!"
        placeholderTextColor={textColor}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {highlightedIndexes.length > 1 && (
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={handlePreviousMatch} style={styles.arrow}>
            <Icon
              name="chevron-up-circle"
              size={moderateScale(30)}
              color={textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextMatch} style={styles.arrow}>
            <Icon
              name="chevron-down-circle"
              size={moderateScale(30)}
              color={textColor}
            />
          </TouchableOpacity>
        </View>
      )}
      <PoemHeader header={poem?.title} />
      <FlatList
        ref={sectionListRef}
        data={stanzas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <HighlightedText line={item} query={searchQuery} />
        )}
        ItemSeparatorComponent={() => <View style={styles.stanzaSpacing} />}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={2}
        windowSize={2}
        getItemLayout={(data, index) => ({
          length: verticalScale(160),
          offset: verticalScale(160) * index,
          index,
        })}
      />
      {/* <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      /> */}
      {showCopyButton ? (
        <TouchableOpacity
          style={[
            styles.searchView,
            {top: copyButtonPosition.y - verticalScale(30)},
          ]}
          onPress={handleCopy}>
          <Icon name="copy" size={moderateScale(24)} color={colorOne} />
          <Text style={styles.searchText}>Copy</Text>
        </TouchableOpacity>
      ) : null}
    </LinearGradient>
  );
};

export default Shlok;
