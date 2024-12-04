import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  if (Platform.OS === 'ios') {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  } else {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }
}

export const setupNotifications = () => {
  try {
    // Background message handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background Message:', remoteMessage);
      //navigate to the detail screen
    });

    // Foreground message handler
    const messageUnsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground Message:', remoteMessage);
      //navigate to the detail screen
    });

    // Handle notification open when app is in background/quit
    const notificationUnsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened:', remoteMessage);
      //navigate to the detail screen
    });

    // Check if app was opened from a notification when app was quit
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification when app if quit:', remoteMessage);
          //navigate to the detail screen
        }
      });

    // Request permissions (will be handled by the native module)
    requestUserPermission();
    getFCMToken();

    // Return cleanup function
    return () => {
      messageUnsubscribe();
      notificationUnsubscribe();
    };
  } catch (error) {
    console.error('Error setting up notifications:', error);
    return () => {}; // Return empty cleanup function if setup fails
  }
};

export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export const unregisterFCMToken = async () => {
  try {
    await messaging().deleteToken();
    console.log('FCM Token deleted successfully');
  } catch (error) {
    console.error('Error deleting FCM token:', error);
  }
};
