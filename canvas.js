var canvas = document.querySelector('canvas');
var page = document.body.style.fontFamily = ''
var context = canvas.getContext('2d');

var speed = 10
var ballXSpeed = 0
var ballYSpeed = 0
var ballX = innerWidth/2;
var ballY = Math.random() * ((innerHeight - 10)-(10))+(10);
var leftPaddleSpeed = 20;
var leftPaddleX = 40;
var leftPaddleY = innerHeight/2 - 60;
var leftScore = 0
var LEFT_UP = false;
var LEFT_DOWN = false;
var rightPaddleSpeed = 20;
var rightPaddleX = innerWidth - 60;
var rightPaddleY = innerHeight/2 - 60;
var rightScore = 0
var RIGHT_UP = false;
var RIGHT_DOWN = false;


canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function drawBall()
{
  context.beginPath();
  context.arc(ballX, ballY, 10, 0, Math.PI * 2, false);
  context.fillStyle = 'white';
  context.strokeStyle = 'white';
  context.fill();
  context.stroke();
}

function drawPaddle(x, y)
{
  context.beginPath();
  context.rect(x, y, 20, 120);
  context.fillStyle = 'white';
  context.strokeStyle = 'white';
  context.fill();
  context.stroke();
}

function drawCenterLine()
{
  for(var i = 0; i < innerHeight; i += 30)
  {
    context.beginPath();
    context.rect(innerWidth/2, i, 2, 8);
    context.fillStyle = 'white';
    context.strokeStyle = 'white';
    context.fill();
    context.stroke();
  }
}

function moveLeftPaddle()
{
  if(LEFT_UP && !(leftPaddleY < 0))
  {
    leftPaddleY -= leftPaddleSpeed;
  }
  if(LEFT_DOWN && !(leftPaddleY > innerHeight - 121))
  {
    leftPaddleY += leftPaddleSpeed;
  }
}

function moveRightPaddle()
{
  if(RIGHT_UP && !(rightPaddleY < 0))
  {
    rightPaddleY -= rightPaddleSpeed;
  }
  if(RIGHT_DOWN && !(rightPaddleY > innerHeight - 121))
  {
    rightPaddleY += rightPaddleSpeed;
  }
}

function updateScore()
{
  context.font = '84px Pong';
  context.fillStyle = 'white';
  context.fillText(rightScore, innerWidth/2 - 200, 150);
  context.fillText(leftScore, innerWidth/2 + 200, 150);
}

document.onkeydown = function(e)
{
  if(e.keyCode == 87) LEFT_UP = true;
	if(e.keyCode == 83) LEFT_DOWN = true;
  if(e.keyCode == 38) RIGHT_UP = true;
	if(e.keyCode == 40) RIGHT_DOWN = true;
}

document.onkeyup = function(e)
{
	if(e.keyCode == 87) LEFT_UP = false;
	if(e.keyCode == 83) LEFT_DOWN = false;
  if(e.keyCode == 38) RIGHT_UP = false;
  if(e.keyCode == 40) RIGHT_DOWN = false;
}

function ballReset()
{
  speed = 10;
  ballX = innerWidth/2;
  ballY = Math.random() * ((innerHeight - 10)-(10))+(10);
  ballXSpeed = ((Math.random() < 0.5)? 1: -1) * speed
  ballYSpeed = ((Math.random() < 0.5)? 1: -1) * speed
}

ballReset();
function animate()
{
  context.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animate);

  drawCenterLine();
  drawBall();
  drawPaddle(leftPaddleX, leftPaddleY);
  drawPaddle(rightPaddleX, rightPaddleY);
  moveLeftPaddle();
  moveRightPaddle();
  updateScore();

  if(ballY + 10 > innerHeight || ballY - 10 < 0)
  {
    ballYSpeed = -ballYSpeed;
  }
  if(ballX - 10 < 0)
  {
    rightScore++;
    ballReset();
  }
  if(ballX + 10 > innerWidth)
  {
    leftScore++;
    ballReset();
  }
  if((ballX + 10) < (leftPaddleX + 40) && (ballY > leftPaddleY && ballY < (leftPaddleY + 120)) || (ballX - 10) > (rightPaddleX - 20) && (ballY > rightPaddleY && ballY < (rightPaddleY + 120)))
  {
    ballXSpeed = -ballXSpeed;
    speed++;
  }

  ballX += ballXSpeed;
  ballY += ballYSpeed;
}

animate();
