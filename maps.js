/* ============= */
/*      Maps     */
/* ============= */
// An object containing all the tiles on the map that can be acted on
actionTiles = {
	 9: Sign,
	20: Door,
};
// All the tiles with collision detection enabled
collisionTiles = {
	 1: Stone,
	 5: Bush,
	21: DoorFrame
};
// Merge action tiles into collision tiles, because action tiles need collision detection
$.extend(collisionTiles, actionTiles);


function updateBoardMapXY() {
	y = 0;
	for (height in board.world) {
		x = $.inArray(board.map, board.world[height]);
		if (x >= 0) {
			board.mapx = x;
			board.mapy = y;
		}
		y++;
	}
}

function updateMap() {
	$("#scene #fade").show();
	board.map = board.world[board.mapy][board.mapx];
	board.map.render();
}

function moveMap() {
	updateBoardMapXY();
	switch (player.facing) {
		case "up":
			board.mapy--;
			player.y = board.height -1;
			break;
		case "down":
			board.mapy++;
			player.y = 0;
			break;
		case "left":
			board.mapx--;
			player.x = board.width - 1;
			break;
		case "right":
			board.mapx++;
			player.x = 0;
			break;
	}
	drawPlayer();
	updateMap();
}


/* Initialize the maps and name them */
map0 = new Map();
map0.name = "Beginning's Landing";
map1 = new Map();
map1.name = "The East Borders";
map2 = new Map();
map2.name = "That Other Place";
map3 = new Map();
map3.name = "The Quad";
map4 = new Map();
map4.name = "Chamber of Things";


