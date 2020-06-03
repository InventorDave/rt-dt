var CANVAS_WIDTH = 500, CANVAS_HEIGHT = 281.25;
var WIDTH = CANVAS_WIDTH;
var HEIGHT = Math.round(CANVAS_HEIGHT);
var BGCOLOR = "#2222cc";
var RENDER_BG_COLOR = colour(0,0,0)//convHexClr("d6b96f") //colour(0,0,0)

/** GLOBAL OBJECTS */

var Data = {
				SkyBox: { top: "", bottom: "", left: "", right: "", front: "", back: "" },
				PPM_refs: [],
				PPM: [],
				f: [],
				v: [],
				vn: [],
				vt: [],
				g: [], // not currently used
				o: {},
				cache: {},
				c: new Camera(WIDTH, HEIGHT, (Math.PI/4)),
				l: new point_light(point(-20, 20, 40), colour(1,1,1)),
				
				presets: { camera: [], lights: [], scenes: [] },
				
				openFileType: "",
				normalizeMesh: 0
};

var DataR = {
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

Data.presets.camera.push({ str: "preset1", vt: view_transform(point(0,0,20),point(0,0,0),vector(0,1,0)) })
Data.presets.camera.push({ str: "preset2", vt: view_transform(point(0,5,8),point(0,1,0),vector(0,1,0)) })
Data.presets.camera.push({ str: "preset3", vt: view_transform(point(25,0, 25), // from
								point(0,10,0),   // to
								vector(0,1,0)) })

/** END GLOBAL OBJECTS */

function optionSelected()	{
	var ct;
	switch(document.getElementById("os").selectedIndex)	{
		
		case 0:
			WIDTH = 150;
			HEIGHT = Math.round(150*(9/16));
			ct = Data.c.transform;
			Data.c = new Camera(WIDTH, HEIGHT, (Math.PI/4));
			Data.c.setCTransform(ct);
			break;
		
		case 1:
			WIDTH = 500;
			HEIGHT = Math.round(500*(9/16));
			ct = Data.c.transform;
			Data.c = new Camera(WIDTH, HEIGHT, (Math.PI/4));
			Data.c.setCTransform(ct);
			break;
			
		case 2:
			WIDTH = 900
			HEIGHT = 550
			ct = Data.c.transform;
			Data.c = new Camera(WIDTH, HEIGHT, (Math.PI/4));
			Data.c.setCTransform(ct);
			break;
			
		default:
	}
}

function camPresetSelected()	{
	
	var v = document.getElementById("campresets")
	
	Data.c.setCTransform(Data.presets.camera[v.selectedIndex].vt)
	
	var el = document.getElementById("cameraDetails")
	
	el.innerText = Data.presets.camera[v.selectedIndex].str + " : " + Data.c.string;
	console.log("Set Camera to preset " + (v.selectedIndex+1) + ".")
}

function doDivide()	{
	
	try	{
		
		//debugger;
		Data.o.divide(DataR.divideValue)
		//debugger;
		
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

	Data.c.setCTransform(Data.presets.camera[0].vt);
	
	ctx.fillStyle = BGCOLOR
	ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
}

/** END OF INIT */


/** RAYTRACER CODE */

function scene()	{
	
	var o = group()
	for (var i = 0; i < arguments.length; i++)
		o.addChild(arguments[i])
	
	Data.o = o
	
	return o
}

function lights()	{
	
	Data.l = arguments[0]
	
	return arguments[0]
}

function camera(c)	{
	
	Data.c = arguments[0]
	
	return arguments[0]
}


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

	g_x =0;
	while(g_x != WIDTH) {
		var r = g_c.ray_for_pixel(g_x, g_y);
				
		var c = color_at(g_w, r, g_r)
		
		if ((c.x==0)&&(c.y==0)&&(c.z==0))	{
			// render bg image
			if(!Data.PPM["bgImage.ppm"])
				c = RENDER_BG_COLOR
			
			else	{
				
				c = bgImage_uv_pattern_at(g_x/WIDTH, g_y/HEIGHT)
			}
			
		}
		
		c = convert(c)
		ctx.fillStyle = c
		
		var x = g_x + ((CANVAS_WIDTH/2) - WIDTH/2)
		var y = g_y + ((CANVAS_HEIGHT/2) - HEIGHT/2)
		
		ctx.fillRect(x,y,1,1)
				
		g_x++;
	}

	g_x = 0
	g_y++
			
	if (g_y === HEIGHT)	{
				
		clearTimeout(to)
		console.log("COMPLETED RENDER.")
		console.timeEnd("render")
		return
	}
	
	to = setTimeout(render2, 0)	
}
/*
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
*/

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
	
	//return { x: red, y: green, z: blue }
	
	return res = "#" + red + green + blue;
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

function ppmObj(fn)	{
	
	if(!Data.PPM[fn])
		return false
	
	return { data: Data.PPM[fn].data, width: Data.PPM[fn].width, height: Data.PPM[fn].height }
}

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
	parse_obj_file(Data.normalizeMesh)
  }; 
  
  reader.readAsText(file);
}

function readFile(e)	{

	if (Data.openFileType=="PPM")
		readPPMFile(e)
	
	else if (Data.openFileType=="IMG")
		readImageFile(e)
	
	else
		alert("Do not know what type of file to read!")
}

function readPPMFile(e)	{
	
	//alert("inside readppmfile!")
	
	//var file = e.target.files[0]
	var file = e.target.files[0];
	
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
	
	//alert(fn)
	
	try	{
		// if file ext == ".rdt" then
		//eval("I = " + FILECONTENTS + ";")
		// else if file ext == ".ppm"
		
		if(!parsePPM(fn)) 
			throw new Error("parseFileContents() FAILED!")
	} catch(e)	{
		console.log("Error loading file.")
	}
	
	// else
	
}

function parsePPM(fn)	{
	
	var arr = FILECONTENTS.split("\n").join(" ").split(" ");
	
	if(arr[0].indexOf("P3")==-1)	{
		alert("FAIL: PPM File is not in correct format! arr[0] == " + arr[0]);
		return false;
	}
	for (var j = 1; j < arr.length; j++)	{
		
		if ( (arr[j]=="\n") || (arr[j]=="") || (arr[j]==" ") || (isNaN(arr[j])) )
				arr.splice(j,1)
	}
	
	

	console.log("Completed Stage 1 of parsing PPM file.")
	
	var width = arr[1]
	var height = arr[2]
	var bit_depth = arr[3]
	
	var pix = []
	for (var i = 4; i < arr.length; i = i + 3)	{
		
		var r = Number(arr[i])
		var g = Number(arr[i+1])
		var b = Number(arr[i+2])
		
		//r = 255, g = 33, b = 33
		//pix[ppos]=r [ppos+1]=g [ppos+2]=b [ppos+3]=255
		pix[i-4] = r, pix[i-3] = g, pix[i-2] = b;

	}
	
	//ctx.putImageData(img, 0, 0)

	var c = { data: pix, width: width, height: height }
	Data.PPM[fn] = c;
	Data.PPM_refs.push(fn)

	console.log("PPM file processed, internal image created.")
	
	return true;
}
/* END OF FILE */

/* SPLASH SCREEN FUNCTIONS & VARIABLES */
 


/* END OF SPLASH SCREEN FUNCTIONS & VARIABLES */
