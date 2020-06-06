"use strict";

function test62()	{
	
	var r = new ray(point(0,0,5), vector(0,0,1));
	var s = new sphere();
	
	var xs = intersect(s, r);
	
	debugger;
}

function test65a()	{
	
	var s = new sphere();
	var i1 = new intersection(s, 1);
	var i2 = new intersection(s, 2);
	
	var xs = intersections(i2, i1);
	
	var i = hit(xs);
	
	debugger;
}

function test65b()	{
	
	var s = new sphere();
	var i1 = new intersection(s, -1);
	var i2 = new intersection(s, 1);
	
	var xs = intersections(i2, i1);
	
	var i = hit(xs);
	
	debugger;
	
}

function test69a()	{
	
	var r = new ray(point(1,2,3), vector(0,1,0));
	var m = translation(3, 4, 5);
	
	var r2 = transform(r, m);
	
	debugger;
}

function test69b()	{
	
	var r = new ray(point(1,2,3), vector(0,1,0));
	var m = scaling(2,3,4);
	
	var r2 = transform(r, m);
	
	debugger;
}

function test69e()	{

	var r = new ray(point(0,0,-5), vector(0,0,1));
	var s = new sphere();
	s.transform = m().scaling(2,2,2)
	
	var xs = intersect(s, r);
	
	debugger;
}

function ch7final107()	{
	
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	
	var c = new Camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(0.65,0.65,0.65));
	
	c.setCTransform(view_transform(point(0,1.5,-5),
								point(0,1,0),
								vector(0,1,0))
					);
								
	var middle = new sphere();
	middle.transform = translation(-0.5, 1, 0.5);
	middle.material = new material();
	middle.material.color = colour(0.1, 1, 0.5);
	middle.material.diffuse = 0.3;
	middle.material.specular = 0.7;
	
	var right = new sphere();
	right.transform = m_multiply(translation(1.5, 0.5, -0.5), scaling(0.5, 0.5, 0.5));
	right.material = new material();
	right.material.color = colour(0.5, 1, 0.1);
	right.material.diffuse = 0.7;
	right.material.specular = 0.5;
	
	
	var floor = new sphere();
	floor.transform = scaling(10, 0.01, 10);
	floor.material = new  material();
	floor.material.color = colour(1,0.9,0.9);
	floor.material.specular = 0;
	
	var left_wall = new sphere("LeftWall");
	
	var chain = m_multiply(rotation_x(Math.PI/2), scaling(10,0.01,10));
	chain = m_multiply(rotation_y((-Math.PI)/4), chain);
	chain = m_multiply(translation(0,0,5), chain);

	left_wall.transform = chain;
	left_wall.material = floor.material;
	
	var right_wall = new sphere("RightWall");
	
	chain = m_multiply(rotation_x(Math.PI/2), scaling(10,0.01,10));
	chain = m_multiply(rotation_y((Math.PI)/4), chain);
	chain = m_multiply(translation(0,0,5), chain);
	
	right_wall.transform = chain;
	right_wall.material = floor.material;
	
	w.objects.push(floor);
	w.objects.push(left_wall);
	w.objects.push(right_wall);
	
	w.objects.push(middle);
	w.objects.push(right);
	
	render(c, w, 1);
	
	//console.log("COMPLETED.\n");
	//debugger;
}

