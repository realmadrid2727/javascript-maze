/* ============= */
/*   "Classes"   */
/* ============= */

function Player(x, y, name, facing, obj) {
	// Set up coordinates
	this.x = x;
	this.y = y;
	this.z = y;
	// As opposed to the map tile [y,x] setup, sometimes we want to know
	// the x,y of the character in the DOM.
	this.sceneY = function() {return parseInt(obj.css("top").replace(/[^\d.]/g, ""))};
	this.sceneX = function() {return parseInt(obj.css("left").replace(/[^\d.]/g, ""))};
	// And finally, the direction the character is facing
	this.facing = facing;
	
	this.name = name;
	this.obj = obj;
	this.spr = obj.sprite({
			cellSize: [16,24],
			cells: [1, 7],
			initCell: [0,4],
			offset: [0, 0],
			interval: (1000 / 30),
			wrap: true
	});
	
	this.visibility = 3;
	this.moving = false;
	this.enabled = true;
	this.orbsFound = 0;
	
	// Banish the player (used for clones) off screen someplace
	this.banish = function() {
		this.enabled = false;
		this.x = -1;
		this.y = -1;
	}
	
	// Returns any adjacent tiles which may be action tiles. This differs from objects in that they're
	// part of the map itself, not an object added to the map. Signs, doors, levers, etc.
	this.adjacentTiles = function() {
		actions = {
			up: {
				loc: {x: player.x, y: player.y-1},
				num: !board.map.grid[player.y-1] ? -1 : $.inArray(board.map.grid[player.y-1][player.x], tileKeys(actionTiles))
			},
			right: {
				loc: {x: player.x+1, y: player.y},
				num: !board.map.grid[player.y][player.x+1] ? -1 : $.inArray(board.map.grid[player.y][player.x+1], tileKeys(actionTiles))
			},
			down: {
				loc: {x: player.x, y: player.y+1},
				num: !board.map.grid[player.y+1] ? -1 : $.inArray(board.map.grid[player.y+1][player.x], tileKeys(actionTiles))
			},
			left: {
				loc: {x: player.x-1, y: player.y},
				num: !board.map.grid[player.y][player.x-1] ? -1 : $.inArray(board.map.grid[player.y][player.x-1], tileKeys(actionTiles))
			}
		};
		
		return actions;
	}
	
	// Returns any objects that may be next to the player, by direction, along with the object's tile location
	this.adjacentObjects = function() {
		objects = board.map.objects;
		actions = {
			up: {
				loc: {x: player.x, y: player.y-1},
				obj: findObjectByLoc(actions.up.loc)
			},
			right: {
				loc: {x: player.x+1, y: player.y},
				obj: findObjectByLoc(actions.right.loc)
			},
			down: {
				loc: {x: player.x, y: player.y+1},
				obj: findObjectByLoc(actions.down.loc)
			},
			left: {
				loc: {x: player.x-1, y: player.y},
				obj: findObjectByLoc(actions.left.loc)
			}
		};
		
		return actions;
	}
}


// A map object
function Map(y, x, grid, enemies, actionTiles) {
	this.x = x;
	this.y = y;
	this.grid = grid;
	this.enemies = enemies;
	this.actionTiles = actionTiles;
	this.setObjects = function(objects) {this.objects = objects};
	this.render = function () {
		$("#scene #map .map").remove();
		$("#scene #map").append("<div class=\"map\"></div>");
		display = board.hidden ? "none" : "block";
		 
		for (var c = 0; c < this.grid.length; c++) {
			for (var t = 0; t < this.grid[c].length; t++) {
				$("#scene #map .map").append("<span class=\"tile tile"+this.grid[c][t]+"\" id=\"tile_"+c+"_"+t+"\" style='display:"+display+"; top:"+c*board.tilePixels+"px; left:"+t*board.tilePixels+"px;'></span>");
			}
		}
		$("#scene #fade").fadeOut('slow');
		addObjects();
		console.log("Map rendered.");
	};
}

