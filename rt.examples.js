// HEXAGON
function hexagon_corner()	{

	var corner = sphere()
	corner.transform = m_multiply(translation(0,0,-1), scaling(0.25, 0.25, 0.25))
	corner.material.color = colour(1,0,0)
	return corner
}

function hexagon_edge()	{
	
	var edge = cylinder()
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
	
	var side = group()
	
	side.addChild(hexagon_corner())
	side.addChild(hexagon_edge())
	
	return side
}


function hexagon()	{
	
	var hex = group()
	
	for (var n = 0; n<6;n++)	{
		
		var side = hexagon_side()
		side.transform = rotation_y(n*Math.PI/3) // 2*pi / 1...6 ??
		//side.transform = rotation_y(radians(360/(n+1)))
		
		hex.addChild(side)
	}
	return hex
}

// w.objects.push(hexagon())

// TRIANGLES

function pyramid()	{
	
	var pyramid = group()
		
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