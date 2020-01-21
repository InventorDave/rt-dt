"use strict";

function test1()	{
	
	// test a matrix multiplied by a tuple, using function: multiply_tuple_by_matrix(m, t)
	var m = createMatrix(4,4);
	m.m[0][0] = 1, m.m[0][1] = 2, m.m[0][2] = 3, m.m[0][3] = 4;
	m.m[1][0] = 2, m.m[1][1] = 4, m.m[1][2] = 4, m.m[1][3] = 2;
	m.m[2][0] = 8, m.m[2][1] = 6, m.m[2][2] = 4, m.m[2][3] = 1;
	m.m[3][0] = 0, m.m[3][1] = 0, m.m[3][2] = 0, m.m[3][3] = 1;
	
	var t = new tuple(1,2,3,1);
	
	var t2 = multiply_tuple_by_matrix(m, t);

	alert("tuple(" + t2.x + ", " + t2.y + ", " + t2.z + ", " + t2.type + ")");
}

function test2()	{ // p32/33, transposing a matrix using m_transpose()

	var m = createMatrix(4,4);
	m.m[0][0] = 0, m.m[0][1] = 9, m.m[0][2] = 3, m.m[0][3] = 0;
	m.m[1][0] = 9, m.m[1][1] = 8, m.m[1][2] = 0, m.m[1][3] = 8;
	m.m[2][0] = 1, m.m[2][1] = 8, m.m[2][2] = 5, m.m[2][3] = 3;
	m.m[3][0] = 0, m.m[3][1] = 0, m.m[3][2] = 5, m.m[3][3] = 8;
	
	var m2 = m.transpose();
	
	var str = m2.m[0][0] + ", " + m2.m[0][1] + ", " + m2.m[0][2] + ", " + m2.m[0][3] + "\n";
	str +=    m2.m[1][0] + ", " + m2.m[1][1] + ", " + m2.m[1][2] + ", " + m2.m[1][3] + "\n";
	str +=    m2.m[2][0] + ", " + m2.m[2][1] + ", " + m2.m[2][2] + ", " + m2.m[2][3] + "\n";
	str +=    m2.m[3][0] + ", " + m2.m[3][1] + ", " + m2.m[3][2] + ", " + m2.m[3][3] + "\n";
	
	alert(str);
}

function test3()	{ // p35, submatrix()

	var m = createMatrix(4,4);
	m.m[0][0] = 0, m.m[0][1] = 9, m.m[0][2] = 3, m.m[0][3] = 0;
	m.m[1][0] = 9, m.m[1][1] = 8, m.m[1][2] = 0, m.m[1][3] = 8;
	m.m[2][0] = 1, m.m[2][1] = 8, m.m[2][2] = 5, m.m[2][3] = 3;
	m.m[3][0] = 0, m.m[3][1] = 0, m.m[3][2] = 5, m.m[3][3] = 8;
	
	var m2 = m.submatrix(3, 1);
	
	var str = m2.m[0][0] + ", " + m2.m[0][1] + ", " + m2.m[0][2] + "\n";
	str +=    m2.m[1][0] + ", " + m2.m[1][1] + ", " + m2.m[1][2] + "\n";
	str +=    m2.m[2][0] + ", " + m2.m[2][1] + ", " + m2.m[2][2] + "\n";
	
	alert(str); 
	
	var m3 = m2.submatrix(1,0);
	
	str = 	m3.m[0][0] + ", " + m3.m[0][1] + "\n";
	str +=    m3.m[1][0] + ", " + m3.m[1][1] + "\n";
	
	alert(str); 
}

function test4()	{ // p35 determinant()

	var m = createMatrix(3,3);

	m.m[0][0] = 3, m.m[0][1] = 5, m.m[0][2] = 0;
	m.m[1][0] = 2, m.m[1][1] = -1, m.m[1][2] = -7;
	m.m[2][0] = 6, m.m[2][1] = -1, m.m[2][2] = 5;                                                                                                                                                                                                                                                                                                                                                                                                                                             
	
	var result = determinant(m.submatrix(1, 0));
	alert(result);

}

function test5()	{ // p 36 - PASSED
	
	var m = createMatrix(3,3);

	m.m[0][0] = 3, m.m[0][1] = 5, m.m[0][2] = 0;
	m.m[1][0] = 2, m.m[1][1] = -1, m.m[1][2] = -7;
	m.m[2][0] = 6, m.m[2][1] = -1, m.m[2][2] = 5;
	
	var minor1 = minor(m, 0, 0);
	var cofactor1 = cofactor(m, 0,0);
	
	var minor2 = minor(m, 1,0);
	var cofactor2 = cofactor(m, 1,0);
	
	alert(	"minor1 = " + minor1 + "\n" +
			"cofactor1 = " + cofactor1 + "\n" +
			"minor2 = " + minor2 + "\n" +
			"cofactor2 = " + cofactor2);
}

