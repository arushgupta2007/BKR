const messaging = firebase.messaging();

messaging.usePublicVapidKey("BCn7deVrQAKZHcam_HlaOMaYi-mKLpOMvLafNu-NIxc3Uf0A0d8pfE8BmyLfIK0j9v4FQ4xToAEHWvi7jSey5bs");

messaging.requestPermission().then(() => {
    console.log("Have Permission");
}).catch((error) => {
    console.log("Opps.");
    console.log(error)
})

messaging.getToken().then((currentToken) => {
    if (currentToken) {
        console.log(currentToken);
    } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
});