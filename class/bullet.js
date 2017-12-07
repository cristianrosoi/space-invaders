class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //circle radius
    this.r = 4;
    this.toRemove = false;
  }

  show() {
    noStroke();
    fill(231, 76, 60);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
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

    if(distance < this.r + invader.r) {
      return true;
    } else {
      return false;
    }
  }

  removeIt() {
    this.toRemove = true;
  }
}