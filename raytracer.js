
var WIDTH = 150;
var HEIGHT = 84; /*Math.round(WIDTH*(9/16));*/
var FGCOLOR = "#2222cc";
var BGCOLOR = "#000000";
var RENDER_BG_COLOR = colour(0,0,0)

/** GLOBAL OBJECTS */

var ofData = {
				f: [],
				v: [],
				vn: [],
				vt: [],
				g: [], // not currently used
				o: {},
				cache: {},
				c: new camera(WIDTH, HEIGHT, (Math.PI/4)),
				l: new point_light(point(-20, 20, 40), colour(1,1,1)),
				
				presets: { camera: [], lights: [], scenes: [] }
};

var ofDataR = {
				x_min: Infinity,
				x_max: -Infinity,
				y_min: Infinity,
				y_max: -Infinity,
				z_min: Infinity,
				z_max: -Infinity,
				
				f_begins: 0,
				v_begins: 0,
				vn_begins: 0,
				vt_begins: 0,
				
				divideValue: 100
};

ofData.presets.camera.push(view_transform(point(0,0,20),point(0,0,0),vector(0,1,0)))
ofData.presets.camera.push(view_transform(point(0,5,8),point(0,1,0),vector(0,1,0)))
ofData.presets.camera.push(view_transform(point(25,0, 25), // from
								point(0,10,0),   // to
								vector(0,1,0)))

/** END GLOBAL OBJECTS */


function optionSelected()	{
	
	switch(document.getElementById("os").selectedIndex)	{
		
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

function camPresetSelected()	{
	
	var v = document.getElementById("campresets")
	
	ofData.c.setCTransform(ofData.presets.camera[v.selectedIndex])
	console.log("Set Camera to preset " + (v.selectedIndex+1) + ".")
}

function doDivide()	{
	
	try	{
		
		ofData.o.divide(ofDataR.divideValue)
		return true
	} catch(e)	{
		
		return false
	}
}

/** INIT */

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var loop;

function init()	{

	ofData.c.setCTransform(ofData.presets.camera[0]);
	
	ctx.fillStyle = "#2222cc"
	ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
}

/** END OF INIT */


/** RAYTRACER CODE */

var g_c, g_w, g_r, g_x, g_y

function render(c, w, remaining)	{

	//clearTimeout(loop)
	g_c = c;
	g_w = w;
	g_r = remaining;
	g_x = 0
	g_y = 0
	console.time("render")
	render2();
}

function render2()	{

	var r = g_c.ray_for_pixel(g_x, g_y);
			
	var c = color_at(g_w, r, g_r)
	
	if ((c.x==0)&&(c.y==0)&&(c.z==0))
		c = RENDER_BG_COLOR
	
	c = convert(c)
	ctx.fillStyle = "#" + c.x + c.y + c.z
	
	var x = g_x + ((CANVAS_WIDTH/2) - WIDTH/2)
	var y = g_y + ((CANVAS_HEIGHT/2) - HEIGHT/2)
	
	ctx.fillRect(x,y,1,1)
			
	g_x++;
	if (g_x === WIDTH)	{
				
		g_x = 0
		g_y++
	}
			
	if (g_y === HEIGHT)	{
				
		clearTimeout(to)
		console.log("COMPLETED RENDER.")
		console.timeEnd("render")
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
	
	return { x: red, y: green, z: blue }
	/*
	var res = "#" + red + blue + green;
	return res;
	*/
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

/*
function render(c, w, remaining)	{
	
	console.time("render")	
	
	for (var y = 0; y < HEIGHT; y++)	{
		
		//console.log("Line " + y + " of " + HEIGHT);
		
		for (var x = 0; x < WIDTH; x++)	{
	
			var r = c.ray_for_pixel(x, y);
			
			ctx.fillStyle = convert(color_at(w, r, remaining))
			ctx.fillRect(x,y,1,1)
		}
	}
	
	console.log("COMPLETED.\n")
	console.timeEnd("render")
}
*/

/** END OF RAYTRACER CODE */

/* FILE */

var OBJFILECONTENTS = "";
var FILECONTENTS = "";

function readObjectFile(e) {
  var file = e.target.files[0];
  
  if (!file) {
    return;
  }
  
  var reader = new FileReader();
  reader.onload = function(e) {
    OBJFILECONTENTS = e.target.result;
    //displayContents(OBJFILECONTENTS);
	parse_obj_file()
  }; 
  
  reader.readAsText(file);
}

function readFile(e)	{
	
	var file = e.target.files[0]
	
	if (!file)	{
		alert("No File identified!")
		return
	}
	
	var reader = new FileReader()
	
	reader.onload = function(e)	{
		
		FILECONTENTS = e.target.result
		parseFileContents(file.name)
	}
	
	reader.readAsText(file)
}

var I = {}
function parseFileContents(fn)	{
	
	alert(fn)
	try	{
		eval("I = " + FILECONTENTS + ";")
		//openFileModal
	} catch(e)	{
		console.log("Error loading file '" + fn + "'.")
	}
}

/* END OF FILE */

/* SPLASH SCREEN FUNCTIONS & VARIABLES */
 
var CANVAS_WIDTH = 500, CANVAS_HEIGHT = 281.25;

/* END OF SPLASH SCREEN FUNCTIONS & VARIABLES */
