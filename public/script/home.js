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
        console.log("something updated");
        snapshot.forEach((device) => {
            updateDeviceValue(device);
        });
    });

});

function updateDeviceValue(device) {
    const id = parseInt(device.val().id.toString())
    var div = document.getElementById(id)
    if (div != null) {
        //div.querySelector("h4").innerHTML = device.val().status
    } else {
        div = document.createElement("div")
        div.setAttribute("class", "card")
        div.setAttribute("id", id)

        var checked = false
        if (device.val().status != 0) {
            checked = true
        }

        const checkbox = document.createElement("label")
        const input = document.createElement("input")
        input.setAttribute("type","checkbox")
        input.checked = checked

        input.addEventListener('change', function() {
            if (this.checked) {
                console.log("updated value " + 100)
                updateDeviceStatus(device, 100)
            } else {
                console.log("updated value " + 0)
                updateDeviceStatus(device, 0)
            }
          });

        const span = document.createElement("span")
        span.setAttribute("class","slider round")

        checkbox.appendChild(input)
        checkbox.appendChild(span)

        const body = document.querySelector("body")
        body.append(div)
        div.append(h4)
        div.append(checkbox)

    }

}

function updateDeviceStatus(device, status) {

    var lastOnTime = device.val().lastOnTime;

    if (status == 100) {
        lastOnTime = Date.now();
    }

    firebase.database().ref('lab/' + device.val().id).set({
        id: device.val().id,
        lastOnTime: lastOnTime,
        name: device.val().name,
        status: status,
        type: device.val().type
    });
}

