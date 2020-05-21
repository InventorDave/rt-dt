/* RAY & PRIMITIVES */

function ray(origin, direction)	{
	
	this.origin = origin;
	this.direction = direction;
}

function cone(id2)	{
	
	var c = new Shape("cone", id2 || 0)
	
	c.min = -Infinity
	c.max = Infinity
	c.closed = false
	
	c.bounds_of = function()	{ // See comments in cylinder() implementation
		
					var l = max(Math.abs(this.min),Math.abs(this.max))
					return new BB(point(-l, this.min, -l), point(l,this.max,l))
	};
	
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

function triangle(p1, p2, p3, id2, vn1, vn2, vn3)	{
	
	var t = new Shape("triangle", id2 || 0)
	
	t.p1 = p1;
	t.p2 = p2;
	t.p3 = p3;
	
	t.e1 = subtract(p2, p1)
	t.e2 = subtract(p3, p1)
	
	t.vn1 = vn1
	t.vn2 = vn2
	t.vn3 = vn3
	
	t.bbMin = point(Math.min(t.p1.x,t.p2.x,t.p3.x),Math.min(t.p1.y,t.p2.y,t.p3.y),Math.min(t.p1.z,t.p2.z,t.p3.z))
	t.bbMax = point(Math.max(t.p1.x,t.p2.x,t.p3.x),Math.max(t.p1.y,t.p2.y,t.p3.y),Math.max(t.p1.z,t.p2.z,t.p3.z))
	
	t.normal = normalize(cross(t.e2, t.e1))
	
	t.local_normal_at = function(p)	{
		
		return this.normal;
	};
	
	t.local_intersect = function(r)	{
		
		//var dir_cross_e2 = cross(r.direction, this.e2)
		
		var dir_cross_e2_X = r.direction.y * this.e2.z - r.direction.z * this.e2.y;
		var dir_cross_e2_Y = r.direction.z * this.e2.x - r.direction.x * this.e2.z;
		var dir_cross_e2_Z = r.direction.x * this.e2.y - r.direction.y * this.e2.x;
		
		
		//var det = dot(this.e1, dir_cross_e2)
		
		var det = this.e1.x * dir_cross_e2_X +
				  this.e1.y * dir_cross_e2_Y +
				  this.e1.z * dir_cross_e2_Z;
		
		
		if(Math.abs(det) < EPSILON)
			return []
		
		var f = 1.0 / det
		var p1_2_origin = subtract(r.origin, this.p1)
		
		//var u = f * dot(p1_2_origin, dir_cross_e2)
		
		var u = f *(p1_2_origin.x * dir_cross_e2_X +
				  p1_2_origin.y * dir_cross_e2_Y +
				  p1_2_origin.z * dir_cross_e2_Z);
		
		
		if ((u<0)||(u>1))
			return []
		
		//var origin_cross_e1 = cross(p1_2_origin, this.e1)
		
		var origin_cross_e1_X = p1_2_origin.y * this.e1.z - p1_2_origin.z * this.e1.y;
		var origin_cross_e1_Y = p1_2_origin.z * this.e1.x - p1_2_origin.x * this.e1.z;
		var origin_cross_e1_Z = p1_2_origin.x * this.e1.y - p1_2_origin.y * this.e1.x;
		

		//var v = f * dot(r.direction, origin_cross_e1)
		
		var v = f *(r.direction.x * origin_cross_e1_X +
				  r.direction.y * origin_cross_e1_Y +
				  r.direction.z * origin_cross_e1_Z);
		
		
		if ((v<0)||((u+v)>1))
			return []
		
		//var t = f * dot(this.e2, origin_cross_e1)
		
		var t = f *(this.e2.x * origin_cross_e1_X +
				  this.e2.y * origin_cross_e1_Y +
				  this.e2.z * origin_cross_e1_Z);
		
		return [{ object: this, t: t }]
		//return [new intersection(this, t)]
	};
	
	return t;
}

function fan_triangulation(vertices, _vn)	{
	
	var ts = []
	
	for (var i = 1; i < vertices.length-1; i++)	{
		//console.log("1: " + vertices[0] + ", 2: " + vertices[1] +", 3: " + vertices[2]);
		var t = triangle(vertices[0], vertices[i], vertices[i+1], undefined, _vn[0], _vn[i], _vn[i+1])
		
		ts.push(t)
	}
	
	return ts
}

function cylinder(id2)	{
	
	var c = new Shape("cylinder", id2)
	
	c.min = -Infinity
	c.max = Infinity
	c.closed = false
	
	c.bounds_of = function()	{ // for some shapes, eg those with settable min and max, we need a custom .bounds_of() function,
								  // until I implement setters/getters which will wrap the generating of a BB()
		
		if(!this.hasGenBB)	{
			
			this.bb = new BB(point(-1,this.min,-1),point(1,this.max,1))
			this.hasGenBB = true
		}
		
		return this.bb
	};
	
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
	
	s.bbMin = point(-1,-1,-1)
	s.bbMax = point(1,1,1)
	
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

function check_axis(origin, direction, tmin_or_tmax, p)	{
	
	var t, t_num;
	
	// (tmin_or_tmax=="min"?-1:1)
	
	if (tmin_or_tmax == "min")	{
		
		if(p)
			t_num = p - origin
		else
			t_num = (-1 - origin)
		
		if (Math.abs(direction) >= EPSILON)
			t = t_num / direction
		else
			t = t_num * Infinity
	}
	else	{ // "max"
	
		if(p)
			t_num = p - origin
		else
			t_num = (1 - origin) 
		
		if (Math.abs(direction) >= EPSILON)
			t = t_num / direction
		else
			t = t_num * Infinity

	}
	return t;
}

function check_axis2(origin, direction, p)	{
	
	var t, t2, t_num;
	
	if(p)
		t_num = p - origin
	else
		t_num = (-1 - origin)
	
	if (Math.abs(direction) >= EPSILON)
		t = t_num / direction
	else
		t = t_num * Infinity

	if(p)
		t_num = p - origin
	else
		t_num = (1 - origin) 
	
	if (Math.abs(direction) >= EPSILON)
		t2 = t_num / direction
	else
		t2 = t_num * Infinity

	return { min: t, max: t2 }
}

function cube(id2)	{
	var c = new Shape("cube", id2)
	
	c.bbMin = point(-1,-1,-1)
	c.bbMax = point(1,1,1)
	
	c.local_intersect = function(r)	{
		
		var xtmin = 0, xtmax = 0, ytmin = 0, ytmax = 0, ztmin = 0, ztmax = 0;
		// var xt, yt, zt
		var temp;
		
		xtmin = check_axis(r.origin.x, r.direction.x, "min")
		xtmax = check_axis(r.origin.x, r.direction.x, "max")
		// xt = check_axis2(r.origin.x, r.direction.x)
		
		
		if (xtmin > xtmax)	{
		//if (xt.min > xt.max)	{
			temp = xtmax;
			xtmax = xtmin;
			xtmin = temp;
		}
		
		ytmin = check_axis(r.origin.y, r.direction.y, "min")
		ytmax = check_axis(r.origin.y, r.direction.y, "max")
		// yt = check_axis2(r.origin.y, r.direction.y)
		
		if (ytmin > ytmax)	{
		// if (yt.min > yt.max)	{
		
			temp = ytmax;
			ytmax = ytmin;
			ytmin = temp;
		}
		
		ztmin = check_axis(r.origin.z, r.direction.z, "min")
		ztmax = check_axis(r.origin.z, r.direction.z, "max")
		// zt = check_axis2(r.origin.z, r.direction.z)
		
		if (ztmin > ztmax)	{
		// if (zt.min > zt.max)	{
			temp = ztmax;
			ztmax = ztmin;
			ztmin = temp;
		}
		
		var tmin = Math.max(xtmin, ytmin, ztmin)
		var tmax = Math.min(xtmax, ytmax, ztmax)
		
		if (tmin > tmax)
			return []
		
		return intersections(new intersection(this, tmin), new intersection(this, tmax))
		
	};
	
	c.local_normal_at = function(p)	{
		
		var maxc = Math.max(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z))
		
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
	
	pl.bbMin = point(-Infinity,0,-Infinity)
	pl.bbMax = point(Infinity,0,Infinity)
	
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
	
	Data.g[g.id] = g
	
	g.s=[];
	
	g.left = []
	g.right = []
	
	g.partition_children = function()	{
		
		var left = [], right = []
		/*
		 To see if a child (this.s[i]) fits into either
		 left or right, check if it's BB fits into
		 either this.bb.left or this.bb.right.
		*/
		 
		this.bounds_of()
		var _bb = this.bb.split_bounds()
		
		var ch_b, child;
		
		for (var i = 0; i<this.s.length; i++)	{
			
			child = this.s[i]
			ch_b = child.bounds_of()
			
			/*
			If so, remove the child
			from this.s and add to 'left', or 'right'.			
			*/
			//debugger;
			if (_bb.left.containsBox(ch_b))
				// child BB fits into this.left
				left.push(this.s.splice(i--, 1)[0])
				//console.log("Adding to left partition.")
			
			else if (_bb.right.containsBox(ch_b))
				// child BB fits into this.right
				right.push(this.s.splice(i--, 1)[0])
				//console.log("Adding to right partition.")

		}
		
		/*
		 Once all children have been processed, store
		 'left' in this.left, 'right' in this.right,and
		 return { left: left, right: right }
		*/
		
		this.left = left, this.right = right
		return { left: left, right: right }
	};
	
	g.make_subgroup = function(partition)	{
		
		var g = group()
		var L = partition.length
		
		for (var i = 0; i < L; i++)
			g.addChild(partition[i])
		
		this.s.push(g)
		this.hasGenBB = false
	};
	
	g.divide = function(t)	{
		
		if(t<=this.s.length)	{
			
			var l_r = this.partition_children()
			if(l_r.left)
				//console.log("l_r.left contains children.")
				this.make_subgroup(l_r.left)
				
			if(l_r.right)
				//console.log("l_r.right contains children.")
				this.make_subgroup(l_r.right)
		}
		
		var l = this.s.length
		for(var i = 0; i<l; i++)
			//console.log("Calling divide on children of group " + this.id +", l = " + l + ", i = " + i);
			this.s[i].divide(t)

	};
	
	g.addChild =  function()	{
		
		for (var i = 0; i < arguments.length; i++)	{
			
			arguments[i].parent = this;
			this.s.push(arguments[i]);
		}
	};
	
	g.bounds_of = function()	{
		
		if(!this.hasGenBB)	{
			
			var box = new BB()
			var l = this.s.length
			for(var i=0;i<l;i++)	{
				
				var cbox = this.s[i].parent_space_bounds_of()
				box.addBB(cbox)
			}
			
			this.bb = box
			this.hasGenBB = true
		}
		
		return this.bb
	};
	
	g.local_intersect = function(r)	{
		
		if(this.bounds_of().intersects(r))	{
		
			var res = [];
		
			for (var i = 0; i<this.s.length;i++)	{
			
				var xs = intersect(this.s[i], r);
			
				for (var j=0;j<xs.length;j++)
				res.push(xs[j])
			}
		
			res = order(res);
		
			return res;
		}
		
		return [];
	};
	
	g.local_normal_at = function(p)	{
		
		console.log("Error! Attempt to call local_normal_at() on group " + this.id + ", " + this.id2 + "\n");
	};
	
	return g 
}

function BB(min,max)	{
	
	this.min = min || point(Infinity,Infinity,Infinity)
	this.max = max || point(-Infinity,-Infinity,-Infinity)
	
	this.setMin = function(min)	{ this.min = min; }
	this.setMax = function(max) { this.max = max; }
	
	this.left = undefined
	this.right = undefined
	
	this.addP = function(p) {
		
					if(p.x<this.min.x)
						this.min.x=p.x
					else if(p.x>this.max.x)
						this.max.x=p.x
					
					if(p.y<this.min.y)
						this.min.y=p.y
					else if(p.y>this.max.y)
						this.max.y=p.y
					
					if(p.z<this.min.z)
						this.min.z=p.z
					else if(p.z>this.max.z)
						this.max.z=p.z
	};
	
	this.addBB = function(b)	{
		
		this.min=point(Math.min(this.min.x,b.min.x), Math.min(this.min.y,b.min.y), Math.min(this.min.z,b.min.z))
		this.max=point(Math.max(this.max.x,b.max.x), Math.max(this.max.y,b.max.y), Math.max(this.max.z,b.max.z))
	};
	
	this.containsPoint = function(p)	{
			return (p.x>=this.min.x&&p.x<=this.max.x)&&(p.y>=this.min.y&&p.y<=this.max.y)&&(p.z>=this.min.z&&p.z<=this.max.z);
	};
	
	this.containsBox = function(b2)	{
			/*
			A box lies within another box if both its min and max points lie within that box.
			*/
			if(this.containsPoint(b2.min)&&this.containsPoint(b2.max))
				return true
			
			return false
	};
	
	this.transform = function(m)	{
		
			var p = []
			p.push(this.min)
			p.push(point(this.min.x, this.min.y, this.max.z))
			p.push(point(this.min.x, this.max.y, this.min.z))
			p.push(point(this.min.x, this.max.y, this.max.z))
			p.push(point(this.max.x, this.min.y, this.min.z))
			p.push(point(this.max.x, this.min.y, this.max.z))
			p.push(point(this.max.x, this.max.y, this.min.z))
			p.push(this.max)
			
			var new_bbox = new BB(), res

			for (var i = 0; i < 8 /* p.length */; i++)	{
				
				res = multiply_matrix_by_tuple(m,p[i])
				new_bbox.addP(res)
			}

			return new_bbox
		
	};
	
	this.intersects = function(r)	{
	
		var xtmin = 0, xtmax = 0, ytmin = 0, ytmax = 0, ztmin = 0, ztmax = 0;
		var temp, a = this.min, b = this.max;
		
		/*
		 Bonus Chapter at (http://www.raytracerchallenge.com/bonus/bounding-boxes.html) Args a and b are bounding box min and max.
		*/
		xtmin = check_axis(r.origin.x, r.direction.x, "min", a.x)
		xtmax = check_axis(r.origin.x, r.direction.x, "max", b.x)
		
		if (xtmin > xtmax)	{
		
			temp = xtmax;
			xtmax = xtmin;
			xtmin = temp;
		}
		
		ytmin = check_axis(r.origin.y, r.direction.y, "min", a.y)
		ytmax = check_axis(r.origin.y, r.direction.y, "max", b.y)
		
		if (ytmin > ytmax)	{
		
			temp = ytmax;
			ytmax = ytmin;
			ytmin = temp;
		}
		
		ztmin = check_axis(r.origin.z, r.direction.z, "min", a.z)
		ztmax = check_axis(r.origin.z, r.direction.z, "max", b.z)
		
		if (ztmin > ztmax)	{
		
			temp = ztmax;
			ztmax = ztmin;
			ztmin = temp;
		}
		
		var tmin = Math.max(xtmin, ytmin, ztmin)
		var tmax = Math.min(xtmax, ytmax, ztmax)
		
		if (tmin > tmax)
			return false;
		
		//return intersections(new intersection(this, tmin), new intersection(this, tmax))
		return [{object:this,t:tmin},{object:this,t:tmax}]
	};

	this.split_bounds = function()	{

		var dx = this.max.x - this.min.x
		var dy = this.max.y - this.min.y
		var dz = this.max.z - this.min.z
		
		var greatest = Math.max(dx,dy,dz)
		
		var x0 = this.min.x, y0 = this.min.y, z0 = this.min.z
		var x1 = this.max.x, y1 = this.max.y, z1 = this.max.z
		
		if(greatest==dx)
			x0 = x1 = x0 + dx / 2.0
		else if(greatest==dy)
			y0 = y1 = y0 + dy / 2.0
		else
			z0 = z1 = z0 + dz / 2.0
		
		var mid_min = point(x0,y0,z0)
		var mid_max = point(x1,y1,z1)
		
		var left = new BB(this.min, mid_max)
		var right = new BB(mid_min, this.max)
		
		this.left = left
		this.right = right
		
		return { left: left, right: right }

	};		
}

function test_shape()	{
	
	var ts = new Shape("test")
	ts.bbMin = point(-1,-1,-1)
	ts.bbMax = point(1,1,1)
	
	return ts;
}

function Shape(type, id2)	{
	
	this.id2 = id2 || 0;
	this.id = GetUID()
	this.transform = identity_matrix()
	this.material = new material()
	
	this.type = type // "sphere", "plane", etc
	
	this.parent = false;
	
	this.local_intersect = function(local_ray)	{ /*default impl.*/ this.saved_ray = local_ray; return []; };
	
	this.divide = function()	{
		
		//console.log("Shape.divide called on " + this.type + ": " + this.id + ", " + this.id2 + ".")
	};
	
	this.bbMin = point(0,0,0)
	this.bbMax = point(0,0,0)
	this.bb = new BB()
	this.hasGenBB = false
	this.bounds_of = function()	{ // REDEFINE FOR GROUP (AND CSG), and some primitives - see source code!!
						
						if(!this.hasGenBB)	{
							
							this.bb = new BB(this.bbMin,this.bbMax)
							this.hasGenBB = true
						}
						
						return this.bb
	};
	
	this.parent_space_bounds_of = function()	{
	
		return this.bounds_of().transform(this.transform)
	};
	
	this.saved_ray = undefined;
	
	this.casts_shadow = true;
	
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