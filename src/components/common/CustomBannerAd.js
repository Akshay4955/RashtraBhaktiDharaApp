import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import Logger from '../../utils/logUtility/Logger';

const PROD_AD_UNIT_ID = 'ca-app-pub-2249316745492384/6186159072';
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : PROD_AD_UNIT_ID;

const RETRY_DELAYS = [15000, 30000, 60000, 120000];

// Module-level constant — avoids passing a new object reference to the
// native bridge on every render.
const REQUEST_OPTIONS = {
  requestNonPersonalizedAdsOnly: false,
  keywords: [
    'bhakti',
    'devotional',
    'spiritual',
    'religion',
    'mantra',
    'temple',
    'hindu',
    'prayer',
    'india',
    'festival',
  ],
};

let instanceCounter = 0;

/**
 * Per-screen banner ad. Each screen mounting this gets its own fresh
 * impression opportunity on mount, PLUS AdMob's own server-configured
 * refresh interval (e.g. 30s) continues to fire for as long as the
 * screen/component stays mounted (e.g. Shlok reading screen, AudioPlayer).
 *
 * This intentionally does NOT throttle/block the initial mount-triggered
 * request — per-screen mounting is the main lever for total impression
 * count across a navigation-heavy app. Match rate / fill rate is instead
 * addressed at the AdMob Mediation layer (see mediation setup), not by
 * suppressing requests here.
 */
const CustomBannerAd = () => {
  const instanceIdRef = useRef(++instanceCounter);
  const [isAdVisible, setIsAdVisible] = useState(true);
  const [adKey, setAdKey] = useState(0);
  const retryCountRef = useRef(0);
  const retryTimerRef = useRef(null);

  const tag = `[CustomBannerAd #${instanceIdRef.current}]`;

  useEffect(() => {
    if (__DEV__) console.log(`${tag} mounted`);
    return () => {
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      if (__DEV__) console.log(`${tag} unmounted`);
    };
  }, []);

  const handleAdLoaded = useCallback(() => {
    if (__DEV__) console.log(`${tag} ad loaded`);
    retryCountRef.current = 0;
    setIsAdVisible(true);
  }, [tag]);

  const handleAdFailed = useCallback(
    error => {
      const attempt = retryCountRef.current + 1;
      Logger.error(
        `${tag} failed (attempt ${attempt}):`,
        error?.message ?? error,
      );
      if (__DEV__) {
        console.log(
          `${tag} ad failed attempt ${attempt}/${RETRY_DELAYS.length}:`,
          error?.message ?? error,
        );
      }

      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);

      // Retry-after-FAILURE only. Never blocks the initial mount request.
      if (retryCountRef.current < RETRY_DELAYS.length) {
        const delay = RETRY_DELAYS[retryCountRef.current];
        retryTimerRef.current = setTimeout(() => {
          retryCountRef.current += 1;
          setAdKey(prev => prev + 1);
        }, delay);
      } else {
        setIsAdVisible(false);
      }
    },
    [tag],
  );

  if (!isAdVisible) return null;

  return (
    <BannerAd
      key={adKey}
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      onAdLoaded={handleAdLoaded}
      onAdFailedToLoad={handleAdFailed}
      requestOptions={REQUEST_OPTIONS}
    />
  );
};

export default CustomBannerAd;
