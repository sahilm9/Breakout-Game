/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Strong the reference of the canvas element in canvas variable
var canvas = document.getElementById('Canvas'),

// a variable to store the 2D rendering context, the actual tool used to paint the canvas
context = canvas.getContext('2d'),

// a variale to store the change value of x for every frame
dx = 4,

// a variable to store the change value of y for every frame
dy = -4,

// a variable to store radius of the ball
ballRadius = 10,

// a variable to store the height of the paddle
paddleHeight = 7,

// a variable to store the width of the paddle
paddleWidth = 60,

// a variable to store the number of brick rows
brickRowCount = 4,

// a variable to store the number of brick columns
brickColumnCount = 5,

// a variable to store the width of the each brick in row/column
brickWidth = 75,

// a variable to store the height of the each brick in the row/column
brickHeight = 20,

// a variable to store the padding between each brick
brickPadding = 10,

// a variable to set the offset on top of row
brickOffsetTop = 30,

// a variable to set the offset on left of row
brickOffsetLeft = 30,

// a variable to store the center of width(starting position of ball in x-axis)
x = canvas.width / 2,

// a variable to store the starting position of ball in y-axis
y = canvas.height - 30,

// a variable to store the starting position of paddle in X-axis
paddleX = (canvas.width - paddleWidth) / 2,

// a variable to store the starting position of paddle in Y-axis
paddleY = canvas.height - paddleHeight,

// a variable to check to help if right button on keyboard is pressed
rightPressed = false,

// a variable to check to help if left button on keyboard is pressed
leftPressed = false,

// a variable to store and increment score
score = 0,

// a variable to set the number of lives
lives = 3;

//beginPath method begins a path or resets the current beginPath
//closePath method creates a path from the current point back to starting point
var bricks = [];
// looping till number of columns of bricks
for (var column = 0; column < brickColumnCount; column++) {
	// creating another array at index column
	bricks[column] = [];
	// looping till number of row of bricks
	for (var row = 0; row < brickRowCount; row++) {
		/*
  creating an object at every row for every column to store x, y position and
  status of the brick to see if they are required to be drawn in
  next Frame
  */
		bricks[column][row] = { x: 0, y: 0, status: 1 };
	}
}

// eventListener to check for keydown and call callback keyDownHandler
document.addEventListener("keydown", keyDownHandler);
// eventListener to check for keyup and call callback keyUpHandler
document.addEventListener("keyup", keyUpHandler);
// eventListener for mouse movement and call callback moveMouseHandler
document.addEventListener("mousemove", mouseMoveHandler);

// 'e' an object passed with various properties when mousemove event is fired
function drawBricks() {
	// looping till column count
	for (var _column = 0; _column < brickColumnCount; _column++) {
		// looping till row count
		for (var _row = 0; _row < brickRowCount; _row++) {
			// if brick hasn't been hit, we will draw the the brick
			if (bricks[_column][_row].status == 1) {
				// calculating X and Y position for each brick at each iteration
				var brickX = _column * (brickWidth + brickPadding) + brickOffsetLeft;
				var brickY = _row * (brickHeight + brickPadding) + brickOffsetTop;
				// setting the X and Y values for brick in brick object
				bricks[_column][_row].x = brickX;
				bricks[_column][_row].y = brickY;
				context.beginPath();
				/*
    the first 2 values specify the co-ordinates from top-left
    of the canvas and next width and height
    */
				context.rect(brickX, brickY, brickWidth, brickHeight);
				// fill style is used to set property color
				context.fillStyle = "#b20039";
				// fill method is used to fill
				context.fill();
				context.closePath();
			}
		}
	}
}

