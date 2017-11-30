var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');

function setCanvasBackgroundColor() {
  ctx.fillStyle = "#34495e";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}


var width = 1410;
var height = 700;
var characterWidth = 100;
var characterHeight = 70;
var xPos = width / 2 - characterWidth;
var yPos = height - characterHeight - 30;

var fps = 60;

var keyCodes = {
  "w": 87,
  "s": 83,
  "a": 65,
  "d": 68,
  "q": 81,
  "e": 69,
  "r": 82,
  "f": 70,
  "space": 32,
  "enter": 13,
  "lctrl": 17,
  "lalt": 18,
  "lshift": 16
}

var rocketIMG = "./svg/rocket.png";
var fireIMG = "./svg/fire.png";

drawing = new Image();
drawing.src = rocketIMG; // can also be a remote URL e.g. http://
drawing.onload = function() {
  ctx.drawImage(drawing, xPos, yPos);
};

function redrawCanvas(img) {
  canvas.width = canvas.width;
  drawing = new Image();
  drawing.src = img; // can also be a remote URL e.g. http://
  drawing.onload = function() {
    setInterval(function(){
      ctx.drawImage(drawing, xPos, yPos);
    }, 1000 / fps);
  };
}

function redrawFire(fire_yPos) {
  canvas.width = canvas.width;
  var rocket = new Image();
  rocket.src = rocketIMG;
  var fire = new Image();
  fire.src = fireIMG;

  rocket.onload = function() {
    setInterval(function(){
      ctx.drawImage(rocket, xPos, yPos);
    }, 1000 / fps);
  };

  fire.onload = function() {
    setInterval(function() {
      ctx.drawImage(fire, xPos + 17, fire_yPos);
    }, 1000 / fps);
  };

}

function moveLeft(event) {
  if(event.keyCode == keyCodes.a) {
    xPos -= 5;

    redrawCanvas(rocketIMG);
  }
}

function moveRight(event) {
  if(event.keyCode == keyCodes.d) {
    xPos += 5;

    redrawCanvas(rocketIMG);
  }
}

function moveUp() {
  if(event.keyCode == keyCodes.w) {
    yPos -= 5;

    redrawCanvas(rocketIMG);
  }
}

function moveDown() {
  if(event.keyCode == keyCodes.s) {
    yPos += 5;

    redrawCanvas(rocketIMG);
  }
}

fire_yPos = yPos;
fireStatus = false;

function fire(event, fire_yPos, fireStatus) {
  if (event.keyCode == keyCodes.space && fireStatus == false) {

    redrawFire(fire_yPos);
    updateFireYpos();
  }

  if (event.keyCode == keyCodes.space && fireStatus == true) {
    redrawCanvas(rocketIMG);
  }

  fireStatus = !fireStatus;
}

function updateFireYpos() {
  update_fire_yPos = setInterval(function() {
    if( fire_yPos > 0) {
      fire_yPos = fire_yPos - 50;
      redrawFire(fire_yPos);
    }

    clearInterval("update_fire_yPos");

  }, 1000 / fps);
}

document.addEventListener("keydown", function(){
  moveRight(event);
  moveLeft(event);
  moveUp(event);
  moveDown(event);
  fire(event, fire_yPos, fireStatus);
});

