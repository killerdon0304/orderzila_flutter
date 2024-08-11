importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyCu7A0xTBo4cfsHT7RbbaF2_ce3tGR-5sc",
    authDomain: "orderzila.firebaseapp.com",
    databaseURL: "https://orderzila-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "orderzila",
    storageBucket: "orderzila.appspot.com",
    messagingSenderId: "42022517446",
    appId: "1:42022517446:web:ab03b83534d45e740a35c7",
    measurementId: "G-63DSPV5RCH"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});