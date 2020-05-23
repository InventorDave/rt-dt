/** TESTS **/

function calcVector(p1, p2)	{
	
	if(!p1)
		p1 = point(0,0,0)
	
	if(!p2)
		p2 = p1
	
	var vec = createVector(p1, p2) // see further down
	var nvec = normalize(vec)
	
	console.log("Inspect vec / nvec")
	debugger;
}

function calcAngle2dVectorsTest()	{
	
	var _p1 = point(1,4,0), _p2 = point(2,3,0), _p3 = point(4,3,0), _p4 = point(5,4,0)
	
	var vec = createVector(_p1, _p2)
	var vec2 = createVector(_p3, _p4)
	
	console.log("Angle: " + calcAngleVectors(vec, vec2))
}

function perpendicular_test()	{
	
	var _p1 = point(1,4,0), _p2 = point(2,3,0), _p3 = point(4,3,0), _p4 = point(5,4,0)
	var L1 = new Line2d(_p1,_p2)
	var L2 = new Line2d(_p3,_p4)
	
	console.log("L1 & L2 perpendicular? : " + L1.isPerpendicularTo(L2))
	
}
/** END OF TESTS **/

/** VECTORS **/

function createVector(from, to)	{

	return subtract(to, from)
}

function calcAngleVectors(vec, vec2, d_or_r)	{
	
	/*
	var nvec = normalize(vec), nvec2 = normalize(vec2)	
	var _dot = dot(nvec, nvec2)
	var res2 = Math.acos(_dot)
	
	return deg(res2)
	*/
	
	var res = Math.acos(dot(normalize(vec), normalize(vec2)))
	
	if(!d_or_r) // boolean: true for radians
		return deg(res)
		
	return res
	
}

/** END OF VECTORS */

/** LINE */

function Line2d(p1, p2, id2)	{
	
	this.id = GetUID()
	this.id2 = id2 || 0
	
	this.p1 = p1
	this.p2 = p2
	
	this.p1.z = 0
	this.p2.z = 0
	
	this.v = createVector(this.p1, this.p2)
	this.length = magnitude(this.v)
	
	this.gradDividend = 0
	this.gradDivisor = 0
	
	this.Gradient = function()	{ // for 2d lines (where z-component of both p1 & p2 is 0)
		
		if(!this.gradDivisor)	{
				
			var sign_u = 1, sign_a = 1, du, da
			
			if(this.p2.y>this.p1.y)
				sign_u = -1
			if(this.p2.x<this.p1.x)
				sign_a = -1
			
			du = Math.abs(this.p2.y - this.p1.y)
			da = Math.abs(this.p2.x - this.p1.x)
			
			du *= sign_u
			da *= sign_a
			
			this.gradDividend = du
			this.gradDivisor  = da
		}
		
		return this.gradDividend/this.gradDivisor
	}
	
	this.isParallelTo = function(L2, fuzzy)	{
		
		if(!(L2 instanceof Line2d))	{
			
			throw new Error("Must pass an object of type 'Line2d' to Line2d.isParallelTo(...)! Line2d object " + this.id2 + ", " + this.id)
		}
		
		if(!fuzzy)
		return this.Gradient()===L2.Gradient()?true:false;
	
		return equal(this.Gradient(),L2.Gradient())?true:false;
	}
	
	this.isPerpendicularTo = function(L2, fuzzy)	{
		
		var grad = this.Gradient() * L2.Gradient()
		
		if(!fuzzy)
			return grad===-1?true:false;
		
		return equal(grad,-1)?true:false;
	}
	
	this.midPoint = function()	{
		
		return point((0.5*(this.p1.x+this.p2.x)), (0.5*(this.p1.y+this.p2.y)), 0)
	}
}

function isParallel(L1, L2, fuzzy)	{
	
	if(!fuzzy)
		return L1.Gradient()===L2.Gradient()?true:false;
	
	return equal(L1.Gradient(),L2.Gradient())?true:false;
}

function isPerpendicular(L1, L2)	{
	
	var grad = L1.Gradient() * L2.Gradient()
	
	if(!fuzzy)
		return grad===-1?true:false;
	
	return equal(grad,-1)?true:false;
}

/** END OF LINE */

/** ETC **/
function dist2d(p1, p2)	{ // (obsolete) distance between 2d points, can use 'new Line(p1,p2).length' for either 2d or 3d points/lines
	
	var a = Math.abs(p1.x - p2.x) ** 2
	var b = Math.abs(p1.y - p2.y) ** 2
	
	return Math.sqrt(a + b)
}
