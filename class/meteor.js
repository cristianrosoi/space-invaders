class Meteor {

    constructor(x, y) {
        this.x = x;
        this.y = y;
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
}