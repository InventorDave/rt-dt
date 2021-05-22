function circle(r, mass, col)	{
	
	this.radius = r
	
	this.x = 0
	this.y = 0
	this.z = 0
	
	this.colour = col
	
	this.mass = mass
}
var r_orig = point(0,0,0)

var sun = new circle(10, 1, "yellow")
var earth = new circle(10, 1, "black")
var f2 = new circle(5, 1, "red")

var physics = {
	
	G: 1,
	c: 299792458 /* m/s */,
	sec: 9192631770 /* Hz, which is s{-1} */,
	metre: 1/c /* length light travels in 1/c seconds */,
	_24hrs: 60 * 60 * 24,
	E: 0,
	m: 0,
	
	E_MC2: function(m)	{ if(m) this.m = m; return this.E = this.m*(this.c**2); }
}


var barycentre;

function setPos(m, x, y)	{

	m.x = x
	m.y = y
	
	m.orig_x = x
	m.orig_y = y
}

function init(x1, y1, x2, y2)	{
	
	if(!x1&&!x2)	{
		
		x1 = 275
		y1 = 200
		
		x2 = x1 + 100
		y2 = y1
	}
	
	setPos(sun, x1, y1)
	setPos(earth, x2, y2)
	setPos(f2, 0, 0)
	
	r_orig.x = subtract(point(earth.x, earth.y, 0), point(sun.x, sun.y, 0)).x
	r_orig.y = subtract(point(earth.x, earth.y, 0), point(sun.x, sun.y, 0)).y	
}

function sim()	{
	
	prepCanvas()
	
	if(sun.x == 0 && earth.x == 0)	{
		
		sun.x = CANVAS_WIDTH /2
		sun.y = CANVAS_HEIGHT /2
	
		earth.x = sun.x * 1.5
		earth.y = sun.y
	}
	
	dtcircle(sun.x,sun.y,sun.radius,sun.colour, 1, true)
	dtcircle(earth.x,earth.y,earth.radius,earth.colour, 1, true)
	
	dtcircle(f2.x,f2.y,f2.radius,f2.colour, 1, true)
	
	barycentre = cb(sun, earth) // barycentre is vector from centre of larger mass (the sun)
	
}

	var init_step
	var step = init_step = 8
	var _sen
	
function orbit_old()	{

	
	//r := add(prev_F2, r_orig)
	// F2 = empty_focus(r_orig, r, v_tuple, m1)
	// remember to add(F2, r_orig)
	
	var v_tuple = vector(5, 5, 0)
	
	var r = subtract(point(earth.x, earth.y, 0), point(sun.x, sun.y, 0))
	//r.w = 1
	
	//debugger; 
	var F2 = empty_focus(r, v_tuple, sun.mass)
	
	//var modifier = subtract(point(1,1,1), F2)
	
	//var e_coords = point(earth.x, earth.y, 0)
	
	
	//could be p(r.x, r.y, o)...
	
	var new_location = add(point(r_orig.x, r_orig.y, 0), point(F2.x,F2.y,0)) //could be p(r.x, r.y, o)...
	
	new_location = add(new_location, point(sun.x,sun.y,0))
	
	
	//debugger;
	
	earth.x = new_location.x
	earth.y = new_location.y
	
	//console.log("\n\nEarth:")
	//console.log(earth)
	
	_sen = normalize(subtract(point(earth.x,earth.y,0),point(sun.x,sun.y,0)))
	console.log("Normal between Sun and Earth := ")
	console.log(_sen)
	
	sim()
	
	console.log("Calc'ed orbit(" + (init_step - step) + ").")
	
	step--;
	
	if(step == 0)	{
		
		console.log("Completed all " + init_step + " steps.");
		step = init_step;
	}
}