function ch9()	{
	
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new Camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(1,1,1));
	
	c.transform = view_transform(point(0,1.5,-5),
								point(0,1,0),
								vector(0,1,0));
							

	
	var middle = sphere();
	middle.transform = translation(-0.5, 1, 0.5);
	middle.material = new material();
	middle.material.color = colour(0.1, 1, 0.5);
	middle.material.diffuse = 0.3;
	middle.material.specular = 0.7;
	middle.material.pattern = stripe_pattern(colour(0.5, 0.5, 0.5), colour (0,0,0), 0.5)
	middle.material.reflective = 0;
	
	middle.casts_shadow = false;
	
	middle.material.pattern.transform = m_multiply(rotation_z((Math.PI*2)/4), scaling(0.25,0.25,0.25))
	
	var right = sphere();
	right.transform = m_multiply(translation(1.5, 0.5, -0.5), scaling(0.5, 0.5, 0.5));
	right.material = new material();
	right.material.color = colour(0.5, 1, 0.1);
	right.material.diffuse = 0.7;
	right.material.specular = 0.5;
	right.material.reflective = 0;
	
	var left = sphere()
	left.transform = m_multiply(translation(-1.5, 0.4, -0.5), scaling(0.4, 0.4, 0.4))
	left.material = new material()
	left.material.color = colour(0.45, 0.45, 1)
	left.material.diffuse = 0.5
	left.material.specular = 0.7
	left.material.reflective = 0
	left.material.pattern = test_pattern()
	
	var floor = plane()
	
	floor.material = new material()
	floor.material.color = colour(1, 0, 0)
	floor.material.pattern = ring_pattern()/*stripe_pattern(undefined,undefined,2)*/
	floor.material.reflective = 1;
	//floor.material.pattern.transform = scaling(0.5,0.5,0.5)
	//floor.material.ambient = 1.0;
	

	
	w.objects.push(floor);
	
	w.objects.push(middle);
	w.objects.push(right);
	w.objects.push(left)
	
	//console.time('render()');
	render(c, w, 1);
	//console.timeEnd('render()');
	
	//console.log("COMPLETED.\n");
	//debugger;
}

function ch12()	{
	
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new Camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(1,1,1));
	
	c.setCTransform(view_transform(point(0,1,-5), // from
								point(0,1,0),   // to
								vector(0,1,0))
					); // up
							

	
	var middle = sphere();
	middle.transform = translation(-0.5, 1, 0.5);
	middle.material = new material();
	middle.material.color = colour(0.1, 1, 0.5);
	//middle.material.diffuse = 0.3;
	//middle.material.specular = 0.7;
	middle.material.pattern = stripe_pattern(colour(1, 1, 1), colour (1,1,1))
	//middle.material.reflective = 0.5;
	middle.material.ambient = 1.0;
	
	middle.material.pattern.transform = m_multiply(rotation_z((Math.PI*2)/4), scaling(0.25,0.25,0.25))
	
	var right = cylinder();
	right.transform = m_multiply(translation(1.5, 0, 0.5), scaling(0.3, 1, 0.3))
	right.material = new material()
	right.min = 0
	right.max = 2
	right.material.color = colour(0.45,0.45,1)

	var left = cube()
	left.transform = m_multiply(translation(-1.5, 0.4, -0.5), scaling(0.4, 0.4, 0.4))
	left.material = new material()
	left.material.color = colour(0.45, 0.45, 1)
	//left.material.diffuse = 0.5
	//left.material.specular = 0.7
	//left.material.reflective = 0.5
	left.material.pattern = test_pattern()
	
	var floor = plane()
	floor.material = new material()
	floor.material.color = colour(0.2, 1, 0.2)
	floor.material.pattern = stripe_pattern(colour(1,0.6,0.2), colour(0,1,0), 2)/*stripe_pattern(undefined,undefined,2)*/
	floor.material.reflective = 1;
	floor.material.pattern.transform = scaling(0.5,0.5,0.5)
	floor.material.ambient = 1.0;
	

	
	w.objects.push(floor);
	
	w.objects.push(middle);
	
	w.objects.push(left)
	
	w.objects.push(right)
	
	//console.time('render()');
	render(c, w, 1);
	//console.timeEnd('render()');
}

function ch13()	{
	
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new Camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(1,1,1));
	
	c.transform = view_transform(point(0,1,-5), // from
								point(0,1,0),   // to
								vector(0,1,0)); // up
							


	var cone1 = cone()
	cone1.closed = true
	cone1.max = 2.5;
	cone1.min = -1.5;
	
	cone1.transform = m_multiply(m_multiply(rotation_x(0.25), rotation_y(0.25)), /*m_multiply(translation(1.5, 0.5, -0.5),*/ scaling(0.5, 0.5, 0.5)/*)*/)
	cone1.material = new material();
	cone1.material.color = colour(0.5, 1, 0.1);
	cone1.material.diffuse = 0.7;
	cone1.material.specular = 0.5;
	cone1.material.reflective = 0;
	cone1.material.pattern = stripe_pattern(colour(0.7,0.7,0.7), colour(0.25,0.25,0.25))

	w.objects.push(cone1);
	
	render(c, w, 1);
}

