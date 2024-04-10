let cv, ctx;
let player;
let asteroids = [];

window.onload = () => setup();

const setup = function() {
  cv = document.querySelector('canvas');
  // cv = document.createElement('canvas');
  cv.width = window.innerWidth;
  cv.height = window.innerHeight - 4;
  // document.body.appendChild(cv);
  ctx = cv.getContext('2d');
  window.addEventListener('keydown', function(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 37:
        player.turn(-3);
        break;
      case 39:
        player.turn(3);
        break;
      case 38:
        player.accelerate(1, true);
        break;
      case 40:
        player.accelerate(-1, true);
        break;
      case 17:
        player.accelerate(1, false);
        break;
      case 32:
        player.shot();
        break;
    }
  });
  player = new Rocket(cv.width / 2, cv.height / 2);
  setInterval(draw, 5);
}

const draw = function() {
  background(cv, 'black');
  player.update();
}