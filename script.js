var canvas = document.getElementById("Snow");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var nsnows = [];
var fsnows = [];
var msnows = [];
var character;

generateNearSnow(1);
generateMidSnow(10);
generateFarSnow(10);
generateCharacter();

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

function generateCharacter(){
	character = new Character();
}

function drawWorld() {
	clearCanvas();
	drawArea();
	var spawn1, spawn2, spawn3;
	spawn1 = spawn2 = spawn3 = false;

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

	character.drawBackground();
	character.drawHood();
	character.drawBody();
	character.drawLeftCoat();
	character.drawRightCoat();
	character.drawCollar();
	
	for (var i = 0; i < nsnows.length; i++) {
		nsnows[i].update().draw();
		if (nsnows[i].spawn) {
			spawn1 = true;
			nsnows[i].spawn = false;
		};
	};

	if (spawn1 && nsnows.length < 10) {
		nsnows.push(new nearSnow());
	};
	if (spawn2 && fsnows.length < 500) {
		fsnows.push(new farSnow());
	};
	if (spawn3 && msnows.length < 800) {
		msnows.push(new midSnow());
	};
}

function drawArea() {
	context.fillStyle = "#cccccc";
	context.fillRect(0, canvas.height - 200, canvas.width, 200);
	context.fillStyle = "#ffffff";
	context.fillRect(0,canvas.height-200,canvas.width,0.5);
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
	this.radius = randomBetween(1,2);
	this.spawn = false;

	this.update = function() {
		this.y += 0.4;
		this.x -= 2;

		if (this.y > canvas.height - 200) {
			this.y = 0;
			this.radius = randomBetween(1,2);
			this.spawn = true;
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
	    context.strokeStyle = "#cceedd";
	    context.fill();
	    context.stroke();

	    return this;
	}

}

function midSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height-500);
	this.radius = randomBetween(1,3);
	this.spawn = false;
	this.stop = randomBetween(canvas.height-175,canvas.height-25);
	this.melt = 0;

	this.update = function() {
		this.y += 0.7;
		this.x -= 3;

		if (this.y > this.stop) {
			if (this.melt < 50) {
				this.melt++;
				this.y -= 0.7;
				this.x += 3;
			};
			if (this.melt == 50) {
				this.melt = 0;
				this.spawn = true;
				this.x = randomBetween(0, canvas.width);
				this.y = randomBetween(0, canvas.height-500);
				this.radius = randomBetween(1,3);
			};
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

function Character() {
	this.x = canvas.width / 2;
	this.y = canvas.height / 4;
	this.drawBackground =function() {
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.x-29, this.y+16);
		context.lineTo(this.x-44, this.y+36);
		context.lineTo(this.x-55, this.y+70);
		context.lineTo(this.x-45, this.y+90);
		context.lineTo(this.x-5, this.y+110);
		context.lineTo(this.x+38, this.y+93);
		context.lineTo(this.x+47, this.y+70);
		context.lineTo(this.x+40, this.y+35);

		context.moveTo(this.x-5, this.y+160);
		context.lineTo(this.x-30, this.y+165);
		context.lineTo(this.x-75, this.y+140);
		context.lineTo(this.x-45, this.y+100);
		context.lineTo(this.x-5, this.y+110);
		context.lineTo(this.x+38, this.y+98);
		context.lineTo(this.x+55, this.y+140);
		context.lineTo(this.x+20, this.y+160);

	    context.fillStyle = "rgba(130, 130, 130, 1)";
	    context.strokeStyle = "#999999";
	    context.fill();
		context.closePath();
		context.stroke();

	}
	this.drawHood = function() {
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.x-29, this.y+16);
		context.lineTo(this.x-44, this.y+36);
		context.lineTo(this.x-55, this.y+70);
		context.lineTo(this.x-45, this.y+90);
		context.lineTo(this.x-20, this.y+102);
		context.lineTo(this.x-35, this.y+85);
		context.lineTo(this.x-35, this.y+75);
		context.lineTo(this.x-10, this.y+45);
		context.lineTo(this.x+5, this.y+50);
		context.lineTo(this.x+20, this.y+65);
		context.lineTo(this.x+30, this.y+85);
		context.lineTo(this.x-5, this.y+110);
		context.lineTo(this.x+38, this.y+93);
		context.lineTo(this.x+47, this.y+70);
		context.lineTo(this.x+40, this.y+35);
	    context.fillStyle = "rgba(200, 200, 200, 1)";
	    context.strokeStyle = "#dddddd";
	    context.fill();
		context.closePath();
		context.stroke();

	}
	this.drawBody = function() {
		context.beginPath();
		context.moveTo(this.x-5, this.y+150);
		context.lineTo(this.x-30, this.y+280);
		context.lineTo(this.x-7, this.y+420);
		context.lineTo(this.x-6, this.y+250);
		context.lineTo(this.x-7, this.y+420);
		context.lineTo(this.x+15, this.y+280);
	    context.fillStyle = "rgba(150, 150, 150, 1)";
	    context.strokeStyle = "#aaaaaa";
	    context.fill();
		context.closePath();
		context.stroke();;
		context.beginPath();
		context.moveTo(this.x-5, this.y+150);
		context.lineTo(this.x-30, this.y+220);
		context.lineTo(this.x+15, this.y+220);
	    context.fillStyle = "rgba(140, 140, 140, 1)";
	    context.strokeStyle = "#999999";
	    context.fill();
		context.closePath();
		context.stroke();;
	}
	this.drawLeftCoat = function() {
		context.beginPath();
		context.moveTo(this.x-5, this.y+145);
		context.lineTo(this.x-25, this.y+310);
		context.lineTo(this.x-40, this.y+330);
		context.lineTo(this.x-105, this.y+300);
		context.lineTo(this.x-150, this.y+270);
		context.lineTo(this.x-165, this.y+245);
		context.lineTo(this.x-140, this.y+240);
		context.lineTo(this.x-85, this.y+210);
		context.lineTo(this.x-45, this.y+130);
		context.lineTo(this.x-37, this.y+125);
	    context.fillStyle = "rgba(200, 200, 200, 1)";
	    context.strokeStyle = "#dddddd";
	    context.fill();
		context.closePath();
		context.stroke();
	}
	this.drawRightCoat = function() {
		context.beginPath();
		context.moveTo(this.x-5, this.y+145);
		context.lineTo(this.x+15, this.y+280);
		context.lineTo(this.x-10, this.y+345);
		context.lineTo(this.x+33, this.y+325)
		context.lineTo(this.x+35, this.y+270);
		context.lineTo(this.x+38, this.y+210);
		context.lineTo(this.x+30, this.y+130);
		context.lineTo(this.x+25, this.y+125);
	    context.fillStyle = "rgba(200, 200, 200, 1)";
	    context.strokeStyle = "#dddddd";
	    context.fill();
		context.closePath();
		context.stroke();
	}
	this.drawCollar = function() {
		context.beginPath();
		context.moveTo(this.x-5, this.y+140);
		context.lineTo(this.x-43, this.y+120);
		context.lineTo(this.x-75, this.y+140);
		context.lineTo(this.x-46, this.y+102);
		context.lineTo(this.x-15, this.y+112);
		context.lineTo(this.x-4, this.y+138);
		context.lineTo(this.x+5, this.y+112);
		context.lineTo(this.x+38, this.y+100);
		context.lineTo(this.x+55, this.y+140);
		context.lineTo(this.x+30, this.y+120);
	    context.fillStyle = "rgba(200, 200, 200, 1)";
	    context.strokeStyle = "#dddddd";
	    context.fill();
		context.closePath();
		context.stroke();
	}
}













