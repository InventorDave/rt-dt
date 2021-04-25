// TEST (mint, vscode)
// TEST 2


var CANVAS_WIDTH = 750, CANVAS_HEIGHT = 422;
var WIDTH = CANVAS_WIDTH;
var HEIGHT = CANVAS_HEIGHT;

var BGCOLOR = "#2222cc";

var RENDER_FG_COLOR = colour(1, 0.5, 0.5)
var RENDER_BG_COLOR = colour(0,0,0) // convHexClr("d6b96f")

/** GLOBAL OBJECTS */

var Data = {
				yaml: {},
				
				//YAML: [], // each indice contains { type: '..', key: [], value: [] }
				
				SkyBox: { up: "", down: "", left: "", right: "", front: "", back: "" },
				
				PPM_refs: [], // contains the names of the associative indices of the PPM[] array, so you can just iterate through the light PPM_refs[] array to extract the filenames of all internal PPM objects. Then, if you get a match at, say, indice 2, you might do ppmObj = Data.PPM[Data.PPM_refs[2]];, it's vaguely more lightweight to iterate through a presumably small array of strings (PPM_refs), than try to iterate through a larger array of huge PPM objects to extract the filenames, plus the PPM[] object array is associative, so it's ugly to try and iterate through it without knowing what string to use as the indice reference.
				PPM: [],
				
				bgImage: "",
				
				Maps:	{}, // keys mapped to PPM[] keys
				Maps_refs: [],
				
				meshes: [], // { v: [], vn: [], filename: "", name: "", group: {} }
				f: [],
				v: [],
				vn: [],
				vt: [],
				g: [],
				
				o: {},
				
				cache: [],
				
				c: new Camera(WIDTH, HEIGHT, (Math.PI/4)),
				l: new point_light(point(-20, 20, -40), colour(1,1,1)),
				
				presets: { camera: [], lights: [], scenes: [], functions: [] },
				
				openFileType: "",
				normalizeMesh: 0,
				divideValue: 500
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
				vt_begins: 0
};

Data.presets.camera.push({ str: "preset1", vt: view_transform(point(0,0,20),point(0,0,0),vector(0,1,0)) })
Data.presets.camera.push({ str: "preset2", vt: view_transform(point(0,5,8),point(0,1,0),vector(0,1,0)) })
Data.presets.camera.push({ str: "preset3", vt: view_transform(point(25,0, 25), // from
								point(0,10,1),   // to
								vector(0,1,0)) })

/** END GLOBAL OBJECTS */

function addFunction(name, fn)	{
	
	Data.presets.functions[name] = {};
	Data.presets.functions[name].name = name;
	Data.presets.functions[name].fn = fn;
}

function previewSizeOptionSelected()	{
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
			WIDTH = 750
			HEIGHT = 422
			ct = Data.c.transform;
			Data.c = new Camera(WIDTH, HEIGHT, (Math.PI/4));
			Data.c.setCTransform(ct);
			break;
			
		default:
	}
}

function sceneOptionSelected()	{
	
	try {
		
		var fn = document.getElementById("predefined-scene-options").value;
		//alert("fn = " + fn + "()")
		//console.log("firing eval()!")
		eval(fn + "()");
	}
	catch(e)	{
		alert("error! Cannot find function: " + fn)
	}
}

function camPresetSelected()	{
	
	var v = document.getElementById("campresets")
	
	Data.c.setCTransform(Data.presets.camera[v.selectedIndex].vt)
	
	var el = document.getElementById("cameraDetails")
	
	el.innerText = Data.presets.camera[v.selectedIndex].str + " : " + Data.c.string;
	_log("Set Camera to preset " + (v.selectedIndex+1) + ".")
}

function mapsOptionsSelected(e)	{
	
	//(document.getElementById(e.target.id).value)
	var m = document.getElementById("mp_id_select")
	
	//alert(m.value)
	Data.Maps[m.value] = document.getElementById(e.target.id).value;
}

function mapsOptionsSelected2(e)	{
	
	var s = document.getElementById("mp_id_opts_select")
	var m = document.getElementById("mp_id_select")
	 
	 
	//var keys = Object.keys(Data.PPM)
	

	s.value = Data.Maps[m.value];
	
}

function imageOptionsSelected(e)	{

		//alert(e.target.id)
		var s = document.getElementById(e.target.id)

		var value = null;
		
		if (s.value=="No Image")	{
		
			if (s.id=="p_id_select")	{
				
				Data.PPM["bgImage"] = null;
			}
			else if (s.id=="nm_p_id")
				Data.PPM["normalMap"] = null;
			
			else
				setSBParam(s.id, null);
			
			return;
		}
		
		if (s.id=="p_id_select")	{
		
			Data.PPM["bgImage"] = Data.PPM[s.value];
			Data.bgImage = s.value;
			
			//alert("here! - " + s.value);
			
			return;
		}
		
		if (s.id=="nm_p_id_select")	{
		
			Data.PPM["normalMap"] = Data.PPM[s.value]
			return;
		}
		
		setSBParam(s.id, s.value);
		return
}

