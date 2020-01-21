/* RAY, PROJECTILE & ENVIRONMENT */

function projectile(id, position, velocity)	{
	
	this.id = id;
	this.position = position; // POINT
	this.velocity = velocity; // VECTOR
}

function environment(gravity, wind)	{
	
	this.gravity = gravity; // VECTOR
	this.wind    = wind;    // VECTOR
}

function ray(origin, direction)	{
	
	this.origin = origin;
	this.direction = direction;
}

function cone(id2)	{
	
	var c = new Shape("cone", id2)
	
	c.min = -Infinity
	c.max = Infinity
	c.closed = false
	
	c.local_intersect = function(r)	{ // r is a local_ray
		
		var xs = []
		var t;
		var a = (r.direction.x ** 2) - (r.direction.y ** 2) + (r.direction.z ** 2)
		var b = (2 * r.origin.x * r.direction.x) - (2 * r.origin.y * r.direction.y) + (2 * r.origin.z * r.direction.z)
		var c = (r.origin.x ** 2) - (r.origin.y ** 2) + (r.origin.z ** 2)
		
		
		if ((Math.abs(a) < EPSILON) && (Math.abs(b)< EPSILON))
			return []
		
		if ((Math.abs(a) < EPSILON))	{
			
			t = -c/(b*2)
			xs.push(new intersection(this, t))
			return xs
		}
		else	{
			
			var disc = (b*b) - (4 * a * c)
			
			// ray does not intersect with cone
			if (disc < 0)
				return []
			
			var t0 = (-b - Math.sqrt(disc)) / (2*a)
			var t1 = (-b + Math.sqrt(disc)) / (2*a)
			
			var temp;
			if (t0 > t1)	{
			
				temp = t1;
				t1 = t0;
				t0 = temp;
			}
			
			var y0 = r.origin.y + (t0 * r.direction.y)
			if(this.min<y0 && this.max>y0)
				xs.push(new intersection(this,t0))
			
			var y1 = r.origin.y + (t1 * r.direction.y)
			if(this.min<y1 && this.max>y1)
				xs.push(new intersection(this,t1))
		}
		
		
		// inline intersect_caps(...) with inline check_cap(...)
		if(this.closed && (Math.abs(r.direction.y) >= EPSILON))	{
			
			t = (this.min - r.origin.y) / r.direction.y	
			var x = r.origin.x + t * r.direction.x
			var z = r.origin.z + t * r.direction.z
			
			if ((x**2 + z**2) <= (this.min**2)) // added (min)**2
				xs.push(new intersection(this,t))
			
			t = (this.max - r.origin.y) / r.direction.y
			x = r.origin.x + t * r.direction.x
			z = r.origin.z + t * r.direction.z
			
			if ((x**2 + z**2) <= (this.max**2))
				xs.push(new intersection(this,t))
		
		}
		
		xs = order(xs)
		
		return xs
		
	};
	
	c.local_normal_at = function(p)	{
		
		var dist = p.x**2 + p.z**2
		
		//if ((dist < 1) && (p.y >= (this.max - EPSILON)))
		if ((dist < this.max**2) && (p.y >= (this.max - EPSILON)))
			return vector(0,1,0)
		
		//if ((dist < 1) && (p.y <= (this.min + EPSILON)))
		if ((dist < this.min**2) && (p.y <= (this.min + EPSILON)))
			return vector(0,-1,0)
		
		var y = Math.sqrt((p.x**2) + (p.z**2))
		
		if (p.y > 0)
			y = -y
		
		return vector(p.x, y, p.z)
	};
	
	return c
}


