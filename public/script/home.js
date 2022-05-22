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
   
    if (div == null) {
        
        const body = document.getElementById("main-content")
        div = document.createElement("div")
        const h4 = document.createElement("h4")
        const p = document.createElement("p")
        const checkbox = document.createElement("label")
        const input = document.createElement("input")
        const span = document.createElement("span")

        div.setAttribute("class", "card")
        div.setAttribute("id", id)
        h4.setAttribute("class", "device-name")
        p.setAttribute("class", "device-last-on-time")
        checkbox.setAttribute("class", "switch") 
        input.setAttribute("type", "checkbox")
        span.setAttribute("class", "slider round")

        h4.innerHTML = device.val().name;
        
        if (device.val().status != 0) {
            input.checked = true
        }

        input.addEventListener('change', function () {
            if (this.checked) {
                console.log("updated value " + 100)
                updateDeviceStatus(device, 100)
                p.innerHTML = getTimeDifference(Date.now(), device.val().lastOnTime)
            } else {
                console.log("updated value " + 0)
                updateDeviceStatus(device, 0)
                p.innerHTML = ""
            }
        });
        
        checkbox.appendChild(input)
        checkbox.appendChild(span)
        body.append(div)
        div.append(h4)
        div.append(p)
        div.append(checkbox)

    } else {
        console.log(div.id)
        const p = div.children("p")
        const input = div.children("input")
        
        if (device.val().status == 0) {
            p.innerHTML = ""
            input.checked = false
        } else {
            p.innerHTML = getTimeDifference(Date.now(), device.val().lastOnTime)
            input.checked = true
        }
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

function getTimeDifference(current,prev) {
    var diff = current - prev

    var minutes = parseInt( (diff / (60 * 1000) % 60).toString)
    var hours = parseInt((diff / (60 * 60 * 1000).toString));

    var timeDiffStr = ""

    if (hours == 0 && minutes < 1) {
        timeDiffStr = ""
    } else if (hours == 0) {
        timeDiffStr = "On for last " + minutes + " min"
    } else {
        timeDiffStr = "On for last " + hours + " hrs"
    }
    return timeDiffStr
}

