class Meteor {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        //circle radius
        this.r = 120 / 2;

        this.toRemove = false;

        this.shield = random(5, 10);
        console.log("spawned meteorite with shield:", this.shield);
    }

    show() {
        imageMode(CENTER);
        image(meteorPNG, this.x, this.y);
    }

    wiggle() {
        this.x = this.x + random(-2, 2);
    }

    fall() {
        this.y += 1;
    }

    hits(ship) {
        let distance = dist(this.x, this.y, ship.x, ship.y);

        if(distance < this.r + ship.r) {
            return true;
        } else {
            return false;
        }
    }

    removeIt() {
        this.toRemove = true;
    }

    explode() {
        image(explosionGIF, this.x, this.y);
        explosionSound.setVolume(0.3);
        explosionSound.play();
    }
}