/* ========================== */
/* Global variables & objects */
/* ========================== */
var board = {};
var keyPress = {};
var spotlight = new SpotLight($("#spotlight"));

// Set up board object
board = {
	world: level1,
	map: map0,
	mapx: 0,
	mapy: 0,
	width: map0.grid[0].length,
	height: map0.grid.length,
	sceneHeight: parseInt($("#scene").css("height")),
	sceneWidth: parseInt($("#scene").css("width")),
	intervalID: undefined,
	framerate: (1000 / 15),
	collection: $("#details .collection"),
	paused: false,
	tilePixels: 16,
	orbCount: 4,
	clone: false,
	hidden: true
};

board.pressedKeys = [];

// Map key codes
keyPress = {
	up: 38,
	down: 40,
	left: 37,
	right: 39,
	spacebar: 32,
	s: 83,
	i: 73,
	c: 67,
	a: 65
};


// Player(x, y, name, facing, obj)
player = new Player(1, 1, "link", "down", $("#player"));
clone = new Player(30, 10, "clone", "down", $("#clone"));
clone2 = new Player(10, 14, "clone", "down", $("#clone2"));
clone3 = new Player(6, 3, "clone", "down", $("#clone3"));
players = board.clone ? [player, clone, clone2, clone3] : [player];



/* ============== */
/* Game functions */
/* ============== */
// Input monitoring
$(function() {
	// Get the keypresses
	$(document).keydown(function(e){
			board.pressedKeys[e.which] = true;
			if (e.keyCode == keyPress.SPACEBAR) {
				pauseGame();
			} else if (e.keyCode != keyPress.up && e.keyCode != keyPress.down &&
					e.keyCode != keyPress.left && e.keyCode != keyPress.right) {
				makeAction();
			}/* else if (e.keyCode == keyPress.up || e.keyCode == keyPress.down ||
					e.keyCode == keyPress.left || e.keyCode == keyPress.right) {
				player.moving = true;
				movePlayer();
			}*/
			for (p in players) {players[p].moving = true;};
	});
	$(document).keyup(function(e){
			board.pressedKeys[e.which] = false;
			stopPlayer();
	});
	
	// Start the game when the user presses start
	$(document).ready(function() {
		message = "Use the arrow keys (<span class='hilite'>&larr;</span>, <span class='hilite'>&uarr;</span>, <span class='hilite'>&rarr;</span>, <span class='hilite'>&darr;</span>) to move. Press <span class='hilite'>\"C\"</span> to interact with objects.";
		new Message(message).display();
		
		startGame();
	});
});


// Starts the game
function startGame() {
	board.paused = false;
	board.map.render();
	drawPlayer();
	if (board.hidden) {
		spotlight.move({ x: player.sceneX(), y: player.sceneY()});
		spotlight.show(); // Show the spotlight
		drawVisibleMapArea();
	}
	// Start the clock
	countdownTimer.Timer.once();
	board.intervalID = setInterval(function() {
		var loopStatus = gameLoop();
		// Reset the game loop if the game is over
		if (loopStatus == false) {stopGame();};
	}, board.framerate)
	//gameLoop();
}


 
/*
 * requestAnim shim layer by Paul Irish
 */
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback, element){
        window.setTimeout(callback, 1000 / 60);
      };
})();



function pauseGame() {
	board.paused = true;
}

function stopGame() {
	//console.log("Game stopped");
}

// The game loop	
function gameLoop() {
	//requestAnimFrame( gameLoop );
	
	while (!board.paused) {
		movePlayer();
		return !board.paused
	}
	return !board.paused;
}





// Check for collisions on the map
function mapCollision(tile) {
	if ($.inArray(tile, tileKeys(collisionTiles)) < 0 && !objectCollision(board.map.objects)) {
		return true;
	} else {
		return false;
	}
}

