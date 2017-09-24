var pLinkDebugMode = true;

function Plink(canvas){
	var width = 600;
	var height = 600;

	// Setup server
	this.client = new PLClient(this.serverAddress);
	this.isClientUpdateScheduled = true;

	// Setup canvas
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.canvas.width = width;
	this.canvas.height = height;

	// Setup pLink
	this.camera = new PLCamera(this.context);
	this.bg = new PLImage("img/1436770530303.jpg");
	this.drops = [];
	this.particles = [];

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
	this.mouse.addEventListener("click", this.onMouseClick.bind(this));

	this.run();
};

Plink.prototype.serverAddress = "127.0.0.1";
Plink.prototype.clientUpdateInterval = 250;
Plink.prototype.numParticlesInExplosion = 10;

Plink.prototype.onMouseMove = function() {
	if (pLinkDebugMode){
		var worldSpace = this.camera.convertCameraToWorldSpace(this.mouse.x, this.mouse.y);
		document.getElementById('mouse-library-debug').innerHTML = "x: " + worldSpace.x
		 + " y: " + worldSpace.y;
	}
};

Plink.prototype.onMouseClick = function() {
	var worldSpace = this.camera.convertCameraToWorldSpace(this.mouse.x, this.mouse.y);
	this.createExplosion(worldSpace.x, worldSpace.y);
};

Plink.prototype.createExplosion = function(x, y) {
	for (var i = 0; i < this.numParticlesInExplosion; i++) {
		this.particles.push(new PLParticle(x, y));
		this.camera.addObject(this.particles[this.particles.length - 1]);
	};
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

	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].update();
	};

	if (this.isClientUpdateScheduled) {
		this.client.pushDropletUpdate(this.drops[0]);
		this.client.send();
		this.scheduleClientUpdate();
	}
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

Plink.prototype.scheduleClientUpdate = function() {
	this.isClientUpdateScheduled = false;
	window.setTimeout((function(){this.isClientUpdateScheduled = true}).bind(this), this.clientUpdateInterval);
};

Plink.prototype.run = function(){this.update();this.draw();window.requestAnimationFrame(this.run.bind(this));}
window.requestAnimationFrame = window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;

var nextID = 0;

function PLObject () {
	this.context = null;
	this.pos = new Vector();
	this.id = nextID++;

	this.draw = function() {
		console.error("IMPLEMENT A DRAW FUNCTION");
	};

	this.addCamera = function(camera) {
		this.context = camera.context;
	}
}
