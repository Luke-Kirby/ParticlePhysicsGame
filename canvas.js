var canvas = document.querySelector("canvas");
var canvasWidth = window.innerWidth - 38;
var canvasHeight = window.innerHeight - 338;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var c = canvas.getContext("2d");

function numOfBalls() {
  let num = document.getElementById("sliderNum").value;
  return num;
}

function sliderSize() {
  let ballSize = document.getElementById("sliderSize").value;
  return ballSize;
}

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  //this.updateValues = fal

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "white";
    c.fillStyle = this.color;
    c.stroke();
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
    console.log("here");
  };
}

let animationFrame;
function animate() {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
  c.clearRect(0, 0, canvasWidth, canvasHeight);
  animationFrame = requestAnimationFrame(animate);

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

function pushInButton() {
  changeButton();

  c.clearRect(0, 0, canvas.width, canvas.height);

  circleArray = circleArray = new Array(numOfBalls()).fill(0);

  for (var i = 0; i < numOfBalls(); i++) {
    var radius = 1 * document.getElementById("sliderSize").value;
    var x = radius + Math.random() * (canvasWidth - 3 * radius);
    var y = radius + Math.random() * (canvasHeight - 3 * radius);
    var dx = (Math.random() - 0.5) * document.getElementById("sliderVel").value;
    var dy = (Math.random() - 0.5) * document.getElementById("sliderVel").value;
    var color = getRandomColor();
    circleArray[i] = new Circle(x, y, dx, dy, radius, color);
  }

  animate();

  document.getElementById("buttonIn").style.visibility = "visible";
  console.log(circleArray);
}

function changeButton() {
  setTimeout(() => {
    document.getElementById("buttonIn").style.visibility = "hidden";
  }, 200);
}