function orbit()	{
	
	var r_t = subtract(point(earth.orig_x,earth.orig_y,0), point(sun.x,sun.y,0))
	
	var rx = r_t.x
	var ry = r_t.y
	
	console.log("rx := " + rx + ", ry := " + ry)
	
	var vt = (1/100) * sun.mass
	// this suggests to get 0 < magnitude(e) < 1,
	// the total magnitude of the velocity vector needs to be
	// approx 1/100 of the central body's mass, assuming the
	// orbiting body's mass is ignored
	
	//  vx*vx + vy*vy == 1/10
	
	var vx = Math.sqrt(vt * ((1/3) + (1/30)))
	var vy = Math.sqrt(vt * ((2/3) - (1/30)))
	
	console.log("vx := " + vx)
	console.log("vy := " + vy)
	
	var u = 1*sun.mass
	console.log("u := " + u)
	
	var h = rx*vy - ry*vx
	console.log("h := " + h)
	
	var r = Math.sqrt(rx**2 + ry**2)
	console.log("r := " + r)
	
	
	var a = (u*r) / ( (2*u) - (r * ((vx*vx) + (vy*vy))) )
	//a = 100 / 2 - 1 (== 100 * 1/100)
	
	console.log("vx*vx + vy*vy := " + ((vx*vx) + (vy*vy)))
	//a = 100
	
	
	console.log("a := " + a)
	
	var ex = (rx/r) - ((h*vy)/u)
	var ey = (ry/r) + ((h*vx)/u)
	
	console.log("\nex := " + ex)
	console.log("ey := " + ey)
	console.log("magnitude(e) := " + magnitude(vector(ex, ey, 0)))
	
	var fx = ex * a * 2
	var fy = ey * a * 2
	
	console.log("fx := " + fx)
	console.log("fy := " + fy)
	
	var F2 = point(fx, fy, 0)
	
	var r_point = point(rx, ry, 0)
	
	var F2minusR = subtract(F2, r_point)
	console.log("F2 - r := { x:" + F2minusR.x + ", y: " + F2minusR.y + "}")
	
	
	var mF2minusR = magnitude(F2minusR)
	console.log("magnitude(F2 - r) := " + mF2minusR)
	
	var mR = magnitude(r_point)
	console.log("magnitude(r) := " + mR)
	
	var lhs =  mF2minusR + mR
	
	var rhs = 2 * a
	
	console.log("\n\nEquation test:")
	console.log("lhs == " + lhs)
	console.log("rhs == " + rhs)
	
	var tempPoint = add(point(sun.x,sun.y,0), point(F2.x-r_point.x, F2.y-r_point.y, 0))
	setPos(f2, tempPoint.x, tempPoint.y)
	
	sim()
	
}
var G = 1;

function semi_major_axis_length(r, v, m1)	{
	// "The semi-major axis length (a) can be calculated as: "
	// https://en.wikipedia.org/wiki/Elliptic_orbit
	
	m1 = 1
	
	var u = G * m1
	var r_l = magnitude(r)
	
	var a = (u*r_l) / ( (2*u) - (r_l / (v ** 2)) )
	
	return a
}

function empty_focus(r, v_tuple, m1)	{

		// e = eccentricity vector
		// h = angular momentum of orbiting body
		
		var r_ = r
		
		console.log("\n\nr_ :=")
		console.log(r_)
		
		var h = normalize(cross(r_, v_tuple))
		
		console.log("h :=")
		console.log(h)
		
		
		
		var u = G * m1
		
		console.log("u := " + u + "\n")
		
		/** Calcing eccentricity vector */
		
		console.log("magnitude(r_) := " + magnitude(r_))

		var lhs = multiplyScalar(r_, 1/magnitude(r_)) // normalize(r_);
		
		console.log("lhs : =");
		console.log(lhs)
		
		//console.log(lhs)
		
		var rhs_top = normalize((cross(v_tuple, h)))
		
		console.log("rhs_top :=")
		console.log(rhs_top)
		//console.log(rhs_b)
		
		var rhs = multiplyScalar(rhs_top, 1/u)
		console.log("rhs : =")
		console.log(rhs)
		
		
		//var e = normalize(subtract(rhs, lhs)) // going from:https://en.wikipedia.org/wiki/Eccentricity_vector	
					
					// i accidentally mixed up lhs and rhs, see https://en.wikipedia.org/wiki/Elliptic_orbit

		var e = subtract(lhs, rhs)
		//var e_r = normalize(e)
		
		console.log("\n\ne :=")
		console.log(e)
		//console.log(e)
		//console.log(e_r)
		
		//var v 
		var F2 = point(0,0,0)
		
		//var r = r_orig
		
		var F2 = multiplyScalar(e, 2 * semi_major_axis_length(r, magnitude(v_tuple), m1))
		
		console.log("\n\nF2:")
		console.log(F2)
		//console.log("\n\nr :=")
		//console.log(r)
		
		return F2
	
}

function cb(lm, sm)	{
	
	// taken from: https://en.wikipedia.org/wiki/Barycenter
	
	var a = magnitude(vector(sm.x-lm.x, sm.y-lm.y, 0))
	var r1 = a * (sm.mass / (lm.mass + sm.mass))
	
	var vec;
	
	if(magnitude(vector(sm.x,sm.y,0))>magnitude(vector(lm.x,lm.y,0)))
		vec = subtract(vector(sm.x,sm.y,0), vector(lm.x,lm.y,0))
	else
		vec = subtract(vector(lm.x,lm.y,0), vector(sm.x,sm.y,0))
		
	var bc = multiplyScalar(vec, r1/magnitude(vec))
	bc.a = a
	bc.r1 = r1
	
	return bc
	
	// note, the barycenter is a vector from the centre of
	// the larger-mass object.
	
}