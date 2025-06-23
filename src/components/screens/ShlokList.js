import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFirebaseData} from '../../navigation/FirebaseProvider';
import {ListCss as styles} from '../../styles/screens/ListCss';
import {colorNine, colorThree, textColor} from '../../utils/constants/color';
import {moderateScale} from '../../utils/constants/Metrics';
import {Headers} from '../../utils/constants/TextConstants';
import ListHeader from '../common/ListHeader';

const ShlokList = () => {
  const navigation = useNavigation();
  const {firebaseData} = useFirebaseData();
  const data = firebaseData?.Shlok;

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.navigate('Shlok', {poem: item})}>
          <LinearGradient
            style={styles.listView}
            colors={[colorThree, colorNine]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.listText}>{item?.title}</Text>
            {item?.audio ? (
              <Icon
                name={'play-circle-sharp'}
                size={moderateScale(36)}
                color={textColor}
                onPress={() =>
                  navigation.navigate('Audio', {
                    url: item?.audio,
                    title: item?.title,
                  })
                }
              />
            ) : null}
          </LinearGradient>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <ListHeader header={Headers.Shlok} />
      {data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item?.title}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={12}
          windowSize={10}
          ListEmptyComponent={
            <ActivityIndicator size={'large'} color={colorNine} />
          }
        />
      ) : (
        <ActivityIndicator size={'large'} color={colorNine} />
      )}
    </SafeAreaView>
  );
};

export default ShlokList;