// Map 0
map0.grid = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 5, 0, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 1],
	[1, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 0, 0, 5, 5, 0, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 0, 5, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 9, 5, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 5, 5, 0, 5, 0, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5],
	[1, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 7, 0, 0, 5, 5, 0, 5, 0, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 5, 0, 0, 0, 5],
	[1, 0, 5, 5, 5, 0, 5, 5, 0, 5, 0, 0, 0, 0, 5, 5, 0, 5, 0, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 5, 0, 9, 5, 5, 5, 5],
	[1, 0, 0, 7, 0, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0],
	[1, 0, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5],
	[1, 9, 5, 0, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 1],
	[1, 0, 5, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 5, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 1],
	[1, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 1],
	[1, 0, 5, 0, 0, 5, 0, 5, 5, 5, 0, 5, 5, 7, 0, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 0, 0, 0, 1],
	[1, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 5, 1],
	[1, 5, 5, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 5, 0, 0, 5, 1],
	[1, 0, 0, 0, 0, 5, 7, 0, 5, 0, 5, 0, 5, 0, 0, 5, 5, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 1],
	[1, 5, 5, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 0, 5, 5, 5, 0, 0, 5, 0, 5, 0, 5, 0, 1],
	[1, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 1],
	[1, 0, 5, 5, 0, 5, 0, 5, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 0, 1],
	[1, 5, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 5, 5, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 1],
	[1, 0, 5, 5, 0, 5, 0, 0, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 1],
	[1, 0, 0, 0, 0, 5, 9, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 5, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 1],
	[1, 0, 5, 0, 5, 5, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 9, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 1],
	[1, 0, 5, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1],
	[1, 0, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 1],
	[1, 0, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
map0.actionTiles = [
	new Sign(9, 12, 1, "The <span class='hilite'>Forest of Secrets</span> contains a number of secrets. How many? That's a secret.<br/>There's another sign with further instructions around here somewhere."),
	new Sign(9, 24, 6, "Can you find the four <span class='hilite'>Golden Orbs</span>? Once you do, find the <span class='hilite'>"+map4.name+"</span> and we'll see what happens."),
	new Sign(9, 25, 25, "South &darr; to <span class='hilite'>"+map2.name+"</span> and the <span class='hilite'>"+map4.name+"</span>."),
	new Sign(9, 5, 36, "If you press <span class='hilite'>W</span> while standing in front of a monster, nothing will happen. And it will kill you. So, you probably shouldn't do that."),
	new Sign(9, 9, 35, "East &rarr; to <span class='hilite'>"+map1.name+"</span>.")
];
map0.objects = [
	new Orb(1000, 16, 14, "The <span>Orb of Power</span> glows quite powerfully, and was once previously accused of steroid use.")
];


// Map 1
map1.grid = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 5, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 6, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 7, 7, 5, 0, 1],
	[1, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 6, 0, 0, 5, 5, 5, 0, 0, 0, 5, 0, 7, 7, 5, 0, 1],
	[1, 5, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 0, 0, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5, 5, 5, 0, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 0, 7, 5, 0, 0, 5, 0, 5, 5, 0, 0, 0, 1],
	[5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 7, 0, 5, 0, 0, 0, 5, 0, 5, 5, 0, 0, 0, 5, 0, 0, 5, 0, 0, 5, 0, 0, 0, 1],
	[5, 0, 0, 0, 5, 0, 5, 0, 5, 5, 0, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 5, 5, 0, 0, 1],
	[5, 9, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 5, 0, 5, 0, 0, 0, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 5, 5, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 1],
	[5, 0, 5, 5, 5, 7, 0, 0, 5, 0, 0, 5, 0, 5, 5, 5, 5, 0, 5, 0, 5, 0, 0, 5, 5, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0, 1],
	[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 5, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 1],
	[5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 0, 5, 5, 6, 5, 6, 5, 0, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 0, 0, 5, 5, 0, 7, 5, 0, 5, 0, 1],
	[5, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 7, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 1],
	[1, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 6, 5, 5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 5, 1],
	[1, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 1],
	[1, 5, 0, 5, 0, 5, 7, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 1],
	[1, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1],
	[1, 5, 0, 0, 0, 5, 0, 5, 0, 5, 5, 5, 5, 0, 5, 5, 0, 5, 0, 0, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 7, 5, 5, 0, 5, 0, 1],
	[1, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 0, 5, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 7, 5, 5, 0, 5, 0, 1],
	[1, 0, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 1],
	[1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 5, 5, 0, 5, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 5, 5, 5, 9, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 1],
	[1, 0, 5, 5, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 5, 0, 5, 7, 5, 0, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 5, 5, 0, 1],
	[1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 5, 5, 5, 0, 5, 5, 5, 0, 5, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
map1.actionTiles = [
	new Sign(9, 9, 1, "West &larr; to <span class='hilite'>"+map0.name+"</span>."),
	new Sign(9, 26, 28, "South &darr; to <span class='hilite'>"+map3.name+"</span>.")
];
map1.objects = [
	new Orb(1001, 16, 14, "The Orb of Courage makes Ernest Shackleton look like a bitch.")
];


// Map 2
map2.grid = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1],
	[1, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0, 5, 0, 0, 0, 5, 5, 5, 0, 9, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 0, 0, 5, 5, 0, 1],
	[1, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 0, 0, 5, 5, 0, 1],
	[1, 0, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 0, 0, 5, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 5, 1],
	[1, 0, 5, 0, 5, 0, 5, 5, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 7, 5, 5, 5, 0, 5, 0, 0, 5, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 5, 0, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 7, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 7, 0, 0, 0, 1],
	[1, 0, 5, 0, 0, 7, 5, 0, 5, 0, 5, 7, 5, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 7, 0, 0, 0, 5, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 5, 0, 5, 0, 7, 0, 5, 0, 5, 5, 0, 0, 0, 0, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 7, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5, 5, 0, 6, 6, 6, 0, 5, 0, 5, 5, 5, 0, 0, 0, 0, 1],
	[1, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 6, 6, 6, 0, 5, 0, 0, 0, 5, 0, 0, 5, 0, 1],
	[1, 0, 5, 5, 5, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 5, 5, 5, 5, 0, 6, 6, 6, 0, 5, 0, 0, 0, 5, 0, 0, 5, 0, 1],
	[1, 0, 0, 0, 0, 5, 7, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 1],
	[1, 0, 0, 5, 5, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 0, 5, 5, 5, 5, 0, 0, 0, 5, 5, 5, 5, 0, 5, 0, 5, 0, 0, 0, 5, 5, 0, 1],
	[1, 0, 9, 5, 0, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1],
	[1, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 5, 0, 5, 5, 5, 5, 0, 0, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 7, 5, 5, 5, 0, 5, 1],
	[1, 0, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 0, 7, 0, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 5, 1],
	[1, 0, 5, 0, 0, 0, 5, 7, 5, 0, 0, 0, 5, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 1],
	[1, 0, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 5, 0, 5, 5, 0, 0, 1],
	[1, 0, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 5, 0, 5, 5, 0, 5, 0, 5, 5, 0, 0, 1],
	[1, 0, 5, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5, 0, 5, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 0, 1],
	[1, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5, 7, 0, 0, 0, 5, 0, 1, 1, 1, 0, 5, 0, 0, 0, 5, 0, 9, 5, 5, 5, 5, 5, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 1, 1, 1, 5, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
map2.actionTiles = [
	new Sign(9, 2, 23, "North &uarr; to <span class='hilite'>"+map0.name+"</span>."),
	new Sign(9, 27, 33, "East &rarr; to <span class='hilite'>"+map3.name+"</span>."),
	new Sign(9, 20, 2, "South &darr; to <span class='hilite'>"+map4.name+"</span>.")
];
map2.objects = [
	new Orb(1002, 16, 14, "The Orb of Wisdom lets you finally remember every Game of Thrones character's name.")
];


// Map 3
map3.grid = [
	[1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1],
	[1, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1],
	[1, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 1],
	[1, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 9, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 1],
	[1, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 0, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 1],
	[1, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 7, 5, 0, 5, 0, 0, 0, 0, 5, 5, 5, 1],
	[1, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 1],
	[1, 5, 0, 0, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 1],
	[1, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 5, 0, 7, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 7, 5, 5, 0, 1],
	[1, 5, 0, 7, 5, 7, 0, 5, 5, 5, 5, 7, 5, 0, 0, 5, 5, 5, 5, 5, 0, 5, 0, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 1],
	[1, 5, 0, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 1],
	[1, 5, 0, 5, 5, 5, 0, 5, 5, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 0, 0, 0, 5, 5, 5, 0, 1],
	[1, 5, 0, 0, 5, 5, 0, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 7, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 0, 5, 0, 5, 5, 5, 0, 1],
	[1, 5, 5, 0, 0, 5, 5, 0, 5, 5, 0, 5, 5, 7, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 6, 6, 5, 0, 5, 0, 5, 0, 5, 0, 0, 0, 1],
	[1, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 6, 6, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 1],
	[1, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 6, 6, 0, 0, 5, 0, 5, 0, 5, 5, 0, 5, 1],
	[1, 5, 5, 5, 0, 5, 7, 0, 5, 0, 0, 0, 0, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 0, 5, 5, 0, 5, 1],
	[1, 5, 0, 0, 0, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 0, 5, 5, 0, 5, 1],
	[1, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 1],
	[1, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 7, 0, 5, 5, 0, 5, 1],
	[1, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 1],
	[1, 5, 5, 5, 0, 0, 5, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 0, 5, 1],
	[1, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 1],
	[1, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 9, 0, 0, 5, 1],
	[1, 5, 0, 5, 0, 0, 0, 5, 0, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 0, 0, 0, 5, 1],
	[1, 5, 0, 9, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 5, 0, 5, 5, 0, 1, 5, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 1],
	[0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
map3.actionTiles = [
	new Sign(9, 4, 25, "North &uarr; to <span class='hilite'>"+map1.name+"</span>."),
	new Sign(9, 27, 3, "West &larr; to <span class='hilite'>"+map2.name+"</span>."),
	new Sign(9, 25, 35, "You're way, way off.")
];
map3.objects = [
	new Orb(1000, 16, 14, "The Orb of Honor is a good placeholder for when you're not sure of what to make an orb about.")
];


// Map 4
map4.grid = [
	[1, 5, 5, 5, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 5, 5, 5, 0, 5, 5, 5, 5, 5, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5],
	[1, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 0, 5],
	[1, 5, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 7, 0, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 0, 0, 0, 0, 7, 0, 5, 0, 5, 0, 5],
	[1, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 5, 5, 0, 0, 0, 5, 5, 0, 5, 5, 5, 5, 0, 5, 0, 5, 5, 5],
	[1, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 5, 5],
	[1, 5, 5, 5, 0, 5, 1, 5, 5, 5, 5, 5, 5, 5, 7, 7, 5, 5, 7, 5, 0, 5, 5, 5, 0, 5, 0, 5, 7, 5, 5, 5, 5, 7, 0, 5, 5, 5, 5, 5],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 5, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5],
	[1, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 0, 0, 0, 5, 5, 7, 5, 0, 5, 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 5, 0, 0, 7, 0, 5, 5],
	[1, 5, 5, 5, 0, 5, 5, 7, 5, 0, 7, 0, 5, 0, 5, 0, 0, 0, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 7, 0, 5, 5, 5, 5, 5, 0, 5, 5],
	[1, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 0, 0, 5, 5, 0, 5, 0, 0, 1, 0, 5, 5, 5, 5, 5, 0, 5, 5],
	[1, 5, 5, 5, 0, 0, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 5, 5, 0, 5, 5, 0, 1, 0, 0, 0, 5, 5, 5, 0, 5, 5],
	[1, 5, 5, 5, 0, 5, 0, 5, 5, 0, 5, 0, 5, 0, 5, 0, 5, 0, 0, 5, 0, 0, 0, 7, 5, 5, 0, 5, 5, 0, 7, 5, 5, 0, 5, 5, 5, 5, 5, 5],
	[1, 0, 0, 0, 0, 5, 0, 5, 5, 0, 5, 0, 0, 0, 5, 0, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5],
	[1, 5, 5, 5, 0, 5, 0, 7, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 7, 5, 0, 5, 5, 5, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
	[1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5],
	[1, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5],
	[1, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
	[1, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 0, 5, 5, 0, 5, 0, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
	[1, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
	[1, 0, 0, 0, 0, 5, 5, 0, 5, 5, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7, 5, 0, 1],
	[1, 5, 5, 5, 0, 5, 5, 0, 5, 5, 0, 5, 0, 5, 5, 0, 0, 0, 5, 5, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 5, 5, 0, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 6, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 0, 1],
	[1, 5, 5, 5, 0, 5, 5, 5, 0, 5, 7, 5, 0, 5, 7, 0, 0, 0, 5, 5, 6, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 5, 5, 7, 0, 5, 5, 5, 0, 5],
	[1, 0, 0, 0, 0, 5, 0, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 0, 5, 5, 6, 0, 0, 9, 0, 0, 6, 5, 5, 5, 0, 5, 5, 5, 0, 5, 5, 5, 0, 5],
	[1, 5, 5, 5, 0, 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0, 5, 5, 6, 0, 0, 0, 0, 0, 6, 5, 0, 5, 0, 5, 5, 5, 0, 5, 5, 5, 0, 5],
	[1, 0, 0, 0, 0, 5, 0, 7, 0, 5, 0, 5, 5, 5, 0, 5, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 6, 5, 7, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 1],
	[1, 5, 5, 5, 0, 5, 0, 0, 0, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0, 6, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 1],
	[5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 7, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
map4.actionTiles = [
	new Sign(9, 24, 23, "Welcome to the <span class='hilite'>"+map4.name+"</span>!<br />Have you collected all of the Orbs? Actually, I don't really care.")
];
map4.objects = [
	
];




map16 = new Map();
map17 = new Map();
map18 = new Map();
map19 = new Map();
map20 = new Map();
map21 = new Map();
map22 = new Map();
map23 = new Map();
map24 = new Map();
map25 = new Map();
map26 = new Map();
map27 = new Map();
map28 = new Map();
map29 = new Map();
map30 = new Map();
map31 = new Map();


var level1 = [
	[ map0,  map1],
	[ map2,  map3],
	[ map4       ]
];

var level2 = [
	[map16, map17, map18, map19],
	[map20, map21, map22, map23],
	[map24, map25, map26, map27],
	[map28, map29, map30, map31]
];

