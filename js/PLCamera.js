function PLCamera(context){
	this.context = context;
	this.width = this.context.canvas.width;
	this.height = this.context.canvas.height;

	this.center = new Vector(0,0);
	this.followObj = null;
	this.drawObjects = [];
}

PLCamera.prototype.followStrength = 0.04;

// Push type PLDrawObject
PLCamera.prototype.addObject = function(obj) {
	obj.addCamera(this);
	this.drawObjects.push(obj);
};

PLCamera.prototype.setFollowObject = function(obj) {
	this.followObj = obj;
	this.center = obj.pos.clone();
};

PLCamera.prototype.draw = function() {
	this.context.clearRect(0, 0, this.width, this.height);

	var follow = (this.followObj != null) ? this.followObj.pos.clone() : this.center;
	follow = Vector.Lerp(this.center, follow, this.followStrength);
	this.center = follow;
	follow = follow.sub(new Vector(this.width/2, this.height/2));

	for (var i = 0; i < this.drawObjects.length; i++) {
		this.context.save();
		this.context.translate(this.drawObjects[i].pos.x - follow.x, this.drawObjects[i].pos.y - follow.y)
		this.drawObjects[i].draw();
		this.context.restore();
	};

	if (pLinkDebugMode) {
		// draw line
		var cameraSpaceCoord = this.convertWorldToCameraSpace(this.followObj);
		this.context.strokeStyle = "#F00"
		this.context.beginPath();
		this.context.moveTo(this.width/2, this.height/2);
		this.context.lineTo(cameraSpaceCoord.x, cameraSpaceCoord.y);
		this.context.stroke();
	}
};

PLCamera.prototype.convertWorldToCameraSpace = function(obj) {
	return obj.pos.sub(this.center).add(new Vector(this.width/2, this.height/2));
};

PLCamera.prototype.convertCameraToWorldSpace = function(x, y) {
	return this.center.add(new Vector(x, y).sub(new Vector(this.width/2, this.height/2)));
};
