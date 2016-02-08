var canvas = document.getElementById("Snow");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var nsnows = [];
var fsnows = [];
var msnows = [];
var character;

var spawn1, spawn2, spawn3;

var windSpeed = 0;
var mouseX = canvas.width / 2;

///////////////////////////////////////////////////////////////////////////////////////

generateNearSnow(1);

generateMidSnow(20);

generateFarSnow(20);

generateCharacter();

////////////////////////////////////////////////////////////////////////////////////////

var trackMouse = function(event) {
    mouseX = event.pageX;
    // console.log(event.pageY);
}
canvas.addEventListener("mousemove", trackMouse);

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

/////////////////////////////////////////////////////////////////////////////////////////

function World() {
	clearCanvas();
	drawArea();
	updateWind();

	spawn1 = spawn2 = spawn3 = 0;

	for (var i = 0; i < fsnows.length; i++) {
		fsnows[i].update().draw();
		if (fsnows[i].spawn) {
			spawn3++;
			fsnows[i].spawn = false;
		};
	};
	
	for (var i = 0; i < msnows.length; i++) {
		msnows[i].update().draw();
		if (msnows[i].spawn) {
			spawn2++;
			msnows[i].spawn = false;
		};
	};

	drawCharacter();
	
	for (var i = 0; i < nsnows.length; i++) {
		nsnows[i].update().draw();
		if (nsnows[i].spawn) {
			spawn1++;
			nsnows[i].spawn = false;
		};
	};

	spawnSnow();

	// console.log(nsnows.length);
	// console.log(msnows.length);
	// console.log(fsnows.length);
	// console.log(" ");
}

function spawnSnow() {
	for (var i = 0; i < spawn1 && nsnows.length < 100; i++) {
		nsnows.push(new nearSnow());
	};
	for (var i = 0; i < spawn2 && msnows.length < 800; i++) {
		msnows.push(new midSnow());
	};
	for (var i = 0; i < spawn3 && fsnows.length < 900; i++) {
		fsnows.push(new farSnow());
	};
	// if (spawn1 && nsnows.length < 100) {
	// 	nsnows.push(new nearSnow());
	// };
	// if (spawn2 && msnows.length < 800) {
	// 	msnows.push(new midSnow());
	// };
	// if (spawn3 && fsnows.length < 900) {
	// 	fsnows.push(new farSnow());
	// };
}

function drawCharacter() {
	character.drawBody();
	character.drawHood();
	character.drawLeftCoat();
	character.drawRightCoat();
	character.drawCollar();
	character.drawLines();
}

function drawArea() {
	context.beginPath();
	context.moveTo(0, canvas.height);
	context.lineTo(0, canvas.height - 220);
	context.lineTo(50, canvas.height - 215);
	context.lineTo(200, canvas.height - 220);
	context.lineTo(230, canvas.height - 210);
	context.lineTo(250, canvas.height - 210);
	context.lineTo(255, canvas.height - 215);
	context.lineTo(300, canvas.height - 220);
	context.lineTo(330, canvas.height - 205);
	context.lineTo(350, canvas.height - 205);
	context.lineTo(400, canvas.height - 220);
	context.lineTo(500, canvas.height - 215);
	context.lineTo(800, canvas.height - 205);
	context.lineTo(950, canvas.height - 240);
	context.lineTo(990, canvas.height - 230);
	context.lineTo(1100, canvas.height - 220);
	context.lineTo(1200, canvas.height - 225);
	context.lineTo(1250, canvas.height - 215);
	context.lineTo(1300, canvas.height - 235);
	context.lineTo(canvas.width, canvas.height - 225);
	context.lineTo(canvas.width, canvas.height);
	context.fillStyle = "#c1c1c1";
	context.strokeStyle = "#cccccc";
	context.closePath();
	context.fill();
	context.stroke();

	context.beginPath();
	context.moveTo(0, canvas.height);
	context.lineTo(0, canvas.height - 205);
	context.lineTo(100, canvas.height - 210);
	context.lineTo(125, canvas.height - 205);
	context.lineTo(175, canvas.height - 210);
	context.lineTo(200, canvas.height - 200);
	context.lineTo(250, canvas.height - 200);
	context.lineTo(270, canvas.height - 185);
	context.lineTo(400, canvas.height - 195);
	context.lineTo(550, canvas.height - 185);
	context.lineTo(600, canvas.height - 200);
	context.lineTo(800, canvas.height - 200);
	context.lineTo(900, canvas.height - 205);
	context.lineTo(950, canvas.height - 190);
	context.lineTo(1100, canvas.height - 205);
	context.lineTo(canvas.width, canvas.height - 195);
	context.lineTo(canvas.width, canvas.height);
	context.fillStyle = "#cccccc";
	context.strokeStyle = "#dddddd";
	context.closePath();
	context.fill();
	context.stroke();
}

