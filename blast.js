var blastSpeed = 10;

function Blast(x, y, d) {
	this.x = x;
	this.y = y;
	this.vx = blastSpeed * Math.cos(rad(d));
	this.vy = -blastSpeed * Math.sin(rad(d));
	this.spent = false;

	this.update = updateBlast;
	this.paint = paintBlast;
}

function updateBlast() {
	for (var i = 0; i < rocks.length; i++) {
		var distToCenter = Math.sqrt(Math.pow(rocks[i].x - this.x, 2) + Math.pow(rocks[i].y - this.y, 2));
		if (distToCenter <= rocks[i].radius && !this.spent) {
			rocks[i].explode();
			rocks.splice(i, 1);
			this.spent = true;
		}
	}

	this.x += this.vx;
	this.y += this.vy;
}

function paintBlast() {
	if (!this.spent) {
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.vx / 3, this.y + this.vy / 3);
		ctx.stroke();
	}
}