function setSBParam(id, val)	{
	
	switch(id)	{
		
		case "sb_left_select":
			Data.SkyBox.left = Data.PPM[val];
			break;
			
		case "sb_right_select":
			Data.SkyBox.right = Data.PPM[val];
			break;
		
		case "sb_front_select":
			Data.SkyBox.front = Data.PPM[val];
			break;

		case "sb_back_select":
			Data.SkyBox.back = Data.PPM[val];
			break;

		case "sb_up_select":
			Data.SkyBox.up = Data.PPM[val];
			break;

		case "sb_down_select":
			Data.SkyBox.down = Data.PPM[val];
			break;	

		default:
			alert("Woopsie!")
			break;
	}
	
}


/** INIT */

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var loop;

function rtdtinit()	{

	Data.c.setCTransform(Data.presets.camera[0].vt);
	
	ctx.fillStyle = BGCOLOR
	ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
	populateSceneFunctionSelection();
	
	preLoadResources();
}

function populateSceneFunctionSelection()	{
	
	var select = document.getElementById("predefined-scene-options")
	
	select.addEventListener("change", sceneOptionSelected)
	
	
	var opt1 = document.createElement("option")
	opt1.text = opt1.value = "Please select."
	select.add(opt1)
	
	var i;
		
	for(i in Data.presets.functions)
		if(Data.presets.functions.hasOwnProperty(i))	{
		
			var option = document.createElement("option")
			option.text = Data.presets.functions[i].name;
			option.value = Data.presets.functions[i].fn;
		
			select.add(option)
		}
}


function preLoadResources()	{

		var url = "img/"
		var files = ["earthmap1k.jpg", "starfield.jpg", "2k_moon.jpg", "left.jpg", "right.jpg", "front.jpg", "back.jpg", "up.jpg", "down.jpg"];
		var maps =  {earth: "earthmap1k.jpg", moon: "2k_moon.jpg"}
		var bgImage = "starfield.jpg"
		//var sb_cube_img = "earthmap1k.jpg"
		
		var img_arr = []
		
		for (var i = 0; i < files.length; i++)	{
			
			img_arr[i] = new Image();
			img_arr[i].fn = files[i];
			img_arr[i].i = i;
			
			img_arr[i].onload = function() {
				//alert(this.width + 'x' + this.height);
				preLoadResourcesStage2(this.fn, this.i)
			}
			img_arr[i].src = url + files[i];
			img_arr[i].id = "img" + i;
			img_arr[i].style = "display: none;"
		
			document.body.appendChild(img_arr[i])
			//_log("Loading Image File: " + img_arr[i].fn)
		}
		
		//Data.Maps["earth"] = maps.earth

			
		for (key in maps)	{
			
			Data.Maps[key] = maps[key];
			
			_log("Set " + maps[key] + " to '" + key + "' map.")
		}
		
		populateMapsSelection()
		populateMapsOptions()
		
}

function preLoadResourcesStage2(fn, i)	{
	
	var imgCanvas = document.getElementById("imgCanvas")
	var img       = document.getElementById("img" + i)
	
	imgCanvas.width = img.width;      // set canvas size big enough for the image
	imgCanvas.height = img.height;
	var ctx = imgCanvas.getContext("2d");
	ctx.drawImage(img,0,0);
	
	var img_ = ctx.getImageData(0, 0, img.width, img.height);
	
	var width = img.width
	var height = img.height
	var pix = img_.data;
	
	_log("Image File loaded: "  + fn)
	convertToPPM(pix, width, height, fn);
	
	//document.removeChild(img);
	//debugger;

}


/** END OF INIT */


/** RAYTRACER CODE */

function verify_PPM(e)	{
	
	var ppm = Data.PPM[e]
	if(!ppm)	{
		
		alert("Cannot find '" + e + "'! Please load.")
		return
	}
	
	return ppm
}

function verify_SkyBoxObj(skyBox)	{
	
	// { left: Data.SkyBox.left, right: Data.SkyBox.right, front: Data.SkyBox.front, back: Data.SkyBox.back, up: Data.SkyBox.up, down: Data.SkyBox.down }
	
	return (skyBox.left &&  skyBox.right && skyBox.front && skyBox.back && skyBox.up && skyBox.down)
}

function scene()	{
	
	var o = group()
	for (var i = 0; i < arguments.length; i++)
		o.addChild(arguments[i])
	
	Data.o = o
	
	return o
}

function saveScene(name, c, l, o, bgImage)	{
	
	var scene_ = { name: name, o: o, c: c, l: l, bgImage: bgImage }
	
	Data.cache.push(scene_)
}

