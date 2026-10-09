
import { useEffect, useRef, useState } from 'react';
import { onMessage } from 'firebase/messaging';
import { fetchFCMToken, messaging } from './firebase';
import { useNavigate } from "react-router-dom";
import { HOME } from "../constants/routes";
const useFcmToken = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  // for in-app notification if chrome popup is closed
  const [latestNotification, setLatestNotification] = useState(null);
  const notificationTimerRef = useRef(null);

  const retryCount = useRef(0);
  const loading = useRef(false);

  // Request notification permission and get FCM token
  const getPermissionAndToken = async () => {
    if (!('Notification' in window)) {
      console.log('Browser does not support notifications');
      return null;
    }

    // If already granted
    if (Notification.permission === 'granted') {
      return await fetchFCMToken();
    }

    // Ask user for permission
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        return await fetchFCMToken();
      }
    }

    return null;
  };

  // Load token with retry mechanism
  const loadToken = async () => {
    if (loading.current) return;

    loading.current = true;

    const newToken = await getPermissionAndToken();

    // User blocked notifications
    if (Notification.permission === 'denied') {
      setPermissionStatus('denied');
      loading.current = false;
      return;
    }

    // Retry if token not received
    if (!newToken) {
      if (retryCount.current < 3) {
        retryCount.current += 1;
        loading.current = false;
        return loadToken();
      }

      console.log('FCM token could not be generated');
      loading.current = false;
      return;
    }
    // Success
    setPermissionStatus(Notification.permission);
    setToken(newToken);

    loading.current = false;
  };

  // Run on component mount
  useEffect(() => {
    loadToken();
  }, []);

  // Foreground notification listener
  useEffect(() => {
    if (!token) return;

    const setupListener = async () => {
      const m = await messaging();
      if (!m) return;

      const unsubscribe = onMessage(m, (payload) => {
        console.log('Foreground notification received:', payload);

        if (Notification.permission !== 'granted') return;

        const link =
          payload?.fcmOptions?.link || payload?.data?.link || HOME;

        const title = payload?.notification?.title || 'New Notification';
        const body = payload?.notification?.body || 'You have a new message';

        const notification = new Notification(title, {
          body,
          data: { url: link }
        });

        // Update in-app notification state
        setLatestNotification({ title, body, link });

        // Auto-clear after 5 seconds
        if (notificationTimerRef.current) {
          clearTimeout(notificationTimerRef.current);
        }
        notificationTimerRef.current = setTimeout(() => {
          setLatestNotification(null);
          notificationTimerRef.current = null;
        }, 5000);

        notification.onclick = (event) => {
          window.focus();
          notification.close();
          navigate(link);
        };
      });

      return unsubscribe;
    };

    let unsubscribe;

    setupListener().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };

  }, [token, navigate]);

  return {
    token,
    permissionStatus,
    latestNotification,
  };
};

export default useFcmToken;