function objectCollision(objects) {
	// Loop through all objects on screen
	if (objects) {
		for (var i = 0; i < objects.length; i++) {
			// Do any of their coordinates line up with the player's proposed move?
			if ($("#scene #orb_"+objects[i].id)[0]) {
				if (player.facing == "up" && (objects[i].x == player.x && objects[i].y == player.y-1)) {
					return true;
				} else if (player.facing == "down" && (objects[i].x == player.x && objects[i].y == player.y+1)) {
					return true;
				} else if (player.facing == "left" && (objects[i].x == player.x-1 && objects[i].y == player.y)) {
					return true;
				} else if (player.facing == "right" && (objects[i].x == player.x+1 && objects[i].y == player.y)) {
					return true;
				}
			}
		}
	}
	//
	return false;
}

function cloneCollision() {
	for (p in players) {
		if (players[p].x == player.x && players[p].y == player.y && players[p].name != player.name) {
			players[p].banish();
		}
	}
}

// Check to see if you're standing next to an object
function checkForObjects() {
	adjacentTiles = player.adjacentTiles();
	adjacentObjects = player.adjacentObjects();
	helper = new Helper("");
	
	for (var pos in adjacentTiles) {
		if (adjacentTiles[pos].num >= 0) {
			obj = findTileObject(board.map.actionTiles, adjacentTiles[pos]);
			if (player.facing == pos) {
				helper.setMessage("Press <span class='hilite'>C</span> to "+obj.action);
			} else {
				helper.setMessage("<span class='dimmed'>Look at the thing next to you...</span>");
			}
		}
	}
	
	for (var pos in adjacentObjects) {
		if (adjacentObjects[pos].obj) {
			if (player.facing == pos) {
				obj = adjacentObjects[pos].obj;
				helper.setMessage("Press <span class='hilite'>C</span> to "+obj.action);
			} else {
				helper.setMessage("<span class='dimmed'>Look at the thing next to you...</span>");
			}
		}
	}
	// Render the helper
	helper.display();
}


/* ============= */
/* I/O functions */
/* ============= */
// Move the player
function movePlayer() {
	/* Position is kept in array indices
		 	[
		 	 [1,1,1,1,1,1,1]  0  First
		 	 [1,0,0,0,0,0,1]  1
		 	 [1,0,0,0,0,0,1]  2
		 	 [1,0,0,0,P,0,1]  3
		 	 [1,0,0,0,0,0,1]  4
		 	 [1,1,1,1,1,1,1]  5
		 	
Second  0 1 2 3 4 5 6
		 	 
		 ]
		 
		 P = Array[3][4]
	*/
	for (p in players) {
		if (players[p].enabled) {
			if (players[p].moving) {
				if (board.pressedKeys[keyPress.up]) {
					newPos = players[p].y - 1;
					players[p].facing = "up";
					players[p].moving = true;
					if (newPos < 0) {
						console.log("NEW MAP UP!");
						moveMap();
					} else if (mapCollision(board.map.grid[newPos][players[p].x])) {
						players[p].y = newPos;
						players[p].z--;
					}
				}
				if (board.pressedKeys[keyPress.down]) {
					newPos = players[p].y + 1;
					players[p].facing = "down";
					players[p].moving = true;
					if (newPos >= board.height) {
						console.log("NEW MAP DOWN!");
						moveMap();
					} else if (mapCollision(board.map.grid[newPos][players[p].x])) {
						players[p].y = newPos;
						players[p].z++;
					}
				}
				if (board.pressedKeys[keyPress.left]) {
					newPos = players[p].x - 1;
					players[p].facing = "left";
					players[p].moving = true;
					if (newPos < 0) {
						console.log("NEW MAP LEFT!");
						moveMap();
					} else if (mapCollision(board.map.grid[players[p].y][newPos])) {
						players[p].x = newPos;
					}
				}
				if (board.pressedKeys[keyPress.right]) {
					newPos = players[p].x + 1;
					players[p].facing = "right";
					players[p].moving = true;
					if (newPos >= board.width) {
						console.log("NEW MAP RIGHT!");
						moveMap();
					} else if (mapCollision(board.map.grid[players[p].y][newPos]))  {
						players[p].x = newPos;
					}
				}
				checkForObjects();
			}
		}
	}
	cloneCollision();
	drawPlayer();
}

// Stop the player in his tracks
function stopPlayer() {
	for (p in players) {
		players[p].moving = false;
		players[p].obj.stop(true);
		players[p].spr.stop();
		players[p].spr.cell(0,3); // Stop the cell at its standing position
	}
	drawPlayer();
}


