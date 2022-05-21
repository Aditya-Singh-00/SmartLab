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