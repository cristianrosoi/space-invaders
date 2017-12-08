class Bullet2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        //circle radius
        this.r = 2;
        this.toRemove = false;
    }


    show() {
        imageMode(CENTER)
        image(bulletGreen, this.x, this.y)
    }

    move() {
        this.y -= 10;
    }

    attack() {
        this.y += 10;
    }

    /**
     *
     * If the distance between two circles is smaller than the sum of the radius of the circles
     * than they are intersected
     */
    hits(invader) {
        let distance = dist(this.x, this.y, invader.x, invader.y);

        if (distance < this.r + invader.r) {
            return true;
        } else {
            return false;
        }
    }

    removeIt() {
        this.toRemove = true;
    }
}