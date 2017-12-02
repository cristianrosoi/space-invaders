{
  // var width = 1410;
  // var height = 700;
  // var characterWidth = 100;
  // var characterHeight = 70;
  // var xPos = width / 2 - characterWidth;
  // var yPos = height - characterHeight - 30;

  // var fps = 30;

  // var rocketIMG = "./svg/rocket.png";
  // var fireIMG = "./svg/fire.png";
}


/**
 * Youtube Tutorial
 */

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

var ship;
var invaders = new Array();
var bullets = new Array();

var shipPNG;
function preload() {
  shipPNG = loadImage("./svg/rocket.png");
}

function setup() {
  createCanvas(640, 480);

  ship = new Ship();

  for(let i = 0; i < 6; i++) {
    invaders.push(new Invader(i * 80 + 80, 60));
  }

}

function draw() {

  /**
   * Turn the canvas background
   */
  background(51);

  /**
   * Appplying the show method from the ship class
   * will allow the ship to be displayed on canvas
   */
  ship.show();
  ship.move();

  /**
   * Shooting bullets whenever the user is
   * pressing the spacebar
   */
  for(let b = 0; b < bullets.length; b++) {
    bullets[b].show();
    bullets[b].move();

    for(let i = 0; i < invaders.length; i++) {
      if(bullets[b].hits(invaders[i])) {
        bullets[b].removeIt();
        invaders[i].removeIt();

        console.log("impact!!!");
      }
    }
  }

  for(let b = bullets.length - 1; b >= 0; b--) {
    if(bullets[b].toRemove) {
      bullets.splice(b, 1);
    }
  }

  for(let i = invaders.length - 1; i >= 0; i--) {
    if(invaders[i].toRemove) {
      invaders.splice(i, 1);
    }
  }

  /**
   * Show the invaders on the canvas
   */
  var edge = false;
  for(let i = 0; i < invaders.length; i++) {
    invaders[i].show();
    invaders[i].move();
    if(invaders[i].x > width || invaders[i].x < 0) {
      edge = true;
    }
  }

  if(edge) {
    for(let i = 0; i < invaders.length; i++) {
      invaders[i].shiftDown();
    }
  }

}

function keyPressed() {
  if(keyCode == keyCodes.d) {
    ship.setDirection(1);
  } else if(keyCode == keyCodes.a) {
    ship.setDirection(-1);
  }

  if(keyCode == keyCodes.space) {
    bullets.push( new Bullet(ship.x, height - 60) );
  }
}

function keyReleased() {
  if(keyCode != keyCodes.space) {
    ship.setDirection(0);
  }
}

