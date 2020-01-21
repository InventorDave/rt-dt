/* RAY FUNCTIONS */

function _position(ray, t)	{
	
	return add(ray.origin, multiplyInt(ray.direction, t));
}

function intersections()	{

	var xs = [];
	
	for (var i = 0; i < arguments.length; i++)
		xs.push(arguments[i]);
	
	xs = order(xs);
	return xs;
}

function intersect(shape, ray)	{
	
	var local_ray = transform(ray, inverse(shape.transform)); // p119
	
	//debugger;
	
	return shape.local_intersect(local_ray);
	
	// NOTE: p120 says the local_intersect() method of a shape should set shape.saved_ray to the ray parameter.
	// Which one? local_ray, or the ray passed to intersect?? Apparently, local_ray....
}


function order(arr)	{
	
	return arr.sort(function(a,b)	{ return a.t - b.t })
}
function order_old(arr)	{
	
	if (arr.length <= 1) 
		return arr;
	
	else	{

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = arr.pop();
		var length = arr.length;

		for(var i = 0; i < length; i++)
			if (arr[i].t <= pivot.t)
				left.push(arr[i]);
			else
				right.push(arr[i]);

		return newArray.concat(order(left), pivot, order(right));
	}
}

/* 
function intersection(s, t)	{ // In "rt.p+e.js"
	
	this.t = t;
	this.object = s;
}
*/
function hit(xs)	{ // xs = [] of intersection objects. Return the lowest nonnegative one (hint: [].t)

	if (xs.length == 0)
		return undefined;
	
	xs = order(xs);
	
	var flag = false;
	var i = 0;
	var x;
	
	while(!flag)	{
		
		if (xs[i].t >= 0)
			if (!x || (x.t > xs[i].t))
				x = xs[i];
		
		i++;
		
		if (i>=xs.length)
			flag=true;
	}
	
	return x;
}


function transform(r_in, m)	{ // p69
	
	var r = copyObj(r_in);

	var res =  multiply_tuple_by_matrix(m, r.origin);
	var res2 =  multiply_tuple_by_matrix(m, r.direction);
	
	r.origin = res;
	r.direction = res2;
	
	return r;
}

function normal_at(s, world_point)	{
	
	/* // pre-p200
	var obj_point = mul(inverse(shape.transform), world_point);
	var obj_normal = shape.local_normal_at(obj_point)
	
	var world_normal = mul(transpose(inverse(shape.transform)), obj_normal);
	
	world_normal.w = 0;
	
	return normalize(world_normal)*/
	
	var lp = world_to_object(s, world_point)
	var ln = s.local_normal_at(lp)
	
	return normal_to_world(s, ln)
}

function reflected_color(w, comps, remaining)	{
	
	if (remaining <= 0)
		return colour(0,0,0)
		
	if (comps.object.material.reflective == 0)
		return colour(0,0,0)
	
	
	var rr = new ray(comps.over_point, comps.reflectv)
	var col = color_at(w, rr, remaining - 1)
	
	return multiplyInt(col, comps.object.material.reflective)
}

function reflect(_in, normal)	{
	
	/*
	var res = multiplyInt(normal, 2);
	res = multiplyInt(res, dot(_in, normal));
	res = subtract(_in, res);
	*/
	
	var res = 2 * dot(_in, normal);
	res = multiplyInt(normal, res);
	res = subtract(_in, res);
	
	res = sn_round(res);
	
	return res;
}

function invert(v)	{
	
	var v2 = new tuple(v.x, v.y, v.z, v.w);
	
	v2.x = -v2.x;
	v2.y = -v2.y;
	v2.z = -v2.z;
	v2.w = -v2.w;
	
	return v2;
}