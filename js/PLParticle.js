function PLParticle(x, y) {
	this.pos = new Vector(x, y);

	this.size = 2;

	this.accel = new Vector(0, 0);
	this.speed = new Vector(0,0);
	this.colour = (new Color(0, 0, Math.random() * 50 + 200)).toHex();
}

PLParticle.prototype = new PLObject();
PLParticle.prototype.FRICTION_STRENGTH = 0.9;
PLParticle.prototype.MAX_SPEED = 5;

PLParticle.prototype.update = function() {
	this.accel = new Vector(Math.random() - 0.5, Math.random() - 0.5);

	this.speed = this.speed.add(this.accel);
	this.speed.clamp(this.MAX_SPEED, -this.MAX_SPEED);
	this.pos = this.pos.add(this.speed);

	// friction
	this.speed = this.speed.multiply(this.FRICTION_STRENGTH);
	this.accel = Vector.Zero();

	this.size = Mathx.Lerp(this.size, 20 + this.speed.mag() * 5, 0.1);
};

PLParticle.prototype.draw = function() {
    // this.context.fillStyle = this.colour;

    var grad = this.context.createRadialGradient(0,0,0,0,0,this.size);
    grad.addColorStop(0, '#DA1C5C');
    grad.addColorStop(1, '#ED1C24');
    this.context.fillStyle = grad;
    this.context.beginPath();
    this.context.arc(0, 0, this.size, 0, 2 * Math.PI, false);
    this.context.fill();
    this.context.closePath();
};