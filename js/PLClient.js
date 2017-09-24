function PLClient(address) {
	this.address = address;
	// this.websocket = new WebSocket(address);
	this.buffer = [];
}

PLClient.prototype.debugElement = document.getElementById('client-debug');

PLClient.prototype.send = function() {
	if (this.buffer.length > 0) {
		// this.websocket.send(JSON.stringify(this.buffer));
		this.debugElement.innerHTML = JSON.stringify(this.buffer);
		this.buffer = [];
	}
};

PLClient.prototype.pushPositionUpdate = function(plObject) {
	var positionPackage = {
		id: plObject.id,
		pos: plObject.pos
	}
	this.buffer.push(JSON.stringify(positionPackage));
};

PLClient.prototype.pushDropletUpdate = function(plObject) {
	var dropletPackage = {
		id: plObject.id,
		pos: plObject.pos
	};

	this.buffer.push(JSON.stringify(dropletPackage));
};
