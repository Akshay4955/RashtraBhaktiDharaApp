import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import {useFirebaseData} from '../../../navigation/FirebaseProvider';
import {MainPageCss as styles} from '../../../styles/screens/MainPageCss';
import {formatData} from '../../../utils/commonUtils';
import {moderateScale} from '../../../utils/constants/Metrics';
import {
  JayatuHinduRashtram,
  ShriShivPratishthan,
  Slogan,
} from '../../../utils/constants/TextConstants';
import {textColor} from '../../../utils/constants/color';
import CustomAnimatedCarousel from '../CustomAnimatedCarousel';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const MainPage = () => {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const {firebaseData} = useFirebaseData();
  const data = firebaseData?.MainPageData;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openFullScreen = item => {
    setSelectedImage(item);
    setIsModalVisible(true);
  };

  const closeFullScreen = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback onPress={() => openFullScreen(item)}>
      <View style={styles.bannerView} key={item}>
        <Image
          source={{uri: item}}
          resizeMode="stretch"
          style={styles.bannerImage}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  const renderItemEvent = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Event', {item: item})}>
      <View style={styles.eventContainer} key={item?.title}>
        <Text style={styles.header}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
        <Text style={styles.info}>{formatData(item?.information)}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.mainView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <View style={styles.imageView}>
            <Image
              style={styles.image2}
              source={images.maharaj}
              resizeMode="stretch"
            />
            <View style={styles.logoImage}>
              <Image
                style={styles.image}
                source={images.pratishthan}
                resizeMode="stretch"
              />
              <Text style={styles.header}>{JayatuHinduRashtram}</Text>
            </View>
            <Image
              style={styles.image2}
              source={images.maharaj2}
              resizeMode="stretch"
            />
          </View>
          <Text style={styles.mainText}>{ShriShivPratishthan}</Text>
          <Text style={styles.mainText}>{Slogan}</Text>
        </View>

        {data ? (
          <>
            <CustomAnimatedCarousel
              focused={focused}
              isModalVisible={isModalVisible}
              data={data}
              renderItem={renderItem}
            />
            {data?.event ? (
              <FlatList
                data={data?.event}
                keyExtractor={item => item?.title}
                renderItem={renderItemEvent}
                showsVerticalScrollIndicator={false}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                windowSize={2}
                ListEmptyComponent={
                  <ActivityIndicator style={styles.loader} size={'large'} />
                }
              />
            ) : null}
          </>
        ) : (
          <ActivityIndicator style={styles.loader} size={'large'} />
        )}
      </ScrollView>
      {selectedImage && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          onRequestClose={closeFullScreen}>
          <View style={styles.fullScreenContainer}>
            <Image
              source={{uri: selectedImage}}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeFullScreen}>
              <Icon name="close" size={moderateScale(30)} color={textColor} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default MainPage;
