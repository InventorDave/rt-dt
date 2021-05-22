/* RAY FUNCTIONS */

function _position(ray, t)	{
	
	return add(ray.origin, multiplyScalar(ray.direction, t));
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

var r_x_cache_s = point(0,0,0);
var _norm_s = vector(0,0,0);
var __shape__s;

var r_x_cache_l = point(0,0,0);
var _norm_l = vector(0,0,0);
var __shape__l;

function intersect(shape, ray_)	{
	
	if (!ist[shape.id])
		ist[shape.id] = inverse(shape.transform)

	var local_ray = transform(ray_, ist[shape.id]); // p119
	
	//debugger;
	
	var res = shape.local_intersect(local_ray);
	
	if(res.length>0)	{
		
		var t;
		
		if(res.length==2)
			if((res[0].t<0)||(res[0].t>res[1].t))
				t = res[1].t
			else
				t = res[0].t
		else
			t = res[0].t
			
		
		if(shape.type!="group")	{
		
			var w_origin = object_to_world(shape, _position(local_ray, t))

			if (Math.abs(magnitude(w_origin)) > Math.abs(magnitude(r_x_cache_l)))	{ // 
					
					r_x_cache_l = w_origin;
					_norm_l = normal_at(shape, _position(ray_, t))
					__shape__l = shape.id
			}
			/*
			else if (Math.abs(magnitude(w_origin)) < Math.abs(magnitude(r_x_cache_s)))	{
					
					r_x_cache_s = w_origin;
					_norm_s = normal_at(shape, _position(ray_, t))
					__shape__s = shape.id
			}*/
		}
	}

	return res;
	// NOTE: p120 says the local_intersect() method of a shape should set shape.saved_ray to the ray parameter.
	// Which one? local_ray, or the ray passed to intersect?? Apparently, local_ray....
}

/**
function world_to_object(s, p)	{
	
	if (s.parent)
		p = world_to_object(s.parent, p)

	if(!wto_ic[s.id])
		wto_ic[s.id] = inverse(s.transform)
	

	var res = mul(wto_ic[s.id], p)
	
	/*
	tick1++
	if((tick1 % 500) == 0)
		console.log("p = (" + p.x + ", " + p.y + ", " + p.z + ")")
	
	return res
}
*/

function object_to_world(sh, p)	{
		
	p = mul(sh.transform, p)
	
	if (sh.parent)
		p = object_to_world(sh.parent, p)
	
	return p;
}



function transform(r_in, m)	{ // p69
	
	var res =  multiply_matrix_by_tuple(m, r_in.origin);
	var res2 =  multiply_matrix_by_tuple(m, r_in.direction);
	
	var r = new ray(res, res2)

	return r;
}


function normal_at(s, world_point)	{
	
	var lp = world_to_object(s, world_point)
	var ln = s.local_normal_at(lp)
	s.lp = lp;
	
	if(s.material.normalMap)	{

		var width = s.material.normalMap.width;
		var height = s.material.normalMap.height;

/** 	// PREV METHOD
	
		//# compute the azimuthal angle
		//# -π < theta <= π
		//# angle increases clockwise as viewed from above,
		//# which is opposite of what we want, but we'll fix it later.
		
		var theta = Math.atan2(s.P.x, s.P.z)

		
		//# vec is the vector pointing from the sphere's origin (the world origin)
		//# to the point, which will also happen to be exactly equal to the sphere's
		//# radius.
		
		var vec = subtract(point(s.P.x, s.P.y, s.P.z), point(0,0,0))
		var radius = magnitude(vec)

		
		//# compute the polar angle
		//# 0 <= phi <= π
		
		var phi = Math.acos(s.P.y / radius)

		//# -0.5 < raw_u <= 0.5
		var raw_u = theta / (2 * Math.PI)

		
		//# 0 <= u < 1
		//# here's also where we fix the direction of u. Subtract it from 1,
		//# so that it increases counterclockwise as viewed from above.
		
		var u = 1 - (raw_u + 0.5)

		
		//# we want v to be 0 at the south pole of the sphere,
		//# and 1 at the north pole, so we have to "flip it over"
		//# by subtracting it from 1.
		
		var v = 1 - phi / Math.PI

		
		/*
		// http://viclw17.github.io/2019/04/12/raytracing-uv-mapping-and-texturing/
		
		var vec = subtract(point(s.P.x, s.P.y, s.P.z), point(0,0,0))
		var radius = magnitude(vec)
		
		var phi = Math.atan2(s.P.y, s.P.x);
		var theta = Math.asin(s.P.z / radius);
	
		var u = 1 - (phi + Math.PI) / (2 * Math.PI);
		var v = (theta + Math.PI / 2) / Math.PI;
	
*/
		
		u = s.material.u || 0.5
		v = 1 - s.material.v || 0.5
		
		var x = u * (width - 1)
		var y = v * (height - 1)
		
		
		var ppos = (3 * (width * Math.round(y) + Math.round(x)));
		
		//debugger; 
		
		var _n = normalize(vector(s.material.normalMap.data[ppos], s.material.normalMap.data[ppos+1], s.material.normalMap.data[ppos+2]))
		
		_n = multiplyScalar(subtractInt(_n, 0.5), 2) // // Expand the range-compressed vector to [-1, 1] from [0,1]((*255).round())
													// https://developer.download.nvidia.com/CgTutorial/cg_tutorial_chapter08.html
		
		ln = subtract(ln, _n)	
	}
	
	return normal_to_world(s, ln)
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


function reflect(_in, normal)	{
	
	
	var res = multiplyScalar(normal, 2);
	res = multiplyScalar(res, dot(_in, normal));
	res = subtract(_in, res);
	
	return res
	
	//return subtract(_in, multiplyScalar(normal, 2 * dot(_in, normal)))
}

function invert(v)	{
	
	v.x = -v.x;
	v.y = -v.y;
	v.z = -v.z;
	v.w = -v.w;
	
	return v;
}