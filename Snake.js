	window.onload = function() {
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var canWidth = canvas.width;
	var canHeight = canvas.height;
	
	var direction = 'right';
	var snakeBodyWidth = 10;
	var score=0;
	var snake_parts;
	var target;
	var z = 0;
	
	function createSnake() {
		
		var length=5;
		snake_parts = [];
		for (var i=length-1; i>=0; i--) {
		snake_parts.push({x:i, y:22});
		console.log(snake_parts[0].x);		
		}
	}
	
	function createTarget() {
		target={
		x: Math.round(Math.random()*(canWidth-snakeBodyWidth)/snakeBodyWidth), y: Math.round(Math.random()*(canHeight-snakeBodyWidth)/snakeBodyWidth)};
	}
	//Stvaranje svih ELEMENATA - CRTANJE
	
	function Elements() {
		// crtanje celog 'canvasa' datih dimenzija i boja
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canWidth, canHeight);
		ctx.fillStyle = "white";
		ctx.strokeRect(0, 0, canWidth, canHeight);
		
		// glava
		var newX = snake_parts[0].x; // uzimamo uvek X koor Glave zmije
		var newY = snake_parts[0].y; // uzimamo uvek Y koor Glave zmije
		
		// smer pomeranja - POMERANJE
		if (direction == "right") { newX++; }
		else if (direction == "left") { newX--; }
		else if (direction == "up") { newY++; }
		else if (direction == "down") { newY--; }
		
		// provera sudara sa zidom ili sa telom zmije
		if (newX == -1 || newX == canWidth/snakeBodyWidth || newY == -1 || newY == canHeight/snakeBodyWidth || sudar(newX, newY, snake_parts)) {
			if(newX == -1) {
				newX = canWidth/snakeBodyWidth;
			}
			else if(newX == canWidth/snakeBodyWidth) {
				newX = 0;
			}
			else if(newY == -1) {
				newY = canHeight/snakeBodyWidth;
			}
			else if(newY == canHeight/snakeBodyWidth) {
				newY = 0;
			}
			else if ( sudar(newX, newY, snake_parts) ) {
				console.log(2);
			alert("Game Over");
			location.reload();
			}
		}
		
			// zmija jede metu - nastavlja da se krece
			if (newX == target.x && newY == target.y) {
				var nDeoTela = { x: newX, y: newY }
				score++;
				createTarget();
			}
			// kretanje
			else {
				var nDeoTela = snake_parts.pop();
				nDeoTela.x = newX; nDeoTela.y = newY;
			}
			
			snake_parts.unshift(nDeoTela); // produzuje zmiju ako pojede metu ili prebacuje postojeci zadnji deo (rep), na pocetku (na mestu glave)
		
			ctx.fillText("Your score: " + score, 10, 440);
		
		// crtanje zmije
		for(var i=0; i<snake_parts.length; i++) {
		var partInc = snake_parts[i];
		ctx.fillStyle = "green";
		ctx.beginPath();
		ctx.arc(partInc.x*snakeBodyWidth + snakeBodyWidth/2, partInc.y*snakeBodyWidth + snakeBodyWidth/2,snakeBodyWidth/2, 0, 2 * Math.PI);
		ctx.fill();
		ctx.strokeStyle = '#003300';
		ctx.stroke();

		}
		
		// crtanje mete
		ctx.fillStyle = "yellow";
		ctx.fillRect(target.x*snakeBodyWidth, target.y*snakeBodyWidth, snakeBodyWidth, snakeBodyWidth);	
	}
	
	function sudar(x,y, array) {
		for(var i = 0; i < array.length; i++){
			if(array[i].x == x && array[i].y == y) {
				return true;
		}}
		
				return false;
			
		
	}
	document.addEventListener("keydown",keyDownHandler);
	function keyDownHandler(e) {
    if(e.keyCode == 37 && direction != "right") {direction = "left"}
	else if(e.keyCode == 39 && direction != "left") {direction = "right"}
	else if(e.keyCode == 40 && direction != "down") {direction = "up"}
	else if(e.keyCode == 38 && direction != "up") {direction = "down"}
	}
	
	// pozivanje svih elemenata
	function init()
	{
		var direction = 'right';
		createSnake();
		createTarget(); 
		document.getElementById("myBtn1").onclick = function() {
			clearInterval(game_loop);
			game_loop = setInterval(Elements, 30); var z = 1;
		};
		document.getElementById("myBtn2").onclick = function() {
			clearInterval(game_loop);
			game_loop = setInterval(Elements, 200); var z = 2;
		};
		document.getElementById("myBtn0").onclick = function() {
			clearInterval(game_loop);
			game_loop = setInterval(Elements, 80); var z = 0;
		};
		if (z == 0) {
		game_loop = setInterval(Elements, 80);
		}
	}
	init();
	}