// Take an action on something
function makeAction() {
	adjacentTiles = player.adjacentTiles();
	adjacentObjects = player.adjacentObjects();
	takeActionOn = []; // Array of things to take action on
	
	// Check something
	if (board.pressedKeys[keyPress.c]) {
		for (var pos in adjacentTiles) {
			if (adjacentTiles[pos].num >= 0) {
				obj = findTileObject(board.map.actionTiles, adjacentTiles[pos]);
				if (player.facing == pos) {
					obj.check();
					console.log("You checked the "+pos+" tile.");
				}
			}
		}
		for (var pos in adjacentObjects) {
			if (adjacentObjects[pos].obj) {
				if (player.facing == pos) {
					adjacentObjects[pos].obj.check();
					console.log("You checked the "+pos+" tile.");
				}
			}
		}
	}
	
}



/* ============== */
/* Draw functions */
/* ============== */
// Render the map


// Draw the player on the screen
function drawPlayer() {
	for (p in players) {
		if (players[p].moving) {
			players[p].obj.css("background-image", "url(images/sprite_"+players[p].name+"_"+players[p].facing+".png)");
			players[p].spr.go();
			currentX = players[p].x * board.tilePixels;// + i;
			currentY = players[p].y * board.tilePixels;// + i;
			players[p].obj.css("top", currentY + "px");
			players[p].obj.css("left", currentX + "px");
			players[p].obj.css("z-index", players[p].y);
		} else {
			currentY = players[p].y * board.tilePixels;
			currentX = players[p].x * board.tilePixels;
			players[p].obj.css("top", currentY + "px");
			players[p].obj.css("left", currentX + "px");
		}
	}
	
	if (board.hidden) {
		spotlight.move({ x: player.sceneX(), y: player.sceneY()});
		drawVisibleMapArea();
	}
}



function drawVisibleMapArea() {
	v = player.visibility;
	x = -2;
	y = -1;
	
	/* What this is doing is showing tiles within a certain distance (visibility) from the player.
		 Then it's hiding the tiles around the perimeter of the square.
		 It's iterating through the width and height of the tiles to get each coordinate
		 [Y-1, X-1] [Y-1, X] [Y-1, X+1]
		 [Y, X-1]   [Y, X]   [Y, X+1]
		 [Y+1, X-1] [Y+1, X] [Y+1, X+1]
	*/
	while (v*2 >= y) {
		while (v*2 >= x) {
			if (x != -2 && x != v*2+1) {
				$("#tile_"+(player.y-(v)+y)+"_"+(player.x-(v)+x)).css("display", "block"); // FOV
			}
			$("#tile_"+(player.y-(v+1))+"_"+(player.x-(v)+x)).css("display", "none"); // Clears top
			$("#tile_"+(player.y+(v+1))+"_"+(player.x-(v-1)+x)).css("display", "none"); // Clears bottom
			$("#tile_"+(player.y-(v)+y)+"_"+(player.x-(v+1))).css("display", "none"); // Clears left
			$("#tile_"+(player.y-(v)+y)+"_"+(player.x+(v+1))).css("display", "none"); // Clears right
			x++;
		}
		y++;
		x = 0;
	}
}


// Draw the objects on the screen
function addObjects() {
	if (board.map.objects) {
		$("#scene #objects .object").each(function(index) {
			$("#orb_"+index).remove();
		});
	
		for (var i = 0; i < board.map.objects.length; i++) {
			obj = board.map.objects[i];
			$("#scene #objects").append("<span class=\"object object_"+obj.name.toLowerCase()+"_"+obj.classId+"\" id=\""+obj.name.toLowerCase()+"_"+i+"\"></span>");
			$("#"+obj.name.toLowerCase()+"_"+i).css("top", (obj.y * board.tilePixels) + "px");
			$("#"+obj.name.toLowerCase()+"_"+i).css("left", (obj.x * board.tilePixels) + "px");
			$("#"+obj.name.toLowerCase()+"_"+i).css("z-index", obj.z);
			obj.setId(i);
		}
		console.log(board.map.objects);
	}
}
