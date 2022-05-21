document.addEventListener('DOMContentLoaded', function () {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

        } else {
            window.location = 'login.html';
        }
    });
    
  });


