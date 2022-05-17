var canvas = document.querySelector("canvas");
var canvasWidth = window.innerWidth - 38;
var canvasHeight = window.innerHeight - 338;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var c = canvas.getContext("2d");

function velocity() {
    let vel = document.getElementById("sliderVel").value;
    return vel;
  }

  function numOfBalls() {
    let num = document.getElementById("sliderNum").value;
    return num;
  }

  function sliderSize() {
    let ballSize = document.getElementById("sliderSize").value;
    console.log(`Slider size = ${ballSize}`);
    return ballSize;
  }


function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "white";
    c.fillStyle = this.color;
    //c.fillStyle = "rgba(0, 153, 255, 0.719";
    c.stroke();
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
      //c.fillStyle = "blue";
    }

    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
      //c.fillStyle = "red";
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

var circleArray = [];

for (var i = 0; i < numOfBalls(); i++) {
  var radius = 1*sliderSize();
  var x = radius + Math.random() * (canvasWidth - 3 * radius);
  var y = radius + Math.random() * (canvasHeight - 3 * radius);
  var dx = (Math.random() - 0.5) * velocity();
  var dy = (Math.random() - 0.5) * velocity();
  var color = getRandomColor();
  circleArray.push(new Circle(x, y, dx, dy, radius, color));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvasWidth, canvasHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

animate();

function pushInButton() {
  changeButton();
}

function changeButton() {
  document.getElementById("buttonIn").style.visibility = "visible";

  setTimeout(() => {
    //document.getElementById("buttonIn").style.visibility = "hidden";
    location.reload();
  }, 200);
}



