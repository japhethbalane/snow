var canvas = document.getElementById("Snow");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var nsnows = [];
var fsnows = [];
var msnows = [];
var character;

///////////////////////////////////////////////////////////////////////////////////////

generateNearSnow(1);

generateMidSnow(15);

generateFarSnow(20);

generateCharacter();

////////////////////////////////////////////////////////////////////////////////////////

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

	var spawn1, spawn2, spawn3;
	spawn1 = spawn2 = spawn3 = false;

	for (var i = 0; i < fsnows.length; i++) {
		fsnows[i].update().draw();
		if (fsnows[i].spawn) {
			spawn2 = true;
			fsnows[i].spawn = false;
		};
	};
	
	// for (var i = 0; i < msnows.length; i++) {
	// 	msnows[i].update().draw();
	// 	if (msnows[i].spawn) {
	// 		spawn3 = true;
	// 		msnows[i].spawn = false;
	// 	};
	// };

	// drawCharacter();
	
	// for (var i = 0; i < nsnows.length; i++) {
	// 	nsnows[i].update().draw();
	// 	if (nsnows[i].spawn) {
	// 		spawn1 = true;
	// 		nsnows[i].spawn = false;
	// 	};
	// };

	if (spawn1 && nsnows.length < 100) {
		nsnows.push(new nearSnow());
	};
	if (spawn2 && fsnows.length < 700) {
		fsnows.push(new farSnow());
	};
	if (spawn3 && msnows.length < 800) {
		msnows.push(new midSnow());
	};
}