// Tiles that can be acted on
function ActionTile(id, y, x) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.z = y;
	this.resets = true;
	this.completed = function() {
		$("#tile_"+x+"_"+y).css("background-position", "new position here");
	};
}


function Sign(id, y, x, message) {
	this.id = id;
	this.y = y;
	this.x = x;
	this.name = "Sign";
	this.action = "Read";
	this.message = message;
	
	this.check = function() {
		if (player.facing == "up") {
			new Message(this.message).display();
		} else {
			new Message("You should probably read the front of the sign, because the only thing it has on the back is a carving of a penis.").display();
		}
	}
}

function Orb(classId, y, x, message) {
	this.classId = classId;
	this.id;
	this.y = y;
	this.x = x;
	this.name = "Orb";
	this.action = "Pick Up";
	this.message = message;
	this.setId = function(id) {this.id = id;};
	this.disappear = function() {$("#orb_"+this.id).fadeOut(1000);  /*.delay(11000).remove(); /*board.map.setObjects(undefined);*/}
	// Can't create a this.element variable because the element isn't created before the object
	
	this.check = function() {
		player.orbsFound++;
		if (board.orbCount - player.orbsFound < 1) {
			// All orbs found
			m = this.message + " You've found all the Orbs! Place them in the <span class='hilite'>Chamber of Things</span> to continue with your journey."
			new Message(m).display();
		} else {
			// Still some orbs missing
			m = this.message + " You still need to find <span class='hilite'>"+(board.orbCount - player.orbsFound)+"</span> more Orbs.";
			new Message(m).display();
		}
		this.disappear();
		this.addToCollection();
	}
	
	this.addToCollection = function() {
		board.map.objects.splice(board.map.objects.indexOf(this));
		board.collection.append("<span class=\"object object_"+this.name.toLowerCase()+"_"+this.classId+"\" id=\"orb_"+this.id+"\" style=\"position: relative; top: 0;\" title=\""+this.message.replace(/(<([^>]+)>)/ig, '')+"\"></span>");
		$("#details .action").html(""); // Hide the helper
	}
}


function Bush(id, y, x) {
	this.id = id;
	this.y = y;
	this.x = x;
	this.name = "Bush";
}

function Door(id, y, x) {
	this.id = id;
	this.y = y;
	this.x = x;
	this.name = "Door";
	this.action = "Open";
}

function DoorFrame(id, y, x) {this.name = "Door Frame";}
function Stone(id, y, x) {this.name = "Stone";}




// The spotlight
function SpotLight(element) {
	this.element = element;
	this.x = element.width() / 2;
	this.y = element.height() / 2;
	this.show = function() {
		element.hide();
		element.removeClass("hide");
		return element.fadeIn('fast');
	};
	
	this.hide = function(callback) {
		element.fadeOut('fast', function() {
			if (callback) {
				return callback();
			}
		});
		return element.addClass("hide");
	};
	
	this.move = function(opts) {
		element.css("top", opts.y-480+"px");
		element.css("left", opts.x-640+"px");
	};
	this;
}

// Message output
function Message(text) {
	this.message = text;
	this.element = $("#message");
	this.display = function() {
		this.element.stop();
		this.element.hide();
		textLength = this.message.replace(/(<([^>]+)>)/ig, '').length;
		
		time = (textLength * 40 < 5000) ? 5000 : textLength * 40;
		
		this.element.html(this.message);
		this.element.fadeIn().delay(time).fadeOut();
	}
}

function Helper(text) {
	this.message = text;
	this.element = $("#details .action");
	this.setMessage = function(text) {this.message = text;};
	
	this.display = function() {
		this.element.stop();
		this.element.hide();
		textLength = this.message.replace(/(<([^>]+)>)/ig, '').length;
		
		// Show for a minimum length of time, because even though we're giving 40ms per character,
		// people won't really notice a message saying "No" lasting for 80ms.
		time = (textLength * 40 < 5000) ? 5000 : textLength * 40;
		
		this.element.html(this.message);
		this.element.fadeIn('fast');
	}
	this.conceal = function() {
		this.element.fadeOut('fast');
		this.element.html("");
	}
}