function clearCanvas() {
	context.fillStyle = "#aabaa9";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function updateWind() {
	windSpeed = (((canvas.width/2) - mouseX) * (-1)) / 50;
}

//////////////////////////////////////////////////////////////////////////////////////////

function nearSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height);
	this.radius = randomBetween(2,4);
	this.spawn = false;

	this.catched = false;
	this.melt = 0;

	this.move = function() {
		this.y += 1;
		this.x += windSpeed;
	}

	this.update = function() {

		this.move();/////////////edit

		if (randomBetween(1,25) == 1) {
			if (this.x <= canvas.width/2+36 && this.x >= canvas.width/2-36 && //////edit catch area
				this.y <= canvas.height-250 && this.y >= canvas.height/4+16) {/// kay bati
				this.catched = true;
			};
			if (this.x <= canvas.width/2+20 && this.x >= canvas.width/2-30 && 
				this.y <= canvas.height/2-90 && this.y >= canvas.height/2-140) {
				this.catched = false;
			};
			// context.fillStyle = "rgba(255,255,255,0.5)";
			// context.fillRect(canvas.width/2-52, canvas.height/3+45, 85, 215);
			// context.beginPath();
			// context.arc(canvas.width/2-3, canvas.height/3, 48, Math.PI*2, false);
			// context.fill();
		};

		if (this.catched) {
			this.y--;
			this.x-=windSpeed;
			this.melt++;
			if (this.melt >= 500) {
				this.radius -= 0.05;
			};
			if (this.radius <= 0) {
				this.y = canvas.height;
			};
		};

		if (this.y >= canvas.height) {
			this.catched = false;
			this.radius = randomBetween(2,4);
			this.spawn = true;
			this.melt = 0;
			this.x = randomBetween(0, canvas.width);
			this.y = randomBetween(0, canvas.height-500);
		};

		if (this.x < 0) {
			this.x = canvas.width;
			this.radius = randomBetween(2,4);
		};

		if (this.x > canvas.width) {
			this.x = 0;
			this.radius = randomBetween(2,4);
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
	    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	    context.fillStyle = "rgba(255, 255, 255, 1)";
	    context.fill();

	    return this;
	}
}

function midSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height);
	this.radius = randomBetween(2,4);
	this.spawn = false;

	this.catched = false;
	this.melt = 0;

	this.move = function() {
		this.y += 0.7;
		this.x += (windSpeed * 3) / 7;
	}

	this.update = function() {
		if (!this.catched) {
			this.move();
			if (this.y > canvas.height - 200 && randomBetween(0, 100) == 1) {
				this.catched = true;
			};

			if (this.x < 0) {
				this.x = canvas.width;
				this.radius = randomBetween(2,4);
			};

			if (this.x > canvas.width) {
				this.x = 0;
				this.radius = randomBetween(2,4);
			};

			if (this.y > canvas.height) {
				this.spawn = true;
				this.x = randomBetween(0, canvas.width);
				this.y = randomBetween(0, canvas.height-500);
				this.radius = randomBetween(2,4);
			};
		};

		if (this.catched) {
			if (this.melt < 1000) {
				this.melt++;
			};
			if (this.melt >= 1000) {
				this.radius-=0.1;
			};
			if (this.radius <= 0) {
				this.catched = false;
				this.melt = 0;
				this.spawn = true;
				this.x = randomBetween(0, canvas.width);
				this.y = randomBetween(0, canvas.height-500);
				this.radius = randomBetween(2,4);
			};
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
	    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	    context.fillStyle = "rgba(255, 255, 255, 1)";
	    context.fill();

	    return this;
	}
}

function farSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height-200);
	this.radius = randomBetween(1,2);
	this.spawn = false;

	this.move = function() {
		this.y += 0.4;
		this.x += windSpeed / 5;
	}

	this.update = function() {
		this.move();

		if (this.y > canvas.height - 200) {
			this.y = 0;
			this.radius = randomBetween(1,2);
			this.spawn = true;
		};

		if (this.x < 0) {
			this.x = canvas.width;
			this.radius = randomBetween(1,2);
		};

		if (this.x > canvas.width) {
			this.x = 0;
			this.radius = randomBetween(1,2);
		};

		return this;
	}

	this.draw = function() {
		context.beginPath();
	    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
	    context.fillStyle = "rgba(255, 255, 255, 1)";
	    context.fill();

	    return this;
	}
}

