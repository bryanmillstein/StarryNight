if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Ship = Asteroids.Ship = function(game, shipImage) {
  this.game = game;
  this.position = Asteroids.Util.randomPosition(this.game.DIM_X, this.game.DIM_Y);
  this.xpos = this.position[0];
  this.ypos = this.position[1];
  this.shipImage = new Image();
  this.shipImage = shipImage
  this.color = Asteroids.Game.SHIPCOLOR;
  this.radius = Asteroids.Game.SHIPRADIUS;
  this.vel = [0,0];
  this.direction = [1,0];
  this.angle = 0;
  this.rotation = 0;

};



Asteroids.Util.inherits(Asteroids.movingObject, Ship);

Ship.prototype.relocate = function () {
  this.position = Asteroids.Util.randomPosition(this.game.DIM_X, this.game.DIM_Y);
  this.xpos = this.position[0];
  this.ypos = this.position[1];
  this.vel = [0,0];
};

Ship.prototype.draw = function (ctx) {
  ctx.save();
  ctx.translate(this.xpos, this.ypos);
  ctx.rotate(this.rotation);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.lineTo(-15, 15);
  ctx.bezierCurveTo(-8, 15, -8, -15, -15, -15);
  ctx.fill();
  ctx.restore();
}

Ship.prototype.power = function ()  {
  this.vel[0] += this.direction[0] * 0.15;
  this.vel[1] += this.direction[1] * -0.15;


}

Ship.prototype.turnRight = function ()  {
  this.angle -= .3
  this.calcDirection()
  this.rotation += .3;
  console.log(this.direction)
}

Ship.prototype.turnLeft = function ()  {
  this.angle += .3
  this.calcDirection();
  this.rotation -= .3;
  console.log(this.direction)

}

Ship.prototype.brake = function ()  {
  this.vel[0] *= 0.75;
  this.vel[1] *= 0.75;
}

Ship.prototype.fire = function () {
  var new_bullet = new Bullet(this.direction, [this.xpos, this.ypos], this.game)
  this.game.bullets.push(new_bullet)
}

Ship.prototype.calcDirection = function () {
  this.direction[0] = Math.cos(this.angle)
  this.direction[1] = Math.sin(this.angle)

}

Ship.prototype.drawNose = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.xpos+(25 * Math.cos(this.angle)),
    this.ypos+(25 * Math.sin(this.angle)),
    5,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};