function test6()	{ // 1st scenario on p37
	
	var m = createMatrix(3,3);

	m.m[0][0] = 1, m.m[0][1] = 2, m.m[0][2] = 6;
	m.m[1][0] = -5, m.m[1][1] = 8, m.m[1][2] = -4;
	m.m[2][0] = 2, m.m[2][1] = 6, m.m[2][2] = 4;
	
	var _cofactor1 = cofactor2(m,0,0);
	var _cofactor2 = cofactor2(m,0,1);
	var _cofactor3 = cofactor2(m,0,2);
	
	var _determinant = determinant2(m, 3)
	
	alert(	"cofactor1 = " + _cofactor1 + "\n" +
			"cofactor2 = " + _cofactor2 + "\n" +
			"cofactor3 = " + _cofactor3 + "\n" +
			"determinant = " + _determinant);
}

function test7()	{ // 2nd scenario on p37
	
var mat = [[-2, -8, 3, 5], 
           [-3, 1, 7, 3],
           [1, 2, -9, 6], 
           [-6, 7, 7, -9]
          ];

alert("Determinant of the matrix is : " + 
determinant(mat, N)); 

}

function test7b()	{
	
	var m = [[-2, -8, 3, 5], 
         [-3, 1, 7, 3],
         [1, 2, -9, 6], 
         [-6, 7, 7, -9]
        ];

		
	var r = 0;
	var c = 3;
	
	/*
	var sm = submatrix(m,r,c);
	
	var _minor = determinant(sm, sm.length);
	
	if (((r + c) % 2) != 0) // convert minor to cofactor
		_minor = -_minor;
	
	alert("cofactor = " + _minor);
	*/
	
	var res = cofactor(m, r, c);
	
	alert(res);
}

function test8()	{
	
	var m = [[-5, 2, 6, -8], 
         [1, -5, 1, 8],
         [7, 7, -6, -7], 
         [1, -3, 7, 4]
        ];
		
	var m2 = inverse(m);
	
	alert(m2[1][1]);
}

function test9()	{ // the final tet of chapter 3, p41
	
	var a = [[3, -9, 7, 3], 
         [3, -8, 2, -9],
         [-4, 4, 4, 1], 
         [-6, 5, -1, 1]
        ];

	var b = [[8, 2, 2, 2], 
         [3, -1, 7, 0],
         [7, 0, 5, 4], 
         [6, -2, 0, 5]
        ];
	
	var c = m_multiply(a,b);
	
	var res = m_multiply(c, inverse(b));
	
	alert(res[2][0]);
	
	//m_multiply(m1, m2)
}


function test_sm()	{ // SUBMATRIX(...) WORKS

	var m = createMatrix(4,4);
	
	m.m[0][0] = -2, m.m[0][1] = -8, m.m[0][2] = 3, m.m[0][3] = 5;
	m.m[1][0] = -3, m.m[1][1] = 1, m.m[1][2] = 7, m.m[1][3] = 3;
	m.m[2][0] = 1, m.m[2][1] = 2, m.m[2][2] = -9, m.m[2][3] = 6;
	m.m[3][0] = 6, m.m[3][1] = 7, m.m[3][2] = 7, m.m[3][3] = -9;

	m = submatrix(m, 1, 1);
	
	var str = m.m[0][0] + ", " + m.m[0][1] + ", " + m.m[0][2] + "\n";
	str +=    m.m[1][0] + ", " + m.m[1][1] + ", " + m.m[1][2] + "\n";
	str +=    m.m[2][0] + ", " + m.m[2][1] + ", " + m.m[2][2] + "\n";	

	alert(str);
	
	m = submatrix(m,1,1);	
	
	str = m.m[0][0] + ", " + m.m[0][1] + "\n";
	str +=    m.m[1][0] + ", " + m.m[1][1] + "\n";

	alert(str);
}

function quick_mod_test()	{
	
	if (((0) % 2) == 0)
		alert("yeah!");
}

function test45a()	{
	
	var transform = translation(5, -3, 2);
	var p = point(-3, 4, 5);
	
	var p2 = multiply_tuple_by_matrix(transform, p);
	
	alert("x = " + p2.x + "\ny = " + p2.y + "\nz = " + p2.z + "\nw = " + p2.w);
}

