document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("login-button").addEventListener('click',login,false);
    
    function login() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location = 'home.html'
            })
            .catch((error) => {
                window.alert("Error: " + error.message);
            });
    }
  });


