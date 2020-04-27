var OBJFILECONTENTS = "";

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    OBJFILECONTENTS = e.target.result;
    displayContents(OBJFILECONTENTS);
	parse_obj_file()
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);

var ofData = {
				f: [],
				v: [],
				vn: [],
				g: [], // [] of ofd_g objects
				o: {},
				cache: {}
};

function ofd_g()	{
	
	this.name = "";
	this.lines = [{ type: "f", // ofData["f"][indice]
					indice: 0
	}];
}
	
	
var ofDataR = {
				x_min: Infinity,
				x_max: -Infinity,
				y_min: Infinity,
				y_max: -Infinity,
				z_min: Infinity,
				z_max: -Infinity,
				
				f_begins: 0,
				v_begins: 0,
				vn_begins: 0
};

var WIDTH = 150;
var HEIGHT = 84; /*Math.round(150*(9/16));*/

function optionSelected()	{
	
	var v = document.getElementById("os");
	//alert(v.selectedIndex);
	
	switch(v.selectedIndex)	{
		
		case 0:
			WIDTH = 150;
			HEIGHT = Math.round(150*(9/16));
			break;
		
		case 1:
			WIDTH = 500;
			HEIGHT = Math.round(500*(9/16));
			break;
			
		case 2:
			WIDTH = 900
			HEIGHT = 550
			break;
			
		default:
	}
}

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var loop;

// // WIDTH = 500, HEIGHT = Math.round(500*(9/16))
 
var ray_origin = point(0,0,-5); //0,0,5
var wall_z = 10.0;
var wall_size = 3.5;

var canvas_pixels = 281.25;
var pixel_size = wall_size / canvas_pixels;

var half = wall_size / 2;

var color = "#ff0000";

var colors = [];
colors[0] = "#00eeee";
colors[1] = "#aa0000";
colors[2] = "#000088";
colors[3] = "#333333";

colors[4] = "pink";
colors[5] = "white";
colors[6] = "black";
colors[7] = "purple";

	var colours = []; // for clock symbols
	colours[0] = "black";
	colours[1] = "white";
	colours[2] = "red";
	colours[3] = "#33ff33";
	colours[4] = "yellow";
	colours[5] = "brown";
	colours[6] = "pink";
	colours[7] = "crimson";
	colours[8] = "DarkGoldenRod";
	colours[9] = "#213454";
	colours[10]= "OliveDrab";
	colours[11]= "Thistle";
	
	var labels = []; // for numbers on clock symbols
	labels[0] = "12";
	labels[1] = "1";
	labels[2] = "2";
	labels[3] = "3";
	labels[4] = "4";
	labels[5] = "5";
	labels[6] = "6";
	labels[7] = "7";
	labels[8] = "8";
	labels[9] = "9";
	labels[10] = "10";
	labels[11] = "11";

var p = new projectile("p", point(10,10,0), vector(10,18,0));
var p2 = new projectile("p2", point(20,10,0), vector(8,15,0));
var p3 = new projectile("p3", point(5,7,0), vector(9,17,0));
var p4 = new projectile("p4", point(10,7,0), vector(5,5,0));

var p5 = new projectile("p5", point(1,1,0), vector(11,13,0));
var p6 = new projectile("p6", point(10,5,0), vector(18,8,0));
var p7 = new projectile("p7", point(4,9,0), vector(12,17,0));
var p8 = new projectile("p8", point(9,4,0), vector(1,15,0));

var collision = false;

var PROJ_R = 2;

var CANVAS_WIDTH = 500, CANVAS_HEIGHT = 281.25;

function hand(color, length, thickness)	{
	
	this.color = color;
	this.length = length;
	this.thickness = thickness;
}

var BG_COLOR = "#1a1717";
var CURR_BG_COLOR = BG_COLOR;

loop = setInterval(init, 50);

function init()	{

	ctx.fillStyle = CURR_BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	clock();
	moveBall();
}

function init2()	{

	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	render_old();	
}


function moveBall()	{ 
	
	p = tick(p);
	p2 = tick(p2);
	p3 = tick(p3);
	p4 = tick(p4);
	p5 = tick(p5);
	p6 = tick(p6);
	p7 = tick(p7);
	p8 = tick(p8);
	
	detectCollision(p, p2, p3, p4, p5, p6, p7, p8)
	
	Paint(p, p2, p3, p4, p5, p6, p7, p8)
}

function Paint()	{
	
	for (a = 0; a < arguments.length; a++)
		paintBall(arguments[a], colors[a]);
}

