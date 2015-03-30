(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

var Game = Asteroids.Game = function (dimx, dimy, image, shipImage, numAsteroids) {
  this.DIM_X = dimx;
  this.DIM_Y = dimy;
  this.numAsteroids = numAsteroids;
  this.asteroids = [];
  this.addAsteroids();
  this.backgroundImage = image
  this.ship = new Asteroids.Ship(this, shipImage);
  this.bullets = []


};

Game.DEFAULT_COLOR = "#00FF00"
Game.DEFAULT_RADIUS = 50
Game.SHIPCOLOR = "#FE2E2E"
Game.SHIPRADIUS = 25


Game.prototype.addAsteroids = function() {
  for (var i = 0; i < this.numAsteroids; i ++) {
    var startPosition = Asteroids.Util.randomPosition(this.DIM_X, this.DIM_Y)
    this.asteroids.push(new Asteroids.Asteroid(startPosition[0], startPosition[1], this, 3, 50))
  };
};

Game.prototype.allObjects = function() {
  var newArray = this.asteroids.slice(0);
  newArray.push(this.ship);
  newArray = newArray.concat(this.bullets);
  return newArray;
};

Game.prototype.PlayerObjs = function () {
  var newArr = [this.ship]
  newArr = newArr.concat(this.bullets)
  return newArr
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Asteroids.DIM_X, Asteroids.DIM_Y);
  ctx.font = "48px serif";
  ctx.fillStyle = "#f00";
  ctx.drawImage(this.backgroundImage, 0, 0, 1000, 600);
  ctx.fillText("Lives: " + LIVES_LEFT, 15, 50);
  ctx.fillText("Score: " + SCORE, 400, 50);
  ctx.fillText("Level: " + LEVEL, 830, 50);

  this.allObjects().forEach(function(el) {
    el.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  var allObjs = this.allObjects()
  for (var i = 0; i < allObjs.length; i ++) {
    allObjs[i].move();
  };
};

Game.prototype.wrap = function (posx, posy) {
  if (posx > this.DIM_X) {
    posx -= this.DIM_X
  }
  if (posy > this.DIM_Y) {
    posy -= this.DIM_Y
  }
  if (posx < 0) {
    posx += this.DIM_X
  }
  if (posy < 0) {
    posy += this.DIM_Y
  }
  return [posx, posy]
};

Game.prototype.checkCollisions = function () {
  var playerObjs = this.PlayerObjs()
  for (var i = 0; i < this.asteroids.length; i++){
    for (var j = 0; j < playerObjs.length; j++){
      if (this.asteroids[i].IsCollidedWith(playerObjs[j])){
        if (playerObjs[j] instanceof Ship){
          LIVES_LEFT -= 1
          playerObjs[j].relocate()
        } else {
          SCORE += 1
          this.handleAsteroid(i)
          this.removeBullet(j-1)
        }
      }
    }
  }
};

Game.prototype.step = function (ctx) {
  if (LIVES_LEFT < 1) {
    this.playerLost();
  } else {
    this.moveObjects();
    this.checkCollisions();
    this.levelChange();

  }
}

Game.prototype.levelChange = function () {
  if (this.asteroids.length === 0) {
    LEVEL += 1;
    this.addAsteroids();
  }
}

Game.prototype.playerLost = function () {
  window.alert('Sorry, you ran out of lives. Your score was' + SCORE)
  location.reload();

}

Game.prototype.handleAsteroid = function (index) {
  if (this.asteroids[index].size > 1) {
    var dyingAsteroid = this.asteroids[index];
    this.remove(index);
    this.asteroids.push(new Asteroids.Asteroid(dyingAsteroid.xpos, dyingAsteroid.ypos, this, dyingAsteroid.size - 1, dyingAsteroid.radius / 2));
    this.asteroids.push(new Asteroids.Asteroid(dyingAsteroid.xpos, dyingAsteroid.ypos, this, dyingAsteroid.size - 1, dyingAsteroid.radius / 2));
  } else {
    this.remove(index);
  }
}

Game.prototype.remove = function (index) {
  var newArr = this.asteroids.slice(0, index)
  var second = this.asteroids.slice(index + 1, this.asteroids.length)
  this.asteroids = newArr.concat(second)
}

Game.prototype.removeBullet = function (index) {
  var newArr = this.bullets.slice(0, index)
  var second = this.bullets.slice(index + 1, this.bullets.length)
  this.bullets = newArr.concat(second)

}
})();
