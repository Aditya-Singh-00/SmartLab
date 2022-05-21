document.addEventListener('DOMContentLoaded', function () {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.firestore().doc('/foo/bar').get().then(() => { });
    // firebase.functions().httpsCallable('yourFunction')().then(() => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    // firebase.analytics(); // call to activate
    // firebase.analytics().logEvent('tutorial_completed');
    // firebase.performance(); // call to activate
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("login").style.display = "none";
            document.getElementById("logged-in").style.display = "block";
        } else {
            document.getElementById("login").style.display = "block";
            document.getElementById("logged-in").style.display = "none";
        }
    });
    
    document.getElementById("login-button").addEventListener('click',login,false);
    
    function login() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
    
            })
            .catch((error) => {
                window.alert("Error: " + error.message);
            });
    }
  });