function test45b()	{
	
	var transform = translation(5, -3, 2);
	var inv = inverse(transform);
	
	var p = point(-3, 4, 5);
	
	var p2 = multiply_tuple_by_matrix(inv, p);
	
	alert("x = " + p2.x + "\ny = " + p2.y + "\nz = " + p2.z + "\nw = " + p2.w);
}

function test45c()	{
	
	var transform = translation(5, -3, 2);
	var v = vector(-3, 4, 5);
	
	var v2 = multiply_tuple_by_matrix(transform, v);
	
	alert("x = " + v2.x + "\ny = " + v2.y + "\nz = " + v2.z + "\nw = " + v2.w);
}

function test46a()	{
	
	var transform = scaling(2, 3, 4);
	var p = point(-4, 6, 8);
	
	var p2 = multiply_tuple_by_matrix(transform, p);

	alert("x = " + p2.x + "\ny = " + p2.y + "\nz = " + p2.z + "\nw = " + p2.w);	
}

function test46b()	{
	
	var transform = scaling(2, 3, 4);
	var v = vector(-4, 6, 8);
	
	var v2 = multiply_tuple_by_matrix(transform, v);

	alert("x = " + v2.x + "\ny = " + v2.y + "\nz = " + v2.z + "\nw = " + v2.w);	
}

function test46c()	{
	
	var transform = scaling(2, 3, 4);
	var inv = inverse(transform);
	
	var v = vector(-4, 6, 8);
	
	var res = multiply_tuple_by_matrix(inv, v);
	
	alert("x = " + res.x + "\ny = " + res.y + "\nz = " + res.z + "\nw = " + res.w);	
}

function test47a()	{
	
	var p = point(2, 3, 4);
	
	var p2 = reflect_around_axis(p, "z");
	
	alert(p2.z);	
}

function test48()	{
	
	var p = point(0,1,0);
	
	var hq = rotation_x(Math.PI / 4, true); // reverse rotation, p49a
	var fq = rotation_x(Math.PI / 2);
	
	var r_hq = multiply_tuple_by_matrix(hq, p);
	var r_fq = multiply_tuple_by_matrix(fq, p);	
	
	r_hq = sn_round(r_hq);
	
	debugger;
}

function test52()	{
	
	var transform = shearing(1,0,0,0,0,0);
	
	var p = point(2, 3, 4);
	
	var res = multiply_tuple_by_matrix(transform, p);
	
	alert("x = " + res.x + "\ny = " + res.y + "\nz = " + res.z + "\nw = " + res.w);		
	
}

function test54()	{ // PASSED
	
	var p = point(1,0,1);
	var A = rotation_x(Math.PI / 2);
	var B = scaling(5, 5, 5);
	var C = translation(10, 5, 7);
	
	var T;
	
	T = m_multiply(B, A);
	T = m_multiply(C, T);
	var res = multiply_tuple_by_matrix(T, p);
	
	alert("x = " + res.x + "\ny = " + res.y + "\nz = " + res.z + "\nw = " + res.w);		
	debugger;
}

function showTime()	{

	alert(new Date());
}



function test58b()	{
	
	var r = new ray(point(2, 3, 4), vector(1, 0, 0));
	
	var pos = position(r, 2.5);
	
	debugger;
	
}

function test60a()	{ // PASSED
	
	var r = new ray(point(0,1,-5), vector(0,0,1));
	var s = new sphere();
	
	var xs = intersect(s, r);
	
	debugger;
}

function test60b()	{
	
	var r = new ray(point(0,2,-5), vector(0,0,1));
	var s = new sphere();
	
	var xs = intersect(s, r);
	
	debugger;
}

function test61()	{ // PASSED
	
	var r = new ray(point(0,0,0), vector(0,0,1));
	var s = new sphere();
	
	var xs = intersect(s, r);
	
	debugger;
}

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

function test65c()	{
	
	var s = new sphere();
	var i1 = new intersection(s, -2);
	var i2 = new intersection(s, -1);
	
	var xs = intersections(i2, i1);
	
	var i = hit(xs);
	
	debugger;
}

function test66()	{
	
	var s = new sphere();
	var i1 = new intersection(s, 5);
	var i2 = new intersection(s, 7);
	var i3 = new intersection(s, -3);
	var i4 = new intersection(s, 2);
	
	var xs = intersections(i1, i2, i4, i3);
	
	var i = hit(xs);
	
	debugger;
}

