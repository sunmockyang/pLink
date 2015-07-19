function PLCamera(context){
	this.context = context;
	this.width = this.context.canvas.width;
	this.height = this.context.canvas.height;

	this.center = new Vector(0,0);
	this.followObj = null;
	this.drawObjects = [];
}

// Push type PLDrawObject
PLCamera.prototype.addObject = function(obj) {
	obj.addCamera(this);
	this.drawObjects.push(obj);
};

PLCamera.prototype.setFollowObject = function(obj) {
	this.followObj = obj;
};

PLCamera.prototype.draw = function() {
	this.context.clearRect(0, 0, this.width, this.height);

	var follow = (this.followObj != null) ? this.followObj.pos.clone() : this.center;
	follow = Vector.Lerp(this.center, follow, 0.05);
	this.center = follow;
	follow = follow.sub(new Vector(this.width/2, this.height/2));

	for (var i = 0; i < this.drawObjects.length; i++) {
		this.context.save();
		this.context.translate(this.drawObjects[i].pos.x - follow.x, this.drawObjects[i].pos.y - follow.y)
		this.drawObjects[i].draw();
		this.context.restore();
	};
};

function PLObject () {
	this.context = null;
	this.pos = new Vector();

	this.draw = function() {
		console.error("IMPLEMENT A DRAW FUNCTION");
	};

	this.addCamera = function(camera) {
		this.context = camera.context;
	}
}
