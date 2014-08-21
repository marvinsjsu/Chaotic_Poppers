(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
    this.score = 0;
    this.misses = 0;
    this.shots = 0;
    this.addAsteroids();
    var options = {"pos" : this.randomPosition()};
    options.game = this;
    this.ship = new Asteroids.Ship(options);
  };

  Game.DIM_X = window.innerWidth - (window.innerWidth / 3);
  Game.DIM_Y = window.innerHeight - (window.innerHeight / 3);
  Game.NUM_ASTEROIDS = 25;

  Game.prototype.addAsteroids = function() {

    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var options = {"pos" : this.randomPosition()};
      options.game = this;
      this.add(new Asteroids.Asteroid(options));
    }
  };

  Game.prototype.add = function(obj) {

    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
      this.shots += 1;
      $("#fired").html(this.shots);
      var accuracy = Math.round((((game.shots - game.misses) / game.shots) * 100), -1);
      accuracy = (accuracy !== accuracy) ? 0 : accuracy;
      $("#accuracy").html(accuracy + "%");
    } else if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };

  Game.prototype.remove = function(obj) {
    var objArray = [];

    if (obj instanceof Asteroids.Asteroid) {
      objArray = this.asteroids;
    } else if (obj instanceof Asteroids.Bullet) {
      objArray = this.bullets;
    }

    objArray.forEach(function(movingObject, index, array){
      if (movingObject === obj) {
        array.splice(index, 1);
      }
    });
  };

  Game.prototype.removeAsteroids = function(){
    var game = this;
    var i = 0;
    this.asteroids.forEach(function(asteroid){
      var posX = asteroid.pos[0];
      var posY = asteroid.pos[1];

      if(posX > Game.DIM_X || posX < 0 || posY > Game.DIM_Y || posY < 0){
        game.asteroids.splice(i, 1);
      }
      i++;
    });
  };

  Game.prototype.generateAsteroids = function(qty) {
    for (var i = 0; i < qty; i++) {
      var shipPos = this.ship.pos;
      var pos = this.randomPosition();
      if (shipPos[0] > (pos[0] + 50) || shipPos[0] < (pos[0] - 50)) {
        pos[0] += 100;
        pos[1] += 100;
      }

      var options = {"pos" : pos}
      options.game = this;
      this.add(new Asteroids.Asteroid(options));
    }
  };

  Game.prototype.checkCollisions = function() {
    var game = this;
    this.allObjects().forEach(function(obj, index, array) {
      if (obj instanceof Asteroids.Bullet && game.isOutOfBounds(obj.pos)) {
        game.remove(obj);
        game.misses += 1;
        $("#misses").html(game.misses);
        var accuracy = Math.round((((game.shots - game.misses) / game.shots) * 100), -1);
        accuracy = (accuracy !== accuracy) ? 0 : accuracy;
        $("#accuracy").html(accuracy + "%");
      }
      array.forEach(function(otherObj, idx) {

        if (index != idx && obj.isCollidedWith(otherObj)) {


          if (obj instanceof Asteroids.Ship && otherObj instanceof Asteroids.Asteroid) {
            game.ship.relocate();

            var accuracy = Math.round((((game.shots - game.misses) / game.shots) * 100), -1);
            accuracy = (accuracy !== accuracy) ? 0 : accuracy;
            $("#accuracy").html(accuracy + "%");
            $("#score-history").prepend("<li> You scored: "+game.score+", fired "+game.shots+" and missed " +game.misses+ " times. Accuracy: "+accuracy+"%</li>");
            game.score = 0;
            game.shots = 0;
            game.misses = 0;
            $("#score").html(game.score);
            $("#fired").html(game.shots);
            $("#misses").html(game.misses);
            $("#accuracy").html("0%");
          } else if (obj instanceof Asteroids.Asteroid && otherObj instanceof Asteroids.Asteroid) {
            if (obj.radius >= otherObj.radius) {
              obj.absorb(otherObj);
              game.remove(otherObj);
            } else {
              otherObj.absorb(obj);
              game.remove(obj);
            }
          } else {
            if (obj instanceof Asteroids.Asteroid && obj.color === "#FF0000") {
              game.remove(obj);
              var vels = [ [-10, 0], [10, 0], [0, -10], [0, 10] ];
              for (var i = 0; i < 2; i++) {
                var pos = [obj.pos[0] + vels[i][0], obj.pos[1] + vels[i][1]];
                var options = {"pos" : pos};
                options.vel = [vels[i][0] - 9, vels[i][1] - 9];
                options.game = game;
                options.radius = 2;
                game.add(new Asteroids.Asteroid(options));
              }
            } else {
              game.score += 1;
              $("#score").html(game.score);

              game.remove(obj);
              game.remove(otherObj);



              if (game.asteroids.length < 2) {
                game.generateAsteroids(7);
              }
            }
          }
        }
      });
    });
  };

  Game.prototype.wrap = function(pos) {
    var posX = pos[0] % Game.DIM_X;
    var posY = pos[1] % Game.DIM_Y;

    var posX = (posX < .10) ? Game.DIM_X : posX;
    var posY = (posY < .10) ? Game.DIM_Y : posY;

    return [posX, posY];
  };

  Game.prototype.randomPosition = function() {
    var posX = Math.abs((Math.random() * Game.DIM_X) % Game.DIM_X);
    var posY = Math.abs((Math.random() * Game.DIM_Y) % Game.DIM_Y);

    return [posX, posY];
  };

  var background = new Image();
  background.src = 'images/grid1.jpg';
  background.onload = function() {
    ctx.drawImage(background, 0, 0);
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(background, -140, -50);
    var game = this;
    this.allObjects().forEach(function(obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
    this.allObjects().forEach(function(obj) {
      obj.move();
    });
  };

  Game.prototype.isOutOfBounds = function(pos) {
    if (pos[0] > Game.DIM_X || pos[0] < 0 || pos[1] > Game.DIM_Y || pos[1] < 0) {
      return true;
    }
    return false;
  };

})(this);
