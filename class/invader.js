class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    //this.width = 104;
    //this.height = 84;

    //circle radius
    this.r = 104 / 2;

    this.xDirection = 1;

    this.toRemove = false;
  }

  show() {
    imageMode(CENTER);
    image(invaderPNG, this.x, this.y);
  }

  explode() {
    image(explosionGIF, this.x, this.y);
    explosionSound.setVolume(0.3);
    explosionSound.play();
  }

  move() {
    this.x += this.xDirection;
  }

  shiftDown() {
    this.xDirection *= -1;
    this.y += this.r;
  }

  flyDown() {
    this.y += 5;
  }

  removeIt() {
    this.toRemove = true;
  }
}