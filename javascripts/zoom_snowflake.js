$(function () {
  var canvas = $('#canvas3')[0];
  var context = canvas.getContext('2d');

  function Segment (startPos, endPos) {
    this.x0 = startPos[0];
    this.y0 = startPos[1];
    this.x1 = endPos[0];
    this.y1 = endPos[1];
    this.len = Math.sqrt((this.x1 - this.x0) * (this.x1 - this.x0) + (this.y1 - this.y0) * (this.y1 - this.y0));
  }

  Segment.prototype.recurse = function () {
    var x0 = this.x0;
    var y0 = this.y0;
    var x1 = this.x1;
    var y1 = this.y1;
    var point1 = [x0, y0];
    var point2 = [1 / 3 * (2 * x0 + x1), 1 / 3 * (2 * y0 + y1)];
    var point3 = [
      (x0 + x1) / 2 + (y1 - y0) / Math.sqrt(3) / 2,
      (y0 + y1) / 2 - (x1 - x0) / Math.sqrt(3) / 2
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
  var size = 300;

  var fractalsPerSec = 0.1;
  var frameRate = 20;
  var count = 0;

  setInterval(function () {
    if (count >= frameRate / fractalsPerSec - 1) { // fractal has grown 3x. bring back to orignial size as pattern repeats. -1 to get timing right.
      count = 0;
    } else {
      count++;
    }

    // These are the first segments that will generate the rest of the fractal. 2 / 3rds of a triangle
    // The bottom points move down and out as we zoom. the speed picks up exponentially.
    var offset = Math.pow(3, count * fractalsPerSec / frameRate);
    var leftPoint = [-size * offset + w / 2, size * offset * Math.sqrt(3) + h / 5];
    var midPoint = [w / 2, h / 5];
    var rightPoint = [size * offset + w / 2, size * offset * Math.sqrt(3) + h / 5];

    var segments = [new Segment(leftPoint, midPoint), new Segment(midPoint, rightPoint)];
    do {
      var oldSeg = segments.shift();
      var newSegs = oldSeg.recurse();
      for (var i = 0; i < newSegs.length; i++) {
        segments.push(newSegs[i]);
      }
    } while (segments.length < 2 * 4 * 4 * 4 * 4 * 4 * 4);

    if ($(canvas).is(':visible')) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      segments.forEach(function (segment) {
        context.moveTo(segment.x0, segment.y0);
        context.lineTo(segment.x1, segment.y1);
      });
      context.strokeStyle = '#b5e853';
      context.stroke();
    }
  }, 1000 / frameRate);
});