function loadScene(name)	{

	var scene_;
	for(var i = 0; i < Data.cache.length; i++)	{
		
		if(Data.cache[i].name==name)	{
			
			scene_ = Data.cache[i]
			break;
		}
	}
	
	if(!scene_)	{
	
		_log("Couldn't find scene in cache!")
		return false
	}
	
	if(scene_.o)
		Data.o = scene_.o
	
	if(scene_.c)
		Data.c = scene_.c
	
	if(scene_.l)
		Data.l = scene_.l
	
	if(scene_.bgImage)
		Data.PPM["bgImage"] = scene_.bgImage
	else
		Data.PPM["bgImage"] = 0
	
	_log("To render scene, type 'renderImage()' into browser console")
	
	return true
}


function lights()	{
	
	Data.l = arguments[0]
	
	return arguments[0]
}

function camera(c)	{
	
	Data.c = arguments[0]
	
	return arguments[0]
}


var g_c, g_w, g_r, g_x, g_y, start, end, pixel_count = 0, bgImageSet = false;

function render(c, w, remaining)	{

	//clearTimeout(loop)
	g_c = c;
	g_w = w;
	g_r = remaining;
	g_x = 0
	g_y = 0
	
	bgImageSet = (!!Data.PPM["bgImage"] || false)
	
	start = Date.now()
	
	//console.log("test: render(...) fired.")
	
	render2();
}

function render2()	{

	//console.log("render2()")
	
	g_x =0;
	while(g_x != WIDTH) {
		
		pixel_count++
		
		var r = g_c.ray_for_pixel(g_x, g_y);
		
		if (g_x == 0 && g_y == 0)	{
			
			// debugger
		}
		
		var c = color_at(g_w, r, g_r)
		
		
		if ((c.x==0)&&(c.y==0)&&(c.z==0))	{
			// render bg image
			if(!bgImageSet)	{
			
				//console.log("bgimage not set.")
				c = RENDER_BG_COLOR
			}
			else	{
				//console.log("bgimage set.")
				c = bgImage_uv_pattern_at(g_x/WIDTH, g_y/HEIGHT)
			}
			
		}
		
		ctx.fillStyle = convert(c)
		
		var x = g_x + ((CANVAS_WIDTH/2) - WIDTH/2)
		var y = g_y + ((CANVAS_HEIGHT/2) - HEIGHT/2)
		
		ctx.fillRect(x,y,1,1)
				
		g_x++
	}

	//pixel_count--
	
	g_y++
			
	if (g_y == HEIGHT)	{
				
		clearTimeout(to)
		
		end = Date.now()

		var time_sec = (end - start) / 1000
		var time_min = time_sec / 60
		
		/**
		// a funsies method for rounding a fractional number to 3dp, before I discovered .toFixed()
		
		var lhs_dc = 0, n = Math.round(time_min)
		
		while(!(n < 1))	{
			
			lhs_dc++
			n /= 10
		}
		
		time_min = time_min.toPrecision(lhs_dc + 3)
		
		lhs_dc = 0, n = Math.round(time_sec)
		
		while(!(n < 1))	{
			
			lhs_dc++
			n /= 10
		}

		time_sec = time_sec.toPrecision(lhs_dc + 3)
		*/
		
		var msg = "(test) COMPLETED... This render took " + time_sec.toFixed(3) + " secs, " + time_min.toFixed(3) + " mins. PIXEL COUNT = (" + WIDTH + " x " + HEIGHT + ")."
		
		// _log(msg);
		
		console.log(msg)
		
		pixel_count = 0
		
		return 0;
	}
	
	to = setTimeout(render2, 0)	
}

