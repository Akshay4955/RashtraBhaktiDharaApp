import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {colorOne} from '../../../utils/constants/color';

const MoreTab = () => {
  const navigation = useNavigation();
  const focused = useIsFocused();
  useEffect(() => {
    if (focused) {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  }, [focused]);
  return <SafeAreaView style={{flex: 1, backgroundColor: colorOne}} />;
};

export default MoreTab;
