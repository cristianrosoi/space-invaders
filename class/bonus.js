class Bonus {

  constructor(x, y, name, png) {
    this.x = x;
    this.y = y;
    this.name = name.toLowerCase();
    this.png = png;

    this.r = 15;

    this.toRemove = false;
  }

  show() {
    imageMode(CENTER);
    image(this.png, this.x, this.y);
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