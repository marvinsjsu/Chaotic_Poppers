(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(options) {
    options.color = Bullet.COLOR;
    options.radius = Bullet.RADIUS;
    Asteroids.MovingObject.call(this, options);
  };

  Bullet.COLOR = "#FF9933";
  Bullet.RADIUS = 4;

  function Surrogate() {};
  Surrogate.prototype = Asteroids.MovingObject.prototype;
  Bullet.prototype = new Surrogate();

  Bullet.prototype.isCollidedWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      var diffX = Math.abs(this.pos[0] - otherObject.pos[0]);
      var diffY = Math.abs(this.pos[1] - otherObject.pos[1]);
      var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
      var combinedRadi = this.radius + otherObject.radius;
      return distance <= combinedRadi;
    }
    return false;
  };

  Bullet.prototype.isWrappable = false;

})(this);
