import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {textColor} from '../../utils/constants/color';
import {moderateScale, verticalScale} from '../../utils/constants/Metrics';
import Logger from '../../utils/logUtility/Logger';
import {REQUEST_OPTIONS} from './CustomBannerAd';

// TODO: replace with a dedicated banner ad unit created in AdMob for inline
// placements, so its earnings are reported separately from the anchored banner.
const PROD_INLINE_AD_UNIT_ID = 'ca-app-pub-2249316745492384/6186159072';
const adUnitId = __DEV__ ? TestIds.BANNER : PROD_INLINE_AD_UNIT_ID;

const AD_LABEL = 'जाहिरात';
const MREC_HEIGHT = 250;

export const INLINE_AD_INTERVAL = 5;

/**
 * True when an inline ad should be rendered after the item at `index`:
 * after every `interval` items, but never after the last item.
 */
export const isInlineAdSlot = (index, total, interval = INLINE_AD_INTERVAL) =>
  (index + 1) % interval === 0 && index < total - 1;

/**
 * 300x250 medium rectangle shown inside scrolling content. Space is reserved
 * while loading so list rows don't jump under the user's finger when the ad
 * arrives; on failure the slot collapses entirely (no retry — the anchored
 * CustomBannerAd already handles retries).
 */
const InlineBannerAd = ({style}) => {
  const [isFailed, setIsFailed] = useState(false);

  const handleAdFailed = useCallback(error => {
    Logger.error('[InlineBannerAd] failed:', error?.message ?? error);
    setIsFailed(true);
  }, []);

  if (isFailed) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{AD_LABEL}</Text>
      <View style={styles.adSlot}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          onAdFailedToLoad={handleAdFailed}
          requestOptions={REQUEST_OPTIONS}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  label: {
    fontSize: moderateScale(14),
    fontFamily: 'Mukta-Bold',
    color: textColor,
    opacity: 0.7,
    marginBottom: verticalScale(2),
  },
  adSlot: {
    minHeight: MREC_HEIGHT,
    justifyContent: 'center',
  },
});

export default InlineBannerAd;
