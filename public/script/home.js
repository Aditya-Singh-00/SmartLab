document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("main-content").style.display = "none";

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("loading").style.display = "none";
            document.getElementById("main-content").style.display = "block";
        } else {
            window.location = 'login.html';
        }
    });

    var dbRef = firebase.database().ref('lab/');
    dbRef.on('value', function (snapshot) {
        updateDeviceValue(snapshot.val());
    });

});

function updateDeviceValue(device) {
    const id = parseInt(device.val().id.toString())
    var div = document.getElementById(id)
    if (div != null) {
        div.querySelector("h4").innerHTML = device.val().status
    } else {
        div = document.createElement("div")
        div.setAttribute("class", "card")
        div.setAttribute("id", id)
        const h4 = document.createElement("h4")
        div.append(h4)
        const body = document.querySelector("body")
        body.append(div)
        h4.addEventListener('click', function (event) {
            if (device.val().status == 0) {
                console.log("updated value" + 100)
                updateDeviceStatus(id, 100)
            } else {
                console.log("updated value " + 0)
                updateDeviceStatus(id, 0)
            }
        });
        h4.innerHTML = device.val().status
    }

}

function updateDeviceStatus(id, status) {
    firebase.database().ref('lab/' + id).set({
        status: status
    });
}
