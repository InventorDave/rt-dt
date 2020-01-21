function world()	{
	
	this.light;
	this.objects = [];
	
}

function world_to_object(s, p)	{
	
	if (s.parent)
		p = world_to_object(s.parent, p)
	
	return mul(s.transform, p)
}

function normal_to_world(s, n)	{
	
	n = mul(transpose(inverse(s.transform)), n)
	n.w = 0
	n = normalize(n)
	
	if (s.parent)
		n = normal_to_world(s.parent, n)
	
	return n
}

function default_world()	{
	
	var w = new world();
	
	var light = new point_light(point(-10,10,-10), colour(1,1,1));
	
	var s1 = new sphere();
	s1.material.color.x = 0.8;
	s1.material.color.y = 1.0;
	s1.material.color.z = 0.6;
	s1.material.diffuse = 0.7;
	s1.material.specular = 0.2;
	
	var s2 = new sphere();
	s2.transform = scaling(0.5, 0.5, 0.5);
	
	w.light = light;
	w.objects.push(s1);
	w.objects.push(s2);
	
	return w;
}

function intersect_world(w, r)	{

	var oi = [];
	
	for (var i = 0; i < w.objects.length; i++)
		oi[i] = intersect(w.objects[i], r);

	//oi contains multiple [], each containing all the intersections for an object in the world
	
	// merge all oi, then sort using order(), from rt.ray.js (try intersections(), from the same TU....)
	
	var oi2 = [];
	for (var i = 0; i < oi.length; i++)
		for (var j = 0; j < oi[i].length; j++)
			oi2.push(oi[i][j]);
	
	var res = order(oi2);
	
	return res;
}

function view_transform(from, to, up)	{
	
	var forward = normalize(subtract(to, from));
	var upn = normalize(up);
	var left = cross(forward, upn);
	var true_up = cross(left, forward);
	
	var orientation = initArray(4,4);
	orientation = [	[left.x,		left.y,		left.z,		0],
					[true_up.x,		true_up.y,	true_up.z,	0],
					[-forward.x,	-forward.y,	-forward.z, 0],
					[0,				0,			0,			1]];
					
	var res = m_multiply(orientation, translation(-from.x, -from.y, -from.z));
	
	return res;
}

function camera(hsize, vsize, fov)	{
	
	this.hsize = hsize;
	this.vsize = vsize;
	this.fov = fov;
	this.transform = identity_matrix();
	
	this.half_view = Math.tan(this.fov/2);
	this.aspect = hsize / vsize;
	
	
	if (this.aspect >= 1)	{
		
		this.half_width = this.half_view;
		this.half_height = this.half_view / this.aspect;
	}
	else	{
		
		this.half_width = this.half_view / this.aspect;
		this.half_height = this.half_view;
	}
	
	this.pixel_size = (this.half_width * 2)/this.hsize;
	
	this.ray = undefined;
	
	this.ray_for_pixel = function(px, py)	{
		
		var xoffset = (px + 0.5) * this.pixel_size;
		var yoffset = (py + 0.5) * this.pixel_size;
		
		var world_x = this.half_width - xoffset;
		var world_y = this.half_height - yoffset;
		
		var input1 = inverse(this.transform);
		var input2 = point(world_x, world_y, -1);
		
		//debugger;
		
		var pixel = multiply_tuple_by_matrix(input1, input2);
		var origin = multiply_tuple_by_matrix(inverse(this.transform), point(0,0,0));
		
		if (origin == undefined)
			console.log("Origin Undefined!\n");
		
		var direction = normalize(subtract(pixel, origin));
		
		if ((!(origin instanceof tuple)) || (!(direction instanceof tuple)))	{
			
			console.log("Error!\n");
			debugger;
		}
		
		var r = new ray(origin, direction);
		
		//console.log("ray(" + origin.x + "/" + direction.x + ")\n");
		
		return r

	}
}
	