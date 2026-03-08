import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESURMENT_ID,
};


// Validate required Firebase configuration (browser-only)
if (typeof window !== 'undefined' && !firebaseConfig.apiKey) {
  console.warn('Firebase API key is not configured. Please check .env file.');
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchFCMToken = async () => {
  try {
     if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log("Push messaging is not supported in this browser");
      return null;
    }
    const fcmMessaging = await messaging();
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    await navigator.serviceWorker.ready;
    if (fcmMessaging && registration &&  registration.pushManager) {
      const vapidKey = process.env.REACT_APP_FIREBASE_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        console.error('Firebase VAPID key is not configured');
        return null;
      }
      const token = await getToken(fcmMessaging, {
        serviceWorkerRegistration: registration,
        vapidKey,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error('An error occurred while fetching the token:', err);
    return null;
  }
};

export { app, messaging };
