document.addEventListener('DOMContentLoaded', function () {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location = 'home.html';
        } else {
            window.location = 'login.html';
        }
    });
  });
