(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(options) {
    options.pos = options.pos;
    options.color = this.randomColor();
    options.radius = this.randomRadius();
    options.vel = Asteroids.Utils.randomVec(Asteroid.RADIUS);
    Asteroids.MovingObject.call(this, options);
  };

  //inheritance, making Asteroid a subclass of MovingObject
  function Surrogate() {};
  Surrogate.prototype = Asteroids.MovingObject.prototype;
  Asteroid.prototype = new Surrogate();

  Asteroid.COLOR = "#AAAAAA";
  Asteroid.RADIUS = 15;
  Asteroid.COLORS = ["#CC99BB", "#AAAAAA", "#CCBB99", "#FF0000"];
  Asteroid.RADI = [15, 20, 25, 30, 40, 50];

  Asteroid.prototype.randomColor = function() {
    var index = Math.floor(Math.random() * (Asteroid.COLORS.length));
    return Asteroid.COLORS[index];
  };

  Asteroid.prototype.randomRadius = function() {
    var index = Math.floor(Math.random() * (Asteroid.RADI.length));
    return Asteroid.RADI[index];
  };
})(this);