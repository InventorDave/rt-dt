var A = B = point(0,0,-20);
var M = m();


function set(A)	{
	
	_log("A - x:" + A.x + ", y:" + A.y + ", z:" + A.z)
	
	Data.c.setCTransform(view_transform(A, point(0,0,0)));
}

function setScene()	{
	
			//Data.bgImage = bgImage;
		//_log("Set bgImage to " + Data.bgImage + ".")
		
		/*
		Data.SkyBox.left = Data.PPM["left.jpg"]
		Data.SkyBox.right = Data.PPM["right.jpg"]
		Data.SkyBox.up = Data.PPM["up.jpg"]
		Data.SkyBox.down = Data.PPM["down.jpg"]
		Data.SkyBox.front = Data.PPM["front.jpg"]
		Data.SkyBox.back = Data.PPM["back.jpg"]
		*/
		
		Data.SkyBox.left = Data.PPM["earthmap1k.jpg"]
		Data.SkyBox.right = Data.PPM["earthmap1k.jpg"]
		Data.SkyBox.up = Data.PPM["earthmap1k.jpg"]
		Data.SkyBox.down = Data.PPM["earthmap1k.jpg"]
		Data.SkyBox.front = Data.PPM["front.jpg"]
		Data.SkyBox.back = Data.PPM["earthmap1k.jpg"]
		
		//_log("SkyBox walls have been set.")
		
	
	var l = new point_light(point(-10,10,-10), colour(1,1,1))
	lights(l)
	
	var cb = cube()
	cb.material.color = colour(135/255,206/255,250/255)
	cb.transform = m().translation(0, 0, 0)
	
	var skyBox = getSkyBoxObject()
	if (!verify_SkyBoxObj(skyBox))	{
		
		alert("SkyBox obj is not populated! Please fix.")
		return false
	}
	
	cb.material = SkyBoxMaterial(SkyBox(skyBox.left, skyBox.right, skyBox.front, skyBox.back, skyBox.up, skyBox.down))
	
	
	
	
	
	var s = sphere()
	s.transform = m().translation(2,2,2).scaling(2,2,2)
	s.material.color = convHexClr("88ff55")
	s.material.transparency = 0.7
	s.material.refractive_index = 1.5
	
	scene(cb, s)
	
	Data.c.setCTransform(view_transform(
									A = B,
									point(0,0,0) /**,
									vector(0,1,0) */
									)
	);
						
	//M = m().rotation_y(radians(10))// .rotation_z(radians(10))
	M.t = B
	
	//M.m = identity_matrix()
	
	renderImage()
	
	//debugger;
}

function genFrames()	{

	Data.frame = 0;
	
	for (var i = 0; i < 361; i+=10)	{
		
		var i2 = radians(i)
		
		M = m().rotation_x(i2).rotation_y(i2)//.rotation_z(i2)

		A = multiply_matrix_by_tuple(M, B)
		
		A = round_t(A)
		
		//_log("A - x:" + A.x + ", y:" + A.y + ", z:" + A.z)
		
		Data.c.setCTransform(view_transform(A, point(0,0,0)));
		
		//debugger;
		
		renderImageSync()
		
		saveImage()
	}
}

var to_a, _f = 0;

function animate()	{
	
	
	loadToCanvasFromPPM("frame" + _f)
	
	_f++
	
	if (_f < Data.frame)	{
		to_a = setTimeout(animate, 100)
		return
	}
	
	_f = 0
	
	console.log("Animation complete.")
}

function wait(s)	{
	
	var start = Date.now()
	var end;
	
	while( ( ((end = Date.now()) - start ) / 1000) < s)
		;

	return;
	//var time_sec = (end - start) / 1000
}

Data.frame = 0;
function saveImage(fn)	{
	
	var img = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	var width = img.width
	var height = img.height
	var pix = img.data;
	
	if(!fn)
		console.log("Saved frame (" + String(Data.frame+1) + " of " + Math.floor(360/10) + ")")
	else
		console.log("Saved image as " + fn)
		
	convertToPPM(pix, width, height, fn || String("frame" + String(Data.frame++)));
}

function checkShape(obj)	{
	
	return (obj == "cylinder" || obj == "triangle" || obj == "plane" || obj == "cube" || obj == "cone" || obj == "group" || obj == "sphere" || obj == "fir_branch" || false)
}
