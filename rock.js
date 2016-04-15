function Rock(x, y, size, vx, vy) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.radius = size * 2 + 5;
	this.vx = vx;
	this.vy = vy;

	this.points = new Array();
	for (var i = 0; i < size; i++) {
		var dist = (Math.random() * 10 - 5) + this.radius;
		var angle = i * 360 / size;
		this.points.push([dist * Math.cos(rad(angle)), dist * Math.sin(rad(angle))]);
	}

	this.explode = explodeRock;
	this.update = updateRock;
	this.paint = paintRock;
}

function explodeRock() {
	if (this.size - 5 >= 4) {
		rocks.push(new Rock(this.x, this.y, this.size - 5, this.vx, this.vy));
		rocks.push(new Rock(this.x, this.y, 5, Math.random() * 4 - 2, Math.random() * 4 - 2));
	}
}

function updateRock() {
	var hitShip = false;
	var p = ship.getPoints();
	for (var i = 0; i < p.length; i++) {
		var distToCenter = Math.sqrt(Math.pow(this.x - p[i][0], 2) + Math.pow(this.y - p[i][1], 2));
		if (distToCenter < this.radius) {
			hitShip = true;
		}
	}
	if (hitShip) {
		running = false;
		alert("You suck.");
		//alert("Now go do something productive with your life.");
		//alert("Or don't. I don't really care. I'm just a pop-up.");
		location.reload();
	}

	this.x += this.vx;
	this.y += this.vy;
}

function paintRock() {
	ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.moveTo(this.x + this.points[0][0], this.y + this.points[0][1]);
	for (var i = this.size - 1; i >= 0; i -= 1) {
		ctx.lineTo(this.x + this.points[i][0], this.y + this.points[i][1]);
	}
	ctx.stroke();
}
