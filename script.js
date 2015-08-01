var canvas = document.getElementById("Snow");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var nsnows = [];
var fsnows = [];
var msnows = [];

generateNearSnow(100);
generateMidSnow(200);
generateFarSnow(300);
setInterval(drawWorld, 20);

function generateMidSnow(snowCount) {
	for (var i = 0; i < snowCount; i++) {
		msnows.push(new midSnow());
	};
}

function generateNearSnow(snowCount) {
	for (var i = 0; i < snowCount; i++) {
		nsnows.push(new nearSnow());
	};
}

function generateFarSnow(snowCount) {
	for (var i = 0; i < snowCount; i++) {
		fsnows.push(new farSnow());
	};
}

function drawWorld() {
	clearCanvas();
	drawArea();

	for (var i = 0; i < nsnows.length; i++) {
		nsnows[i].update().draw();
	};
	for (var i = 0; i < fsnows.length; i++) {
		fsnows[i].update().draw();
	};
	for (var i = 0; i < msnows.length; i++) {
		msnows[i].update().draw();
	};

}

function drawArea() {
	context.fillStyle = "#ddccdd";
	context.fillRect(0, canvas.height - 200, canvas.width, 200);
}

function clearCanvas() {
	context.fillStyle = "#114245";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function nearSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height);
	this.radius = randomBetween(2,4);

	this.update = function() {
		this.y++;
		this.x -= 5;

		if (this.y > canvas.height) {
			this.y = 0;
			this.radius = randomBetween(2,4);
		};

		if (this.x < 0) {
			this.x = canvas.width;
			this.radius = randomBetween(2,4);
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
	    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	    context.fillStyle = "rgba(255, 255, 255, 1)";
	    context.strokeStyle = "#eedcdc";
	    context.fill();
	    context.stroke();

	    return this;
	}

}

function farSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height-200);
	this.radius = randomBetween(0.5,2);

	this.update = function() {
		this.y += 0.4;
		this.x -= 2;

		if (this.y > canvas.height - 200) {
			this.y = 0;
			this.radius = randomBetween(0.5,2);
		};

		if (this.x < 0) {
			this.x = canvas.width;
			this.radius = randomBetween(0.5,2);
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
	    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	    context.fillStyle = "rgba(255, 255, 255, 1)";
	    context.strokeStyle = "#cceedd";
	    context.fill();
	    context.stroke();

	    return this;
	}

}

function midSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height-200);
	this.radius = randomBetween(1,2);

	this.update = function() {
		this.y += 0.7;
		this.x -= 3;

		if (this.y > canvas.height - 100) {
			this.y = 0;
			this.radius = randomBetween(1,2);
		};

		if (this.x < 0) {
			this.x = canvas.width;
			this.radius = randomBetween(1,2);
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
	    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	    context.fillStyle = "rgba(255, 255, 255, 1)";
	    context.strokeStyle = "#eeddcc";
	    context.fill();
	    context.stroke();

	    return this;
	}

}