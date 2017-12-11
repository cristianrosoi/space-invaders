var musicVolume = 0.5;
var soundVolume = 0.5;

(function() {
    try {
        if (localStorage.getItem("musicVolume") != null) {
            musicVolume = parseFloat(localStorage.getItem("musicVolume"));
            soundVolume = parseFloat(localStorage.getItem("soundVolume"));
        }
    } catch (error) {
        console.error("Can't find savedSound", error);
    }
})();

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

var meteorites = [];

var bullets = [];
var bulletsShot = 0;
var bulletHits = 0;

var invaders = [];

var invaderPNG = null;
var invaderBullets = [];

var bonusItems = [];
var collectedbonusItems = 0;
var collectedbonusStars = 0;

var backgroundImage = null;

var score = 0;
var damage = 0;
var bonusFromTime = 0.0;
var bonusFromAccuaracy = 0.0;

var gameMode = "classic";
var gameOver = false;

var timer = 0;
var startTime = getTime();

function getTime() {
    var currentDate = new Date();
    return currentDate.getTime();
}

var shipColor = sessionStorage.getItem("shipColor") || "blue";
var shipModel = sessionStorage.getItem("shipModel") || "./assets/art/PNG/playerShip1_";
var name = sessionStorage.getItem("name");
var shipImage = shipModel + shipColor + ".png";

function preload() {
    /**
     * Load Assets: images, sounds, gifs
     */
    shipPNG = loadImage(shipImage);
    shipShieldActivePNG = loadImage("./assets/art/PNG/Effects/shield1.png");
    shipDistroyedPNG = loadImage("./assets/art/PNG/Damage/playerShip1_damage3.png");

    laserPNG = loadImage("./assets/art/PNG/Lasers/laser_" + shipColor + "02.png");

    invaderPNG = loadImage("./assets/art/PNG/Enemies/enemyBlue2.png");

    stars2PNG = loadImage("./assets/stars2.jpg");
    starPNG = loadImage("./assets/art/PNG/Power-ups/star_gold.png");
    shieldPNG = loadImage("./assets/art/PNG/Power-ups/shield_silver.png");

    meteorPNG = loadImage("./assets/art/PNG/Meteors/meteorBrown_big2.png");

    spaceFont = loadFont('./assets/art/Bonus/kenvector_future.ttf');
    spaceFontThin = loadFont('./assets/art/Bonus/kenvector_future_thin.ttf');

    explosionGIF = loadImage("./assets/effects/explosion.gif");

    soundFormats('mp3', 'ogg');
    explosionSound = loadSound('./assets/sounds/explosion.mp3');
    explosionSound.setVolume(soundVolume - 0.2);

    laserSound2 = loadSound('./assets/art/Bonus/sfx_laser1.ogg');
    laserSound2.setVolume(soundVolume);

    collectedSound = loadSound('./assets/art/Bonus/sfx_twoTone.ogg');
    collectedSound.setVolume(soundVolume);

    shieldUpSound = loadSound('./assets/art/Bonus/sfx_shieldUp.ogg');
    shieldUpSound.setVolume(soundVolume);
    shieldDownSound = loadSound('./assets/art/Bonus/sfx_shieldDown.ogg');
    shieldDownSound.setVolume(soundVolume);

    music = loadSound('./assets/sounds/music.mp3');
    music.setVolume(musicVolume);

    imageY = displayHeight / 2;
}

function setup() {
    imageMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    music.play();

    ship = new Ship();

    for (let i = 0; i < Math.round((displayWidth / ship.shipWidth) / 2); i++) {
        invaders.push(new Invader(i * 175 + 80, 63, random(0, 100)));
        invaders.push(new Invader(i * 175 + 80, 60 * 3, random(0, 100)));

        if (i % 5 == 0) {
            meteorites.push(new Meteor(random(0, width), 100));
        }

    }

    //EVENTS
    var playerWinEvent = new Event("playerWin");

    window.addEventListener("playerWin", function(event) {
        score = score + bonusFromTime + bonusFromAccuaracy;

        setTimeout(noLoop, 200);
    }, false);
}

