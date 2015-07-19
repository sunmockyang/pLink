function Color(r, g, b, a){
	this.r = (r) ? Math.floor(r) : 0;
	this.g = (g) ? Math.floor(g) : 0;
	this.b = (b) ? Math.floor(b) : 0;
	this.a = (a) ? Math.floor(a) : 0;
}

Color.prototype.toHex = function() {
	function hexConvert(dec){
		var hex = dec.toString(16);
		return (dec < 16) ? "0" + hex : hex;
	}

	return "#" + hexConvert(this.r) + hexConvert(this.g) + hexConvert(this.b);
};

Color.prototype.toRGB = function() {
	return "rgb(" + [this.r, this,g, this.b].join() + ")";
};

Color.prototype.toRGBA = function() {
	return "rgba(" + [this.r, this,g, this.b, this.a].join() + ")";
};
