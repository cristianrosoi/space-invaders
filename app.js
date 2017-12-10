var optionStatus = false;
var defaultShipColor = sessionStorage.getItem("shipColor");
var defaultShipModel = sessionStorage.getItem("shipModel");
var defaultShip;

if (defaultShipModel && defaultShipColor) {
  defaultShip = document.querySelector("#ship").setAttribute("src", defaultShipModel + defaultShipColor + ".png");
} else if (defaultShipColor) {
  defaultShip = document.querySelector("#ship").setAttribute("src", "./assets/art/PNG/playerShip1_" + defaultShipColor + ".png");
} else if (defaultShipModel) {
  defaultShip = document.querySelector("#ship").setAttribute("src", defaultShipModel + "blue" + ".png");
} else {
    defaultShip = document.querySelector("#ship").setAttribute("src", "./assets/art/PNG/playerShip1_" + "blue" + ".png");
}

function toggleOptions() {
  if(optionStatus == false) {
    document.querySelector(".options").style.display = "block";
    optionStatus = true;
  } else if (optionStatus) {
    document.querySelector(".options").style.display = "none";
    optionStatus = false;
  }
}

var musicVolume = "0.5";
var soundVolume = "0.5";

(function(){
  try {
    if(localStorage.getItem("musicVolume") != null) {
      musicVolume = localStorage.getItem("musicVolume");
      soundVolume = localStorage.getItem("soundVolume");

      document.querySelector("#musicVolume").value = musicVolume;
      document.querySelector("#soundVolume").value = soundVolume;
    }
  } catch (error) {
    console.error("Can't find savedSound", error);
  }
})();

function setVolume(id) {
  if(id == "musicVolume") {
    musicVolume = document.querySelector("#musicVolume").value;
  }
  else if (id == "soundVolume") {
    soundVolume = document.querySelector("#soundVolume").value;
  }
}

function defaultOptions() {
  document.querySelector("#musicVolume").value = "0.5";
  document.querySelector("#soundVolume").value = "0.5";
}

function saveOptions() {
  localStorage.setItem("musicVolume", musicVolume);
  localStorage.setItem("soundVolume", soundVolume);
  console.log("Options Saved!");
}

function startGame() {
  window.location.href = window.origin + "/space-invaders/play.html";
}

document.querySelector("#name").addEventListener("input", function() {
  var name = document.querySelector("#name").value;
  sessionStorage.setItem("name", name);
})

var keyCodes = {
  "w": 119,
  "s": 115,
  "a": 97,
  "d": 100
}

var ship_iterator = 1;
var shipColor = "blue";
var shipModel = "./assets/art/PNG/playerShip1_";

function setShipColor(col) {
  console.log(col);
  shipColor = col;
  sessionStorage.setItem("shipColor", shipColor);

  if (sessionStorage.getItem("shipModel")) {
      shipModel = sessionStorage.getItem("shipModel");
      document.querySelector("#ship").setAttribute("src", shipModel + shipColor + ".png");
  } else {
      document.querySelector("#ship").setAttribute("src", shipModel + shipColor+ ".png");
      sessionStorage.setItem("shipModel", "./assets/art/PNG/playerShip1_");
  }
}

document.body.addEventListener("keypress", function (event) {
  console.log(event.keyCode);
  if(document.querySelector("#name") !== document.activeElement) {
    sessionStorage.getItem("shipColor") ? shipColor = sessionStorage.getItem("shipColor") : shipColor = "blue";
    shipColorList = ["blue", "green", "orange", "red"]; // not needed
    shipList = [
      "./assets/art/PNG/playerShip1_",
      "./assets/art/PNG/playerShip2_",
      "./assets/art/PNG/playerShip3_"
    ];

    document.querySelector("#ship").setAttribute("src", shipList[ship_iterator] + shipColor + ".png");

    if(event.keyCode == keyCodes.d) {
      shipModel = shipList[ship_iterator];
      sessionStorage.setItem("shipModel", shipModel);

      if(ship_iterator < shipList.length - 1) {
        ship_iterator++;
      }

    }

    if(event.keyCode == keyCodes.a) {
      shipModel = shipList[ship_iterator];
      sessionStorage.setItem("shipModel", shipModel);
      if(ship_iterator > 0) {
        ship_iterator--;
      }

    }
  }

});