function renderImageSync(l, o, d)	{

	prepCanvas()
	
	var c = Data.c
	var w = new world()
	
	if(l)
		Data.l = l
	
	if(o)
		Data.o = o
	
	if(!d)
		d = 1
		
	w.light = Data.l
	w.objects = [Data.o]
	
	//debugger;
	
	if(Data.bgImage)
	 Data.PPM["bgImage"] = Data.PPM[Data.bgImage]
	 
	//clearTimeout(loop)
	var g_c = c;
	var g_w = w;
	var g_r = d;
	var g_x = 0
	var g_y = 0
	
	var bgImageSet = (!!Data.PPM["bgImage"] || false)
	
	var start = Date.now()

	//console.log("render2()")
	
	for (var _x = 0; _x < WIDTH; _x++)	{
	
		for (var _y = 0; _y < HEIGHT; _y++)	{
		
			g_y = _y;
			g_x = _x;
			
			var r = g_c.ray_for_pixel(g_x, g_y);
			
			if (g_x == 0 && g_y == 0)	{
				
				// debugger
			}
			
			var c = color_at(g_w, r, g_r)
			
			
			if ((c.x==0)&&(c.y==0)&&(c.z==0))	{
				// render bg image
				if(!bgImageSet)	{
				
					//console.log("bgimage not set.")
					c = RENDER_BG_COLOR
				}
				else	{
					//console.log("bgimage set.")
					c = bgImage_uv_pattern_at(g_x/WIDTH, g_y/HEIGHT)
				}
				
			}
			
			ctx.fillStyle = convert(c)
			
			var x = g_x + ((CANVAS_WIDTH/2) - WIDTH/2)
			var y = g_y + ((CANVAS_HEIGHT/2) - HEIGHT/2)
			
			ctx.fillRect(x,y,1,1)
		}
	}
		
	var end = Date.now()

	var time_sec = (end - start) / 1000
	var time_min = time_sec / 60
	

	var msg = "(test) COMPLETED... This render took " + time_sec.toFixed(3) + " secs, " + time_min.toFixed(3) + " mins. PIXEL COUNT = (" + WIDTH + " x " + HEIGHT + "."
	
	// _log(msg);
	
	console.log(msg)
	
	return 0;
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

/** END OF RAYTRACER CODE */


function doDivide()	{
	
	try	{
		
		//debugger;
		Data.o.divide(Data.divideValue)
		//debugger;
		
		return true
	} catch(e)	{
		
		return false
	}
}


/* FILE */

var OBJFILECONTENTS = "";
var FILECONTENTS = "";
var I = {}

function ppmObj(fn)	{
	
	if(!Data.PPM[fn])
		return false
	
	return { data: Data.PPM[fn].data, width: Data.PPM[fn].width, height: Data.PPM[fn].height, name: Data.PPM[fn].name }
}


function readFile(e)	{

	if (Data.openFileType=="PPM")
		readPPMFile(e)
	
	else if (Data.openFileType=="IMG")
		readImageFile(e)
	
	else if (Data.openFileType=="MESH")
		readObjectFile(e)
	
	else if (Data.openFileType=="YAML")
		readYAMLFile(e)
		
	else
		alert("Do not know what type of file to read!")
}

function readObjectFile(e) {
  var file = e.target.files[0];
  
  if (!file) {
	  alert("no file!")
    return;
  }
  
  var reader = new FileReader();
  reader.onload = function(e) {
    OBJFILECONTENTS = e.target.result;
    //displayContents(OBJFILECONTENTS);
	parse_obj_file(file.name, Data.normalizeMesh)
  }; 
  
  reader.readAsText(file);
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
		parseFileContents(file.name, "PPM")
	}
	
	reader.readAsText(file)
}

function readYAMLFile(e)	{
	
	//alert("inside loadYAML!")
	
	var file = e.target.files[0]
	
	if (!file)	{
		alert("No File identified!")
		return
	}
	
	var reader = new FileReader()
	
	reader.onload = function(e)	{
		
		
		FILECONTENTS = e.target.result
		parseFileContents(file.name, "YAML")
	}
	
	reader.readAsText(file)
}

function parseYAML(fn)	{
	
	
	document.getElementById("source").value = FILECONTENTS
	
	testYAML();
	
	_log("Parsed YAML file: " + fn)

	return true
}

function testYAML()	{
	
	var src = document.getElementById("source").value
	//debugger
	
    var doc = jsyaml.load(src);
	Data.yaml = doc
	
	//debugger;
}

function parseFileContents(fn, type)	{
	
	//alert(fn)
	
	try	{
		
		if(type=="PPM")	{
			
			if(!parsePPM(fn)) 
				throw new Error("parseFileContents() FAILED for PPM file!")
		}
				
	} catch(e)	{
		_log("Error loading file: " + e.message)
	}
	
	if (type=="YAML")
		if(!parseYAML(fn))
			_log("parseFileContents() FAILED for YAML file!")
	// else
	
}

function parsePPM(fn)	{
	
	var arr = FILECONTENTS.split("\n")
	
	
	for (var k = 0; k < 10; k++)
		if(arr[k])
			if(arr[k].charAt(0)=="#")
				arr.splice(k,1)
	
	
	arr = arr.join(" ").split(" ");
	
	if(arr[0].indexOf("P3")==-1)	{
		alert("FAIL: PPM File is not in correct format! arr[0] == " + arr[0]);
		return false;
	}
	
	for (var j = 1; j < arr.length; j++)
		if ( (arr[j]=="\n") || (arr[j]=="") || (arr[j]==" ") )
				arr.splice(j,1)
	
	

	//_log("Completed Stage 1 of parsing PPM file.")
	
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
	
	var name = ""

	var c = { data: pix, width: width, height: height, fn: fn, name: name }
	Data.PPM[fn] = c;
	Data.PPM_refs.push(fn)

	_log("PPM file '" + fn + "' processed.")
	
	return true;
}

/* END OF FILE */