class DamagedShip {
    
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.xDirection = 0;
        this.shipWidth = 100;
        this.shipHeight = 70;
    
        this.r = this.shipHeight / 2;
    }

    show() {
        imageMode(CENTER);
        image(shipPNG, 2500, 2500);
        image(shipDistroyedPNG, this.x, this.y);
    }

    setDirection(direction) {
        this.xDirection = direction;
    }

    move(direction) {
        this.x += this.xDirection * 5;
    }
}