function test68copyObj()	{
	
	var r1 = new ray(point(0,0,1), vector(1,2,3));
	var r2;
	
	r2 = copyObj(r1);
	
	var msg = 	"r1.direction.z == " + r1.direction.z + "\n" +
				"r2.direction.z == " + r2.direction.z + "\n" +
				"\n" + 
				"r2.direction.z = " + (r2.direction.z = 4) + "\n" +
				"r1.direction.z == " + r1.direction.z;
				
	alert(msg);
	
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

function test69d()	{
	
	var s = new sphere();
	var t = translation(2,3,4);
	set_transform(s, t);
	
	debugger;
}

function test69e()	{

	var r = new ray(point(0,0,-5), vector(0,0,1));
	var s = new sphere();
	set_transform(s, scaling(2,2,2));
	
	var xs = intersect(s, r);
	
	debugger;
}

function test70()	{
	
	var r = new ray(point(0,0,-5), vector(0,0,1));
	var s = new sphere();
	set_transform(s, translation(5,0,0));
	
	var xs = intersect(s, r);
	
	debugger;
}

function test78de()	{
	
	var p = Math.sqrt(3);
	var s = new sphere();
	var n = normal_at(s, point(p/3, p/3, p/3));
	
	debugger;
}

function test80b()	{
	
	var sr2 = Math.sqrt(2);
	var s = new sphere();
	
	var m = m_multiply(scaling(1, 0.5, 1), rotation_z(Math.PI / 5));
	
	s.transform  = m;
	
	var n = normal_at(s, point(0, sr2/2, (-sr2)/2));
	
	debugger;
}

function test83a()	{
	
	var v = vector(1, -1, 0);
	var n = vector(0, 1, 0);
	
	var r = reflect(v, n);
	
	debugger;
}

function test83b()	{
	
	var sr2 = Math.sqrt(2);
	var v = vector(0, -1, 0);
	var n = vector(sr2/2, sr2/2, 0);
	
	var r = reflect(v, n);
	
	debugger;
}

function test86a()	{ // PASS
	
	var m = new material();
	var position = point(0, 0, 0);
	
	var eyev = vector(0,0,-1);
	var normalv = vector(0,0,-1);
	var _color = colour();
	_color.x = 1;
	_color.y = 1;
	_color.z = 1;
	
	var light = new point_light(point(0,0,-10), _color);
	
	var res = lighting(m, light, position, eyev, normalv);
	
	res = sn_round(res);
	
	debugger;
}

function test86b()	{ // PASS
	
	var m = new material();
	var position = point(0,0,0);
	
	var eyev = vector(0, Math.SQRT2/2, Math.SQRT2/2);
	var normalv = vector(0,0,-1);
	var _color = colour();
	_color.x = 1;
	_color.y = 1;
	_color.z = 1;
	
	var light = new point_light(point(0,0,-10), _color);
	
	var res = lighting(m, light, position, eyev, normalv);
	
	debugger;
}

function test87a()	{ // PASS
	
	var m = new material();
	var position = point(0,0,0);
	
	var eyev = vector(0,0,-1);
	var normalv = vector(0,0,-1);
	var _color = colour();
	_color.x = 1;
	_color.y = 1;
	_color.z = 1;
	
	var light = new point_light(point(0,10,-10), _color);
	
	var res = lighting(m, light, position, eyev, normalv);
	
	debugger;
}

function test87b()	{
	
	var m = new material();
	var position = point(0,0,0);
	
	var eyev = vector(0,-(Math.SQRT2/2),-(Math.SQRT2/2));
	var normalv = vector(0,0,-1);
	var _color = colour();
	_color.x = 1;
	_color.y = 1;
	_color.z = 1;
	
	var light = new point_light(point(0,10,-10), _color);
	
	var res = lighting(m, light, position, eyev, normalv);
	
	debugger;
}

function test88()	{ // TODO
	
	var m = new material();
	var position = point(0,0,0);
	
	var eyev = vector(0,0,-1);
	var normalv = vector(0,0,-1);
	var _color = colour();
	_color.x = 1;
	_color.y = 1;
	_color.z = 1;
	
	var light = new point_light(point(0,0,10), _color);
	
	var res = lighting(m, light, position, eyev, normalv);
	
	debugger;
}

function test92c()	{
	
	var w = default_world();
	var r = new ray(point(0,0,-5), vector(0,0,1));
	
	var xs = intersect_world(w, r);
	
	debugger;
}

function test93()	{
	
	var r = new ray(point(0,0,-5), vector(0,0,1));
	var shape = new sphere();
	
	var i = new intersection(shape, 4);
	
	var comps = prepare_computations(i, r);
	
	debugger;
}

function test94()	{
	
	var r = new ray(point(0,0,-5), vector(0,0,1));
	var shape = new sphere();
	
	var i = new intersection(shape, 4);
	
	var comps = prepare_computations(i, r);
	
	debugger;
}

function test95a()	{
	
	var r = new ray(point(0,0,0), vector(0,0,1));
	var shape = new sphere();
	
	var i = new intersection(shape, 1);
	
	var comps = prepare_computations(i, r);
	
	debugger;
}

function test95b()	{
	
	var w = default_world();
	
	
	var r = new ray(point(0,0,-5), vector(0,0,1));
	
	var shape = w.objects[0];
	
	var i = new intersection(shape, 4);
	
	var comps = prepare_computations(i, r);
	
	var c = shade_hit(w, comps)
	
	debugger;
}

function test95c()	{
	
	var w = default_world();
	w.light = new point_light(point(0,0.25,0), colour(1,1,1));
	
	var r = new ray(point(0,0,0), vector(0,0,1));
	var shape = w.objects[1];
	var i = new intersection(shape, 0.5);
	
	var comps = prepare_computations(i, r);
	
	var c = shade_hit(w, comps);
	
	debugger;
}

function test96b()	{ // PASSED
	
	var w = default_world();
	var r = new ray(point(0,0,-5), vector(0,0,1));
	
	var c = color_at(w, r);
	
	debugger;
}

function test98a()	{ // PASSED
	
	var from = point(0,0,0);
	var to = point(0,0,-1);
	var up = vector(0,1,0);
	
	var t = view_transform(from, to, up);
	
	debugger;
}

function test98b()	{ // PASSED
	
	var from = point(0,0,0);
	var to = point(0,0,1);
	var up = vector(0,1,0);	
	
	var t = view_transform(from, to, up);
	
	debugger;
}

function test99b()	{ // PASSED 
	
	var from = point(1,3,2);
	var to = point(4,-2,8);
	var up = vector(1,1,0);
	
	var t = view_transform(from, to, up);
	
	debugger;
}

function ch7final107()	{
	
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	
	var c = new camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(0.65,0.65,0.65));
	
	c.transform = view_transform(point(0,1.5,-5),
								point(0,1,0),
								vector(0,1,0));
								
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
	
	console.log("COMPLETED.\n");
	//debugger;
}