function cylinder(id2)	{
	
	var c = new Shape("cylinder", id2)
	
	c.min = -Infinity
	c.max = Infinity
	c.closed = false
	
	c.local_intersect = function(r)	{
		
		var xs = []
		var a = r.direction.x ** 2 + r.direction.z ** 2
		
		if (!(Math.abs(a) < EPSILON))	{
			
			var b = (2 * r.origin.x * r.direction.x) + (2 * r.origin.z  * r.direction.z)
			var c = (r.origin.x ** 2) + (r.origin.z ** 2) - 1
			
			var disc = (b*b) - (4 * a * c)
			
			// ray does not intersect with cylinder
			if (disc < 0)
				return []
			
			var t0 = (-b - Math.sqrt(disc)) / (2*a)
			var t1 = (-b + Math.sqrt(disc)) / (2*a)
			
			var temp;
			if (t0 > t1)	{
			
				temp = t1;
				t1 = t0;
				t0 = temp;
			}
			
			
			
			var y0 = r.origin.y + (t0 * r.direction.y)
			if(this.min<y0 && this.max>y0)
				xs.push(new intersection(this,t0))
			
			var y1 = r.origin.y + (t1 * r.direction.y)
			if(this.min<y1 && this.max>y1)
				xs.push(new intersection(this,t1))
		}
		
		if (this.closed && (Math.abs(r.direction.y) >= EPSILON))	{
			
			var t = (this.min - r.origin.y) / r.direction.y
			var x = r.origin.x + t * r.direction.x
			var z = r.origin.z + t * r.direction.z
			
			if ((x**2 + z**2) <= 1)
				xs.push(new intersection(this,t))
			
			t = (this.max - r.origin.y) / r.direction.y
			x = r.origin.x + t * r.direction.x
			z = r.origin.z + t * r.direction.z
			
			if ((x**2 + z**2) <= 1)
				xs.push(new intersection(this,t))
		}
		
		xs = order(xs)
		
		return xs
		
	};
	
	c.local_normal_at = function(p)	{
		
		var dist = p.x**2 + p.z**2
		
		if ((dist < 1) && (p.y >= (this.max - EPSILON)))
			return vector(0,1,0)
		
		if ((dist < 1) && (p.y <= (this.min + EPSILON)))
			return vector(0,-1,0)
		
		return vector(p.x, 0, p.z)
	};
	
	return c
}
function sphere(id2)	{
	
	var s = new Shape("sphere", id2)
	
	s.local_intersect = function(local_ray)	{
		
		var xs = [];
	
		// The vector from the  (unit) sphere's centre, to the ray origin
		// remember: the sphere is centered at the world origin
		var shape_2_ray = subtract(local_ray.origin, point(0,0,0));
	
		var a = dot(local_ray.direction, local_ray.direction);
		var b = 2 * dot(local_ray.direction, shape_2_ray);
		var c = dot(shape_2_ray, shape_2_ray) - 1;
	
		var discriminant = (b * b) -  (4 * a * c);
	
		if (discriminant < 0)
			return [];
	
		xs[0] = new intersection(this, (-b - Math.sqrt(discriminant)) / (2 * a));
		xs[1] = new intersection(this, (-b + Math.sqrt(discriminant)) / (2 * a));
	
		xs = order(xs);
	
		return xs;
	};
	
	s.local_normal_at = function(p)	{
		
		return normalize(subtract(p, point(0,0,0)))
	};
	
	return s
}

function check_axis(origin, direction, tmin_or_tmax)	{
	
	var t;
	
	if (tmin_or_tmax == "min")	{
		
		t_num = (-1 - origin)
		
		if (Math.abs(direction) >= EPSILON)
			t = t_num / direction
		else
			t = t_num * Infinity
	}
	else	{ // "max"
	
		t_num = (1 - origin)
		
		if (Math.abs(direction) >= EPSILON)
			t = t_num / direction
		else
			t = t_num * Infinity

	}
	return t;
}

function max()	{
	
	var val = -Infinity;
	for (var a = 0; a < arguments.length; a++)
		if (arguments[a] > val)
			val = arguments[a]
	
	return val
}

