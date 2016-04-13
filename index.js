var ctx;

var upHeld = false;
var downHeld = false;
var leftHeld = false;
var rightHeld = false;
var spaceHeld = false;

var rockRate = 30;
var rockTimeout = rockRate;

var ship;
var rocks;
var blasts;

var running = true;

function rad(angle) {
	return angle * Math.PI / 180;
}

$(document).ready(function() {
	ctx = $("#canvas")[0].getContext("2d");
	ctx.canvas.width = $(window).width();
	ctx.canvas.height = $(window).height();

	ship = new Ship();
	rocks = new Array();
	blasts = new Array();

	$("body").keydown(function(e) {
		if (e.which == 38) {
			upHeld = true;
		} else if (e.which == 40) {
			downHeld = true;
		} else if (e.which == 37) {
			leftHeld = true;
		} else if (e.which == 39) {
			rightHeld = true;
		} else if (e.which == 32) {
			spaceHeld = true;
		}
	});

	$("body").keyup(function(e) {
		if (e.which == 38) {
			upHeld = false;
		} else if (e.which == 40) {
			downHeld = false;
		} else if (e.which == 37) {
			leftHeld = false;
		} else if (e.which == 39) {
			rightHeld = false;
		} else if (e.which == 32) {
			spaceHeld = false;
		}
	});

	t = setInterval(function() {
		if (running) {
			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			ship.update();
			for (var i = 0; i < rocks.length; i++) {
				rocks[i].update();
			}
			for (var i = 0; i < blasts.length; i++) {
				blasts[i].update();
			}

			if (rockTimeout == rockRate) {
				var side = Math.floor(Math.random() * 4);
				if (side == 0) { // top
					rocks.push(new Rock(Math.random() * $(window).width(), -150, Math.floor(Math.random() * 20) + 15,
							   Math.random() * 4 - 2, Math.random() * 2));
				} else if (side == 1) { // left
					rocks.push(new Rock(-150, Math.random() * $(window).height(), Math.floor(Math.random() * 20) + 15,
							   Math.random() * 2, Math.random() * 4 - 2));
				} else if (side == 2) { // bottom
					rocks.push(new Rock(Math.random() * $(window).width(), $(window).height() + 150, Math.floor(Math.random() * 20) + 15,
							   Math.random() * 4 - 2, -Math.random() * 2));
				} else if (side == 3) { // right
					rocks.push(new Rock($(window).width() + 150, Math.random() * $(window).height(), Math.floor(Math.random() * 20) + 15,
							   -Math.random() * 2, Math.random() * 4 - 2));
				}
				rockTimeout = 0;
			} else {
				rockTimeout++;
			}

			ship.paint();
			for (var i = 0; i < rocks.length; i++) {
				rocks[i].paint();
			}
			for (var i = 0; i < blasts.length; i++) {
				blasts[i].paint();
			}
		}
	}, 15);
});