function ch14()	{
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new Camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(1,1,1));
	
	c.setCTransform(view_transform(point(0,2,-5), // from
								point(0,0,0),   // to
								vector(0,1,1))); // up
								
	var g1 = group("g1")
	
	var c1 = sphere("cube1");
	c1.material.color = colour(1,0,0)
	
	var c2 = sphere("sphere2");
	c2.transform = /*m_multiply(*/translation(1, 1, 0)
	c2.material.color = colour(1, 1, 1)
	
	g1.addChild(c1)
	g1.addChild(c2)	
	
	//w.objects.push(g1);
	
	var hex = hexagon()
	
	//debugger;
	w.objects.push(hex)
	
	render(c,w,1);
	
}

function p211()	{
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new Camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(1,1,1));
	
	c.setCTransform(view_transform(point(0.8,2,-5), // from
								point(0,-0.5,0),   // to
								vector(2,2,2)) // up
					);
	
	var py = pyramid()
	
	//debugger;
	w.objects.push(py)
	
	render(c,w,1);
	
}

function test_refraction()	{
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var cam = new Camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(1,1,1));
	
	cam.setCTransform(view_transform(point(0,0,-5), // from
								point(0,0,0),   // to
								vector(0,1,0)) // up
					);
			
		
	var A = glass_sphere()
	A.transform = identity_matrix().scaling(2, 2, 2)
	A.material.color = colour(1,0,0)
	A.material.refractive_index = 1.0
	A.material.transparency = 0.5
	//A.id = "A"
	
	var B = glass_sphere()
	B.transform = identity_matrix().translation(-0.25,0,0)
	B.material.color = colour(0,1,0)
	B.material.refractive_index = 1.5
	B.material.transparency = 0.75
	//B.id = "B"
	
	var C = glass_sphere()
	C.transform = identity_matrix().translation(0.25,0,0)
	C.material.color = colour(0,0,1)
	C.material.refractive_index = 2.5
	C.material.transparency = 0.75
	
	var o = group()
	o.addChild(A )
	o.addChild(B)
	o.addChild(C)
	
	//o.divide(1)
	
	//debugger;
	w.objects.push(o)
	//w.objects.push(pl)
	
	render(cam,w,5);
}


/** CURRENT TESTS */

function test86a()	{ // PASSED
	
	
	var m = new material();
	var position = point(0, 0, 0);
	
	var eyev = vector(0,0,-1);
	var normalv = vector(0,0,-1);
	var _color = colour(1, 1, 1);
	
	var light = new point_light(point(0,0,-10), _color);
	
	var res = lighting(m, light, { id: 'Dave' }, position, eyev, normalv, 0);
	
	res = sn_round(res);
	
	debugger;
}

function test86b()	{ // PASSED
	
	var m = new material();
	var position = point(0,0,0);
	
	var eyev = vector(0, Math.SQRT2/2, Math.SQRT2/2);
	var normalv = vector(0,0,-1);
	var _color = colour(1, 1, 1);
	_color.x = 1;
	_color.y = 1;
	_color.z = 1;
	
	var light = new point_light(point(0,0,-10), _color);
	
	var res = lighting(m, light, { id: 'Dave' }, position, eyev, normalv);
	
	debugger;
}

function test87a()	{ // PASSED
	
	var m = new material();
	var position = point(0,0,0);
	
	var eyev = vector(0,0,-1);
	var normalv = vector(0,0,-1);
	var _color = colour(1, 1, 1);
	
	var light = new point_light(point(0,10,-10), _color);
	
	var res = lighting(m, light, { id: 'Dave' }, position, eyev, normalv);
	
	debugger;
}

function test87b()	{
	
	var m = new material();
	var _position = point(0,0,0);
	
	var eyev = vector(0,-Math.SQRT2/2,-Math.SQRT2/2);
	var normalv = vector(0,0,-1);
	var _color = colour(1, 1, 1);
	
	var light = new point_light(point(0,10,-10), _color);
	
	var res = lighting(m, light, { id: 'Dave' }, _position, eyev, normalv);
	
	debugger;
}

function test88()	{ // TODO
	
	var m = new material();
	var position = point(0,0,0);
	
	var eyev = vector(0,0,-1);
	var normalv = vector(0,0,-1);
	var _color = colour(1, 1, 1);
	
	var light = new point_light(point(0,0,10), _color);
	
	var res = lighting(m, light, { id: 'Dave' }, position, eyev, normalv);
	
	debugger;
}

