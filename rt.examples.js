// HEXAGON
function hexagon_corner()	{

	var corner = sphere("corner_" + GetUID())
	corner.transform = m_multiply(translation(0,0,-1), scaling(0.25, 0.25, 0.25))
	corner.material.color = colour(1,0,0)
	return corner
}

function hexagon_edge()	{
	
	var edge = cylinder("edge_" + GetUID())
	edge.material.color = colour(0,1,1)
	edge.min = 0
	edge.max = 1
	
	/*
	var et = scaling(0.25,1,0.25)
	et = m_multiply(et, rotation_z(-Math.PI/2))
	et = m_multiply(et, rotation_y(-Math.PI/6))
	et = m_multiply(et, translation(0,0,-1))
	*/
	
	var et = m_multiply(translation(0,0,-1), m_multiply(rotation_y(-Math.PI/6), m_multiply(rotation_z(-Math.PI/2), scaling(0.25,1,0.25))))
	
	edge.transform = et;
	return edge
}

function hexagon_side()	{
	
	var side = group("side_" + GetUID())
	
	side.addChild(hexagon_corner())
	side.addChild(hexagon_edge())
	
	return side
}


function hexagon()	{
	
	var hex = group("hex")
	
	for (var n = 0; n<6;n++)	{
		
		var side = hexagon_side()
		side.transform = rotation_y(n*Math.PI/3) // 2*pi / 1...6 ??
		//side.transform = rotation_y(radians(360/(n+1)))
		
		hex.addChild(side)
	}
	return hex
}


// PYRAMID
function pyramid()	{
	
	var pyramid = group("pyramid")
		
	var side = triangle(point(0,0,0), point(-1, -1, -1), point(1, -1, -1)) // front
	side.material.color = colour(1,0,0)
	pyramid.addChild(side)
	
	var side2 = triangle(point(0,0,0), point(-1,-1,-1), point(-1, -1, 1)) // side
	side2.material.color = colour(0,1,0)
	pyramid.addChild(side2)
	
	var side3 = triangle(point(0,0,0), point(1, -1, -1), point(1, -1, 1)) // side
	side3.material.color = colour(0,0,1)
	pyramid.addChild(side3)
	
	var side4 = triangle(point(0,0,0), point(-1, -1, 1), point(1, -1, -1)) // back
	side4.material.color = colour(1,1,0)
	pyramid.addChild(side4)
	
	return pyramid
}

function glass_test()	{
	
	prepCanvas()

	Data.c.setCTransform(view_transform(
										point(0,0,-20),
										point(0,0,0),
										vector(0,1,0)
										)
						);
						
	var l = new point_light(point(-10, 10, -10), colour(0.5,0.5,1)) 
	
	var s1 = glass_sphere()
	s1.transform = m().scaling(2,2,2)
	s1.material.color = colour(1, 0, 0)
	
	var s2 = sphere()
	s2.transform = m().translation(0,0,-2.5)
	s2.material.color = colour(0.5, 0.5, 1)
	
	var o = group()
	o.addChild(s1, s2)
	
	renderImage(l, o, 3)
}

addFunction("Refraction test", "glass_test")


// Sample Scene 1
function scene1()	{
	
	prepCanvas()
	
	Data.c.setCTransform(view_transform(
										point(10,0,-20),
										point(0,0,0),
										vector(0,1,0)
										)
						);
						
	var l = new point_light(point(-10, 10, -10), colour(0.5,0.5,1)) 
	
	var s = sphere()
	s.material.color = colour(255/255,69/255,0/255)
	s.transform = m().scaling(2,2,2)
	
	var cb = cube()
	cb.material.color = colour(135/255,206/255,250/255)
	cb.transform = m().translation(4, 0, -2)
	
	var o = group()
	o.addChild(s)
	o.addChild(cb)
	
	//o.divide(1)
	
	//debugger;
	Data.o = o // add group of shapes
	Data.l = l // add light
	
	
	renderImage();
	
}

addFunction("Scene 1", "scene1")

