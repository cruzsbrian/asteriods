var shipSize = 20;
var shipWidth = 40;
var accel = 0.1;
var turnRate = 5;
var blastRate = 10;
var blastTimeout = blastRate;

function Ship() {
	this.x = $(window).width() / 2;
	this.y = $(window).height() / 2;
	this.vx = 0;
	this.vy = 0;
	this.d = 0;
	this.blasts = new Array();

	this.getPoints = getShipPoints;
	this.update = updateShip;
	this.paint = paintShip;
}

function getShipPoints() {
	var p = new Array();

	var a1 = rad(this.d - shipWidth);
	var a2 = rad(this.d + shipWidth);
	p.push([this.x + shipSize * Math.cos(rad(this.d)), this.y - shipSize * Math.sin(rad(this.d))]);
	p.push([this.x - shipSize * Math.cos(a1), this.y + shipSize * Math.sin(a1)]);
	p.push([this.x - shipSize * 0.5 * Math.cos(rad(this.d)), this.y + shipSize * 0.5 * Math.sin(rad(this.d))]);
	p.push([this.x - shipSize * Math.cos(a2), this.y + shipSize * Math.sin(a2)]);

	return p;
}

function updateShip() {
	if (upHeld) {
		this.vx += accel * Math.cos(rad(this.d));
		this.vy -= accel * Math.sin(rad(this.d));
	}
	if (downHeld) {
		this.vx -= 0.5 * accel * Math.cos(rad(this.d));
		this.vy += 0.5 * accel * Math.sin(rad(this.d));
	}
	if (leftHeld) {
		this.d += turnRate;
	}
	if (rightHeld) {
		this.d -= turnRate;
	}

	if (spaceHeld) {
		if (blastTimeout == blastRate) {
			var p = this.getPoints();
			blasts.push(new Blast(p[0][0], p[0][1], this.d));
			blastTimeout = 0;
		} else {
			blastTimeout++;
		}
	} else {
		blastTimeout = blastRate;
	}

	if (this.vx != 0) {
		this.vx -= 0.01 * this.vx;
	}
	if (this.vy != 0) {
		this.vy -= 0.01 * this.vy;
	}

	this.x += this.vx;
	this.y += this.vy;
}

function paintShip() {
	var p = this.getPoints();
	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.moveTo(p[0][0], p[0][1]);
	for (var i = p.length - 1; i >= 0; i -= 1) {
		ctx.lineTo(p[i][0], p[i][1]);
	}
	ctx.stroke();
}
