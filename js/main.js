var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = ctx.canvas.width;
var height = ctx.canvas.height;

var g = 0.5;

var score = 0;

var balls = [
  new Ball(350, 90, 0, 2, 80)
]


function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < balls.length; i++) {
    balls[i].goToNextPosition();
    balls[i].draw();
  }
  drawScore();
}

setInterval(update, 20)

function drawScore() {
  ctx.font = "30px sans-serif"
  ctx.fillText("Score: " + score, width - 150, 40)
}


canvas.onclick = function (e) {
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].isItClicked(e.offsetX, e.offsetY)) {
      balls[i].click();
      var newBall = new Ball(balls[i].x, balls[i].y, balls[i].vx, balls[i].vy, balls[i].radius, balls[i].color);
      balls[i].rotate(Math.PI/4)
      newBall.rotate(-Math.PI/4)
      balls.push(newBall)
      score++;
      return;
    }
  }
}