function Pattern()	{
	
	this.TextureMap = undefined
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
		
		return this.algorithm(pp)//this.color_at(pp)
	};
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

// USAGE var tm = TextureMap(checkers_pattern(2, 2, colour(1,1,1), colour(0.4,0.4,0.4)), spherical_map)
// shape.material.pattern = my_pattern(tm)
function my_pattern(TextureMap, owner)	{
	
	var tp = new Pattern()
	tp.type = "TextureMap"
	
	tp.TextureMap = TextureMap
	
	tp.owner = owner
	
	tp.algorithm = function(p)	{
		
		var uv = this.TextureMap.uv_map(p, this.owner)
		var col = this.TextureMap.uv_pattern.uv_pattern_at(uv.u, uv.v)
		
		//console.log("r: " + col.x + ", g: " + col.y + ", b: " + col.z)
		return col;
	}
	
	return tp;
}


function TextureMap(uv_pattern, uv_map, s)	{
	
	return { uv_pattern: uv_pattern, uv_map: uv_map, owner: s }
	// eg uv_pattern = checkers_pattern(...) || align_check_pattern(...)
}

function cylindrical_map(p)	{

  //compute the azimuthal angle, same as with spherical_map()
  var theta = Math.atan2(p.y, p.x)
  var raw_u = theta / (2 * Math.PI)
  var u = 1 - (raw_u + 0.5)

  // let v go from 0 to 1 between whole units of y
  var v = p.y - Math.floor(p.y)

  return { u: u, v: v }
}

function planar_map(p)	{

	/*
	var u = p.x - Math.floor(p.x)
	var v = p.z - Math.floor(p.z)
	*/
	
	var u, v
	
	if (p.x<0)
		u = Math.abs(Math.floor(p.x)) + p.x
	else
		u = p.x - Math.floor(p.x)
	
	
	if (p.z<0)
		v = Math.abs(Math.floor(p.z)) + p.z
	else
		v = p.z - Math.floor(p.z)
	
	
	return { u: u, v: v }
}

function spherical_map(p, owner)	{

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

	if((owner) && (owner.id))	{
		
		owner.material.u = u
		owner.material.v = v
		
		//console.log("Set u, v.")
	}
  return { u: u, v: v }
}

function checkers_pattern(width, height, color_a, color_b)	{

	return { uv_pattern_at: checkers_uv_pattern_at, width: width, height: height, color_a: color_a, color_b: color_b }
}

function checkers_uv_pattern_at(u, v)	{

	var u2 = Math.floor(u*this.width)
	var v2 = Math.floor(v*this.height)
	
	if((u2+v2) % 2 == 0)
		return this.color_a
	else
		return this.color_b
}

function align_check_pattern(main, ul, ur, bl, br)	{

		return { uv_pattern_at: align_check_uv_pattern_at, main: main, ul: ul, ur: ur, bl: bl, br: br }
		//uv_align_check(main, ul, ur, bl, br)
}

function align_check_uv_pattern_at(u, v)	{
	
	// remember: v=0 at the bottom, v=1 at the top
	if (v > 0.8)	{
		
		if (u < 0.2)
			return this.ul
		if (u > 0.8)
			return this.ur
	}
	else if (v < 0.2)	{
    
		if (u < 0.2)
			return this.bl
		if (u > 0.8)
			return this.br
	}

	return this.main
}


function CubeMap(c1, c2, c3, c4, c5, c6, c7, c8)	{
	
	var cm = new Pattern()
	
	cm.type = "CubeMap"
		
	
	cm.TextureMap = {"left": align_check_pattern(c2, c5, c1, c6, c3), "front": align_check_pattern(c5, c1, c2, c3, c4), "right": align_check_pattern(c1, c2, c7, c4, c8), "back": align_check_pattern(c4, c7, c5, c8, c6), "up": align_check_pattern(c3, c5, c7, c1, c2), "down": align_check_pattern(c7, c3, c4, c6, c8)}
	
	cm.face_from_point = function(p)	{
	
		var abs_x = Math.abs(p.x)
		var abs_y = Math.abs(p.y)
		var abs_z = Math.abs(p.z)
		var coord = Math.max(abs_x, abs_y, abs_z)

		if(coord == p.x)
			return "right"

		if(coord == -p.x)
			return "left"
	  
		if(coord == p.y)
			return "up"
		
		if(coord == -p.y)
			return "down"

		if(coord == p.z)
			return "front"

		//the only option remaining!
		return "back"
	};
	
	cm.cube_uv = {"front": cube_uv_front, "back": cube_uv_back, "left": cube_uv_left, "right": cube_uv_right, "up": cube_uv_up, "down": cube_uv_down}
	
	cm.algorithm = function(p) {
		
		var face = this.face_from_point(p)
		// align_check_pattern(main, ul, ur, bl, br)
		var uv = this.cube_uv[face](p)
		
		var color = this.TextureMap[face].uv_pattern_at(uv.u, uv.v)
		return color
	}
	
	return cm
}

function cube_uv_front(p)	{
	
	var u = ((p.x + 1) % 2.0) / 2.0
	var v = ((p.y + 1) % 2.0) / 2.0

	return {u: u, v: v}
}

