(function() {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}
var GameView = Asteroids.GameView = function(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function() {
  var that = this;

  window.setInterval(function () {
    this.game.step();
    this.game.draw(this.ctx) }, 20);
  window.setInterval( function () {
    that.moves() }, 40);
  window.setInterval( function () {
    that.fires() }, 100);

}

GameView.prototype.moves = function () {
 if(key.isPressed('up')) this.game.ship.power();
 if(key.isPressed('down')) this.game.ship.brake();
 if(key.isPressed('right')) this.game.ship.turnRight();
 if(key.isPressed('left')) this.game.ship.turnLeft();
}

GameView.prototype.fires = function () {
 if(key.isPressed('space')) this.game.ship.fire();
}


})();
