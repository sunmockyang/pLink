function PLImage(url){
	this.pos = new Vector(0, 0);
	this.readyToDraw = false;
	this.image = new Image();
	this.image.onload = (function() {this.readyToDraw = true;}).bind(this);
	this.image.src = url;
}

PLImage.prototype = new PLObject();

PLImage.prototype.draw = function() {
	if (this.readyToDraw){
		this.context.drawImage(this.image, 0, 0);
	}
};