function draw() {

    //background
    image(stars2PNG, displayWidth / 2, imageY);
    imageY += 0.5;

    if (imageY > stars2PNG.height / 2) {
        imageY = displayHeight / 2;
    }

    //Star from the menu
    image(starPNG, 30, 30);

    /**
     * Show the score info
     * on top left of the screen
     */
    textFont(spaceFontThin);
    textSize(16);
    fill(255);
    text(name + "'s Score: " + score, 100, 40);
    text(collectedbonusStars, 50, 50);
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

        if (meteor.hits(ship)) {
            damage += 10;
        }

        if (meteor.y > height) {
            meteor.y = 0;
        }

        if (timer > 100000) {
            timer = 0;
        }
    }

    for (let item of bonusItems) {
        item.show();
        item.move();

        if (item.collected(ship)) {
            if (item.name == "star") {
                collectedbonusStars++;
            } else if (item.name == "shield") {
                ship.activateShield();
                collectedbonusItems++;
            } else {
                collectedbonusItems++;
            }

            item.removeIt();
        }

        //item missed or not collected
        if (item.y > height) {
            item.removeIt();
        }
    }

    //Activate Ship Shield
    if (ship.shieldActive == true && ship.shield > 0) {
        imageMode(CENTER);
        image(shipShieldActivePNG, ship.x, ship.y);
    }

    /**
     * Shooting bullets whenever the user is
     * pressing the spacebar
     */
    for (let b = 0; b < bullets.length; b++) {
        bullets[b].show();
        bullets[b].move();

        /**
         * Bullets hits invaders and kills them
         */
        for (let i = 0; i < invaders.length; i++) {
            if (bullets[b].hits(invaders[i])) {
                bullets[b].removeIt();
                invaders[i].removeIt();
                invaders[i].explode();
                if (invaders[i].dropRate > 50.00) {
                    bonusItems.push(new Bonus(invaders[i].x, invaders[i].y, "star", starPNG));
                }
                score++;
                bulletHits++;
            }
        }

        /**
         * Bullets hits meteorites and destroy them
         */
        for (let i = 0; i < meteorites.length; i++) {
            if (bullets[b].hits(meteorites[i])) {
                bullets[b].removeIt();

                meteorites[i].shield--;

                if (meteorites[i].shield <= 0) {
                    meteorites[i].removeIt();
                    meteorites[i].explode();
                    if (parseInt(meteorites[i].dropRate) % 3 == 0) {
                        bonusItems.push(new Bonus(meteorites[i].x, meteorites[i].y, "shield", shieldPNG));
                    }
                    score += 100;
                    bulletHits++;
                }
            }
        }


    }

    for (let b = bullets.length - 1; b >= 0; b--) {
        if (bullets[b].toRemove) {
            bullets.splice(b, 1);
        }
    }

    for (let m = meteorites.length - 1; m >= 0; m--) {
        if (meteorites[m].toRemove) {
            meteorites.splice(m, 1);
        }
    }

    for (let b = invaderBullets.length - 1; b >= 0; b--) {
        if (invaderBullets[b].toRemove) {
            invaderBullets.splice(b, 1);
            if (ship.shieldActive == true && ship.shield > 0) {
                ship.shield--;
            } else {
                damage += 150;
            }
        }
    }

    for (let i = invaders.length - 1; i >= 0; i--) {
        if (invaders[i].toRemove) {
            invaders.splice(i, 1);
        }
    }

    /**
     * Remove the Bonus Stars if the status is set to remove
     * This should happen when the stars are collected by ship
     */
    for (let s = bonusItems.length - 1; s >= 0; s--) {
        if (bonusItems[s].toRemove) {
            bonusItems.splice(s, 1);
        }
    }

    for (let i = 0; i < invaders.length; i++) {
        if (ship.hits(invaders[i])) {
            damage++;
        }
    }

    if (damage >= 450) {
        /**
         * Game Over
         */
        invaders = [];
        image(stars2PNG, displayWidth / 2, displayHeight / 2);

        var damagedShip = new DamagedShip(ship.x, ship.y);
        damagedShip.show();

        //Stop the draw function
        noLoop();
    }

    if (invaders.length < 1) {

        if (bonusItems.length < 1) {
            //Player wins!

            var endTime = getTime();

            /**
             * bonusFromTime in Minutes * 10
             * 1 millisecond = 0.0000166667;
             *
             * bonusFromTime adds to score
             * should be less if the
             * time to clear the level is bigger
             *
             * bonusFromAccuaracy adds to score
             * should be bigger if the accuaracy
             * is closer to 0
             */

            var timeDiff = ((endTime - startTime) * 0.0000166667).toFixed(2);
            bonusFromTime = Math.round((1 / timeDiff) * 100);

            var accuaracy = bulletsShot / bulletHits;
            bonusFromAccuaracy = Math.round((1 / accuaracy) * 1000);

            window.dispatchEvent(new CustomEvent("playerWin"));
        }

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

    movement()
}

/**
 * Events
 */

function keyPressed() {
    if (keyCode == keyCodes.d) {
        ship.setDirection(1);
    } else if (keyCode == keyCodes.a) {
        ship.setDirection(-1);
    }
    if (keyCode == keyCodes.space) {
        bullets.push(new Bullet(ship.x, height - 60));
        //laserSound.play();
        laserSound2.play();
        bulletsShot++;
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