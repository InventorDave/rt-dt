/** TESTS **/

// test tan(r)
function testTan(r)	{
	// Math.tan(r) accepts angle in radians
	console.log("r: " + r + ", tan: " + Math.tan(r))
}

// var res = testTan(radians(angle_in_degrees))

function calcVector(p1, p2)	{
	
	var vec = createVector(p1, p2) // see further down
	
	var nvec = normalize(vec)
	
	console.log("vec / nvec")
	debugger;
}

function calcAngle2dVectorsTest()	{
	
	var _p1 = point(1,4,0), _p2 = point(2,3,0), _p3 = point(4,3,0), _p4 = point(5,4,0)
	
	var vec = createVector(_p1, _p2)
	var vec2 = createVector(_p3, _p4)
	
	var nvec = normalize(vec), nvec2 = normalize(vec2)
	console.log("Length of nvec: " + length(nvec))
	
	
	var _dot = dot(nvec, nvec2)
	
	var res2 = Math.acos(_dot)
	
	var res3 = deg(res2)
	
	console.log("Angle: " + res3)
	
}

/** END OF TESTS **/

function createVector(p1, p2)	{

	var vec = subtract(p1, p2)
	
	return vec;
}

function lengthP(p1, p2)	{
	
	var a, b, res
	
	if(p2.x > p1.x)
		a = p2.x - p1.x
	else
		a = p1.x - p2.x
	
	if(p2.y > p1.y)
		b = p2.y - p1.y
	else
		b = p1.y - p2.y
	
	a = a ** 2
	b = b ** 2
	
	res = Math.sqrt(a + b)
	
	console.log("Length: " + res)
}

function length(v) {

	var res = magnitude(v)
	//console.log("Length: " + res)
	return res
}

