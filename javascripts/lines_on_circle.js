$(function () {
  var canvas = $('#canvas1')[0];
  var context = canvas.getContext('2d');

  var center = [canvas.width / 2, canvas.height / 2];
  var innerRadius = canvas.width / 3;
  var outerRadius = 2 * canvas.width / 6;
  var numLines = 120;
  var circPoints = [];
  for (var i = 0; i < numLines; i++) {
    circPoints.push((i * 2 * Math.PI) / numLines);
  }

  function drawLines (offset) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    circPoints.forEach(function (circPoint) {
      context.moveTo(
        center[0] + innerRadius * Math.cos(circPoint + offset),
        center[1] + innerRadius * Math.sin(circPoint + offset)
      );
      context.lineTo(
        center[0] + outerRadius * Math.cos(circPoint - offset),
        center[1] + outerRadius * Math.sin(circPoint - offset)
      );
    });

    context.strokeStyle = '#b5e853';
    context.stroke();
  }

  var offset = 0;
  setInterval(function () {
    if ($(canvas).is(':visible')) {
      drawLines(offset);
    }
    offset = offset + 0.006;
  }, 1000 / 30);
});
