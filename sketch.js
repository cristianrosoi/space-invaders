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

    createCanvas(displayWidth * 0.95, displayHeight * 0.85);
    console.log(displayWidth)
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
    showScore();
    /**
     * Appplying the show method from the ship class
     * will allow the ship to be displayed on canvas
     */
    ship.show();
    ship.move();
    timer++;
    invaderFireRate()
        //Spawns meteors
    spawnMeteors();
    //Spawns Bonus.
    spawnBonus();
    //Activate Ship Shield
    activateShipShields();
    // Bullets spawn and interactions.
    bulletLogic();
    // Ship will take damge while coliding with meteor
    shipColidesInvader();
    // Show the invaders on the canvas
    showInvaders();
    // Ship movement mechanic.
    movement()
        // GameEnd Conditions
    loseConditions();
    winConditions();
}