function scene1b()	{
	
	prepCanvas()
	
	Data.c.setCTransform(view_transform(
										point(10,0,-20),
										point(0,0,0),
										vector(0,1,0)
										)
						);
						
	var l = new point_light(point(10, 10, 10), colour(0.5,0.5,1)) 
	
	var s = sphere()
	s.material.color = colour(255/255,69/255,0/255)
	s.transform = m().scaling(2,2,2)
	
	var cb = cube()
	cb.material.color = colour(135/255,206/255,250/255)
	cb.transform = m().translation(4, 0, -2)
	
	var o = group()
	o.addChild(s)
	o.addChild(cb)
	
	//o.divide(1)
	
	//debugger;
	Data.o = o
	Data.l = l
	
	
	renderImage();
	
}

addFunction("Scene 1b", "scene1b")

// Sample Scene 2
function scene2()	{
	
	prepCanvas()
	
	Data.c.setCTransform(view_transform(
										point(200,200,1000),
										point(75,100,0),
										vector(0,1,0)
										)
						);
						
	var l = new point_light(point(/*-1000*/400, /*600*/300, 500), colour(1,1,1)) 
	
	var s1 = sphere("1")
	s1.material.color = colour(0.0,0.0,1.0)
	s1.transform = m().translation(90,320,-100).scaling(50,50,50)
	s1.material.ambient = 0.5
	s1.material.diffuse = 0.7
	s1.material.specular = 0.0
	
	var s2 = sphere("2")
	s2.transform = m().translation(210,270,-300).scaling(50,50,50)
	s2.material.color = colour(0,1,0)
	s2.material.ambient = 0.5
	s2.material.diffuse = 0.3
	s2.material.specular = 0.5
	
	var s3 = sphere("3")
	s3.transform = m().translation(290,170,-150).scaling(60,60,60)
	s3.material.color = colour(1,0,0)
	s3.material.ambient = 0.2
	s3.material.diffuse = 0.7
	s3.material.specular = 0.8
	
	var s4 = sphere("4")
	s4.transform = m().translation(290,230,-150).scaling(60,60,60)
	s4.material.color = colour(1,1,1)
	s4.material.ambient = 0.3
	s4.material.diffuse = 0.7
	s4.material.specular = 0.8
	
	var s5 = sphere("5")
	s5.transform = m().translation(290,170,-0.0).scaling(20,20,20)
	s5.material.color = colour(0.5,0.5,0)
	s5.material.ambient = 0.2
	s5.material.diffuse = 0.7
	s5.material.specular = 0.8
	
	var s6 = sphere("6")
	s6.transform = m().translation(140,220,-400).scaling(50,50,50)
	s6.material.color = colour(1,0.8,0)
	s6.material.ambient = 0.2
	s6.material.diffuse = 0.8
	s6.material.specular = 0.5	
	
	var s7 = sphere("7")
	s7.transform = m().translation(110,130,-200).scaling(75,75,75)
	s7.material.color = colour(1,0.5,0)
	s7.material.ambient = 0.01
	s7.material.diffuse = 0.06
	s7.material.specular = 0.9

	var s8 = sphere("8")
	s8.transform = m().translation(180,180,-800).scaling(300,300,300)
	s8.material.color = colour(1,0.5,0)
	s8.material.ambient = 0.1
	s8.material.diffuse = 0.5
	s8.material.specular = 0.3	


	var o = group()
	o.addChild(s1, s2, s3, s4, s5, s6, s7, s8)

	Data.o = o
	Data.l = l
	
	
	//log("Select Render->Render!.")
	renderImage()
}

addFunction("Scene 2", "scene2")
// Sample Scene 2
function scene3()	{
	
	prepCanvas()
	
	Data.c.setCTransform(view_transform(
										point(0,0,4),
										point(0,0,0),
										vector(0,1,0)
										)
						);	

	var l = new point_light(point(-10,10,-10), colour(1, 1, 1))
	
	var s = sphere()
	//s.transform = m().scaling(2,2,2)
	s.material.color = colour(0,0,1)
	
	var o = group()
	o.addChild(s)
	
	Data.o = o
	Data.l = l
	
	//log("Select Render->Render!.")
	renderImage()
}

addFunction("Scene 3", "scene3")