function cube_uv_back(p)	{
	
	var u = ((1 - p.x) % 2.0) / 2.0
	var v = ((p.y + 1) % 2.0) / 2.0

	return {u: u, v: v}
}

function cube_uv_up(p)	{
	
	var u = ((p.x + 1) % 2.0) / 2.0
	var v = ((1 - p.z) % 2.0) / 2.0

	return {u: u, v: v}
}

function cube_uv_down(p)	{
	
	var u = ((p.x + 1) % 2.0) / 2.0
	var v = ((p.z + 1) % 2.0) / 2.0

	return {u: u, v: v}
}

function cube_uv_left(p)	{
	
	var u = ((p.z + 1) % 2.0) / 2.0
	var v = ((p.y + 1) % 2.0) / 2.0

	return {u: u, v: v}
}

function cube_uv_right(p)	{
	
	var u = ((1 - p.z) % 2.0) / 2.0
	var v = ((p.y + 1) % 2.0) / 2.0

	return {u: u, v: v}
}


function SkyBox(left, right, front, back, top, bottom)	{
	
	var sb = new Pattern()
	
	sb.type = "SkyBox"
		
	sb.TextureMap = {"left": skybox_pattern(left.data, left.width, left.height), "front": skybox_pattern(front.data, front.width, front.height), "right": skybox_pattern(right.data, right.width, right.height), "back": skybox_pattern(back.data, back.width, back.height), "top": skybox_pattern(top.data, top.width, top.height), "bottom": skybox_pattern(bottom.data, bottom.width, bottom.height)}
	
	sb.face_from_point = function(p)	{
	
		var abs_x = Math.abs(p.x)
		var abs_y = Math.abs(p.y)
		var abs_z = Math.abs(p.z)
		var coord = Math.max(abs_x, abs_y, abs_z)

		if(coord == p.x)
			return "right"

		if(coord == -p.x)
			return "left"
	  
		if(coord == p.y)
			return "top"
		
		if(coord == -p.y)
			return "bottom"

		if(coord == p.z)
			return "front"

		//the only option remaining!
		return "back"
	};
	
	sb.skybox_uv = {"front": cube_uv_front, "back": cube_uv_back, "left": cube_uv_left, "right": cube_uv_right, "top": cube_uv_up, "bottom": cube_uv_down}
	
	sb.algorithm = function(p) {
		
		var face = this.face_from_point(p)
		// align_check_pattern(main, ul, ur, bl, br)
		var uv = this.skybox_uv[face](p)
		
		var color = this.TextureMap[face].uv_pattern_at(uv.u, uv.v)
		return color
	}
	
	return sb
}

function skybox_pattern(data, width, height)	{

		return { uv_pattern_at: skybox_uv_pattern_at, data: data, width: width, height: height, pixel_at: skybox_pixel_at }
		
}

function skybox_uv_pattern_at(u, v)	{
	
	//flip v over so it matches the image layout, with y at the top
	var v = 1 - v

	var x = u * (this.width - 1)
	var y = v * (this.height- 1)

	//be sure and round x and y to the nearest whole number
	return this.pixel_at(Math.round(x), Math.round(y))
}

function skybox_pixel_at(x, y)	{
	
	//4 slots per pixel, r, g, b, alpha
	// 3 for [] implementation
	var ppos = 3 * (this.width * y + x);
  
	return colour(this.data[ppos]/255, this.data[ppos+1]/255, this.data[ppos+2]/255)
}


function image_pattern(c)	{
	
	return { uv_pattern_at: image_uv_pattern_at, c: c, pixel_at: image_pattern_pixel_at }
}

function image_uv_pattern_at(u, v)	{
	
	//flip v over so it matches the image layout, with y at the top
	var v = 1 - v

	var x = u * (this.c.width - 1)
	var y = v * (this.c.height - 1)

	//be sure and round x and y to the nearest whole number
	
	var col = this.pixel_at(Math.round(x), Math.round(y))
	//console.log("r: " + col.x + ", g: " + col.y + ", b: " + col.z)
	return col
}

function image_pattern_pixel_at(x, y)	{
	
	var width = this.c.width;
	var height = this.c.height;
 
	//4 slots per pixel, r, g, b, alpha
	// 3 for [] implementation
	var ppos = 3 * (width * y + x);
  
	var col = colour(this.c.data[ppos]/255, this.c.data[ppos+1]/255, this.c.data[ppos+2]/255)
	//var col = colour(pix[ppos], pix[ppos+1], pix[ppos+2])
	
	//console.log("r: " + col.x + ", g: " + col.y + ", b: " + col.z)
	
	return col;
}


function bgImage_uv_pattern_at(u, v)	{

	var x = Math.round(u * (Data.PPM["bgImage"].width - 1))
	var y = Math.round(v * (Data.PPM["bgImage"].height - 1))
	
	var ppos = 3 * (Data.PPM["bgImage"].width * y + x)
	
	var d = Data.PPM["bgImage"].data
	
	return colour(d[ppos]/255, d[ppos+1]/255, d[ppos+2]/255)
}
