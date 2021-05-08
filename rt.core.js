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
		throw new Error ("Input to core::magnitude() not a tuple (VECTOR)!");
	
	return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z + vector.w * vector.w);
}

function normalize(v)	{
	
	var mv
	
	if(!(mv = magnitude(v)))
		return v
	
	//var mv 
	return new tuple(	v.x / mv,
						v.y / mv,
						v.z / mv,
						0);
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

var UID = 1
function GetUID()	{

		return UID++
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
	
	comps.point = _position(r, comps.t)//add(r.origin, multiplyScalar(r.direction, comps.t))
	
	comps.eyev  = negate(r.direction);
	comps.normalv = normal_at(comps.object, comps.point);
	comps.reflectv = reflect(r.direction, comps.normalv)
	
	if (dot(comps.normalv, comps.eyev) < 0)	{
		
		comps.inside = true;
		comps.normalv = invert(comps.normalv);
	}
	
	comps.over_point = add(comps.point, multiplyScalar(comps.normalv, EPSILON)) // p115
	
	//debugger;
	
	comps.under_point = subtract(comps.point, multiplyScalar(comps.normalv, EPSILON)) // p155
	
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
			else	{
				comps.n1 = containers[containers.length-1].material.refractive_index
			
				//console.log("Line 148");
			}
			
		
		// if containers includes i.object then
		var indexOfObj;
		if ((indexOfObj = containers.indexOf(curr_i.object)) != -1)
			containers.splice(indexOfObj, 1)
		else
			containers.push(curr_i.object)
		
		if (curr_i == i)	{
			
			if (containers.length == 0)
				comps.n2 = 1.0
			else	{
				
				comps.n2 = containers[containers.length-1].material.refractive_index
				
				//console.log("Line 167")
			}
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

function convHexClr(hexCodeStr)	{
	
	var r = hexCodeStr.substring(1,3)
	var g = hexCodeStr.substring(3,5)
	var b = hexCodeStr.substring(5,7)
	
	r = parseInt(r, 16)
	g = parseInt(g, 16)
	b = parseInt(b, 16)
	
	//return { r: r/255, g: g/255, b: b/255 }
	return colour(r/255, g/255, b/255)
}