function cm_cube()	{
	
	prepCanvas()
	
	var l = new point_light(point(-10, 0, -10), colour(1,1,1)) 
	Data.c.setCTransform(view_transform(point(0,10,-30), point(0,0,0), vector(0,1,0)));
	
	var c1 = colour(1,0,0), c2 = colour(1,1,0), c3 = colour(1,0.5,0), c4 = colour(0,1,0), c5 = colour(0,1,1), c6 = colour(0,0,1), c7 = colour(1,0,1), c8 = colour(1,1,1)
	
	var cb = cube()
	
	
	var ip = [];
	ip["left"] = image_pattern(Data.SkyBox["left"]); // { uv_pattern_at: image_uv_pattern_at, c: c, pixel_at: image_pattern_pixel_at } c == SkyBox.left
	ip["right"] = image_pattern(Data.SkyBox["right"]);
	ip["up"] = image_pattern(Data.SkyBox["up"]);
	ip["down"] = image_pattern(Data.SkyBox["down"]);
	ip["front"] = image_pattern(Data.SkyBox["front"]);
	ip["back"] = image_pattern(Data.SkyBox["back"]);

	var tm = {left: ip["left"], right: ip["right"], up: ip["up"], down: ip["down"], front: ip["front"], back: ip["back"]}
	
	var cube_maps = {left: cube_uv_left, right: cube_uv_right, up: cube_uv_up, down: cube_uv_down, front: cube_uv_front, back: cube_uv_back}
	
	console.log("cm_cube(): before TextureMap() call")
	//debugger;

	var tm2 = TextureMap(tm, cube_maps, cb)
	
	console.log("cm_cube(): after tm2")
	//debugger;
	
	cb.material.pattern = my_pattern( tm2, cb )
	console.log("cm_cube(): after pattern assign")
	
	//debugger;
	
	// cb.material.pattern = CubeMap(cb, c1,c2,c3,c4,c5,c6,c7,c8)
	
	cb.transform = m().scaling(2,2,2).rotation_z(Math.PI / 4, 1).rotation_y(Math.PI / 4, 1)
	
	var o = group()
	o.addChild(cb)
	
	Data.o = o
	Data.l = l
	
	renderImage()
}

addFunction("Cube", "cm_cube")


function sceneBump()	{
	
	prepCanvas()
	
	Data.c = new Camera(WIDTH, HEIGHT, Math.PI/4)
	Data.c.setCTransform(view_transform(
										point(0,0,-18),
										point(0,0,0),
										vector(0,1,0)
										)
						);
						
	var l = new point_light(point(-5, 10, -30), colour(1,1,1)) 
	
	var s = sphere()
	s.material.color = colour(255/255,69/255,0/255)
	//s.transform = m().scaling(4,4,4).rotation_z(Math.PI/2)
	s.transform = m().scaling(4,4,4).rotation_y(Math.PI).rotation_x((Math.PI/2) * 0.7)
	//s.material.transform = m().rotation_x(Math.PI/2).rotation_y((Math.PI) * 0.7)
	
	
	s.material.normalMap = Data.PPM["normalMap"]
	if(!s.material.normalMap)	{
		
		var b = alert("Please set a Normal Map first! (Hint: 'normalMap.ppm' is available in our PPM archive.)")
		var a = 1+2;
		return false
	}	
	
	s.material.specular = 0.0
	
	var c = Data.PPM[Data.Maps["earth"]];
	if(!c)	{
		
		var b = alert("Please set an 'earth' map first! (Hint: 'earth.ppm' is available in our PPM archive.)")
		var a = 1+2;
		return false
	}
	var tm = TextureMap(image_pattern(c), spherical_map, s)
	s.material.pattern = my_pattern( tm, s )
	
	var o = group()
	o.addChild(s)
	
	//o.divide(1)
	
	//debugger;
	Data.o = o
	Data.l = l
	
	
	renderImage();
	
}

addFunction("Bump Scene", "sceneBump")


function earth()	{
	
	prepCanvas()
	
	var l = new point_light(point(-10, 10, -50), colour(1,1,1)) 
	Data.c.setCTransform(view_transform(point(0,0,-20), point(0,0,0), vector(0,1,0)));
	
	var c = Data.PPM[Data.Maps["earth"]];
	if(!c)	{
		
		var b = alert("Please set an 'earth' map first! (Hint: 'earth.ppm' is available in our PPM archive.)")
		var a =2+3;
		return false
	}
	
	var s = sphere()
	
	var tm = TextureMap(image_pattern(c), spherical_map, s)

	debugger;
	
	//var tm = TextureMap(checkers_pattern(8, 4, colour(0,1,0),colour(0,0,1)), spherical_map)
	
	s.transform = m().scaling(2,2,2).rotation_y(Math.PI).rotation_x((Math.PI/2) * 0.7)
	s.material.pattern = my_pattern( tm, s )
	
	debugger;
	
	s.material.diffuse = 0.9
	s.material.specular = 0.1
	s.material.shininess = 10
	s.material.ambient = 0.9
 
	var o = group()
	o.addChild(s)
	
	renderImage(l, o)	
}

