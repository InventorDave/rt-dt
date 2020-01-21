function Pattern()	{
	
	this.colours = []
	this.type = "default"
	this.color_at = function (p)	{
		
		return this.algorithm(p)
	};
	
	this.algorithm = function(p)	{
		
		return colour(0.5,0.5,0.5)
	};
	
	this.transform = identity_matrix()
	
	this.color_at_object = function(obj, wp)	{ // p132
		
		var op = multiply_tuple_by_matrix(inverse(obj.transform), wp)
		var pp = multiply_tuple_by_matrix(inverse(this.transform), op)
		
		return this.color_at(pp)
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