// 'e' an object passed with various properties when keyDown event is fired
function keyDownHandler(e) {
	// checking to see if the right button is pressed on keyboard which corresponds to 39
	if (e.keyCode == 39) {
		// setting the rightPressed value to be true
		rightPressed = true;
	}
	// or checking to see if the left button is pressed on keyboard which corresponds to 37
	else if (e.keyCode == 37) {
			// setting the leftPressed value to be true
			leftPressed = true;
		}
}
// 'e' an object passed with various properties when keyUp event is fired
function keyUpHandler(e) {
	// checking to see if the right button is released on keyboard which corresponds to 39
	if (e.keyCode == 39) {
		// resetting the rightPressed to false
		rightPressed = false;
	}
	// or checking to see if the left button is released on keyboard which corresponds to 37
	else if (e.keyCode == 37) {
			// resetting the rightPressed to false
			leftPressed = false;
		}
}
// a function to draw the ball
function drawBall() {
	context.beginPath();
	/*
 x and y for center point, followed by ballRadius followed
 by start angle, end angle(which are in radians) drawing direction,
 clockwise or anticlockwise, default is false which is clockwise,
 so not specified here
 */
	context.arc(x, y, ballRadius, 0, Math.PI * 2);
	// fill style is used to set property color
	context.fillStyle = "#ff0052";
	// fill method is used to fill
	context.fill();
	context.closePath();
}
// a function to draw the paddle
function drawPaddle() {
	context.beginPath();
	/*
 the first 2 values specify the co-ordinates from top-left
 of the canvas and next width and height
 */
	context.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	// fillStyle is used to set property color
	context.fillStyle = "#b20039";
	// fill method is used to fill
	context.fill();
	context.closePath();
}
// a function to detect collision
function collisionDetectionofBallWithBrick() {
	// looping till column count
	for (var _column2 = 0; _column2 < brickColumnCount; _column2++) {
		// looping till row count
		for (var _row2 = 0; _row2 < brickRowCount; _row2++) {
			// defining a brick object to store the position of the brick and its status
			var brick = bricks[_column2][_row2];
			// if brick hasn't been hit, run the code below
			if (brick.status == 1) {
				/*
    checking to see if the ball is with in the coordinates of the brick, x
    positions check if the ball is hit between left and right of the brick
    and y positions to see if the ball is hit between top and bottom side of
    the brick
    */
				if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
					// changing the direction of the brick
					dy = -dy;
					// changing the status of the brick so that it isn't drawn again
					brick.status = 0;
					// incrementing score when the ball hits the brick
					score++;
					// checking to see score is equal to all the bricks in the canvas
					if (score == brickRowCount * brickColumnCount) {
						// alerting the user that he won
						alert("YOU WIN, CONGRATULATIONS!");
						// reloading the page so that game restarts
						document.location.reload();
					}
				}
			}
		}
	}
}
// a function to draw score
function drawScore() {
	// setting the font of the text
	context.font = "16px Monospace";
	// fillStyle is used to set property color
	context.fillStyle = "#ff0052";
	/*
 fill text is used to draw filled text on the canvas, 8, 20 are X and Y
 coordinates on the canvas
 */
	context.fillText('Score: ' + score, 8, 20);
}
// a function to draw lives
function drawLives() {
	// setting the font of the text
	context.font = "16px Monospace";
	// fillStyle is used to set property color
	context.fillStyle = "#ff0052";
	/*
 fill text is used to draw filled text on the canvas, -85, 20 are X and Y
 coordinates on the canvas
 */
	context.fillText('Lives: ' + lives, canvas.width - 85, 20);
}
// a function to invoke draw functions
function draw() {
	/*
  A method that clears the specified pixels within a given a rectangle,
  clearing the entire canvas below, the method takes 4 parameters,
  x and y of top left and x and y of bottom right. So, clearing the
  rectangle for every frame and then drawing required items, so that
  it appears that the ball is moving
 */
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetectionofBallWithBrick();

	/*
 checking to see if ball is touching top of the canvas, used ballRadius
 instead of 0 because we want to check the ball just touches the top of
 the canvas and not center of the ball touching the top of the canvas, by
 using ball Radius(10) we are making to sure we check when ball just touches the
 top of the canvas
 */
	if (y + dy < ballRadius) {
		// reversing the direction of the ball
		dy = -dy;
	}
	/*
 checking to see if ball is touching bottom of the canvas, similar to above, we
 want to check when ball just touches the bottom of the canvas and not the center
 of ball touching the bottom of the canvas, so we are subtracting canvas height-
 ball radius
 */
	else if (y + dy > canvas.height - ballRadius) {
			/*
   checking to see if x postion of the ball is within paddle width,
   paddleX specifies paddle starting position on X-axis and paddleX+paddleWidth
   specifies the width of the paddle
   */
			if (x > paddleX && x < paddleX + paddleWidth) {
				// reversing the direction of the ball
				dy = -dy;
			} else {
				// if misses the paddles, subtracting lives
				lives--;
				// checking to see if lives left
				if (!lives) {
					// alerting the user that he lost
					alert("You lost");
					// a method on location object of dom to reload the page, restarting the game
					document.location.reload();
				}
				// if lives left
				else {
						// resetting X and Y and dx and dy and starting position of paddle
						x = canvas.width / 2;
						y = canvas.height - 30;
						dx = 4;
						dy = -4;
						paddleX = (canvas.width - paddleWidth) / 2;
					}
			}
		}
	/*
 checking to see if ball touches right end of the canvas, like above, as we
 want the condition to be ball just touching the right edge of the canvas
 and not the center of the canvas, we are subtracting the canvas-width - ballRadius.
 The other condition is checking if ball is touching the left side of the canvas,
 as above, we want to check for outside of ball just touching, we are writing the
 condition to be less than ball radius
 */
	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		// reversing the direction of the ball
		dx = -dx;
	}
	/*
 checking to see if right key is pressed and if the starting of the paddle is
 less than canvas.width-paddleWidth so that we are limiting the movement of
 paddle to right with in the canvas
 */
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		// moving the paddle to right by 5 pixels
		paddleX += 5;
	}
	/*
 checking to see if left key is pressed and if the starting of the paddle is
 greater than 0 so that we are limiting the movement of paddle to left with in
 the canvas
 */
	else if (leftPressed && paddleX > 0) {
			paddleX -= 5;
		}
	// adding 4 for every frame
	x += dx;
	// subtracting -4 for every frame
	y += dy;
	/*
 helps the browser to render the game better by giving the control of framerate
 to browser. It will sync the framerate accordnily and render the shapes when
 required resulting in efficient and smoother animation loop
 */
	requestAnimationFrame(draw);
}
// function for moveMouseHandler
function mouseMoveHandler(e) {
	/*
 clientX returns the horizontal coordinate of the mouse pointer when a mouse
 event was triggered, relative holds the position of starting point of canvas
 */
	var relativeX = e.clientX - canvas.offsetLeft;
	/*
 Checking to see if pointer is within the canvas boundaries and checking
 when paddle just tocuhes the edge of the walls
 */
	if (relativeX > 0 + paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
		// making sure that movement is relative to middle of the paddle
		paddleX = relativeX - paddleWidth / 2;
	}
}
draw();

/***/ })
/******/ ]);