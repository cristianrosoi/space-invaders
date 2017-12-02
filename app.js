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

var ship = null;
var shipPNG = null;
var bullets = new Array();

var invaders = new Array();
var invaderPNG = null;
var invaderBullets = new Array();


var score = 0;
var damage = 0;

var gameMode = "classic";
var gameOver = false;

function preload() {
  shipPNG = loadImage("./svg/rocket.png");
  invaderPNG = loadImage("./svg/invader.png");
  spacePNG = loadImage("./svg/space.jpg");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  ship = new Ship();

  for(let i = 0; i < window.innerWidth / 100; i++) {
    invaders.push(new Invader(i * 80 + 80, 63));
    invaders.push(new Invader(i * 80 + 80, 63 * 3));

    // if(i % 3 == 0) {
    //   invaderBullets.push( new Bullet(invaders[i].x, invaders[i].y) );
    // }

  }
}

function draw() {

  /**
   * Turn the canvas background
   */
  background(20);

  /**
   * Show the score info
   * on top left of the screen
   */
  textSize(16);
  fill(255);
  text("Score: " + score, 10, 30);
  text("damage: " + damage, width - 110, 30);

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
        score++;
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

    if(ship.hits(invaders[i])) {
      console.log("Ship HIT!!!");
      damage++;
    }
  }

  if(damage > 1000) {
    //game over
    invaders = [];
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

  for(let b = 0; b < invaderBullets.length; b++) {
    invaderBullets[b].show();
    invaderBullets[b].attack();
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

