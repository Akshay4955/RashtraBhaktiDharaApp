import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import {REQUEST_OPTIONS} from '../components/common/CustomBannerAd';
import Logger from '../utils/logUtility/Logger';

// TODO: create an Interstitial ad unit in AdMob and paste its ID here.
// Interstitials stay disabled in release builds until this is set.
const PROD_INTERSTITIAL_AD_UNIT_ID = 'ca-app-pub-2249316745492384/1812843291';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : PROD_INTERSTITIAL_AD_UNIT_ID;

// Frequency caps — showing interstitials more often hurts ratings and risks
// AdMob policy action.
const MIN_INTERVAL_MS = 3 * 60 * 1000;
const SESSION_GRACE_MS = 60 * 1000;

const RETRY_DELAYS = [30000, 60000, 120000, 300000];

const sessionStartedAt = Date.now();
let interstitial = null;
let isLoaded = false;
let isLoading = false;
let isShowing = false;
let lastShownAt = 0;
let retryCount = 0;
let retryTimer = null;

const loadAd = () => {
  if (!interstitial || isLoaded || isLoading) {
    return;
  }
  isLoading = true;
  interstitial.load();
};

const scheduleRetry = () => {
  if (retryTimer || retryCount >= RETRY_DELAYS.length) {
    return;
  }
  retryTimer = setTimeout(() => {
    retryTimer = null;
    retryCount += 1;
    loadAd();
  }, RETRY_DELAYS[retryCount]);
};

/**
 * Creates the interstitial and preloads the first ad. Call once, after
 * MobileAds().initialize() resolves.
 */
export const initInterstitial = () => {
  if (!adUnitId || interstitial) {
    return;
  }
  interstitial = InterstitialAd.createForAdRequest(adUnitId, REQUEST_OPTIONS);

  interstitial.addAdEventListener(AdEventType.LOADED, () => {
    isLoaded = true;
    isLoading = false;
    retryCount = 0;
  });

  interstitial.addAdEventListener(AdEventType.ERROR, error => {
    Logger.error('[Interstitial] load failed:', error?.message ?? error);
    isLoaded = false;
    isLoading = false;
    scheduleRetry();
  });

  interstitial.addAdEventListener(AdEventType.CLOSED, () => {
    isShowing = false;
    isLoaded = false;
    loadAd();
  });

  loadAd();
};

/**
 * Shows the preloaded interstitial if the frequency caps allow it. Never
 * waits for an ad to load — if none is ready, it just kicks off a load for
 * next time. Returns true when an ad was shown.
 */
export const showInterstitialIfEligible = () => {
  if (!interstitial || isShowing) {
    return false;
  }

  const now = Date.now();
  if (
    now - sessionStartedAt < SESSION_GRACE_MS ||
    now - lastShownAt < MIN_INTERVAL_MS
  ) {
    return false;
  }

  if (!isLoaded) {
    // Retries may have run out earlier in the session; start fresh.
    if (!retryTimer) {
      retryCount = 0;
      loadAd();
    }
    return false;
  }

  isShowing = true;
  lastShownAt = now;
  interstitial.show().catch(error => {
    Logger.error('[Interstitial] show failed:', error?.message ?? error);
    isShowing = false;
    isLoaded = false;
    loadAd();
  });
  return true;
};
