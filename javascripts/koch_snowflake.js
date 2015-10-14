(function () {
  var canvas = $("#canvas2")[0];
  var context = canvas.getContext("2d");

  Segment = function(startPos, endPos) {
    this.x0 = startPos[0];
    this.y0 = startPos[1];
    this.x1 = endPos[0];
    this.y1 = endPos[1];
    this.len = Math.sqrt((this.x1-this.x0)*(this.x1-this.x0) + (this.y1-this.y0)*(this.y1-this.y0));
  };

  Segment.prototype.recurse = function() {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var point1 = [x0, y0];
    var point2 = [1 / 3 * (2 * x0 + x1), 1 / 3 * (2 * y0 + y1)];
    var point3 = [
      (x0 + x1) / 2 + (y1-y0) / Math.sqrt(3) / 2,
      (y0 + y1) / 2 - (x1-x0) / Math.sqrt(3) / 2
    ];
    var point4 = [1 / 3 * (2 * x1 + x0), 1 / 3 * (2 * y1 + y0)];
    var point5 = [x1, y1];

    var smallerSegments = [];
    smallerSegments.push(new Segment(point1, point2));
    smallerSegments.push(new Segment(point2, point3));
    smallerSegments.push(new Segment(point3, point4));
    smallerSegments.push(new Segment(point4, point5));
    return smallerSegments;
  };

  var w = canvas.width;
  var h = canvas.height;
  var tri1 = [w / 2, h / 2 - w * 4 / 9];
  var tri2 = [w / 2 + 2 * w / 3 / Math.sqrt(3) , h / 2 + w * 2 / 9];
  var tri3 = [w / 2 - 2 * w / 3 / Math.sqrt(3) , h / 2 + w * 2 / 9];
  var segments = [
    new Segment(tri1, tri2),
    new Segment(tri2, tri3),
    new Segment(tri3, tri1)
  ];

  setInterval(function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      segments.forEach(function(segment) {
        context.moveTo(segment.x0, segment.y0);
        context.lineTo(segment.x1, segment.y1);
      });
      context.strokeStyle = "#b5e853";
      context.stroke();

    if (segments.length < 3 * 4 * 4 * 4 * 4 * 4) {
      var oldSeg = segments.shift();
      oldSeg.recurse().forEach(function (newSeg) {
        segments.push(newSeg);
      });
    } else {
      segments = [
        new Segment(tri1, tri2),
        new Segment(tri2, tri3),
        new Segment(tri3, tri1)
      ];
    }
  }, 1000/120);
})();
