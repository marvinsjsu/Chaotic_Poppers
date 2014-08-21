(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {});

  var Ship = Asteroids.Ship = function(options) {
    options.color = Ship.COLOR;
    options.radius = Ship.RADIUS;
    options.pos = [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2];
    options.vel = [0, 0];
    Asteroids.MovingObject.call(this, options);
  };

  function Surrogate() {};
  Surrogate.prototype = Asteroids.MovingObject.prototype;
  Ship.prototype = new Surrogate();

  Ship.RADIUS = 10;
  Ship.COLOR = "#FF9933";//"#3399FF";

  Ship.prototype.relocate = function() {

    this.pos = [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2];
    this.vel = [0, 0];
  };

  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    if (this.vel[0] > 6) {
      this.vel[0] = 6;
    } else if (this.vel[0] < -6) {
      this.vel[0] = -6;
    }

    if (this.vel[1] > 6) {
      this.vel[1] = 6;
    } else if (this.vel[1] < -6) {
      this.vel[1] = -6;
    }

  };

  Ship.prototype.fireBullet = function() {
    var options = {};
    options.pos = this.pos;
    options.vel = [this.vel[0] * 10, this.vel[1] * 10];
    options.game = this.game;
    return new Asteroids.Bullet(options);
  };

})(this);
