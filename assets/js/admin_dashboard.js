document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "your-api-key",
        authDomain: "your-auth-domain",
        projectId: "your-project-id",
        storageBucket: "your-storage-bucket",
        messagingSenderId: "your-messaging-sender-id",
        appId: "your-app-id"
    };
    firebase.initializeApp(firebaseConfig);

    // Check if user is logged in
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            const userId = user.uid;
            const userNameElement = document.getElementById('user-name');
            
            // Get user information from Firestore
            const db = firebase.firestore();
            db.collection('users').doc(userId).get().then(function(doc) {
                if (doc.exists) {
                    const userData = doc.data();
                    userNameElement.textContent = userData.name || 'User';
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            }).catch(function(error) {
                console.log('Error getting document:', error);
            });
        } else {
            // No user is signed in.
            window.location.href = 'login.html'; // Redirect to login page if not logged in
        }
    });
});