addFunction("Earth", "earth")


function endGame()	{
	
	var l = new point_light(point(-10, 10, -50), colour(1,1,1)) 
	Data.c.setCTransform(view_transform(point(0,0,-20), point(0,0,0), vector(0,1,0)));
	
	var skyBox = getSkyBoxObject()
	if (!verify_SkyBoxObj(skyBox))	{
		
		var b = alert("SkyBox obj is not populated! Please fix.")
		return false
	}
	
	var cb = cube()
	cb.transform = m().scaling(60,60,60).rotation_y(Math.PI/4, 1).rotation_z(Math.PI/4, 1)
	cb.material = SkyBoxMaterial(SkyBox(skyBox.left, skyBox.right, skyBox.front, skyBox.back, skyBox.top, skyBox.bottom))
	
	scene(cb)
	
	renderImage(l)
}

addFunction("Test 1", "endGame")


function mySkyBox()	{
	
	var l = new point_light(point(-10, 10, -50), colour(1,1,1)) 
	Data.c = new Camera(WIDTH, HEIGHT, (Math.PI/4))
	Data.c.setCTransform(view_transform(point(0,0,60), point(0,-60,-60), vector(0,1,0)));
	

	
	var skyBox = getSkyBoxObject()
	if (!verify_SkyBoxObj(skyBox))	{
		
		var b = alert("SkyBox obj is not populated! Please fix.")
		return false
	}
	
	var cb = cube()
	cb.transform = m().scaling(60,60,60)
	cb.material = SkyBoxMaterial(SkyBox(skyBox.left, skyBox.right, skyBox.front, skyBox.back, skyBox.top, skyBox.bottom))
	
	var s = glass_sphere()
	s.transform = m().translation(0, -55, -50).scaling(5,5,5)
	
	var o = group()
	o.addChild(cb, s)
	
	Data.o = o
	Data.l = l
	
	renderImage()
}

addFunction("Sky Box Test", "mySkyBox")


function system()	{
	
	prepCanvas()
	
	var l = new point_light(point(-40, 50, -100), colour(1,1,1)) 
	Data.c.setCTransform(view_transform(point(0,0,-75), point(0,0,0), vector(0,1,0)));
	

	
	var c;
	
	var e = sphere("earth")
	e.transform = identity_matrix().translation(0,0,-40).scaling(2,2,2)
	
	if (!(c = Data.PPM[Data.Maps["earth"]]))	{
		
		var b = alert("Please set an 'earth' map first! (Hint: 'earth.ppm' is available in our PPM archive.)")
		return false
	}
	
	tm = TextureMap(image_pattern(c), spherical_map, e)
	e.material.pattern = my_pattern( tm, e )
	e.material.pattern.transform = identity_matrix().rotation_y(Math.PI)
	e.material.normalMap = Data.PPM["normalMap"]
	e.material.specular = 0.0
	
	var m = sphere("m")
	m.transform = identity_matrix().translation(2,2,-55).scaling(0.7,0.7,0.7)
	
	if (!(c = Data.PPM[Data.Maps["moon"]]))	{
		
		var b = alert("Please set a 'moon' map first! (Hint: '2k_moon.ppm' is available in our PPM archive.)")
		return false
	}
	tm = TextureMap(image_pattern(c), spherical_map)
	m.material.pattern = my_pattern( tm )
	m.material.pattern.transform = identity_matrix().rotation_y(Math.PI)
	m.material.specular = 0.0
 
	var o = group()
	
	o.addChild(m,e)
	renderImage(l,o)
	
	saveScene("system", Data.c, l, o, Data.PPM["bgImage2.ppm"])	
}

addFunction("Earth & Moon", "system")


addFunction("mandelbrot", "mandelbrot")