function eCh5()	{
	
	var half = 3.5, wall_z = 10, pixel_size = 7.0 / CANVAS_HEIGHT, ray_origin = point(0,0,-5)
	
	var color_ = colour(1,0,0)
	var s = sphere()
	
	for (var y = 0; y < CANVAS_HEIGHT; y++)	{
		
		var world_y = half - pixel_size * y
		
		for (var x = 0; x < CANVAS_HEIGHT; x++)	{
			
			var world_x = (-half) + pixel_size * x
			
			var position_ = point(world_x, world_y, wall_z)
			
			var r = new ray(ray_origin, normalize(subtract(position_, ray_origin)))
			var xs = intersect(s, r)
			
			if(hit(xs))	{
				
				var c = convert(color_)
				ctx.fillStyle = "#" + c.x + c.y + c.z
				ctx.fillRect(x,y,1,1)
			}
			
		}

	}
}

function hereWeGo()	{

	var half = 3.5, wall_z = 10, pixel_size = 7.0 / CANVAS_HEIGHT, ray_origin = point(0,0,-5)
	
	var l = new point_light(point(-10,10,-10), colour(1, 1, 1))
	
	
	
	var color_ = colour(1,0,0)
	var s = sphere()
	s.material.color = colour(1, 0.2, 1)
	
	for (var y = 0; y < CANVAS_HEIGHT; y++)	{
		
		var world_y = half - pixel_size * y
		
		for (var x = 0; x < CANVAS_HEIGHT; x++)	{
			
			var world_x = (-half) + pixel_size * x
			
			var position_ = point(world_x, world_y, wall_z)
			
			var r = new ray(ray_origin, normalize(subtract(position_, ray_origin)))
			var xs = intersect(s, r)
	
			var h = hit(xs)

			
			if(h)	{
				
				var point_ = _position(r, h.t)
				var normal_ = normal_at(h.object, point_)
			
				var eye = negate(r.direction)
			
				color_ = lighting(h.object.material, l, { id: 'Dave' }, point_, eye, normal_, 0)
				
				var c = convert(color_)
				
				ctx.fillStyle = "#" + c.x + c.y + c.z
				ctx.fillRect(x,y,1,1)
			}
			
		}

	}
}


function fremag()	{
	
	Data.c.setCTransform(view_transform(point(0,0,-10), point(0,0,0), vector(0,1,0)));
	var l = new point_light(point(-50, 100, -100), colour(1,1,1)) 
		
	var s3 = sphere("3")
	s3.transform = identity_matrix().translation(1,0,0).scaling(1.5,1.5,1.5)
	s3.material.color = colour(1,0,0)
	s3.material.ambient = 0.2
	s3.material.diffuse = 0.7
	s3.material.specular = 0.8
	
	var o = group()
	o.addChild(s3)
	
	Data.o = o
	Data.l = l

	renderImage()
}


/** SMOOTH TRIANGLES */

function test222a()	{
	// PASSED
	var p1 = point(0,1,0)
	var p2 = point(-1, 0, 0)
	var p3 = point(1,0,0)
	
	var n1 = vector(0,1,0)
	var n2 = vector(-1,0,0)
	var n3 = vector(1,0,0)
	
	var tri = triangle(p1, p2, p3, 0, n1, n2, n3)
	var r = new ray(point(-0.2, 0.3, -2), vector(0,0,1))
	
	var xs = tri.local_intersect(r)
	
	console.log("Check values of xs[0].object.u = 0.45, and xs[0].object.v = 0.25")
	
	debugger
	
}


/* TEXTURE MAP TESTS */

function tm_1()	{
	
	prepCanvas()
	
	var l = new point_light(point(-50, 100, -100), colour(1,1,1)) 
	
	var s1 = sphere()
	s1.transform = identity_matrix().scaling(2, 2, 2)
	
	var p = checkers_pattern(4, 4, colour(1,1,1), colour(1, 0.3, 0.3))
	var tm = TextureMap(p, spherical_map)
	s1.material.pattern = my_pattern(tm)
	
	
	var o = group()
	o.addChild(s1)
	
	Data.o = o
	Data.l = l
	
	renderImage()
}