function detectCollision()	{
	
	var flag = false;
	for (var i = 0; i < arguments.length-1; i++)	{
		
		var p = arguments[i];
	
		for (var j = i+1; j < arguments.length; j++)	{
			
			var p2 = arguments[j];
	
			var dx = Math.abs(p.position.x - p2.position.x);
			var dy = Math.abs(p.position.y - p2.position.y);
			var distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < (2*PROJ_R))
			// collision detected!
				flag = true;
		}
	}
	
	if (flag)
		CURR_BG_COLOR = "green";
	else
		CURR_BG_COLOR = BG_COLOR;
}


function paintBall(p, color)	{
	
	ctx.fillStyle = color;
	ctx.moveTo(0,0);
	ctx.beginPath();
	ctx.arc(p.position.x, 281.25 - (p.position.y), PROJ_R, 0, 2 * Math.PI);
	ctx.strokeStyle = color;
	ctx.stroke();
	ctx.fill();
	
}

function tick(proj)	{
	
	var position = add(proj.position, proj.velocity);
	
	// new: velociy updates on collision with walls
	if (proj.position.x < 0)	{
		
		position.x = 20 /* CANVAS_WIDTH - (CANVAS_WIDTH - proj.position.x + 10)*/
		proj.velocity.x = - proj.velocity.x
		
		//debugger;
	}
	else if (proj.position.x > CANVAS_WIDTH)	{
		
		position.x = CANVAS_WIDTH - 20 /* CANVAS_WIDTH - (CANVAS_WIDTH - proj.position.x + 10)*/
		proj.velocity.x = - proj.velocity.x
	}
	
	if (proj.position.y < 0)	{
		
		position.y = 20;
		proj.velocity.y = -proj.velocity.y;
		
		//debugger;
	}
	else if (proj.position.y > CANVAS_HEIGHT)	{
		
		position.y = CANVAS_HEIGHT - 20;
		proj.velocity.y = -proj.velocity.y;	
	}

	return new projectile(proj.id, position, proj.velocity)
}


var g_c = null, g_w = null, g_r = null, g_x = null, g_y = null;

var to = null; // setTimeout(render2, 0);

/*
function render(c, w, remaining)	{
	
	g_c = c;
	g_w = w;
	g_r = remaining;
	g_x = 0
	g_y = 0
	//to = setTimeout(render2, 1)
	render2();
}
function render2()	{
	
	//console.log("g_x = " + g_x);
	
	for (var y = 0; y < HEIGHT; y++)	{
		console.log("Line " + y + " of " + HEIGHT);
		
		for (var x = 0; x < WIDTH; x++)	{
	
			var r = g_c.ray_for_pixel(x, y);
			
			ctx.fillStyle = convert(color_at(g_w, r, g_r))
			ctx.fillRect(x,y,1,1)
		}
	}
}
*/

function render(c, w, remaining)	{
	
	g_c = c;
	g_w = w;
	g_r = remaining;
	g_x = 0
	g_y = 0
	//to = setTimeout(render2, 1)
	console.time("render.")
	render2();
}

function render2()	{

	var r = g_c.ray_for_pixel(g_x, g_y);
			
	ctx.fillStyle = convert(color_at(g_w, r, g_r))
	ctx.fillRect(g_x,g_y,1,1)
			
	g_x++;
	if (g_x >= WIDTH)	{
				
		g_x = 0
		g_y++
	}
			
	if (g_y >= HEIGHT)	{
				
		clearTimeout(to)
		console.log("COMPLETED.\n")
		console.timeEnd("render.")
		return
	}
	
	to = setTimeout(render2, 0)	
}

function convert(c)	{
	
	var red = c.x;
	var green = c.y;
	var blue = c.z;
	
	if (red>1)
		red = 1;
	
	if (green>1)
		green = 1;
	
	if (blue>1)
		blue = 1;
	
	if (red<0)
		red = 0;
	
	if (green<0)
		green = 0;
	
	if (blue<0)
		blue = 0;
	
	red = Math.floor(255*red); //if (red<10) red = "0" + red;
	green = Math.floor(255*green); //if (green<10) green = "0" + red;
	blue = Math.floor(255*blue); //if (blue<10) blue = "0" + red;
	
	red = rgbToHex(red);
	blue = rgbToHex(blue);
	green = rgbToHex(green);
	
	var res = "#" + red + blue + green;
	return res;
}

function rgbToHex(rgb) { 
  var hex = rgb.toString(16)
  if (hex.length < 2)
       hex = "0" + hex;

  return hex
}

