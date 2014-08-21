(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };


  GameView.prototype.start = function(ctx) {
    this.bindKeyHandlers();

    window.setInterval((function () {
      this.game.step();
      this.game.draw(ctx);
    }).bind(this), 30);
  };

  GameView.prototype.bindKeyHandlers = function() {
    var gameView = this;
    key("up", function() {
      gameView.game.ship.power([0, -1.5]);
      return false;
    });

    key("down", function() {
      gameView.game.ship.power([0, 1.5]);
      return false;
    });

    key("left", function() {
      gameView.game.ship.power([-1.5, 0]);
      return false;
    });

    key("right", function() {
      gameView.game.ship.power([1.5, 0]);
      return false;
    });

    key("space", function() {
      var bullet = gameView.game.ship.fireBullet();
      gameView.game.add(bullet);
      return false;
    });

    key("enter", function() {
      gameView.game.generateAsteroids(5);
      return false;
    });
  };

})(this);
