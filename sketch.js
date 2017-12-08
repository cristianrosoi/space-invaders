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

var meteorites = new Array();

var bullets = new Array();

var bonus = new Array();

var invaders = new Array();
var invaderPNG = null;
var invaderBullets = new Array();


var score = 0;
var damage = 0;

var gameMode = "classic";
var gameOver = false;

var timer = 0;

var isBonus = 0;

function preload() {
    /**
     * Load Assets: images, sounds, gifs
     */
    shipPNG = loadImage("./assets/art/PNG/playerShip1_red.png");
    shipDistroyedPNG = loadImage("./assets/art/PNG/Damage/playerShip1_damage3.png")
    invaderPNG = loadImage("./assets/art/PNG/Enemies/enemyBlue2.png");
    starsPNG = loadImage("./assets/stars.jpg");
    starsPNG_1080p = loadImage("./assets/stars_1080p.jpg");
    meteorPNG = loadImage("./assets/art/PNG/Meteors/meteorBrown_big2.png");
    bulletGreen = loadImage("./assets/art/PNG/Lasers/laserGreen02.png")

    explosionGIF = loadImage("./assets/effects/explosion.gif");

    soundFormats('mp3', 'ogg');
    explosionSound = loadSound('./assets/sounds/explosion.mp3');
    laserSound = loadSound('./assets/sounds/laser.mp3');
    laserSound2 = loadSound('./assets/art/Bonus/sfx_laser1.ogg');
    music = loadSound('./assets/sounds/music.mp3');
}

function setup() {
    imageMode(CENTER);
    createCanvas(displayWidth, displayHeight);
    music.play();

    ship = new Ship();

    for (let i = 0; i < 7; i++) {
        invaders.push(new Invader(i * 175 + 80, 63));
        invaders.push(new Invader(i * 175 + 80, 60 * 3));

        if (i % 7 == 0) {
            meteorites.push(new Meteor(random(0, width), 100));
        }

    }

}

function draw() {

    //background
    image(starsPNG_1080p, displayWidth / 2, displayHeight / 2);

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

    timer++;

    for (let meteor of meteorites) {

        meteor.show();
        meteor.fall();
        meteor.wiggle();

        if (meteor.y > height) {
            meteor.y = 0;
        }

        if (timer > 100000) {
            timer = 0;
        }
    }



    /**
     * Shooting bullets whenever the user is
     * pressing the spacebar
     */
    for (let b = 0; b < bullets.length; b++) {
        bullets[b].show();
        bullets[b].move();

        for (let i = 0; i < invaders.length; i++) {
            if (bullets[b].hits(invaders[i])) {
                bullets[b].removeIt();
                invaders[i].removeIt();
                invaders[i].explode();
                score++;
                isBonus++;

            }
        }
    }

    for (let bonus = 0; bonus < bonus.length; bonus++) {
        bonus[bonus].show();
        bonus[bonus].move();

    }

    for (let b = bullets.length - 1; b >= 0; b--) {
        if (bullets[b].toRemove) {
            bullets.splice(b, 1);
        }
    }

    for (let b = invaderBullets.length - 1; b >= 0; b--) {
        if (invaderBullets[b].toRemove) {
            invaderBullets.splice(b, 1);
            damage += 150;
        }
    }

    for (let i = invaders.length - 1; i >= 0; i--) {
        if (invaders[i].toRemove) {
            invaders.splice(i, 1);
        }
    }

    for (let i = 0; i < invaders.length; i++) {
        if (ship.hits(invaders[i])) {
            console.log("Ship HIT!!!");
            damage++;
        }
    }

    if (damage >= 450) {
        /**
         * Game Over
         */
        invaders = [];
        image(starsPNG_1080p, displayWidth / 2, displayHeight / 2);

        var damagedShip = new DamagedShip(ship.x, ship.y);
        damagedShip.show();

        //Stop the draw function
        noLoop();
    }
    /**
     * Show the invaders on the canvas
     */
    var edge = false;
    for (let i = 0; i < invaders.length; i++) {
        invaders[i].show();
        invaders[i].move();

        if (invaders[i].x > width || invaders[i].x < 0) {
            edge = true;
        }
    }

    for (let b = 0; b < invaderBullets.length; b++) {
        invaderBullets[b].show();
        invaderBullets[b].attack();

        if (invaderBullets[b].hits(ship)) {
            invaderBullets[b].removeIt();
            console.log("SHIP WAS HIT BY BULLET!!");
        }
    }

    if (edge) {
        for (let i = 0; i < invaders.length; i++) {
            invaders[i].shiftDown();
            if (i % 3 == 0) {
                invaderBullets.push(new Bullet(invaders[i].x, invaders[i].y));
            }
        }
    }

    movement();
}

/**
 * Events
 */

function keyPressed() {
    // if (keyCode == keyCodes.d) {
    //     ship.setDirection(1);
    // } else if (keyCode == keyCodes.a) {
    //     ship.setDirection(-1);
    // }

    if (keyCode == keyCodes.space) {
        dropBoost()

    }
}

function keyReleased() {
    if (keyCode != keyCodes.space) {
        ship.setDirection(0);
    }
}

function movement() {
    if (keyIsDown(65)) {
        ship.setDirection(-1);
    } else if (keyIsDown(68)) {
        ship.setDirection(+1)
    } else ship.setDirection(0);
}

function dropBoost() {
    if (isBonus > 3) {
        bullets.push(new Bullet2(ship.x, height - 60));
        //laserSound.play();
        laserSound2.play();


    } else {
        bullets.push(new Bullet(ship.x, height - 60));
        //laserSound.play();
        laserSound2.play();
    }



}