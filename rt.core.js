function copyObj(obj)	{
	
	return JSON.parse(JSON.stringify(obj));
}

/* */

var POINT = 1;
var VECTOR = 0;
var COLOR = 2, COLOUR = 2;

/*
	point
	vector
	tuple
*/

function tuple( x, y, z, type)	{
	
	this.x = x;
	this.y = y;
	this.z = z;
	
	this.w = type;
}

function point(x, y, z)	{
	
	return new tuple(x, y, z, POINT);
}

function vector(x, y, z)	{
	
	return new tuple(x, y, z, VECTOR);
}

/* */

function magnitude(vector)	{ // calc the magnitude of an input vector (a tuple with tuple.w == VECTOR)

	if (!(vector instanceof tuple))
		throw Error ("Input to core::magnitude() not a tuple (VECTOR)!");
	
	return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z + vector.w * vector.w);
}

function normalize(v)	{
	
	return new tuple(	v.x / magnitude(v),
						v.y / magnitude(v),
						v.z / magnitude(v),
						v.w / magnitude(v));
}

function dot(a, b)	{
	
	return	a.x * b.x +
			a.y * b.y +
			a.z * b.z +
			a.w * b.w;
}

function cross(a, b)	{ // THE ORDER OF THE OPERANDS MATTERS

	return vector(	a.y * b.z - a.z * b.y,
					a.z * b.x - a.x * b.z,
					a.x * b.y - a.y * b.x);
}

/* */
function compsds()	{
	
	this.t = 0;
	this.object = undefined;
	this.point = undefined;
	this.over_point = undefined;
	this.under_point = undefined;
	this.eyev = undefined;
	this.normalv = undefined;
	this.reflectv = undefined;
	
	this.n1 = undefined;
	this.n2 = undefined;
	
	this.inside = false;
	
	this.casts_shadow = true;

}



function prepare_computations(i, r, xs)	{
	
	var comps = new compsds();
	
	comps.t = i.t;
	comps.object = i.object;
	
	comps.point = _position(r, comps.t); // HERE, 2ND  CALL TO PREPARE_COMPUTATIONS() ON CALL STACK
	
	//console.log("core.js::prepare_computations()::=comps.point.x:"+comps.point.x+", point.y:"+comps.point.y+", point.z:"+comps.point.z+"\n")
	
	comps.eyev  = invert(r.direction);
	comps.normalv = normal_at(comps.object, comps.point);
	comps.reflectv = reflect(r.direction, comps.normalv)
	
	if (dot(comps.normalv, comps.eyev) < 0)	{
		
		comps.inside = true;
		comps.normalv = invert(comps.normalv);
	}
	
	comps.over_point = add(comps.point, multiplyInt(comps.normalv, EPSILON)) // p115
	comps.under_point = subtract(comps.point, multiplyInt(comps.normalv, EPSILON)) // p155
	
	// p152
	/*
	if (xs == undefined || xs.length == 0)
		xs = [i]
	*/
	var containers = []
	for (var a = 0; a < xs.length; a++)	{
		
		var curr_i = xs[a];

		if (curr_i == i)
			if (containers.length == 0)
				comps.n1 = 1.0
			else
				comps.n1 = containers[containers.length-1].material.refractive_index
		
		// if containers includes i.object then
		var indexOfObj;
		if ((indexOfObj = containers.indexOf(curr_i.object)) != -1)
			containers.splice(indexOfObj, 1)
		else
			containers.push(curr_i.object)
		
		if (curr_i == i)	{
			
			if (containers.length == 0)
				comps.n2 = 1.0
			else
				comps.n2 = containers[containers.length-1].material.refractive_index
		
			break;
		}
	}

	return comps
}

function removeNullEntries(arr)	{
	
	var res = []
	for (var a = 0; a < arr.length; a++)
		if (arr[a] != null)
			res.push(arr[a])
	
	return res
}

function removeNullEntries2(arr)	{
	
	var e;
	while((e = arr.indexOf(null)) !== -1)
		arr.splice(e, 1)
	
	return arr
}