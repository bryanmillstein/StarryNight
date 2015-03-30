if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Bullet = function (shipDirection, shipPos, game) {
  this.game = game;
  this.velx = shipDirection[0] * 7;
  this.vely = -shipDirection[1] * 7;
  this.vel = [this.velx, this.vely];
  this.xpos = shipPos[0]
  this.ypos = shipPos[1]
  this.radius = 5;
  this.color = "#00FF00";
  // this.bulletImage = new Image();
  // this.bulletImage.src = 'paintbrush.png'
}

Asteroids.Util.inherits(movingObject, Bullet);
