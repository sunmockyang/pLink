function Plink(canvas){
	var width = 600;
	var height = 600;

	// Setup canvas
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.canvas.width = width;
	this.canvas.height = height;

	this.camera = new PLCamera(this.context);
	this.bg = new PLImage("img/output.jpg");
	this.drops = [];

	this.camera.addObject(this.bg);

	for (var i = 0; i < 100; i++) {
		this.drops.push(new PLDroplet());
		this.camera.addObject(this.drops[i]);
	};

	this.camera.setFollowObject(this.drops[0]);

	this.run();
};

Plink.prototype.update = function() {
	for (var i = 0; i < this.drops.length; i++) {
		this.drops[i].update();
	};
};
 
Plink.prototype.draw = function() {
	this.camera.draw();
};
 
Plink.prototype.run = function(){this.update();this.draw();window.requestAnimationFrame(this.run.bind(this));}
window.requestAnimationFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;
