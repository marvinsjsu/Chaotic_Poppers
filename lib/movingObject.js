(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius  = options.radius;
    this.game = options.game;
    this.color = options.color;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    }
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var diffX = Math.abs(this.pos[0] - otherObject.pos[0]);
    var diffY = Math.abs(this.pos[1] - otherObject.pos[1]);
    var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    var combinedRadi = this.radius + otherObject.radius;
    return distance <= combinedRadi;
  };

  MovingObject.prototype.absorb = function(otherObj) {
    this.radius += Math.abs(otherObj.radius * .25);
  };

  MovingObject.prototype.isWrappable = true;

})(this);