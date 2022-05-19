import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD0TftQQlr--6pSMyUXzw5QT4pFM1kB-HM",
    authDomain: "smart-home-16c6c.firebaseapp.com",
    databaseURL: "https://smart-home-16c6c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smart-home-16c6c",
    storageBucket: "smart-home-16c6c.appspot.com",
    messagingSenderId: "1020150526141",
    appId: "1:1020150526141:web:d0ef2d2dd41178838447d4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.onAuthStateChanged((user) => {
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

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

        })
        .catch((error) => {
            window.alert("Error: " + error.message);
        });
}