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


function intersect(shape, ray)	{
	
	var sh = shape
	
	if (!ist[sh.id])
		ist[sh.id] = inverse(sh.transform)

	var local_ray = transform(ray, ist[sh.id]); // p119
	
	//debugger;
	
	return shape.local_intersect(local_ray);
	
	// NOTE: p120 says the local_intersect() method of a shape should set shape.saved_ray to the ray parameter.
	// Which one? local_ray, or the ray passed to intersect?? Apparently, local_ray....
}

function transform(r_in, m)	{ // p69
	
	var res =  multiply_matrix_by_tuple(m, r_in.origin);
	var res2 =  multiply_matrix_by_tuple(m, r_in.direction);
	
	var r = new ray(res, res2)

	return r;
}

var db_f2 = 0
function normal_at(s, world_point)	{
	
	var lp = world_to_object(s, world_point)
	var ln = s.local_normal_at(lp)
	
	if(s.material.normalMap)	{
		if(!db_f2)	{
			
			
			console.log("normalMap detected.")
		}
		
		db_f2++

		var width = s.material.normalMap.width;
		var height = s.material.normalMap.height;

		
		
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
		var vec = subtract(point(s.P.x, s.P.y, s.P.z), point(0,0,0))
		var radius = magnitude(vec)
		
		var phi = Math.atan2(s.P.y, s.P.x);
		var theta = Math.asin(s.P.z / radius);
	
		var u = 1 - (phi + Math.PI) / (2 * Math.PI);
		var v = (theta + Math.PI / 2) / Math.PI;
	
		*/
		
		var x = u * (width - 1)
		var y = v * (height - 1)

		var ppos = (3 * (width * Math.round(y) + Math.round(x)));
		
		/*
		//	The 4 adjacent points in a uniform grid: A, B, C, D
//
//	   B
//	   |
//	C--0--A
//	   |
//	   D
//
//	
	//	The desired normal: N = cross(A,B) + cross(B,C) + cross(C,D) + cross(D,A), (then normalize)//	//	
	  
		
		var A2 = vector(s.material.normalMap.data[ppos+3], s.material.normalMap.data[ppos+4], s.material.normalMap.data[ppos+5])
		
		var C2 = vector(s.material.normalMap.data[ppos-3], s.material.normalMap.data[ppos-2], s.material.normalMap.data[ppos-1])
		
		var B2 = vector(s.material.normalMap.data[ppos-(width*3)], s.material.normalMap.data[ppos-(width*3)+1], s.material.normalMap.data[ppos-(width*3)+2])
		
		var D2 = vector(s.material.normalMap.data[ppos+(width*3)], s.material.normalMap.data[ppos+(width*3)+1], s.material.normalMap.data[ppos+(width*3)+2])
		
		var A = normalize(A2)
		var B = normalize(B2)
		var C = normalize(C2)
		var D = normalize(D2)
		
		var N = normalize(add(cross(A2,B2), add(cross(B2,C2), add(cross(C2,D2),cross(D2,A2)))))
		
		if((db_f2 % 2000)==0)	{
			
			console.log("N=(x:"+ N.x + ", y:"+N.y+", z:"+N.z+")")
			console.log("ppos="+ppos)
			console.log("A=(x:"+ A2.x + ", y:"+A2.y+", z:"+A2.z+")") 
			console.log("B=(x:"+ B2.x + ", y:"+B2.y+", z:"+B2.z+")") 
			console.log("C=(x:"+ C2.x + ", y:"+C2.y+", z:"+C2.z+")") 
			
			//D = D2
			console.log("D=(x:"+ D2.x + ", y:"+D2.y+", z:"+D2.z+")") 
		}
		*/
		
		
		var _n = vector(s.material.normalMap.data[ppos], s.material.normalMap.data[ppos+1], s.material.normalMap.data[ppos+2])
		if((db_f2 % 200)==0)	{
			
			console.log("_n=(x:" + _n.x + ", y:" + _n.y + ", z:" + _n.z + ")")
		}
		
		ln = add(ln, _n)	
	}
	
	//console.log("x: "+ln.x+", y: "+ln.y+", z: "+ln.z)
	
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