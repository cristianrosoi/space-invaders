class BonusStar {

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.r = 15;

    this.toRemove = false;
  }

  show() {
    imageMode(CENTER);
    image(star, this.x, this.y);
  }

  move() {
    this.y += 6;
  }

  /**
   *
   * If the distance between two circles is smaller than the sum of the radius of the circles
   * than they are intersected
   */
  collected(ship) {
    let distance = dist(this.x, this.y, ship.x, ship.y);

    if(distance < this.r + ship.r) {
      collectedSound.play();
      return true;
    } else {
      return false;
    }
  }

  removeIt() {
    this.toRemove = true;
  }
}