function test110()	{
	 
	var m = new material()
	var position = point(0,0,0)
	
	var eyev = vector(0,0,-1)
	var normalv = vector(0,0,-1);
	var light = new point_light(point(0,0,-10), colour(1,1,1))
	
	//debugger;
	
	var in_shadow = true
	var result = lighting(m, light, position, eyev, normalv, in_shadow)
	
	debugger
	
}

function test111()	{
	
	var w = default_world()
	var p = point(0,10,0)
	
	var res = is_shadowed(w,p)
	
	debugger
}

function test112a()	{
	
	var w = default_world()
	var p = point(10, -10, 10)
	
	var res = is_shadowed(w,p)
	
	debugger
}

function test120a()	{
	
	var r = new ray(point(0,0,-5), vector(0,0,1))
	var s = new Shape()
	
	set_transform(s, scaling(2,2,2))
	
	var xs = intersect(s, r)
	
	debugger
	
}

function test120b()	{
	
	var r = new ray(point(0,0,-5), vector(0,0,1))
	var s = new Shape()
	
	set_transform(s, translation(5,0,0))
	
	var xs = intersect(s, r)
	
	debugger
	
}

function test121b()	{
	
	var s = new Shape()
	var m = m_multiply(scaling(1, 0.5, 1), rotation_z(Math.PI/5))
	
	set_transform(s, m)
	
	var n = normal_at(s, point(0, Math.sqrt(2)/2, -(Math.sqrt(2)/2)))
	
	debugger
	
}

function test123a()	{
	
	var p = plane()
	
	var r = new ray(point(0,0,0), vector(0,0,1))
	
	var xs = p.local_intersect(r)
	
	debugger
}

function test123c()	{
	
	var p = plane()
	var r = new ray(point(0,1,0), vector(0,-1,0))
	
	var xs = p.local_intersect(r)
	
	debugger
}