function tm_2()	{

	prepCanvas()
	
	var l = new point_light(point(-10, 10, -10), colour(1,1,1)) 
	Data.c.setCTransform(view_transform(point(0,0,-30), point(0,0,0), vector(0,1,0)));
	
	var p = checkers_pattern(8, 4, colour(1,1,1), colour(1, 0.3, 0.3))
	var tm = TextureMap(p, spherical_map)
	var s = sphere()
	s.material.pattern = my_pattern( tm )
	s.transform = m().scaling(2,2,2)
	
	p = checkers_pattern(2, 1, colour(0,0,1), colour(1, 0, 0))
	tm = TextureMap(p, cylindrical_map)
	var c = cylinder()
	c.min = -2, c.max = 2
	c.material.pattern = my_pattern( tm )
	c.transform = m().translation(7,0,-1).rotation_z(Math.PI/2)
	
	p = checkers_pattern(8, 4, colour(0,0,1), colour(1, 0, 0))
	tm = TextureMap(p, spherical_map)
	var cb = cube()
	cb.material.pattern = my_pattern( tm )
	cb.transform = m().translation(-4, 1, 0).rotation_z(Math.PI/4)
	
	var o = group()
	o.addChild(s, c, cb)
	
	Data.o = o
	Data.l = l
	
	renderImage()
}

function cm_1()	{
	// PASSED: http://www.raytracerchallenge.com/bonus/texture-mapping.html
	var main = colour(1,1,1), ul = colour(1,0,0), ur = colour(1,1,0), bl = colour(0,1,0), br = colour(0,1,1)
	var p =  align_check_pattern(main, ul, ur, bl, br)
	
	var a = []
	a.push({u: 0.5, v: 0.5})
	a.push({u: 0.1, v: 0.9})
	a.push({u: 0.9, v: 0.9})
	a.push({u: 0.1, v: 0.1})
	a.push({u: 0.9, v: 0.1})
	
	var c = [];
	for(var i = 0; i < a.length; i++)	{
		
		c.push(p.uv_pattern_at(a[i].u, a[i].v))
	}
	
	debugger;
	/*
  Then c = <expected>
  Examples:
    | u    | v    | expected |
    | 0.5  | 0.5  | main     |
    | 0.1  | 0.9  | ul       |
    | 0.9  | 0.9  | ur       |
    | 0.1  | 0.1  | bl       |
    | 0.9  | 0.1  | br       |
	*/
}

function cm_plane()	{
	
	prepCanvas()
	
	var l = new point_light(point(-10, 10, -10), colour(1,1,1)) 
	Data.c.setCTransform(view_transform(point(0,10,-30), point(0,0,0), vector(0,1,0)));
	
	var main = colour(1,1,1), ul = colour(1,0,0), ur = colour(1,1,0), bl = colour(0,1,0), br = colour(0,1,1)
	var p =  align_check_pattern(main, ul, ur, bl, br)
	
	var tm = TextureMap(p, planar_map)
	var pl = plane()
	var pat = my_pattern( tm )
	pat.transform = identity_matrix().scaling(2,2,2)
	pl.material.pattern = pat
	
	var o = group()
	o.addChild(pl)
	
	Data.o = o
	Data.l = l
	
	renderImage()
	
}

function cm_2()	{
	// PASSED
	
	var c1 = colour(1,0,0), c2 = colour(1,1,0), c3 = colour(1,0.5,0), c4 = colour(0,1,0), c5 = colour(0,1,1), c6 = colour(0,0,1), c7 = colour(1,0,1), c8 = colour(1,1,1)
	
	var cm = CubeMap(c1,c2,c3,c4,c5,c6,c7,c8)
	
	// cm.color_at(p)
	
	var p = []
	p.push(point(-1,0,0)), p.push(point(-1,0.9,-0.9))
	p.push(point(-1,0.9,0.9)), p.push(point(-1, -0.9, -0.9))
	

	var res = []
	for (var i = 0; i < p.length; i++)	{
		
		res.push(cm.color_at(p[i]))
	}
	
	debugger;
	
	/*
	Expected: yellow, cyan, red, blue
	*/
}


/* */
function linetest1()	{
	
	// PASS - Both methods calculate the same length for the line
	
	var p1 = point(7,3.2,0)
	var p2 = point(12.5,5.5,0)
	
	var d1 = dist2d(p1, p2)
	var d2 = new Line2d(p1,p2).length
	
	debugger
	
}