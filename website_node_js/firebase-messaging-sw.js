importScripts("https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js");

// var firebaseConfig = {
//     apiKey: "AIzaSyAAHNLr2B40uA5E_2VOFvpF7VxCs_jDjmI",
//     authDomain: "baatkarteraho2007.firebaseapp.com",
//     databaseURL: "https://baatkarteraho2007.firebaseio.com",
//     projectId: "baatkarteraho2007",
//     storageBucket: "baatkarteraho2007.appspot.com",
//     messagingSenderId: "642785637257",
//     appId: "1:642785637257:web:329a9b49035881087fe758"
// };
// firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
