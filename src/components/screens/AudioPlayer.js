import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../../assets/images';
import {
  colorEleven,
  colorFifteen,
  colorNine,
  colorThree,
  colorTwo,
  textColor,
} from '../../utils/constants/color';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  windowWidth,
} from '../../utils/constants/Metrics';
import useNetInfoStatus from '../../utils/useNetInfoStatus';
import CustomBannerAd from '../common/CustomBannerAd';
import NoInternet from './NoInternet';

const AudioPlayer = ({route}) => {
  const {url, title} = route?.params;
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const isConnected = useNetInfoStatus();

  useEffect(() => {
    setupAudio();
    return () => {
      TrackPlayer.stop();
      TrackPlayer.reset();
    };
  }, [url]);

  const setupAudio = async () => {
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: '1',
      url: url,
      title: title,
      artist: 'Unknown',
    });
  };

  const getDownloadURL = () =>
    url?.replace('export=view', 'export=download') || null;

  const togglePlayPause = async () => {
    if (playbackState.state === 'playing') {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  const seekAudio = async value => {
    await TrackPlayer.seekTo(value);
  };

  const handleDownloadClick = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    }
    setIsPlaying(false);
    const downloadURL = getDownloadURL();
    if (typeof downloadURL === 'string' && downloadURL.trim() !== '') {
      Linking.openURL(`googlechrome://navigate?url=${downloadURL}`);
    }
  };

  const forwardAudio = async () => {
    const newPosition = position + 10;
    if (newPosition < duration) {
      await TrackPlayer.seekTo(newPosition);
    }
  };

  const backwardAudio = async () => {
    const newPosition = position - 10;
    await TrackPlayer.seekTo(newPosition > 0 ? newPosition : 0);
  };

  if (!isConnected) {
    return <NoInternet />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Icon
          name={'arrow-back'}
          size={moderateScale(34)}
          color={textColor}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.header}>संगीतबद्ध श्लोक</Text>
      </View>
      <CustomBannerAd />
      <Text style={styles.title}>{title}</Text>
      <Image
        source={images.audioBackground}
        style={styles.imageBackground}
        resizeMode="stretch"
      />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seekAudio}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="gray"
        thumbTintColor="orange"
      />

      <View style={styles.controls}>
        <Icon
          name="play-back-circle-outline"
          size={50}
          color="black"
          onPress={backwardAudio}
        />
        <Icon
          name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
          size={50}
          color="black"
          onPress={togglePlayPause}
        />
        <Icon
          name="play-forward-circle-outline"
          size={50}
          color="black"
          onPress={forwardAudio}
        />
      </View>
      <TouchableOpacity onPress={handleDownloadClick}>
        <LinearGradient
          style={styles.listView}
          colors={[colorThree, colorNine]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.listText}>श्लोक डाउनलोड करा</Text>
          <Icon
            name={'download-outline'}
            size={moderateScale(26)}
            color={textColor}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTwo,
    padding: moderateScale(12),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(30),
    color: colorFifteen,
    marginLeft: horizontalScale(65),
    marginVertical: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: 'Mukta-Bold',
    textAlign: 'center',
    marginVertical: verticalScale(8),
    color: colorFifteen,
  },
  imageBackground: {
    maxHeight: verticalScale(260),
    maxWidth: windowWidth - horizontalScale(50),
    borderRadius: moderateScale(12),
    alignSelf: 'center',
  },
  slider: {
    width: horizontalScale(340),
    height: verticalScale(60),
    marginVertical: verticalScale(12),
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: verticalScale(20),
  },
  listView: {
    padding: moderateScale(12),
    paddingHorizontal: horizontalScale(36),
    borderWidth: verticalScale(2),
    borderColor: colorEleven,
    borderRadius: moderateScale(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(36),
  },
  listText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(16),
    color: textColor,
  },
});

export default AudioPlayer;
