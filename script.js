var canvas = document.getElementById("Snow");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var nsnows = [];
var fsnows = [];
var msnows = [];

generateNearSnow(1);
generateMidSnow(5);
generateFarSnow(10);

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
	var spawn1, spawn2, spawn3;
	spawn1 = spawn2 = spawn3 = false;

	for (var i = 0; i < nsnows.length; i++) {
		nsnows[i].update().draw();
		if (nsnows[i].spawn) {
			spawn1 = true;
			nsnows[i].spawn = false;
		};
	};
	for (var i = 0; i < fsnows.length; i++) {
		fsnows[i].update().draw();
		if (fsnows[i].spawn) {
			spawn2 = true;
			fsnows[i].spawn = false;
		};
	};
	for (var i = 0; i < msnows.length; i++) {
		msnows[i].update().draw();
		if (msnows[i].spawn) {
			spawn3 = true;
			msnows[i].spawn = false;
		};
	};

	if (spawn1 && nsnows.length < 100) {
		nsnows.push(new nearSnow());
	};
	if (spawn2 && fsnows.length < 600) {
		fsnows.push(new farSnow());
	};
	if (spawn3 && msnows.length < 500) {
		msnows.push(new midSnow());
	};
}

function drawArea() {
	context.fillStyle = "#cccccc";
	context.fillRect(0, canvas.height - 200, canvas.width, 200);
	context.fillStyle = "#000000";
	context.fillRect(0,canvas.height-200,canvas.width,0.2);
}

function clearCanvas() {
	context.fillStyle = "#aabaa9";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function nearSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height);
	this.radius = randomBetween(2,4);
	this.spawn = false;

	this.update = function() {
		this.y++;
		this.x -= 5;

		if (this.y > canvas.height) {
			this.y = 0;
			this.radius = randomBetween(2,4);
			this.spawn = true;
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
	this.radius = randomBetween(0.5,1);
	this.spawn = false;

	this.update = function() {
		this.y += 0.4;
		this.x -= 2;

		if (this.y > canvas.height - 200) {
			this.y = 0;
			this.radius = randomBetween(0.5,1);
			this.spawn = true;
		};

		if (this.x < 0) {
			this.x = canvas.width;
			this.radius = randomBetween(0.5,1);
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
	this.y = randomBetween(0, canvas.height-100);
	this.radius = randomBetween(1,3);
	this.spawn = false;
	this.stop = randomBetween(canvas.height-175,canvas.height-25);

	this.update = function() {
		this.y += 0.7;
		this.x -= 3;

		if (this.y > this.stop) {
			this.y = 0;
			this.radius = randomBetween(1,3);
			this.spawn = true;
		};

		if (this.x < 0) {
			this.x = canvas.width;
			this.radius = randomBetween(1,3);
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