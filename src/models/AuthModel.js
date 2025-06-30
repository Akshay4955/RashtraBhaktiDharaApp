import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Logger from '../utils/logUtility/Logger';

class AuthModel {
  async googleSignIn() {
    try {
      // Check if Google Play services are available
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Sign in and get the idToken
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = userInfo.data;
      if (!idToken) {
        throw new Error('Google Sign-In failed: No idToken returned');
      }

      // // Create Google credential with the idToken
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // // Sign in with Firebase using the Google credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      // Return the authenticated user
      return userCredential.user;
    } catch (error) {
      // Provide more detailed error messages if needed
      Logger.error('Error during Google Sign-In:', error);
      throw new Error(error.message || 'Google Sign-In failed');
    }
  }

  async signOut() {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser() {
    return auth().currentUser;
  }
}

export default new AuthModel();
