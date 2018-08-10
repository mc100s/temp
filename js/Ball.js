function Ball(x, y, vx, vy, radius, color = "red") {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = radius;
  this.color = color;
}

Ball.prototype.draw = function () {
  ctx.save();
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

Ball.prototype.goToNextPosition = function () {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;

  this.x += this.vx;
  this.y += this.vy;

  this.vy += 0.9;// for the gravity

  // Right and Left boundary
  if (this.x + this.radius >= width || this.x - this.radius < 0) {
    this.vx *= -0.95;
  }
  // Bottom and top boundary
  if (this.y + this.radius >= height || this.y - this.radius < 0) {
    this.vy *= -0.95;
  }

  if (this.x < this.radius)
    this.x = this.radius;
  if (this.x > width - this.radius)
    this.x = width - this.radius;
  if (this.y < this.radius)
    this.y = this.radius;
  if (this.y > height - this.radius)
    this.y = height - this.radius;
}

Ball.prototype.click = function () {
  console.log("ball clicked");

  switch (this.color) {
    case "red":
      this.color = "green";
      break;
    case "green":
      this.color = "blue";
      break;
    default:
      this.color = "red";
  }
  this.radius *= 0.8;

  this.vx *= 1.2;
  this.vy *= 1.2;
}

Ball.prototype.isItClicked = function (x, y) {
  return Math.abs(x - this.x) <= this.radius
    && Math.abs(y - this.y) <= this.radius
}

Ball.prototype.rotate = function(angle) {
  var newVx = this.vx*Math.cos(angle) - this.vy*Math.sin(angle);
  var newVy = this.vx*Math.sin(angle) + this.vy*Math.cos(angle);
  this.vx = newVx;
  this.vy = newVy;
}