/**
 * Notification Navigation Service
 * Handles deep linking from push notifications to specific screens
 *
 * USAGE:
 * Send notification with this data structure:
 * {
 *   "data": {
 *     "screen": "Parayan",
 *     "params": "{\"poem\": {\"title\": \"श्लोक\", \"content\": \"...\"}}"
 *   }
 * }
 *
 * AVAILABLE SCREENS:
 * - Drawer screens: Home, MainPage, Parayan, Padyas, Sloks, Profile, ContactUs, GadkotMohima, Books, BhushanChhand
 * - Stack screens: Shlok, Poem, Audio, Event
 *
 * SCREEN PARAMETERS:
 * - Shlok: {"poem": {title, content, id}}
 * - Poem: {"poem": {title, content, author}}
 * - Audio: {"url": "...", "title": "..."}
 * - Event: {"item": {title, subtitle, information}}
 * - Others: No params required (or custom params)
 */

import Logger from './logUtility/Logger';

// Maps notification screen names to actual screen routes
// For drawer screens (nested), use object format: {parent, screen}
// For stack screens (direct), use string format
const SCREEN_MAPPING = {
  // Home/Main screens
  Home: 'DrawerNavigation',
  MainPage: {parent: 'DrawerNavigation', screen: 'मुख्य पृष्ठ'},

  // Drawer screens (nested navigation)
  Parayan: {parent: 'DrawerNavigation', screen: 'श्री शिवचरित्र पारायण'},
  Padyas: {parent: 'DrawerNavigation', screen: 'पद्य'},
  Sloks: {parent: 'DrawerNavigation', screen: 'श्लोक'},
  Profile: {parent: 'DrawerNavigation', screen: 'प्रोफाइल'},
  ContactUs: {parent: 'DrawerNavigation', screen: 'संपर्क साधा'},
  GadkotMohima: {parent: 'DrawerNavigation', screen: 'आजवर झालेल्या गडकोट मोहिमा'},
  Books: {parent: 'DrawerNavigation', screen: 'ऐतिहासिक संदर्भ ग्रंथ'},
  BhushanChhand: {parent: 'DrawerNavigation', screen: 'कवी भूषण छंद'},

  // Stack screens (direct navigation)
  Shlok: 'Shlok',
  Poem: 'Poem',
  Audio: 'Audio',
  Event: 'Event',
};

// Default fallback screen
const FALLBACK_SCREEN = 'DrawerNavigation';

/**
 * Handle navigation from push notification
 * @param {Object} remoteMessage - FCM remote message object
 * @param {Object} navigationRef - React Navigation reference
 */
export const handleNotificationNavigation = (remoteMessage, navigationRef) => {
  try {
    if (!remoteMessage || !remoteMessage.data) {
      Logger.log('No notification data available');
      navigateToFallback(navigationRef);
      return;
    }

    const {screen, params} = remoteMessage.data;

    if (!screen) {
      Logger.log('No screen specified in notification, navigating to home');
      navigateToFallback(navigationRef);
      return;
    }

    const targetScreen = SCREEN_MAPPING[screen];
    if (!targetScreen) {
      Logger.warn(`Unknown screen: ${screen}, navigating to home`);
      navigateToFallback(navigationRef);
      return;
    }

    // Parse params if it's a JSON string
    // Expected format: params = '{"poem": {"title": "...", "content": "..."}}'
    // Or: params = '{"url": "...", "title": "..."}'
    let parsedParams = {};
    if (params) {
      try {
        parsedParams =
          typeof params === 'string' ? JSON.parse(params) : params;
        Logger.log('Parsed notification params:', parsedParams);
      } catch (e) {
        Logger.error('Failed to parse notification params:', e);
      }
    }

    // Navigate using the navigation reference
    if (navigationRef.current?.isReady()) {
      Logger.log(`Navigating to screen: ${targetScreen}`, parsedParams);
      
      // Check if target is nested navigation (object) or direct (string)
      if (typeof targetScreen === 'object' && targetScreen.parent) {
        // Nested navigation: navigate to parent, then to nested screen
        navigationRef.current.navigate(targetScreen.parent, {
          screen: targetScreen.screen,
          params: parsedParams,
        });
        Logger.log(
          `Nested navigation: ${targetScreen.parent} -> ${targetScreen.screen}`,
        );
      } else {
        // Direct navigation to stack screen
        navigationRef.current.navigate(targetScreen, parsedParams);
        Logger.log(`Direct navigation to: ${targetScreen}`);
      }
    } else {
      Logger.warn('Navigation not ready, navigating to fallback');
      navigateToFallback(navigationRef);
    }
  } catch (error) {
    Logger.error('Notification navigation error:', error);
    navigateToFallback(navigationRef);
  }
};

/**
 * Navigate to fallback screen (Home)
 * @param {Object} navigationRef - React Navigation reference
 */
const navigateToFallback = navigationRef => {
  try {
    if (navigationRef.current?.isReady()) {
      navigationRef.current.navigate(FALLBACK_SCREEN);
      Logger.log(`Navigated to fallback screen: ${FALLBACK_SCREEN}`);
    }
  } catch (error) {
    Logger.error('Failed to navigate to fallback:', error);
  }
};
