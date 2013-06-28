/* ========= */
/* Functions */
/* ========= */
// Get the tile keys as integers
function tileKeys(set) {
	output = [];
	i = 0;
	for (var key in set) {
		output[i] = parseInt(key);
		i++;
	}
	return output.sort(function(a,b){return a-b});
}

function objectLoc(set) {
	output = [];
	i = 0;
	for (var k=0; k < set.length; k++) {
		output[i] = [parseInt(set[k].y), parseInt(set[k].x)];
		i++;
	}
	return output; //.sort(function(a,b){return a-b});
}


function findTileObject(tiles, obj) {
	new_obj = tileKeys(actionTiles);
	for(tile in tiles) {
		if (new_obj[obj.num] == tiles[tile].id && obj.loc.y == tiles[tile].y && obj.loc.x == tiles[tile].x) {
			return tiles[tile];
		}
	}
}


function findObjectByLoc(loc) {
	objects = board.map.objects;
	for (i=0; i < objects.length; i++) {
		if (objects[i].x == loc.x && objects[i].y == loc.y) {
			return objects[i];
		}
	}
}






function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}

var countdownTimer = new (function() {
    var $countdown,
        $form, // Form used to change the countdown time
        incrementTime = 70,
        currentTime = 1000,
        updateTimer = function() {
            $countdown.html(formatTime(currentTime));
            if (currentTime == 0) {
                countdownTimer.Timer.stop();
                timerComplete();
                countdownTimer.resetCountdown();
                return;
            }
            currentTime -= incrementTime / 10;
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function() {
            //console.log("Timer countdown complete.");
            return false;
        },
        init = function() {
            $countdown = $('#details .countdown');
            countdownTimer.Timer = $.timer(updateTimer, incrementTime, true);
            $form = $('#countdownTimerform');
            $form.bind('submit', function() {
                countdownTimer.resetCountdown();
                return false;
            });
        };
    this.resetCountdown = function() {
        var newTime = parseInt($form.find('input[type=text]').val()) * 100;
        if (newTime > 0) {currentTime = newTime;}
        this.Timer.stop().once();
    };
    $(init);
});