function Character() {
	this.x = canvas.width / 2;
	this.y = canvas.height / 4;

	this.drawHood = function() {
		context.beginPath();
		context.moveTo(this.x, this.y);
		context.lineTo(this.x-29, this.y+16);
		context.lineTo(this.x-44, this.y+36);
		context.lineTo(this.x-55, this.y+70);
		context.lineTo(this.x-45, this.y+90);
		context.lineTo(this.x-13, this.y+106);
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
	    context.strokeStyle = "#ffffff";
	    context.fill();
		context.closePath();
		context.stroke();
	}
	this.drawBody = function() {
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

		context.moveTo(this.x-5, this.y+150);
		context.lineTo(this.x-30, this.y+280);
		context.lineTo(this.x-10, this.y+420);
		context.lineTo(this.x-7, this.y+422);
		context.lineTo(this.x-4, this.y+420);
		context.lineTo(this.x+15, this.y+280);
	    context.fillStyle = "rgba(120, 120, 120, 1)";
	    context.strokeStyle = "#666666";
	    context.fill();
		context.closePath();
		context.stroke();
	}
	this.drawLeftCoat = function() {
		context.beginPath();
		context.moveTo(this.x-5, this.y+145);
		context.lineTo(this.x-23, this.y+260);
		context.lineTo(this.x-10, this.y+345);
		context.lineTo(this.x-50, this.y+320);
		context.lineTo(this.x-60, this.y+210);
		context.lineTo(this.x-45, this.y+130);
		context.lineTo(this.x-37, this.y+125);
	    context.fillStyle = "rgba(200, 200, 200, 1)";
	    context.strokeStyle = "#ffffff";
	    context.fill();
		context.closePath();
		context.stroke();
	}
	this.drawRightCoat = function() {
		context.beginPath();
		context.moveTo(this.x-5, this.y+145);
		context.lineTo(this.x+15, this.y+280);
		context.lineTo(this.x-10, this.y+345);
		context.lineTo(this.x+33, this.y+325);
		context.lineTo(this.x+35, this.y+270);
		context.lineTo(this.x+38, this.y+210);
		context.lineTo(this.x+30, this.y+130);
		context.lineTo(this.x+25, this.y+125);
	    context.fillStyle = "rgba(200, 200, 200, 1)";
	    context.strokeStyle = "#ffffff";
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
	    context.strokeStyle = "#ffffff";
	    context.fill();
		context.closePath();
		context.stroke();
	}
	this.drawLines = function() {
		context.beginPath();

		{
			context.moveTo(this.x+15, this.y+40);
			context.lineTo(this.x, this.y);
			context.lineTo(this.x-11, this.y+30);
			context.lineTo(this.x-10, this.y+45);
			context.lineTo(this.x-29, this.y+16);
			context.lineTo(this.x-40, this.y+40);
			context.moveTo(this.x-40, this.y+40);		
			context.lineTo(this.x-10, this.y+45);
			context.lineTo(this.x-35, this.y+60);
			context.lineTo(this.x-45, this.y+90);
			context.moveTo(this.x-44, this.y+36);
			context.lineTo(this.x-40, this.y+40);
			context.lineTo(this.x-35, this.y+60);
			context.lineTo(this.x-55, this.y+70);
			context.moveTo(this.x+40, this.y+35);
			context.lineTo(this.x+15, this.y+40);
			context.lineTo(this.x+5, this.y+50);
			context.moveTo(this.x+40, this.y+35);
			context.lineTo(this.x+37, this.y+58);
			context.lineTo(this.x+30, this.y+85);
			context.lineTo(this.x+28, this.y+65);
			context.lineTo(this.x+15, this.y+40);
			context.lineTo(this.x-11, this.y+30);
			context.moveTo(this.x+37, this.y+58);
			context.lineTo(this.x+47, this.y+70);
			context.lineTo(this.x+30, this.y+85);
			context.lineTo(this.x+27, this.y+98);
			context.moveTo(this.x+27, this.y+97);
			context.lineTo(this.x+15, this.y+95);
			context.lineTo(this.x+10, this.y+104);
			context.moveTo(this.x-35, this.y+75);
			context.lineTo(this.x-42, this.y+78);
			context.moveTo(this.x-28, this.y+92);
			context.lineTo(this.x-45, this.y+90);
		}

		{
			context.moveTo(this.x-5, this.y+140);
			context.lineTo(this.x-18, this.y+120);
			context.lineTo(this.x-35, this.y+105);
			context.lineTo(this.x-43, this.y+120);
			context.lineTo(this.x-53, this.y+110);
			context.moveTo(this.x-53, this.y+110);
			context.lineTo(this.x-59, this.y+130);
			context.moveTo(this.x-23, this.y+130);
			context.lineTo(this.x-18, this.y+119);
			context.lineTo(this.x-30, this.y+127);
			context.moveTo(this.x-5, this.y+140);
			context.lineTo(this.x+10, this.y+120);
			context.lineTo(this.x+38, this.y+100);
			context.moveTo(this.x+38, this.y+100);
			context.lineTo(this.x+40, this.y+117);
			context.lineTo(this.x+30, this.y+121);
			context.moveTo(this.x+40, this.y+118);
			context.lineTo(this.x+50, this.y+129);
			context.moveTo(this.x+30, this.y+121);
			context.lineTo(this.x+10, this.y+120);
			context.lineTo(this.x+12, this.y+130);
		}

		{
			context.moveTo(this.x-5, this.y+145);
			context.lineTo(this.x+23, this.y+135);
			context.lineTo(this.x+25, this.y+125);
			context.moveTo(this.x+31, this.y+131);
			context.lineTo(this.x+23, this.y+135);
			context.lineTo(this.x+5,  this.y+165);
			context.lineTo(this.x+15, this.y+170);
			context.lineTo(this.x+23, this.y+175);
			context.lineTo(this.x+15, this.y+149);
			context.lineTo(this.x+27, this.y+153);
			context.moveTo(this.x+32, this.y+150);
			context.lineTo(this.x+27, this.y+153);
			context.lineTo(this.x+34, this.y+175);
			context.lineTo(this.x+24, this.y+193);
			context.lineTo(this.x+30, this.y+208);
			context.lineTo(this.x+15, this.y+225);
			context.lineTo(this.x+27, this.y+253);
			context.lineTo(this.x+27, this.y+250);
			context.lineTo(this.x+10, this.y+245);
			context.lineTo(this.x+20, this.y+235);
			context.lineTo(this.x+30, this.y+240);
			context.moveTo(this.x+28, this.y+283);
			context.lineTo(this.x+15, this.y+280);
			context.lineTo(this.x+27, this.y+253);
			context.moveTo(this.x+15, this.y+225);
			context.lineTo(this.x+5, this.y+217);
			context.lineTo(this.x+30, this.y+208);
			context.lineTo(this.x+36, this.y+230);
			context.lineTo(this.x+30, this.y+240);
			context.lineTo(this.x+35, this.y+253);
			context.lineTo(this.x+28, this.y+280);
			context.lineTo(this.x+33, this.y+294);
			context.lineTo(this.x+13, this.y+310);
			context.lineTo(this.x+28, this.y+284);
			context.moveTo(this.x+13, this.y+310);
			context.lineTo(this.x+20, this.y+320);
			context.lineTo(this.x+33, this.y+325);
			context.moveTo(this.x+13, this.y+310);
			context.lineTo(this.x+10, this.y+295);
			context.moveTo(this.x+20, this.y+320);
			context.lineTo(this.x+10, this.y+335);
			context.lineTo(this.x-5, this.y+330);
			context.lineTo(this.x+17, this.y+316);
			context.lineTo(this.x+34, this.y+313);
			context.moveTo(this.x-5, this.y+145);
			context.lineTo(this.x+12, this.y+180);
			context.lineTo(this.x+2, this.y+190);
			context.lineTo(this.x+24, this.y+191);
			context.lineTo(this.x+37, this.y+200);
			context.moveTo(this.x+15, this.y+200);
			context.lineTo(this.x+6, this.y+216);
		}

		{
			context.moveTo(this.x-60, this.y+210);
			context.lineTo(this.x-23, this.y+260);
			context.lineTo(this.x-33, this.y+200);
			context.lineTo(this.x-31, this.y+180);
			context.lineTo(this.x-60, this.y+210);

			context.moveTo(this.x-5, this.y+145);
			context.lineTo(this.x-25, this.y+150);
			context.lineTo(this.x-45, this.y+130);
			context.lineTo(this.x-5, this.y+145);
			context.lineTo(this.x-25, this.y+165);
			context.lineTo(this.x-25, this.y+150);
			context.lineTo(this.x-45, this.y+165);
			context.lineTo(this.x-50, this.y+155);

			context.moveTo(this.x-45, this.y+165);
			context.lineTo(this.x-60, this.y+210);

			context.moveTo(this.x-31, this.y+180);
			context.lineTo(this.x-45, this.y+165);
			context.lineTo(this.x-25, this.y+166);
			context.lineTo(this.x-10, this.y+175);
			context.lineTo(this.x-31, this.y+180);
			context.lineTo(this.x-15, this.y+205);
			context.lineTo(this.x-33, this.y+200);
			context.lineTo(this.x-40, this.y+220);
			context.lineTo(this.x-23, this.y+260);
			context.lineTo(this.x-55, this.y+265);//
			context.lineTo(this.x-39, this.y+240);

			context.moveTo(this.x-40, this.y+220);
			context.lineTo(this.x-60, this.y+210);
		}

	    context.fillStyle = "rgba(190, 200, 200, 1)";
	    context.strokeStyle = "#eeeeee";
	    context.fill();
		context.stroke();
	}
}

///////////////////////////////////////////////////////////////////////////////////////

setInterval(World, 20);