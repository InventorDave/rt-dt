// "use strict";

Array.prototype.t ={ x: 0, y: 0, z: 0, w: 1 };
Array.prototype.m = []; // remember to populate on init()


Array.prototype.translation = function(x, y, z)	{
	
	var m = identity_matrix();
	
	var p = point(x || this.t.x, y || this.t.y, z || this.t.z)
	this.t = p
	
	m[0][3] = x;
	m[1][3] = y;
	m[2][3] = z;
	
	//debugger;
	
	return m_multiply(this, m)
}

Array.prototype.trans2 = function(x, y, z)	{
	
	var p = point(this.t.x || x, this.t.y || y, this.t.z || z);
	
	var m2 = identity_matrix()
	m2[0][3] = x;
	m2[1][3] = y;
	m2[2][3] = z;
	
	var res = m_multiply(this, m2);
	
	var p2 = multiply_matrix_by_tuple(res, p)
	this.t = p2;
	
	return res
}

function translation(x, y, z)	{
	
	var m = identity_matrix();
	
	m[0][3] = x;
	m[1][3] = y;
	m[2][3] = z;
	
	return m;
}


Array.prototype.scaling = function(x, y, z)	{
	
	var m = identity_matrix();
	
	m[0][0] = x;
	m[1][1] = y;
	m[2][2] = z;
	
	return m_multiply(this, m)
}

function scaling(x, y, z)	{
	
	var m = identity_matrix();
	
	m[0][0] = x;
	m[1][1] = y;
	m[2][2] = z;
	
	return m;
}


Array.prototype.rotation_x = function(r, dir)	{
	
	var m = identity_matrix()
	var cos = Math.cos(r)
	var sin = Math.sin(r)
	
	m[1][1] = cos
	m[1][2] = -sin
	m[2][1] = sin
	m[2][2] = cos
	
	if (dir)
		m = inverse(m)

	return m_multiply(this, m)	
}

function rotation_x(r, dir)	{ // r is in radians units, if dir is set to 1/true, reverse direction of rotation

	var m = identity_matrix()
	var cos = Math.cos(r)
	var sin = Math.sin(r)
	
	m[1][1] = cos
	m[1][2] = -sin
	m[2][1] = sin
	m[2][2] = cos
	
	if (dir)
		m = inverse(m)

	return m // returns rotation matrix, which must be multiplied with original point to get translated/rotated co-ords
}

Array.prototype.m_multiply = function(m)	{
	
	return m_multiply(this, m)
}


Array.prototype.rotation_y = function(r, dir)	{
	
	var m = identity_matrix()
	var cos = Math.cos(r)
	var sin = Math.sin(r)
	
	m[0][0] = cos
	m[0][2] = sin
	m[2][0] = -sin
	m[2][2] = cos
	
	if (dir)
		m = inverse(m)
	
	return m_multiply(this, m)
}

function rotation_y(r, dir)	{ // r is in radians units, if dir is set to 1/true, reverse direction of rotation

	var m = identity_matrix()
	var cos = Math.cos(r)
	var sin = Math.sin(r)
	
	m[0][0] = cos
	m[0][2] = sin
	m[2][0] = -sin
	m[2][2] = cos
	
	if (dir)
		m = inverse(m)
	
	return m // returns rotation matrix, which must be multiplied with original point to get translated/rotated co-ords
}


Array.prototype.rotation_z = function(r, dir)	{
	
	var m = identity_matrix()
	m[0][0] = Math.cos(r)
	m[0][1] = -Math.sin(r)
	m[1][0] = Math.sin(r)
	m[1][1] = Math.cos(r)
	
	if (dir)
		m = inverse(m)
	
	return m_multiply(this, m)	
}

function rotation_z(r, dir)	{ // r is in radians units, if dir is set to 1/true, reverse direction of rotation

	var m = identity_matrix()
	m[0][0] = Math.cos(r)
	m[0][1] = -Math.sin(r)
	m[1][0] = Math.sin(r)
	m[1][1] = Math.cos(r)
	
	if (dir)
		m = inverse(m)
	
	return m // returns rotation matrix, which must be multiplied with original point to get translated/rotated co-ords
}

Array.prototype.shearing = function(xy, xz, yx, yz, zx, zy)	{
	
	var m = identity_matrix()
	
	m[0][1] = xy;	m[0][2] = xz
	m[1][0] = yx;	m[1][2] = yz
	m[2][0] = zx;	m[2][1] = zy
	
	return m_multiply(this, m)
}


function shearing(xy, xz, yx, yz, zx, zy)	{ // p53. returns shearing matrix for shearing operation
	
	var m = identity_matrix()
	
	m[0][1] = xy;	m[0][2] = xz
	m[1][0] = yx;	m[1][2] = yz
	m[2][0] = zx;	m[2][1] = zy
	
	return m
}

function reflect_around_axis(p, axis)	{

	var _m;
	
	switch(axis)	{
		
		case 'x':
			_m = m().rotation_x(Math.PI)
			break;
			
		case 'y':
			_m = m().rotation_y(Math.PI)
			break;
		
		case 'z':
			_m = m().rotation_z(Math.PI)
			break;
			
		default:
			_m = m();
			break;
	}
	
	return multiply_matrix_by_tuple(_m, p)
}

function multiply_matrix_by_tuple(m, t)	{
	

	var t2 = point(0,0,0)
	var prod_arr = []
	
	for (var r = 0; r < 4; r++)	{
		
		var prod = m[r][0] * t.x
		prod    += m[r][1] * t.y
		prod    += m[r][2] * t.z
		prod    += m[r][3] * t.w
		
		prod_arr.push(prod)
	}
	
	t2.x = prod_arr[0]
	t2.y = prod_arr[1]
	t2.z = prod_arr[2]
	t2.w = prod_arr[3]
	
	return t2
}

var mul = multiply_matrix_by_tuple;
