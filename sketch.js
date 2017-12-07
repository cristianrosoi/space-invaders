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

var meteor = null;

var bullets = new Array();

var invaders = new Array();
var invaderPNG = null;
var invaderBullets = new Array();


var score = 0;
var damage = 0;

var gameMode = "classic";
var gameOver = false;

function preload() {
  shipPNG = loadImage("./assets/art/PNG/playerShip1_red.png");
  shipDistroyedPNG = loadImage("./assets/art/PNG/Damage/playerShip1_damage3.png")
  invaderPNG = loadImage("./assets/art/PNG/Enemies/enemyBlue2.png");
  starsPNG = loadImage("./assets/stars.jpg");
  starsPNG_1080p = loadImage("./assets/stars_1080p.jpg");
  meteorPNG = loadImage("./assets/art/PNG/Meteors/meteorBrown_big2.png");

  explosionGIF = loadImage("./assets/effects/explosion.gif");

  soundFormats('mp3', 'ogg');
  explosionSound = loadSound('./assets/sounds/explosion.mp3');
  laserSound = loadSound('./assets/sounds/laser.mp3');
  music = loadSound('./assets/sounds/music.mp3');
}

function setup() {
  imageMode(CENTER);
  createCanvas(displayWidth, displayHeight);
  music.play();

  ship = new Ship();
   
  meteor1 = new Meteor(random(0, width), 100); 
  meteor2 = new Meteor(random(0, width), 100);
  meteor3 = new Meteor(random(0, width), 100);

  for(let i = 0; i < 7; i++) {
    invaders.push(new Invader(i * 175 + 80, 63));
    invaders.push(new Invader(i * 175 + 80, 60 * 3));

    // if(i % 3 == 0) {
    //   invaderBullets.push( new Bullet(invaders[i].x, invaders[i].y) );
    // }

  }

  
}

function draw() {
 //createCanvas(window.innerWidth, window.innerHeight);
  image(starsPNG_1080p, displayWidth/2, displayHeight/2);

  /**
   * Turn the canvas background
   */
 
  //image(starsPNG_1080p, 700, 400);

  /**
   * Show the score info
   * on top left of the screen
   */
  textSize(16);
  fill(255);
  text("Score: " + score, 10, 30);
  text("damage: " + damage, 10, height - 30);

  /**
   * Appplying the show method from the ship class
   * will allow the ship to be displayed on canvas
   */
  ship.show();
  ship.move();

  meteor1.show();
  meteor1.fall();

  setTimeout(function(){
    meteor2.show();
    meteor2.fall();
  })
  

  meteor3.show();
  meteor3.fall();

  if(meteor1.y > height) {
    meteor1.y = 0;
  }

  if(meteor2.y > height) {
    meteor2.y = 0;
  }

  if(meteor3.y > height) {
    meteor3.y = 0;
  }

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
        invaders[i].explode();
        score++;
      }
    }
  }

  for(let b = bullets.length - 1; b >= 0; b--) {
    if(bullets[b].toRemove) {
      bullets.splice(b, 1);
    }
  }

  for(let b = invaderBullets.length - 1; b >= 0; b-- ) {
    if(invaderBullets[b].toRemove) {
      invaderBullets.splice(b, 1);
      damage += 150;
    }
  }

  for(let i = invaders.length - 1; i >= 0; i--) {
    if(invaders[i].toRemove) {
      invaders.splice(i, 1);
    }
  }

  for(let i = 0; i < invaders.length; i++) {
    if(ship.hits(invaders[i])) {
      console.log("Ship HIT!!!");
      damage++;
    }
  }

  if(damage >= 450) {
    //game over
    invaders = [];
    image(starsPNG_1080p, displayWidth/2, displayHeight/2);
    var damagedShip = new DamagedShip(ship.x, ship.y);
    damagedShip.show();
    noLoop();
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

    if(invaderBullets[b].hits(ship)) {
      invaderBullets[b].removeIt();
      console.log("SHIP WAS HIT BY BULLET!!");
    }
  }

  if(edge) {
    for(let i = 0; i < invaders.length; i++) {
      invaders[i].shiftDown();
      if(i % 3 == 0) {
        invaderBullets.push(new Bullet(invaders[i].x, invaders[i].y));
      }
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
    laserSound.play();
  }
}

function keyReleased() {
  if(keyCode != keyCodes.space) {
    ship.setDirection(0);
  }
}

