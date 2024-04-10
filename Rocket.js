function Rocket(x, y, facing = 3 * Math.PI / 2) {
  this.pos = createVector(x, y);
  this.r = 25;
  this.life = 20;
  this.fuel = 100;
  this.head = facing;
  this.vel = createVector(0, 0);
  this.acc = createVector().mult(0.05);
  this.bullets = [];
}

Rocket.prototype.show = function() {
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  let points = [];
  let angle = this.head;
  points.push(createVector(this.pos.x + this.r * Math.cos(angle), this.pos.y + this.r * Math.sin(angle)));
  points.push(createVector(this.pos.x + this.r * Math.cos(angle - 150 * Math.PI / 180), this.pos.y + this.r * Math.sin(angle - 150 * Math.PI / 180)));
  points.push(createVector(this.pos.x, this.pos.y));
  points.push(createVector(this.pos.x + this.r * Math.cos(angle + 150 * Math.PI / 180), this.pos.y + this.r * Math.sin(angle + 150 * Math.PI / 180)));
  for (let i = 0; i < points.length; i++) {
    let v1 = points[i];
    let v2 = (i + 1) < points.length ? points[i + 1] : points[0];
    // console.log(v2);
    ctx.line(v1.x, v1.y, v2.x, v2.y);
  }
};

Rocket.prototype.move = function() {
  this.pos.add(this.vel);
  let xc = cv.width + this.r;
  let yc = cv.height + this.r;
  if (this.pos.x + this.r < 0) {
    this.pos.x += cv.width + this.r;
  }
  if (this.pos.x - this.r > cv.width) {
    this.pos.x -= cv.width + this.r;
  }
  if (this.pos.y + this.r < 0) {
    let c = cv.height + this.r
    this.pos.y += cv.height + this.r;
  }
  if (this.pos.y - this.r > cv.height) {
    this.pos.y -= cv.height + this.r;
  }
};

Rocket.prototype.accelerate = function(dir, acc = true) {
  console.log('acc');
  if (acc) {
    this.vel.add(createVector(dir * Math.cos(this.head), dir * Math.sin(this.head)));
  } else {
    const atrito = 0.97;
    this.vel.x *= atrito;
    this.vel.y *= atrito;
  }
};

Rocket.prototype.turn = function(angle) {
  this.head += Math.convertAngle(angle, RADIANS);
};

Rocket.prototype.shot = function() {
  this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.vel.mag(), this.head));
};

Rocket.prototype.update = function() {
  this.show();
  this.move();
  for (let i = this.bullets.length - 1; i >= 0; i--) {
    if (this.bullets[i].toDelete) {
      this.bullets.splice(i, 1);
    } else {
      this.bullets[i].update();
    }
  }
};
