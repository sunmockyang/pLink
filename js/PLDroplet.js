function PLDroplet(){
	this.size = 5;

	this.speed = new Vector(0,0);
	this.pos = new Vector(500, 500);
	this.colour = (new Color(Math.random() * 50 + 200, 255, 255)).toHex();
}

PLDroplet.prototype = new PLObject();

PLDroplet.prototype.update = function() {
	this.speed = this.speed.add(new Vector(Math.random() - 0.5, Math.random() - 0.5));
	this.speed.clamp(2, -2);
	this.pos = this.pos.add(this.speed);

	this.size = Mathx.Lerp(this.size, 5 + this.speed.mag() * 5, 0.1);
};

PLDroplet.prototype.draw = function() {
	this.context.fillStyle = this.colour;

	this.context.beginPath();
	this.context.arc(0, 0, this.size, 0, 2 * Math.PI, false);
	this.context.fill();
	this.context.closePath();
};