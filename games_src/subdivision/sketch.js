// subdivision - split + average
// beginShape + endShape to enclose the entire shape
// EXPERIMENT with coloring and number of iterations

var points = [];
var multipoints = [];
var p2 = [];
var numPoints = 0;
var done = 0;
var start = 0;
var iterations = 0;

var pointDist = function (x, y) {
  var result = false;
  for (var i = 0; i < points.length; i++) {
    if (dist(x, y, points[i].x, points[i].y) < 10) {
      result = true;
      done = 1;
    }
  }
  return result;
};

var mouseDragged = function () {
  if (done === 1) {
    for (var i = 0; i < points.length; i++) {
      if (dist(mouseX, mouseY, points[i].x, points[i].y) < 10) {
        points[i].x = pmouseX;
        points[i].y = pmouseY;
        break;
      }
    }
  }
  else if (done === 2) {
    for (var i = 0; i < points.length; i++) {
      if (dist(mouseX, mouseY, points[i].x, points[i].y) < 10) {
        points[i].x = pmouseX;
        points[i].y = pmouseY;
        copyPoints();
        iterations = 0;
        break;
      }
    }
  }
}
var copyPoints = function () {
  multipoints.splice(0, multipoints.length);
  for (var i = 0; i < points.length; i++) {
    multipoints.push(new p5.Vector(points[i].x, points[i].y));
  }
}
var mouseClicked = function () {
  start = 1;
  if (mouseX > 10 && mouseX < 80 && mouseY > 370 && mouseY < 390) {
    if (done === 1) {
      splitAndAdd();
    }
  }
  else if (mouseX > 90 && mouseX < 190 && mouseY > 370 && mouseY < 390) {
    if (done === 1) {
      copyPoints();
      done = 2;
    }
  }
  else if (mouseX > 200 && mouseX < 250 && mouseY > 370 && mouseY < 390) {
    printPoints();
  }
  else if (mouseX > 260 && mouseX < 310 && mouseY > 370 && mouseY < 390) {
    points = [];
    p2 = [];
    start = 0;
    done = 0;
    numPoints = 0;
    iterations = 0;
  }
  else if (mouseX > 320 && mouseX < 395 && mouseY > 370 && mouseY < 390) {
    if (done === 2) {
      done = 3;
    }
    else if (done === 3) {
      done = 2;
    }
  }
  else if ((done === 0) && (pointDist(mouseX, mouseY) === false)) {
    points.push(new p5.Vector(mouseX, mouseY));
    multipoints.push(new p5.Vector(mouseX, mouseY));
    numPoints++;
  }
};

var printPoints = function () {
  var output = "beginShape();\n"
  for (var i = 0; i < multipoints.length; i++) {
    output += "vertex(" + multipoints[i].x + ", " + multipoints[i].y + ");\n"
  }
  output += "endShape();"
  alert(output)
  console.log(output);
}

var splitAndAdd = function () {
  splitPoints();
  points.splice(0, points.length);
  for (i = 0; i < p2.length; i++) {
    points.push(new p5.Vector(p2[i].x, p2[i].y));
  }
  numPoints = points.length;
}

var splitPoints = function () {
  p2.splice(0, p2.length);
  for (var i = 0; i < points.length - 1; i++) {
    p2.push(new p5.Vector(points[i].x, points[i].y));
    p2.push(new p5.Vector((points[i].x + points[i + 1].x) / 2, (points[i].y +
      points[i + 1].y) / 2));
  }
  p2.push(new p5.Vector(points[i].x, points[i].y));
  p2.push(new p5.Vector((points[0].x + points[i].x) / 2, (points[0].y +
    points[i].y) / 2));
};

var average = function () {
  for (var i = 0; i < p2.length - 1; i++) {
    var x = (p2[i].x + p2[i + 1].x) / 2;
    var y = (p2[i].y + p2[i + 1].y) / 2;
    p2[i].set(x, y);
  }
  var x = (p2[i].x + points[0].x) / 2;
  var y = (p2[i].y + points[0].y) / 2;
  points.splice(0, points.length);
  for (i = 0; i < p2.length; i++) {
    points.push(new p5.Vector(p2[i].x, p2[i].y));
  }
};

