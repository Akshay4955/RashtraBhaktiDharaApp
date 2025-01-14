import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFirebaseData} from '../../navigation/FirebaseProvider';
import {ListCss as styles} from '../../styles/screens/ListCss';
import {colorNine, colorThree, textColor} from '../../utils/constants/color';
import {moderateScale} from '../../utils/constants/Metrics';
import {Headers} from '../../utils/constants/TextConstants';
import ListHeader from '../common/ListHeader';

const PadyaList = () => {
  const navigation = useNavigation();
  const {firebaseData} = useFirebaseData();
  const data = firebaseData?.Padya;
  const [searchQuery, setSearchQuery] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    if (searchQuery) {
      scrollToMatchingIndex();
    }
  }, [searchQuery]);

  const scrollToMatchingIndex = () => {
    const index = data.findIndex(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({animated: true, index});
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Poem', {poem: item})}>
        <LinearGradient
          style={styles.listView}
          colors={[colorThree, colorNine]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.listText}>{item.title}</Text>
          <Icon
            name={'chevron-forward'}
            size={moderateScale(26)}
            color={textColor}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <ListHeader header={Headers.Padya} />
      <TextInput
        style={styles.searchInput}
        placeholder="शोधा...!!!"
        placeholderTextColor={textColor}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      {data.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={item => item?.title}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={12}
          windowSize={10}
          ListFooterComponent={<View style={styles.footer} />}
        />
      ) : (
        <ActivityIndicator size={'large'} color={colorNine} />
      )}
    </SafeAreaView>
  );
};

export default PadyaList;
