(function(root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Utils = Asteroids.Utils = function() {

  };

  var inherits = Asteroids.Utils.inherits = function(child, parent) {
    //inheritance, making Asteroid a subclass of MovingObject
    function Surrogate() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  var randomVec = Asteroids.Utils.randomVec = function(length) {
    return [2.5*Math.random() - 1, 2.5*Math.random() - 1];;
  };
})(this);