var multisplitPoints = function () {
  p2.splice(0, p2.length);
  for (var i = 0; i < multipoints.length - 1; i++) {
    p2.push(new p5.Vector(multipoints[i].x, multipoints[i].y));
    p2.push(new p5.Vector((multipoints[i].x + multipoints[i + 1].x) / 2, (multipoints[i].y +
      multipoints[i + 1].y) / 2));
  }
  p2.push(new p5.Vector(multipoints[i].x, multipoints[i].y));
  p2.push(new p5.Vector((multipoints[0].x + multipoints[i].x) / 2, (multipoints[0].y +
    multipoints[i].y) / 2));
};

var multiaverage = function () {
  for (var i = 0; i < p2.length - 1; i++) {
    var x = (p2[i].x + p2[i + 1].x) / 2;
    var y = (p2[i].y + p2[i + 1].y) / 2;
    p2[i].set(x, y);
  }
  var x = (p2[i].x + multipoints[0].x) / 2;
  var y = (p2[i].y + multipoints[0].y) / 2;
  multipoints.splice(0, multipoints.length);
  for (i = 0; i < p2.length; i++) {
    multipoints.push(new p5.Vector(p2[i].x, p2[i].y));
  }
};

var subdivide = function () {
  multisplitPoints();
  multiaverage();
};

function setup() {
  createCanvas(400, 400);
}

var draw = function () {
  background(255, 255, 255);
  fill(255, 0, 0);
  if (start === 0) {
    text("Click to set points. Click on first point to end shape.", 20,
      20);
    text("Once shape has been made, Click and drag a point to move it", 20,
      40);
    text("Click Split Points to add more midpoints to move", 20,
      60);
    text("Click Generate Shape to create a smooth shape from points", 20,
      80);
    text("Click Print to get vertexes for the shape.", 20,
      100);
  }
  if (done === 0) {
    for (var i = 0; i < points.length; i++) {
      ellipse(points[i].x, points[i].y, 10, 10);
    }
    for (var i = 0; i < points.length - 1; i++) {
      line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    }
    if (points.length > 0) {
      line(points[i].x, points[i].y, mouseX, mouseY);
    }
  }
  else if (done === 1) {
    for (var i = 0; i < points.length; i++) {
      ellipse(points[i].x, points[i].y, 10, 10);
    }
    noFill();
    beginShape();
    for (var i = 0; i < points.length; i++) {
      vertex(points[i].x, points[i].y);
    }
    vertex(points[0].x, points[0].y);
    endShape();
  }
  else if (done === 2) {
    for (var i = 0; i < points.length; i++) {
      ellipse(points[i].x, points[i].y, 10, 10);
    }
    noFill();
    beginShape();
    for (var i = 0; i < multipoints.length; i++) {
      vertex(multipoints[i].x, multipoints[i].y);
    }
    vertex(multipoints[0].x, multipoints[0].y);
    endShape();

    if (iterations < 5) {
      subdivide();
      iterations++;
    }
  }
  else if (done === 3) {
    noFill();
    beginShape();
    for (var i = 0; i < multipoints.length; i++) {
      vertex(multipoints[i].x, multipoints[i].y);
    }
    vertex(multipoints[0].x, multipoints[0].y);
    endShape();

    if (iterations < 5 && multipoints.length < 500) {
      subdivide();
      iterations++;
    }
  }
  fill(255, 0, 0);
  text(numPoints + " points", 330, 360);

  fill(0, 255, 0);
  rect(260, 370, 50, 20)
  // Control panel
  if (done === 1) {
    fill(0, 255, 0);
  }
  else {
    fill("gray")
  }
  rect(10, 370, 70, 20)
  rect(90, 370, 100, 20)

  if (done === 2 || done === 3) {
    fill(0, 255, 0);
  }
  else {
    fill("gray")
  }
  rect(320, 370, 75, 20)

  if (done === 1 || done === 2 || done === 3) {
    fill(0, 255, 0);
  }
  else {
    fill("gray")
  }
  rect(200, 370, 50, 20)
  fill(0);
  text("Split Points", 12, 385);
  text("Generate Shape", 92, 385);
  text("Print", 210, 385);
  text("Reset", 270, 385);
  text("Toggle Dots", 322, 385);
};
