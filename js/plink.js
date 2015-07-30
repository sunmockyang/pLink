var pLinkDebugMode = false;

function Plink(canvas){
	var width = 600;
	var height = 600;

	// Setup canvas
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.canvas.width = width;
	this.canvas.height = height;

	// Setup pLink
	this.camera = new PLCamera(this.context);
	this.bg = new PLImage("img/1436770530303.jpg");
	this.drops = [];

	this.camera.addObject(this.bg);

	for (var i = 0; i < 10; i++) {
		this.drops.push(new PLDroplet());
		this.camera.addObject(this.drops[i]);
	};

	this.camera.setFollowObject(this.drops[0]);

	// Setup input
	this.mouse = new LibraryMouse(this.canvas);
	this.mouse.addEventListener("mousemove", this.onMouseMove.bind(this));
	this.mouse.addEventListener("mouseover", function(){});
	this.mouse.addEventListener("mouseout", function(){});
	this.mouse.addEventListener("mousedown", function(){});
	this.mouse.addEventListener("mouseup", function(){});

	this.run();
};

Plink.prototype.onMouseMove = function() {
	if (pLinkDebugMode){
		var worldSpace = this.camera.convertCameraToWorldSpace(this.mouse.x, this.mouse.y);
		document.getElementById('mouse-library-debug').innerHTML = "x: " + worldSpace.x
		 + " y: " + worldSpace.y;
	}
};

Plink.prototype.update = function() {
	if (this.mouse.clicked) {
		this.drops[0].setInput((this.mouse.x - this.canvas.width/2) / 1000, (this.mouse.y - this.canvas.height/2) / 1000);
	}

	for (var i = 1; i < this.drops.length; i++) {
		this.drops[i].setInput(Math.random() - 0.5, Math.random() - 0.5)
	};

	for (var i = 0; i < this.drops.length; i++) {
		this.drops[i].update();
	};
};
 
Plink.prototype.draw = function() {
	this.camera.draw();

	if (pLinkDebugMode && this.mouse.mouseover) {
		this.context.strokeStyle = "#0FF"
		this.context.beginPath();
		this.context.moveTo(this.canvas.width/2, this.canvas.height/2);
		this.context.lineTo(this.mouse.x, this.mouse.y);
		this.context.stroke();
	}
};
 
Plink.prototype.run = function(){this.update();this.draw();window.requestAnimationFrame(this.run.bind(this));}
window.requestAnimationFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;
