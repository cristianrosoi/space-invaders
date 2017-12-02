class Ship {
  constructor() {
    this.x = width / 2;
    this.xDirection = 0;
  }

  // show() {
  //   noStroke();
  //   rectMode(CENTER);
  //   fill(255);
  //   rect(this.x, height - 20, 20, 60);
  // }

  show() {
    image(shipPNG, this.x - 50, height - 80);
  }

  setDirection(direction) {
    this.xDirection = direction;
  }

  move(direction) {
    this.x += this.xDirection * 5;
  }
}