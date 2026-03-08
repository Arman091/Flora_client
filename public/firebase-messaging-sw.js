importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js");

// These values should match your .env file.
firebase.initializeApp({
  apiKey: "AIzaSyAmQStl5BYaK2Egte0vrqgENXAkr0R74gE",
  authDomain: "floral-cart.firebaseapp.com",
  projectId: "floral-cart",
  storageBucket: "floral-cart.firebasestorage.app",
  messagingSenderId: "811612560770",
  appId: "1:811612560770:web:8b57a6774215a02712839b",
});
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title || 'New Message';
  const notificationOptions = {
    body: payload.notification.body || 'You have a new notification.',
    icon: '/logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


/**
 * Runs when notification clicked
 */

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