function min()	{
	
	var val = Infinity;
	for (var a = 0; a < arguments.length; a++)
		if (arguments[a] < val)
			val = arguments[a]
	
	return val
}

function cube(id2)	{
	var c = new Shape("cube", id2 || 0)
	
	c.local_intersect = function(r)	{
		
		var xtmin = 0, xtmax = 0, ytmin = 0, ytmax = 0, ztmin = 0, ztmax = 0;
		var temp;
		
		xtmin = check_axis(r.origin.x, r.direction.x, "min")
		xtmax = check_axis(r.origin.x, r.direction.x, "max")
		
		if (xtmin > xtmax)	{
		
			temp = xtmax;
			xtmax = xtmin;
			xtmin = temp;
		}
		
		ytmin = check_axis(r.origin.y, r.direction.y, "min")
		ytmax = check_axis(r.origin.y, r.direction.y, "max")
		
		if (ytmin > ytmax)	{
		
			temp = ytmax;
			ytmax = ytmin;
			ytmin = temp;
		}
		
		ztmin = check_axis(r.origin.z, r.direction.z, "min")
		ztmax = check_axis(r.origin.z, r.direction.z, "max")
		
		if (ztmin > ztmax)	{
		
			temp = ztmax;
			ztmax = ztmin;
			ztmin = temp;
		}
		
		var tmin = max(xtmin, ytmin, ztmin)
		var tmax = min(xtmax, ytmax, ztmax)
		
		if (tmin > tmax)
			return []
		
		return intersections(new intersection(this, tmin), new intersection(this, tmax))
		
	};
	
	c.local_normal_at = function(p)	{
		
		var maxc = max(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z))
		
		if (maxc == Math.abs(p.x))
			return vector(p.x,0,0)
		else if (maxc == Math.abs(p.y))
			return vector(0,p.y,0)
		else
			return vector(0,0,p.z)
	};
	
	return c;
}

function plane(id2)	{
	
	var pl = new Shape("plane", id2)
	
	pl.local_intersect = function(r)	{
		
		if (Math.abs(r.direction.y) < EPSILON)
			return []
		
		// remaining local_intersect code here
		
		var t = -r.origin.y / r.direction.y
		
		var xs = []
		
		xs.push(new intersection(this, t))
		
		return xs 
	};
	
	pl.local_normal_at = function(p)	{ return vector(0,1,0); };
	
	return pl
}

function group(id2)	{
	
	var g = new Shape("group", id2)
	// g.type === "group"
	
	g.s=[];
	
	g.addChild =  function(sh)	{
		
		sh.parent = this;
		this.s.push(sh);
	};
	
	g.local_intersect = function(r)	{
		
		var res = [];
		
		for (var i = 0; i<this.s.length;i++)	{
			
			var xs = intersect(this.s[i], r);
			
			for (var j=0;j<xs.length;j++)
				res.push(xs[j])
		}
		
		res = order(res);
		
		return res;
	};
	
	g.local_normal_at = function(p)	{
		
		console.log("Error! Attempt to call local_normal_at() on group " + this.id + ", " + this.id2 + "\n");
	};
	
	return g 
}
function Shape(type, id2)	{
	
	this.id2 = id2;
	this.id = (Math.floor(Math.random() * 999999)) + 1
	this.transform = identity_matrix()
	this.material = new material()
	
	this.type = type // "sphere", "plane", etc
	
	this.parent = undefined;
	
	this.local_intersect = function(local_ray)	{ /*default impl.*/ this.saved_ray = local_ray; return []; };
	
	this.saved_ray = undefined;
	
	this.local_normal_at = function(p)	{ /* default impl. */ return vector(p.x,p.y,p.z); };
}

function glass_sphere()	{
	
	var s = sphere()
	s.material.transparency = 1.0
	s.material.refractive_index = 1.5
	
	return s
	
}

function set_transform(s, t)	{
	
	s.transform = t;
}

function intersection(s, t)	{
	
	this.t = t;
	this.object = s;
}