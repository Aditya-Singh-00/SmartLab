document.addEventListener('DOMContentLoaded', function () {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("loading").style.display = "none";
        } else {
            window.location = 'login.html';
        }
    });

    var dbRef = firebase.database().ref('lab/');
    dbRef.on('value', function (snapshot) {
        var deviceList = [] 
        snapshot.forEach((device) => {
            deviceList.push(device)
        });
        var deviceListA = deviceList.slice(0, 14)
        var deviceListB = deviceList.slice(14, 28)
        var temperatureSensor = deviceList.slice(28,29)

        deviceListA.forEach((device) => {
            updateDeviceValue(device, "A")
        });
        deviceListB.forEach((device) => {
            updateDeviceValue(device, "B")
        });
        temperatureSensor.forEach((device) =>{
            updateTemperature(device)
        });

    });

});

function updateTemperature(tempSensor) {
    var div = document.getElementById("temp")
    var roomTemperture = tempSensor.val().status
    div.innerHTML = "Room temperature is " + roomTemperture + "U+0080" + "C"
}

function updateDeviceValue(device, className) {

    const id = parseInt(device.val().id.toString())
    var div = document.getElementById(id)
    const type = device.val().type
    
    console.log("Inside update device value function")

    if (div == null) {
        const body = document.getElementById(type+"-"+className)
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
        p.setAttribute("id", id + "-p")
        checkbox.setAttribute("class", "switch")
        input.setAttribute("type", "checkbox")
        input.setAttribute("id", id + "-checkbox")
        span.setAttribute("class", "slider round")

        h4.innerHTML = device.val().name;

        if (device.val().status != 0) {
            input.checked = true
            p.innerHTML = getTimeDifference(Date.now(), device.val().lastOnTime)
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
        div.append(checkbox)
        div.append(p)

    } else {
        console.log("inside else statement")
        console.log(div.id);

        const p = div.children[div.id + "-p"]
        const input = div.children[1].children[div.id + "-checkbox"]

        if (device.val().status == 0) {
            p.innerHTML = ""
            input.checked = false
        } else {
            console.log(device.val().lastOnTime)
            console.log(Date.now())
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

function getTimeDifference(current, prev) {
    var diff = current - prev

    var minutes = Math.floor(diff / (60 * 1000) % 60)
    var hours = Math.floor(diff / (60 * 60 * 1000))

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

function showDevices(evt, deviceType, className) {
    
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent-"+className);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks-"+className);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    document.getElementById(deviceType).style.display = "grid";
    document.getElementById(deviceType).style.gridTemplateColumns = "50% 50%";
    evt.currentTarget.className += " active";
  }

