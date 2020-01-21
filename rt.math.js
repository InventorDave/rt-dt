/* Math */

var EPSILON = 0.00001;

function equal(a, b)	{ // checks 2 numbers are equal
	
	if (Math.abs(a - b) < EPSILON)
		return true;
	
	return false;
}

function sn_round(t)	{ // round the x, y, and z entries of a tuple down to 0 when < EPSILON.
	
	if (equal(t.x,0))
		t.x = 0;
	
	if (equal(t.y,0))
		t.y = 0;
	
	if (equal(t.z,0))
		t.z = 0;
	
	return t;
}

function cmp(a, b)	{ // compares 2 tuples for equality
	
	if (!(a instanceof tuple) || !(b instanceof tuple))
		throw Error("Input to math::cmp() not 2 tuples!");
		
	if(equal(a.x,b.x)&&equal(a.y,b.y)&&equal(a.z,b.z)&&(a.w==b.w))
		return true;
	
	return false;
}

function add(a, b)	{	// add 2 tuples together

	if (!(a instanceof tuple) || !(b instanceof tuple))
		throw Error("Input to math::add() not 2 tuples!");
	
	return new tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

function subtract(a, b)	{	// subtract 2 tuples, a - b

	if (!(a instanceof tuple) || !(b instanceof tuple))
		throw Error("Input to math::subtract() not 2 tuples!");
	
	return new tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

function multiply(a, b)	{	// multiply 2 tuples

	
	if (!(a instanceof tuple) || !(b instanceof tuple))
		throw Error("Input to math::multiply() not 2 tuples!");
	
	return new tuple(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
}

function multiplyInt(_tuple, int)	{
	
	var t = new tuple(_tuple.x, _tuple.y, _tuple.z, _tuple.w);
	
	t.x = t.x * int;
	t.y = t.y * int;
	t.z = t.z * int;
	t.w = t.w * int;
	
	return t;
}

function divide(a, b)	{	// divide 2 tuples, a / b

	if (!(a instanceof tuple) || !(b instanceof tuple))
		throw Error("Input to math::divide() not 2 tuples!");
	
	return new tuple(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
}

function negate(t)	{
	
	var res = new tuple(0,0,0,0);
	
	res.x = -t.x;
	res.y = -t.y;
	res.z = -t.z;
	res.w = -t.w;
	
	return res;
}

function radians(deg)	{
	
	return (deg/180) * Math.PI;
}