import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../../assets/images';
import {
  colorEleven,
  colorFifteen,
  colorNine,
  colorThree,
  colorTwelve,
  colorTwo,
  textColor,
} from '../../utils/constants/color';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  windowWidth,
} from '../../utils/constants/Metrics';

const AudioPlayer = ({route}) => {
  const {url} = route.params;
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sound = new Sound(url, null, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setDuration(sound.getDuration());
      setIsLoading(false);
    });

    const interval = setInterval(() => {
      if (sound.isLoaded()) {
        sound.getCurrentTime(seconds => {
          setPosition(seconds);
        });
      }
    }, 100);

    setAudio(sound);

    return () => {
      clearInterval(interval);
      sound.release();
    };
  }, [url]);

  const togglePlayPause = () => {
    if (audio && !isLoading) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(prevState => !prevState);
    }
  };

  const onSlidingComplete = value => {
    if (audio && !isLoading) {
      audio.setCurrentTime(value);
      setPosition(value);
    }
  };

  const forwardAudio = async () => {
    const newPosition = position + 10;
    if (newPosition < duration) {
      await audio.setCurrentTime(newPosition);
    }
    //  else {
    //   await audio.setCurrentTime(position);
    // }
  };

  const backwardAudio = async () => {
    const newPosition = position - 10;
    if (newPosition > 0) {
      await audio.setCurrentTime(newPosition);
    } else {
      await audio.setCurrentTime(0);
    }
  };

  return (
    <View style={styles.container}>
      <Icon
        name={'arrow-back'}
        size={moderateScale(34)}
        color={textColor}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>Audio Player</Text>
      <Image
        source={images.audioBackground}
        style={{
          height: verticalScale(300),
          width: windowWidth - horizontalScale(60),
          borderRadius: moderateScale(12),
          alignSelf: 'center',
        }}
        resizeMode="stretch"
      />
      {isLoading ? (
        <>
          <ActivityIndicator
            size={moderateScale(60)}
            color={colorTwelve}
            style={{marginVertical: verticalScale(50)}}
          />
          <Text
            style={{
              fontFamily: 'Mukta-Bold',
              fontSize: moderateScale(20),
              textAlign: 'center',
              color: textColor,
            }}>
            ऑडिओ लोड होत आहे...!!!
          </Text>
        </>
      ) : (
        <>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor={colorFifteen}
            maximumTrackTintColor={colorEleven}
            thumbTintColor={colorFifteen}
            onSlidingComplete={onSlidingComplete}
          />
          <View style={styles.controls}>
            <Icon
              name={'play-back-circle-outline'}
              size={moderateScale(50)}
              color={textColor}
              onPress={backwardAudio}
            />
            <Icon
              name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
              size={moderateScale(50)}
              color={textColor}
              onPress={togglePlayPause}
            />
            <Icon
              name={'play-forward-circle-outline'}
              size={moderateScale(50)}
              color={textColor}
              onPress={forwardAudio}
            />
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <LinearGradient
              style={styles.listView}
              colors={[colorThree, colorNine]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.listText}>ऑडिओ डाउनलोड करा</Text>
              <Icon
                name={'download-outline'}
                size={moderateScale(26)}
                color={textColor}
              />
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(12),
    backgroundColor: colorTwo,
  },
  title: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(26),
    textAlign: 'center',
    marginVertical: verticalScale(16),
    color: textColor,
    elevation: 10,
  },
  slider: {
    height: verticalScale(60),
    marginVertical: verticalScale(20),
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  listView: {
    padding: moderateScale(12),
    paddingHorizontal: horizontalScale(25),
    borderWidth: verticalScale(2),
    borderColor: colorEleven,
    borderRadius: moderateScale(28),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(28),
  },
  listText: {
    fontFamily: 'Mukta-Bold',
    fontSize: moderateScale(16),
    color: textColor,
  },
});

export default AudioPlayer;
