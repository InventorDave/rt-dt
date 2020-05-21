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


var ist = [];
var indice = -1;
var i_no = 0, i_yes = 0;

function intersect(shape, ray)	{
	
	var sh = shape
	/*
	while(sh.parent)
		sh = sh.parent
	*/
	
	if (sh.id != indice)	{
		//i_no++;
		indice = sh.id;
	}
	//else
		//i_yes++;
	
	if (!ist[indice])
		ist[indice] = inverse(sh.transform)



	var local_ray = transform(ray, ist[indice]); // p119
	
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
	
	var res =  multiply_matrix_by_tuple(m, r_in.origin);
	var res2 =  multiply_matrix_by_tuple(m, r_in.direction);
	
	var r = new ray(res, res2)

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

function reflect(_in, normal)	{
	
	
	var res = multiplyInt(normal, 2);
	res = multiplyInt(res, dot(_in, normal));
	res = subtract(_in, res);
	
	return res
	
	//return subtract(_in, multiplyInt(normal, 2 * dot(_in, normal)))
}

function invert(v)	{
	
	v.x = -v.x;
	v.y = -v.y;
	v.z = -v.z;
	v.w = -v.w;
	
	return v;
}