function drawCharacter() {
	character.drawBackground();
	character.drawHood();
	character.drawBody();
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
	// context.fillStyle = "rgba(185,200,185,0.5)";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

//////////////////////////////////////////////////////////////////////////////////////////

function nearSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height);
	this.radius = randomBetween(2,4);
	this.spawn = false;

	this.catched = false;
	this.melt = 0;
	this.catch = randomBetween(1,25);

	this.update = function() {
		this.y++;
		this.x -= 5;

		if (this.catch == 1) {
			if (this.x <= canvas.width/2+36 && this.x >= canvas.width/2-36 && 
				this.y <= canvas.height-250 && this.y >= canvas.height/4+16) {
				this.catched = true;
			};
			if (this.x <= canvas.width/2+20 && this.x >= canvas.width/2-30 && 
				this.y <= canvas.height/2-90 && this.y >= canvas.height/2-140) {
				this.catched = false;
			};
		};
		if (this.catched) {
			this.y--;
			this.x+=5;
			this.melt++;
			if (this.melt >= 100) {
				this.radius -= 0.1;
			};
			if (this.radius <= 0) {
				this.y = canvas.height;
			};
		};

		if (this.y >= canvas.height) {
			this.catched = false;
			this.y = 0;
			this.radius = randomBetween(1,4);
			this.spawn = true;
			this.melt = 0;
			this.x = randomBetween(0, canvas.width);
			this.y = randomBetween(0, canvas.height-500);
		};

		if (this.x < 0) {
			this.x = canvas.width;
			this.radius = randomBetween(2,4);
		};
		this.catch = randomBetween(1,25);

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

function midSnow() {
	this.x = randomBetween(0, canvas.width);
	this.y = randomBetween(0, canvas.height);
	this.radius = randomBetween(1,3);
	this.spawn = false;

	this.catched = randomBetween(canvas.height-175,canvas.height-25);
	this.melt = 0;

	this.update = function() {
		this.y += 0.7;
		this.x -= 3;

		if (this.y > this.catched) {
			if (this.melt < 100) {
				this.melt++;
				this.y -= 0.7;
				this.x += 3;
			};
			if (this.melt >= 100) {
				this.radius-=0.1;
				this.y -= 0.7;
				this.x += 3;
			};
			if (this.radius <= 0) {
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

	    context.fillStyle = "rgba(120, 120, 120, 1)";
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
		context.lineTo(this.x-23, this.y+330);
		context.lineTo(this.x-40, this.y+330);
		context.lineTo(this.x-105, this.y+300);
		context.lineTo(this.x-150, this.y+270);
		context.lineTo(this.x-165, this.y+245);
		context.lineTo(this.x-140, this.y+240);
		context.lineTo(this.x-85, this.y+210);
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
			context.moveTo(this.x-5, this.y+145);
			context.lineTo(this.x-20, this.y+160);
			context.lineTo(this.x-35, this.y+145);
			context.lineTo(this.x-54, this.y+147);
			context.moveTo(this.x-35, this.y+145);
			context.lineTo(this.x-30, this.y+128);
			context.moveTo(this.x-35, this.y+145);
			context.lineTo(this.x-45, this.y+155);
			context.lineTo(this.x-57, this.y+154);
			context.moveTo(this.x-20, this.y+160);
			context.lineTo(this.x-40, this.y+185);
			context.lineTo(this.x-45, this.y+155);
			context.moveTo(this.x-5, this.y+145);
			context.lineTo(this.x-32, this.y+138);
			context.moveTo(this.x-85, this.y+210);
			context.lineTo(this.x-50, this.y+225);
			context.lineTo(this.x-40, this.y+240);
			context.lineTo(this.x-13, this.y+230);
			context.moveTo(this.x-85, this.y+210);
			context.lineTo(this.x-77, this.y+240);
			context.lineTo(this.x-60, this.y+260);
			context.lineTo(this.x-35, this.y+270);
			context.lineTo(this.x-21, this.y+310);
			context.moveTo(this.x-140, this.y+240);
			context.lineTo(this.x-110, this.y+250);
			context.lineTo(this.x-90, this.y+270);
			context.lineTo(this.x-80, this.y+269);
			context.lineTo(this.x-60, this.y+300);
			context.lineTo(this.x-22, this.y+323);
			context.moveTo(this.x-140, this.y+240);
			context.lineTo(this.x-110, this.y+235);
			context.lineTo(this.x-85, this.y+210);
			context.moveTo(this.x-77, this.y+240);
			context.lineTo(this.x-110, this.y+235);
			context.lineTo(this.x-110, this.y+250);
			context.lineTo(this.x-90, this.y+252);
			context.lineTo(this.x-77, this.y+240);
			context.moveTo(this.x-91, this.y+270);
			context.lineTo(this.x-90, this.y+252);
			context.lineTo(this.x-80, this.y+269);
			context.moveTo(this.x-60, this.y+260);
			context.lineTo(this.x-55, this.y+275);
			context.lineTo(this.x-72, this.y+260);
			context.lineTo(this.x-77, this.y+240);
			context.moveTo(this.x-72, this.y+260);
			context.lineTo(this.x-75, this.y+278);
			context.moveTo(this.x-35, this.y+270);
			context.lineTo(this.x-55, this.y+275);
			context.lineTo(this.x-68, this.y+286);
			context.moveTo(this.x-35, this.y+270);
			context.lineTo(this.x-45, this.y+298);
			context.lineTo(this.x-60, this.y+300);
			context.moveTo(this.x-55, this.y+275);
			context.lineTo(this.x-45, this.y+298);
			context.moveTo(this.x-42, this.y+288);
			context.lineTo(this.x-35, this.y+299);
			context.lineTo(this.x-30, this.y+285);
			context.moveTo(this.x-35, this.y+299);
			context.lineTo(this.x-33, this.y+315);
			context.moveTo(this.x-80, this.y+230);
			context.lineTo(this.x-50, this.y+225);
			context.lineTo(this.x-67, this.y+253);
			context.moveTo(this.x-57, this.y+238);
			context.lineTo(this.x-40, this.y+240);
			context.lineTo(this.x-50, this.y+264);
			context.moveTo(this.x-13, this.y+230);
			context.lineTo(this.x-50, this.y+264);
			context.moveTo(this.x-35, this.y+270);
			context.lineTo(this.x-25, this.y+260);
			context.lineTo(this.x-13, this.y+230);
			context.moveTo(this.x-25, this.y+260);
			context.lineTo(this.x-20, this.y+288);
			context.moveTo(this.x-140, this.y+240);
			context.lineTo(this.x-135, this.y+260);
			context.lineTo(this.x-150, this.y+270);
			context.moveTo(this.x-135, this.y+260);
			context.lineTo(this.x-110, this.y+250);
			context.moveTo(this.x-125, this.y+255);
			context.lineTo(this.x-100, this.y+280);
			context.lineTo(this.x-125, this.y+285);
			context.lineTo(this.x-135, this.y+260);
			context.moveTo(this.x-165, this.y+245);
			context.lineTo(this.x-150, this.y+250);
			context.lineTo(this.x-140, this.y+240);
			context.moveTo(this.x-150, this.y+250);
			context.lineTo(this.x-142, this.y+264);
			context.moveTo(this.x-55, this.y+322);
			context.lineTo(this.x-60, this.y+300);
			context.lineTo(this.x-105, this.y+300);
			context.lineTo(this.x-112, this.y+283);
			context.moveTo(this.x-112, this.y+283);
			context.lineTo(this.x-85, this.y+293);
			context.lineTo(this.x-90, this.y+270);
			context.moveTo(this.x-68, this.y+286);
			context.lineTo(this.x-85, this.y+293);
			context.lineTo(this.x-89, this.y+300);
			context.lineTo(this.x-80, this.y+312);
			context.moveTo(this.x-90, this.y+270);
			context.lineTo(this.x-115, this.y+265);
			context.moveTo(this.x-85, this.y+210);
			context.lineTo(this.x-60, this.y+200);
			context.lineTo(this.x-75, this.y+190);
			context.lineTo(this.x-55, this.y+180);
			context.lineTo(this.x-44, this.y+165);
			context.moveTo(this.x-60, this.y+200);
			context.lineTo(this.x-55, this.y+180);
			context.lineTo(this.x-40, this.y+185);
			context.lineTo(this.x-30, this.y+200);
			context.lineTo(this.x-20, this.y+180);
			context.lineTo(this.x-29, this.y+170);
			context.moveTo(this.x-6, this.y+160);
			context.lineTo(this.x-20, this.y+180);
			context.lineTo(this.x-14, this.y+230);
			context.moveTo(this.x-60, this.y+200);
			context.lineTo(this.x-50, this.y+225);
			context.lineTo(this.x-47, this.y+200);
			context.lineTo(this.x-55, this.y+180);
			context.moveTo(this.x-47, this.y+200);
			context.lineTo(this.x-30, this.y+201);
			context.lineTo(this.x-32, this.y+215);
			context.lineTo(this.x-47, this.y+230);
			context.moveTo(this.x-32, this.y+215);
			context.lineTo(this.x-22, this.y+234);
		}

	    context.fillStyle = "rgba(190, 200, 200, 1)";
	    context.strokeStyle = "#eeeeee";
	    context.fill();
		context.stroke();
	}
}

///////////////////////////////////////////////////////////////////////////////////////

setInterval(World, 20);