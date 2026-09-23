import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {showInterstitialIfEligible} from '../services/interstitialAdService';

// Skip the ad if the user backs out quickly (e.g. opened the wrong item).
const MIN_SCREEN_TIME_MS = 15000;

/**
 * Offers an interstitial when this screen is popped (back button, hardware
 * back or gesture), i.e. as the user returns to the list they came from.
 */
const useInterstitialOnLeave = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const enteredAt = Date.now();
    return navigation.addListener('beforeRemove', () => {
      if (Date.now() - enteredAt >= MIN_SCREEN_TIME_MS) {
        showInterstitialIfEligible();
      }
    });
  }, [navigation]);
};

export default useInterstitialOnLeave;
