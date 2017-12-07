class Meteor {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        imageMode(CENTER);
        image(meteorPNG, this.x, this.y);
    }

    fall() {
        this.y += 1;
    }
}