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

// w.objects.push(hexagon())


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


// Sample Scene 1
function scene1()	{
	
	prepCanvas()
	
	ofData.c.setCTransform(view_transform(
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
	ofData.o = o
	ofData.l = l
	
	
	renderImage();
	
}


// Sample Scene 2
function scene2()	{
	
	prepCanvas()
	
	ofData.c.setCTransform(view_transform(
										point(200,200,1000),
										point(0,50,0),
										vector(0,1,0)
										)
						);
						
	var l = new point_light(point(-1000, 600, 500), colour(1,1,1)) 
	
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
	o.addChild(s1)
	o.addChild(s2)
	o.addChild(s3)
	o.addChild(s4)
	o.addChild(s5)
	o.addChild(s6)
	o.addChild(s7)
	o.addChild(s8)

	

	ofData.o = o
	ofData.l = l
	
	
	console.log("Select Render->Render!.")
	
}

// Sample Scene 2
function scene3()	{
	
	prepCanvas()
	
	ofData.c.setCTransform(view_transform(
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
	
	ofData.o = o
	ofData.l = l
	
	console.log("Select Render->Render!.")
}