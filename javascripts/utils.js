if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

Asteroids.Utils = {};

Asteroids.Utils.inherits = function(ChildClass, ParentClass) {
  var Surrogate = function() {};
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

Asteroids.Utils.randomVec = function(length) {
  var direction = Math.random() * 2 * Math.PI;
  return [length * Math.cos(direction), length * Math.sin(direction)];
};

Asteroids.Utils.randomEdgePos = function() {
  return [0, 0];
};


Asteroids.Utils.randomPos = function () {
  return [
    Math.floor(Math.random() * Asteroids.Game.DIM_X),
    Math.floor(Math.random() * Asteroids.Game.DIM_Y)
  ];
};

Asteroids.Utils.wrap = function (pos) {
  var DIM_X = Asteroids.Game.DIM_X;
  var DIM_Y = Asteroids.Game.DIM_Y;

  var wrappedPos = [];
  wrappedPos[0] = pos[0] % DIM_X;
  wrappedPos[1] = pos[1] % DIM_Y;
  return [(wrappedPos[0] >= 0) ? wrappedPos[0] : wrappedPos[0] + DIM_X,
          (wrappedPos[1] >= 0) ? wrappedPos[1] : wrappedPos[1] + DIM_Y];
};

Asteroids.Utils.isOutOfBounds = function (pos) {
  return (pos[0] < 0 ||
    pos[0] > Asteroids.Game.DIM_X ||
    pos[1] < 0 ||
    pos[1] > Asteroids.Game.DIM_Y);
};

// produce normal distrobution using Box–Muller transform
Asteroids.Utils.normalDist = function () {
  var u = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * u);
};
