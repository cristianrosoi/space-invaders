class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height - 70 - 10;

    this.xDirection = 0;
    this.shipWidth = 100;
    this.shipHeight = 70;

    this.r = this.shipHeight / 2;

    this.shield = 2;
    this.shieldActive = false;

  }

  show() {
    imageMode(CENTER);
    image(shipPNG, this.x, this.y);
  }

  setDirection(direction) {
    this.xDirection = direction;
  }

  move(direction) {
    this.x += this.xDirection * 5;
  }

  /**
   *
   * If the distance between two circles is smaller than the sum of the radius of the circles
   * than they are intersected
   */
  hits(invader) {
    let distance = dist(this.x, this.y, invader.x, invader.y);

    if(distance < this.r + invader.r) {
      return true;
    } else {
      return false;
    }
  }

  activateShield() {
    this.shieldActive = true;
    shieldUpSound.play();
  }
}