function ch9()	{
	
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new camera(WIDTH, HEIGHT, Math.PI/2);
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



function test152()	{ // PASSED
	
	var A = glass_sphere()
	A.transform = scaling(2, 2, 2)
	A.material.refractive_index = 1.5
	//A.id = "A"
	
	var B = glass_sphere()
	B.transform = translation(0,0,-0.25)
	B.material.refractive_index = 2.0
	//B.id = "B"
	
	var C = glass_sphere()
	C.transform = translation(0,0,0.25)
	C.material.refractive_index = 2.5
	//C.id = "C"
	
	var r = new ray(point(0,0,-4), vector(0,0,1))
	
	var iA = new intersection(A, 2), iB = new intersection(B, 2.75), iC = new intersection(C, 3.25);
	var iB2 = new intersection(B, 4.75), iC2 = new intersection(C, 5.25), iA2 = new intersection(A, 6);
	
	var xs = intersections(iA, iB, iC, iB2, iC2, iA2)
	
	
	var index = 0;
	
	while(index<6)	{
		
		var comps = prepare_computations(xs[index++], r, xs)
		console.log("n1 = " +  comps.n1 + ", n2 = " + comps.n2 + "\n"); // at each iteration, check comps.n1 and comps.n2 for correct values
	}

}

function testArrayClean()	{
	
	var arr = [1, 2, "", undefined, null, ,7]
	arr = removeNullEntries2(arr)
	console.log(arr)
}

function test158()	{ // ?PASSED?, z/b component of c is fractionally off
	
	var w = default_world()
	var A = w.objects[0]
	
	A.material.ambient = 1.0
	A.material.pattern = test_pattern()
	
	var B = w.objects[1]
	B.material.transparency = 1.0
	B.material.refractive_index = 1.5
	
	var r = new ray(point(0,0,0.1), vector(0,1,0))
	
	var iA = new intersection(A, -0.9899), iB = new intersection(B, -0.4899), iB2 = new intersection(B, 0.4899)
	var iA2 = new intersection(A, 0.9899)
	
	var xs = intersections(iA, iB, iB2, iA2)
	
	var comps = prepare_computations(xs[2], r, xs)
	
	var c = refracted_color(w, comps, 5)
	
	debugger
	
}

function test159()	{ // SUCCESS
	
	var w = default_world()
	var floor = plane()
	floor.transform = translation(0,-1,0)
	floor.material.transparency = 0.5
	floor.material.refractive_index = 1.5
	w.objects.push(floor)
	
	var ball = sphere()
	ball.material.color = colour(1,0,0)
	ball.material.ambient = 0.5
	ball.transform = translation(0,-3.5,-0.5)
	w.objects.push(ball)
	
	var r = new ray(point(0,0,-3), vector(0, -(Math.sqrt(2)/2), Math.sqrt(2)/2))
	
	var xs = intersections(new intersection(floor, Math.sqrt(2)))
	
	var comps = prepare_computations(xs[0], r, xs)
	
	var col = shade_hit(w, comps, 5)
	
	debugger;
}

function test161()	{ // SUCCESS
	
	var shape = glass_sphere()
	var r = new ray(point(0,0,Math.sqrt(2)/2), vector(0,1,0))
	var xs = intersections(new intersection(shape, -(Math.sqrt(2)/2)), new intersection(shape, Math.sqrt(2)/2))
	
	var comps = prepare_computations(xs[1], r, xs)
	
	//debugger;
	
	var reflectance = schlick(comps)
	
	debugger;
}

function test162()	{ // PASS
	
	var shape = glass_sphere()
	var r = new ray(point(0,0,0), vector(0,1,0))
	var xs = intersections(new intersection(shape, -1), new intersection(shape, 1))
	
	var comps = prepare_computations(xs[1], r, xs)
	
	var reflectance = schlick(comps)
	
	debugger;
}

function test163()	{ // PASS
	
	var shape = glass_sphere()
	var r = new ray(point(0,0.99,-2), vector(0,0,1))
	var xs = intersections(new intersection(shape, 1.8589))
	
	var comps = prepare_computations(xs[0], r, xs)
	var reflectance = schlick(comps)
	
	debugger;
}

// PASSED
function test164()	{
	
	var w = default_world()
	var r = new ray(point(0,0,-3), vector(0, -Math.sqrt(2)/2, Math.sqrt(2)/2))

	var floor = plane()
	floor.transform = translation(0,-1,0)
	floor.material.reflective = 0.5
	floor.material.transparency = 0.5
	floor.material.refractive_index = 1.5
	
	w.objects.push(floor)
	
	var ball = sphere()
	ball.material.color = colour(1,0,0)
	ball.material.ambient  = 0.5
	ball.transform = translation(0, -3.5, -0.5)
	
	w.objects.push(ball)
	
	var xs = intersections(new intersection(floor, Math.sqrt(2)))
	var comps = prepare_computations(xs[0], r, xs)
	
	//debugger;
	
	var c = shade_hit(w, comps, 5)
	
	debugger;
}

// PASSED
function test168()	{
	
	var c = cube();
	var r = []
	r.push(new ray(point(5, 0.5, 0), vector(-1,0,0)))
	r.push(new ray(point(-5, 0.5, 0), vector(1,0,0)))
	r.push(new ray(point(0.5, 5, 0), vector(0,-1,0)))
	r.push(new ray(point(0.5, -5, 0), vector(0,1,0)))
	r.push(new ray(point(0.5, 0, 5), vector(0,0,-1)))
	r.push(new ray(point(0.5, 0, -5), vector(0,0,1)))
	r.push(new ray(point(0, 0.5, 0), vector(0,0,1)))
	
	for (var i = 0; i<r.length; i++)	{
		
		var xs = c.local_intersect(r[i])
		console.log("t1 = " + xs[0].t + ", t2 = " + xs[1].t + "\n")
	}
}

function test173()	{
	
	var c = cube()
	
	var p = []
	p.push(point(1,0.5,-0.8))
	p.push(point(-1,-0.2,0.9))
	p.push(point(-0.4,1,-0.1))
	p.push(point(0.3,-1,-0.7))
	p.push(point(-0.6,0.3,1))
	p.push(point(0.4,0.4,-1))
	p.push(point(1,1,1))
	p.push(point(-1,-1,-1))
	
	var v;
	
	for (var i = 0; i < p.length; i++)	{
		
		v = c.local_normal_at(p[i])
		
		console.log(i+". x:" + v.x + ", y: " + v.y + ", z: " + v.z + "\n");
	}
}

function ch12()	{
	
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(1,1,1));
	
	c.transform = view_transform(point(0,1,-5), // from
								point(0,1,0),   // to
								vector(0,1,0)); // up
							

	
	var middle = sphere();
	middle.transform = translation(-0.5, 1, 0.5);
	middle.material = new material();
	middle.material.color = colour(0.1, 1, 0.5);
	middle.material.diffuse = 0.3;
	middle.material.specular = 0.7;
	middle.material.pattern = stripe_pattern(colour(0.5, 0.5, 0.5), colour (0,0,0))
	middle.material.reflective = 0;
	
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
	left.material.diffuse = 0.5
	left.material.specular = 0.7
	left.material.reflective = 0
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

function test180()	{
	// PASSED
	var cyl = cylinder()
	
	var vp = []
	
	vp[0] = []
	vp[0].push(point(1,0,-5)); vp[0].push(vector(0,0,1));
	
	vp[1] = []
	vp[1].push(point(0,0,-5)); vp[1].push(vector(0,0,1));
	
	vp[2] = []
	vp[2].push(point(0.5,0,-5)); vp[2].push(vector(0.1,1,1));
	
	for (var i = 0; i < vp.length; i++)	{
		
		var dir = normalize(vp[i][1])
		var r = new ray(vp[i][0], dir)
		
		var xs = cyl.local_intersect(r)
		
		if (xs.length != 2)	{
			
			console.log("Error!\n");
			debugger;
			return;
			
		}
		
		console.log("xs[0].t = " + xs[0].t + ", xs[1].t = " + xs[1].t + "\n"); 
	}
	
}

function test181()	{
	
	
}

function test182()	{
	// PASSED
	var cyl = cylinder()
	cyl.min = 1
	cyl.max = 2
	
	var vp = []
	
	vp[0] = []
	vp[0].push(point(0,1.5,0)); vp[0].push(vector(0.1,1,0));
	vp[1] = []
	vp[1].push(point(0,3,-5)); vp[1].push(vector(0,0,1));
	vp[2] = []
	vp[2].push(point(0,0,-5)); vp[2].push(vector(0,0,1));
	vp[3] = []
	vp[3].push(point(0,2,-5)); vp[3].push(vector(0,0,1));
	vp[4] = []
	vp[4].push(point(0,1,-5)); vp[4].push(vector(0,0,1));
	vp[5] = []
	vp[5].push(point(0,1.5,-2)); vp[5].push(vector(0,0,1));
	
	for (var i = 0; i < vp.length; i++)	{
		
		var dir = normalize(vp[i][1])
		var r = new ray(vp[i][0], dir)
		var xs = cyl.local_intersect(r)
		
		console.log("xs.count = " + xs.length + "\n")
	}
}

function test185()	{
	// PASSED
	
	var c = cylinder()
	c.min = 1
	c.max = 2
	c.closed = true
	
	var pv = []
	pv[0] = []
	pv[0].push(point(0,3,0)); pv[0].push(vector(0,-1,0));
	pv[1] = []
	pv[1].push(point(0,3,-2)); pv[1].push(vector(0,-1,2));
	pv[2] = []
	pv[2].push(point(0,4,-2)); pv[2].push(vector(0,-1,1));
	pv[3] = []
	pv[3].push(point(0,0,-2)); pv[3].push(vector(0,1,2));
	pv[4] = []
	pv[4].push(point(0,-1,-2)); pv[4].push(vector(0,1,1));
	
	for (var i = 0; i < pv.length; i++)	{
		
		var dir = normalize(pv[i][1])
		var r = new ray(pv[i][0], dir)
		//debugger;
		var xs = c.local_intersect(r)
		
		console.log((i+1) + ": xs.count = " + xs.length + "\n")
	}
	
}


function test187()	{
	// PASSED
	
	var cyl = cylinder()
	cyl.min = 1
	cyl.max = 2
	cyl.closed = true
	
	var p = []
	p.push(point(0,1,0))
	p.push(point(0.5,1,0))
	p.push(point(0,1,0.5))
	p.push(point(0,2,0))
	p.push(point(0.5,2,0))
	p.push(point(0,2,0.5))
	
	for (var i = 0; i < p.length; i++)	{
		
		var n = cyl.local_normal_at(p[i])
		console.log("vector(" + n.x + ", "+n.y + ", "+n.z+")\n")
		
	}
}

function test189()	{
	// PASSED
	var s = cone()
	
	var pv = []
	
	pv[0] = []
	pv[0].push(point(0,0,-5)); pv[0].push(vector(0,0,1));
	
	pv[1] = []
	pv[1].push(point(0,0,-5)); pv[1].push(vector(1,1,1));	
	
	pv[2] = []
	pv[2].push(point(1,1,-5)); pv[2].push(vector(-0.5,-1,1));
	
	for(var i = 0; i < pv.length; i++)	{
		
		var dir = normalize(pv[i][1])
		var r = new ray(pv[i][0], dir)
		var xs = s.local_intersect(r)
		
		console.log("xs.length = " + xs.length + "\n")
		console.log("xs[0].t = " + xs[0].t + ",\txs[1].t = " + xs[1].t + "\n")	
	}
}

function test190a()	{
	// PASSED
	var s = cone()
	var dir = normalize(vector(0,1,1))
	var r = new ray(point(0,0,-1), dir)
	var xs = s.local_intersect(r)
	
	debugger;
}

function test190b()	{
	
	var s = cone()
	s.min = -0.5
	s.max = 0.5
	s.closed = true
	
	var pv = []
	
	pv[0] = []
	pv[0].push(point(0,0,-5)); pv[0].push(vector(0,1,0));

	pv[1] = []
	pv[1].push(point(0,0,-0.25)); pv[1].push(vector(0,1,1));
	
	pv[2] = []
	pv[2].push(point(0,0,-0.25)); pv[2].push(vector(0,1,0));
	
	for (var i = 0; i < pv.length; i++)	{
		
		var dir = normalize(pv[i][1])
		var r = new ray(pv[i][0], dir)
		
		var xs = s.local_intersect(r)
		
		console.log("xs.count = " + xs.length + "\n");
	}
}

function test190c()	{
	// PASSED
	
	var s = cone()
	var p = []
	p[0] = point(0,0,0)
	p[1] = point(1,1,1)
	p[2] = point(-1,-1,0)
	
	var n1 = s.local_normal_at(p[0])
	var n2 = s.local_normal_at(p[1])
	var n3 = s.local_normal_at(p[2])

	debugger;
}

function ch13()	{
	
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new camera(WIDTH, HEIGHT, Math.PI/2);
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

function test196()	{
	// PASSED
	var g = group()
	var s1 = sphere("s1")
	var s2 = sphere("s2")
	var s3 = sphere("s3")
	
	s2.transform = translation(0,0,-3)
	s3.transform = translation(5,0,0)
	
	g.addChild(s1)
	g.addChild(s2)
	g.addChild(s3)
	
	var r = new ray(point(0,0,-5), vector(0,0,1))
	
	var xs = g.local_intersect(r)
	
	debugger;
}

function test198b()	{
	
	var g1 = group()
	g1.transform = rotation_y(Math.PI/2)
	
	var g2 = group()
	g2.transform = scaling(1,2,3)
	
	g1.addChild(g2)
	
	var s = sphere()
	s.transform = translation(5,0,0)
	
	g2.addChild(s)
	
	var n = normal_to_world(s, vector(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3))
	
	debugger;
	
}

function ch14()	{
	
	clearInterval(loop);
	ctx.fillStyle = BG_COLOR;
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);	
	
	var c = new camera(WIDTH, HEIGHT, Math.PI/2);
	var w = new world();
	
	w.light = new point_light(point(-10, 10, -10), colour(1,1,1));
	
	c.transform = view_transform(point(0,2,-5), // from
								point(0,0,0),   // to
								vector(0,1,1)); // up
								
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