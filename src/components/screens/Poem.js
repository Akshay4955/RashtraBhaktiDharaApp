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
import {moderateScale} from '../../utils/constants/Metrics';
import {
  colorNine,
  colorOne,
  colorThree,
  textColor,
} from '../../utils/constants/color';
import PoemHeader from './PoemHeader';

const Poem = ({route}) => {
  const {poem} = route?.params;
  const data = formatData(poem?.content);
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
      <PoemHeader header={poem?.title} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {poem ? (
          <Text style={styles.contentText}>{data}</Text>
        ) : (
          <ActivityIndicator size={'large'} color={colorOne} />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default Poem;
