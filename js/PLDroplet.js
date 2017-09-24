function PLDroplet(){
	this.size = 5;

	this.accel = new Vector(0, 0);
	this.speed = new Vector(0,0);
	this.pos = new Vector(500, 500);
	this.colour = (new Color(Math.random() * 50 + 200, 255, 255)).toHex();
}

PLDroplet.prototype = new PLObject();
PLDroplet.prototype.INPUT_STRENGTH = 2;
PLDroplet.prototype.FRICTION_STRENGTH = 0.9;
PLDroplet.prototype.MAX_SPEED = 5;

PLDroplet.prototype.setInput = function(x, y) {
	this.accel.x = x;
	this.accel.y = y;

	this.accel = this.accel.multiply(this.INPUT_STRENGTH);
};

PLDroplet.prototype.update = function() {
	this.speed = this.speed.add(this.accel);
	this.speed.clamp(this.MAX_SPEED, -this.MAX_SPEED);
	this.pos = this.pos.add(this.speed);

	// friction
	this.speed = this.speed.multiply(this.FRICTION_STRENGTH);
	this.accel = Vector.Zero();

	this.size = Mathx.Lerp(this.size, 5 + this.speed.mag() * 5, 0.1);
};

PLDroplet.prototype.draw = function() {
	this.context.fillStyle = this.colour;

	this.context.beginPath();
	this.context.arc(0, 0, this.size, 0, 2 * Math.PI, false);
	this.context.fill();
	this.context.closePath();
};