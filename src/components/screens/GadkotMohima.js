import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFirebaseData} from '../../navigation/FirebaseProvider';
import {
  colorNine,
  colorOne,
  colorThree,
  textColor,
} from '../../utils/constants/color';
import {moderateScale, verticalScale} from '../../utils/constants/Metrics';
import {Headers, Texts} from '../../utils/constants/TextConstants';
import CustomBannerAd from '../common/CustomBannerAd';
import ListHeader from '../common/ListHeader';

const GadkotMohima = () => {
  const {firebaseData} = useFirebaseData();
  const gadkotData = firebaseData?.GadkotMohima || [];

  const renderItem = ({item, index}) => {
    return (
      <LinearGradient
        style={styles.listView}
        colors={[colorThree, colorNine]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{Texts.mohimPeriod} </Text>
          <Text style={styles.description}>{item?.year}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{Texts.mohimPath} </Text>
          <Text style={styles.description}>{item?.mohim}</Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ListHeader header={Headers.GadkotMohima} />
      <FlatList
        data={gadkotData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <CustomBannerAd />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorOne,
  },
  listContainer: {
    padding: moderateScale(16),
    paddingBottom: verticalScale(80),
  },
  listView: {
    marginBottom: verticalScale(16),
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: 'Mukta-Bold',
    color: textColor,
    flexShrink: 0,
  },
  description: {
    fontSize: moderateScale(18),
    fontFamily: 'Mukta-Medium',
    color: textColor,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default GadkotMohima;
