function Asteroid(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.toDelete = false;
  this.shapeVert = makeShape(this.x, this.y, this.r);
  this.dir = createVector(cos(random(0, 360)), sin(random(0, 360)));
}


Asteroid.prototype.show = function() {
  beginShape()
  for (var i = 0; i < this.shapeVert.length; i++) {
    vertex(this.x + this.shapeVert[i].x, this.y + this.shapeVert[i].y);
  }
  endShape(CLOSE);
}

Asteroid.prototype.move = function() {
  this.x += this.dir.x;
  this.y += this.dir.y;
  this.x = portal(this.x, -width / 3, width + width / 3);
  this.y = portal(this.y, -height / 3, height + height / 3);
}

Asteroid.prototype.collison = function(other) {
  var d = dist(this.x, this.y, other.x, other.y);
  if (d < this.r + other.r) {
    other.life -= 0.1;
    return true;
  } else {
    return false;
  }
}

Asteroid.prototype.update = function() {
  this.show();
  this.move();
  this.collison(player);
}
