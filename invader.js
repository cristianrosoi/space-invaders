class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    //circle radius
    this.r = 30;

    this.xDirection = 1;

    this.toRemove = false;
  }

  show() {
    noStroke();
    fill(255, 0, 200);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  move() {
    this.x += this.xDirection;
  }

  shiftDown() {
    this.xDirection *= -1;
    this.y += this.r;
  }

  removeIt() {
    this.toRemove = true;
  }
}