function Pattern()	{
	
	this.texture_map = undefined
	this.colours = []
	this.type = "default"
	this.color_at = function (p)	{
		
		return this.algorithm(p)
	}
	
	this.algorithm = function(p)	{
		
		return colour(0.5,0.5,0.5)
	}
	
	this.transform = identity_matrix()
	
	this.color_at_object = function(obj, wp)	{ // p132
		
		var op = multiply_matrix_by_tuple(inverse(obj.transform), wp)
		var pp = multiply_matrix_by_tuple(inverse(this.transform), op)
		
		return this.color_at(pp)
	};
}

function my_pattern(texture_map)	{
	
	var tp = new Pattern()
	tp.texture_map = texture_map
	
	tp.algorithm = function(p)	{
		
		//console.log("test_pattern() colour = r: " + p.x + ", g: " + p.y + ", b: " + p.z + "\n")
		return pattern_at(this.texture_map, p)
	}
	
	return tp;
}

function pattern_at(texture_map, p)	{
	
	var uv = texture_map.uv_map(p)
	return uv_pattern_at(texture_map.uv_pattern, uv.u, uv.v)
	
}

function texture_map(uv_pattern, uv_map)	{
	
	return { uv_pattern: uv_pattern, uv_map: uv_map }
}

function cylindrical_map(p)	{

  //compute the azimuthal angle, same as with spherical_map()
  var theta = Math.atan2(p.x, p.y)
  var raw_u = theta / (2 * Math.PI)
  var u = 1 - (raw_u + 0.5)

  // let v go from 0 to 1 between whole units of y
  var v = p.y - Math.floor(p.y)

  return { u: u, v: v }
}

function planar_map(p)	{

  var u = p.x - Math.floor(p.x)
  var v = p.z - Math.floor(p.z)

  return { u: u, v: v }
}

function spherical_map(p)	{

	/*
	# compute the azimuthal angle
	# -π < theta <= π
	# angle increases clockwise as viewed from above,
	# which is opposite of what we want, but we'll fix it later.
	*/
  
	var theta = Math.atan2(p.x, p.z)

	/*
	# vec is the vector pointing from the sphere's origin (the world origin)
	# to the point, which will also happen to be exactly equal to the sphere's
	# radius.
	*/
	
	
	var vec = vector(p.x, p.y, p.z)
	var radius = magnitude(vec)

	/*
	# compute the polar angle
	# 0 <= phi <= π
	*/

	var phi = Math.acos(p.y / radius)

	//# -0.5 < raw_u <= 0.5
	var raw_u = theta / (2 * Math.PI)

	/*
	# 0 <= u < 1
	# here's also where we fix the direction of u. Subtract it from 1,
	# so that it increases counterclockwise as viewed from above.
	*/
	var u = 1 - (raw_u + 0.5)

	/*
	# we want v to be 0 at the south pole of the sphere,
	# and 1 at the north pole, so we have to "flip it over"
	# by subtracting it from 1.
	*/
	var v = 1 - phi / Math.PI

  return { u: u, v: v }
}

function uv_pattern_at(checkers, u, v)	{

	var u2 = Math.floor(u*checkers.width)
	var v2 = Math.floor(v*checkers.height)
	
	if((u2+v2) % 2 == 0)
		return checkers.color_a
	else
		return checkers.color_b
}

function uv_checkers(width, height, color_a, color_b)	{

	return { width: width, height: height, color_a: color_a, color_b: color_b }
}

function test_pattern()	{
	
	var tp = new Pattern()
	
	tp.algorithm = function(p)	{
		
		//console.log("test_pattern() colour = r: " + p.x + ", g: " + p.y + ", b: " + p.z + "\n")
		return colour(p.x, p.y, p.z)
	}
	
	return tp;
}

function gradient_pattern(c1, c2)	{
	
	if (c1 === undefined)
		c1 = colour(1,0,0)
	
	if (c2 === undefined)
		c2 = colour(0,1,0)
	
	var gp = new Pattern();
	gp.type = "gradient"
	
	gp.colours = [c1, c2]
	
	gp.algorithm = function(p)	{
		
		var dist = subtract(this.colours[1], this.colours[0])
		var fract = p.x - Math.floor(p.x)
		
		var res = multiplyInt(dist, fract)
		res = add(this.colours[0], res)
		
		return res;
	};
	
	return gp;
}

function ring_pattern(c1, c2)	{
	
	if (c1 === undefined)
		c1 = colour(1,0,0)
	
	if (c2 === undefined)
		c2 = colour(0,1,0)

	var rp = new Pattern()
	rp.type = "ring"
	
	rp.colours = [c1, c2]
	
	rp.algorithm = function(p)	{
		
		var res = colour(0,0,0)
		
		if (Math.floor(Math.sqrt(p.x*p.x+p.z*p.z)) % 2 == 0)
			res = this.colours[0]
		else
			res = this.colours[1]
		
		return res
	};
	
	return rp
}

function stripe_pattern(c1, c2, scale)	{

	if (c1 === undefined)
		c1 = colour(1,0,0)
	
	if (c2 === undefined)
		c2 = colour(0,1,0)
	
	if (scale == undefined)
		scale = 1
	

	var pt = new Pattern();
	pt.type = "stripe";
	pt.colours = [c1, c2]
	
	pt.algorithm = function(p)	{
		
		if (Math.floor(p.x) % (2) == 0)
			return this.colours[0]
		else
			return this.colours[1]
	};
	
	return pt;
}