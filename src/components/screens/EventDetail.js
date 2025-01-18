import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {PoemCss as styles} from '../../styles/screens/PoemCss';
import {formatData} from '../../utils/commonUtils';
import {
  colorNine,
  colorOne,
  colorThree,
  textColor,
} from '../../utils/constants/color';
import {moderateScale} from '../../utils/constants/Metrics';

const EventDetail = ({route}) => {
  const {item} = route?.params;
  const data = formatData(item?.information);
  const navigation = useNavigation();
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {item ? (
          <>
            <Text style={styles.eventTitle}>{item?.title}</Text>
            <Text style={styles.eventSubTitle}>{item?.subtitle}</Text>
            <Text style={styles.eventData}>{data}</Text>
          </>
        ) : (
          <ActivityIndicator size={'large'} color={colorOne} />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default EventDetail;