function write_pixel(x, y, color)	{
	
	// ctx.fill
	ctx.fillStyle = color
	ctx.fillRect( x, y, 1, 1 )
}

var ticker = 0;
var black_indice = 0;

function clock()	{
	
	var twelve = point(0,1,0)
	var r = 0
	var res = 0
	var face = []
	var face_min = []
	var face_sec = []
	
	face[0] = twelve
	face_sec[0] = twelve
	face_min[0] = twelve
	
	for (var b = 1; b < 60; b++)	{
		
		r = inverse(rotation_z(b * ((2*Math.PI)/60)))
		res = mul(r, twelve)
		res = sn_round(res) // rounds tuple values down to 0, when < EPSILON
		
		face_sec.push(res)
		face_min.push(res)
		
		if ((b % 5)==0)
			face.push(res)
	}
	
	var clock_radius = CANVAS_HEIGHT * (3/8)

	ctx.moveTo(0,0)
	ctx.beginPath()
	
	var x = 0
	var y = 0
	
	for (var a = 0; a < face.length; a++)	{
	
		x = (face[a].x * clock_radius) + CANVAS_WIDTH/2;
		y = CANVAS_HEIGHT/2 - (face[a].y * clock_radius);
		
		ctx.beginPath();
		ctx.moveTo(x,y);
	
		ctx.fillStyle = colours[a];
		ctx.arc(x, y, 20, 0, 2 * Math.PI);
		ctx.strokeStyle = colours[a];
		ctx.stroke();
		ctx.fill();	
		
		ctx.fillStyle = "black";
		
		if (a==0)
			ctx.fillStyle = "#ffffff";
		
		ctx.font = "10px Comic Sans Bold";
		ctx.fillText(labels[a], x - 3, y + 2);
	}

	
	// Cycle number disc colours[]
	ticker++;
	if ((ticker % 10) == 0)	{
		
		/*
		var temp = new String(colours[11]);
	
		for (var i = 10; i >= 0; i--)
			colours[i+1] = new String(colours[i]);

		colours[0] = new String(temp);
		*/
	}
	
	if (ticker>1000)
		ticker = 1;

	var now = new Date();
	var hour = now.getHours();
	if (hour >= 12)
		hour = hour - 12;
	var mins = now.getMinutes();
	var secs = now.getSeconds();
	
	//hour = hour * 5;
	var hands = [];
	
	hands[0] = new hand("black", clock_radius - 50, 10 ); // hr
	hands[1] = new hand("blue", clock_radius - 50, 7.5 ); // min
	hands[2] = new hand("red", clock_radius - 50, 5 ); // sec
		
		// MINS
		x = ((face_min[mins].x * clock_radius) + CANVAS_WIDTH/2);
		y = CANVAS_HEIGHT/2  - (face_min[mins].y * clock_radius);

		// the hand
		ctx.beginPath();
		ctx.moveTo(CANVAS_WIDTH/2, CANVAS_HEIGHT/2); // centre of clock
		ctx.lineTo(x, y);

		ctx.closePath();
 
		// the outline
		ctx.lineWidth = hands[1].thickness;
		ctx.strokeStyle = hands[1].color;
		ctx.stroke();
		
		
		// HRS
		x = ((face[hour].x * clock_radius) + CANVAS_WIDTH/2);
		y = CANVAS_HEIGHT/2  - (face[hour].y * clock_radius);
		
		//if (hour>6) // shorten the hour hand: TODO
			//x = x + (clock_radius - hands[0].length);
		//else
			//x = x - (clock_radius - hands[0].length);
        

		// the hand
		ctx.beginPath();
		ctx.moveTo(CANVAS_WIDTH/2, CANVAS_HEIGHT/2); // centre of clock
		ctx.lineTo(x, y);

		ctx.closePath();
 
		// the outline
		ctx.lineWidth = hands[0].thickness;
		ctx.strokeStyle = hands[0].color;
		ctx.stroke();
		

		// SECS
		x = ((face_sec[secs].x * clock_radius) + CANVAS_WIDTH/2);
		y = CANVAS_HEIGHT/2  - (face_sec[secs].y * clock_radius);

		// the hand
		ctx.beginPath();
		ctx.moveTo(CANVAS_WIDTH/2, CANVAS_HEIGHT/2); // centre of clock
		ctx.lineTo(x, y);

		ctx.closePath();
 
		// the outline
		ctx.lineWidth = hands[2].thickness;
		ctx.strokeStyle = hands[2].color;
		ctx.stroke();		

}