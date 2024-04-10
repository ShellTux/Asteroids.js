function Bullet(x, y, vel, facing) {
  this.pos = createVector(x, y);
  this.head = facing;
  this.vel = createVector(Math.cos(this.head), Math.sin(this.head));
  this.vel.mult(vel + 5);
  this.r = 3;
  this.toDelete = false;
}

Bullet.prototype.show = function() {
  ctx.fillStyle = 'white';
  ellipse(ctx, this.pos.x, this.pos.y, this.r * 2, this.r * 2, true);
}

Bullet.prototype.move = function() {
  this.pos.add(this.vel);
}

Bullet.prototype.gone = function() {
  if (!checkWithin(this.pos.x, -this.r, cv.width + this.r) || !checkWithin(this.pos.y, -this.r, cv.height + this.r)) {
    this.toDelete = true;
  }
}

Bullet.prototype.hit = function(other) {

}

Bullet.prototype.update = function() {
  this.show();
  this.move();
  this.gone();
  // for (let i = asteroids.length - 1; i >= 0; i--) {
  //   this.hit(asteroids[i]);
  // }
}