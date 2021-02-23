var canvas;
var ctx1;
var ctx;
var xcoord = 10;
var ycoord = 10;
var obstacle = [];

window.onload = function() {
  canvas = document.getElementById("textbox");
  ctx1 = canvas.getContext("2d");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;
  drawCanv();
}

/* obstacle object */
var object = {
    height: 50,
    width: 50,
    x: 100,
    y: 100,      
  }

function drawCanv() {
    /* canvas */
    ctx1.beginPath();
    ctx1.fillStyle = "#ffffff";
    ctx1.fillRect(0, 0, canvas.width, canvas.height);
    /* player */
    ctx1.beginPath();
    ctx1.fillStyle = "black";
    ctx1.fillRect(xcoord, ycoord, player.width, player.height);
  
  /* obstacle object */
  var ndx = obstacle.push({
      x: object.x,
      y: object.y,
      width: object.width,
      height: object.height,
    }) - 1;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle[ndx].x, obstacle[ndx].y, obstacle[ndx].width, obstacle[ndx].height);
}

/* player object */
var player = {
    height: 10,
    width: 10,
};

function hitObsta(player, array) {
    for (var value of array) {
        /* if player object hits the obstacle at 100,100 */

        /* player.x + player.width must be less than x-coordinate of obstacle (value.x - fixed val of 100)
        because player.x (x-coord of player) + the player.width (fixed val of 10) representing 
        the amount of space (in x-axis) player is occupying thus should be 
        compared with x-coordinate of obstacle.*/

        /*When player.x reaches 90, it doesn't go to this if condition YET. Technically,
        it is the first time the player has come closest to the obstacle but moving the same
        direction would make player.x reach 91 thus the condition below is fulfilled signifying
        that the player cannot pass through the obstacle */

        /*Same explanation also for player.x, player.height, and value.y */
        if ((player.x + player.width > value.x && player.x < value.x + value.width) 
        && (player.y + player.height > value.y && player.y < value.y + value.height)) {
            /* 91+10 > 100 && 91 < 100 + 50   */
            /* sample use cases*/
            console.log(player.x); //91
            console.log(player.width); //10 fixed
            console.log(value.x); //100 fixed
            console.log(value.width); //50 fixed

            /* &&  103 +10 > 100 && 103 < 100+50 */ 
            console.log(player.y); //103
            console.log(player.height); //10 fixed
            console.log(value.y); //100 fixed
            console.log(value.height); //50 fixed
            return true;
        }
    }
    console.log(player.x);
    return false;
}


function onkeydown(e) {
  /* Going right or pressing D */
  if (e.keyCode == 68 && xcoord + 10 < canvas.width) { /* + 10 because 10x10 is the size of the player */
    xcoord++;                                          /* since it is going right, x-axis increases and to check
                                                          collision, x-axis value + size of player must be less than width  */
    var updatedCoords = (Object.assign({
        x: xcoord,
        y: ycoord,
    }, player));
    if (hitObsta(updatedCoords, obstacle)) {
        xcoord--;
    }
  } 
  /* Going left ot pressing A */
  else if (e.keyCode == 65 && xcoord > 0) {  /* x-axis to the left means that the value is x decreasing. */
    xcoord--;                                 /* width runs from the left (0) to right (canvas.width)*/
    var updatedCoords = (Object.assign({
        x: xcoord,
        y: ycoord,
    }, player));
    if (hitObsta(updatedCoords, obstacle)) {
        xcoord++;
    }
  } 
  /* Going up or pressing W */
  else if (e.keyCode == 87 && ycoord > 0) { /* height runs the top(0) until the bottom(canvas.height) (increases as it goes down) */
    ycoord--;                               /* if player wants to go up, y-value should decrease */
    var updatedCoords = (Object.assign({
        x: xcoord,
        y: ycoord,
    }, player));
    if (hitObsta(updatedCoords, obstacle)) {
        ycoord++;
    }
  } 
  /* Going down or pressing S */
  else if (e.keyCode == 83 && ycoord + 10 < canvas.height) { /* To check if collision happened below, y-value + size
                                                              of player (10x10) must be less than the canvas height  */
    ycoord++; 
    var updatedCoords = (Object.assign({
        x: xcoord,
        y: ycoord,
    }, player));
    if (hitObsta(updatedCoords, obstacle)) {
        ycoord--;
    }
  }
  drawCanv();
}

window.addEventListener("keydown", onkeydown);