function shade_hit(w, comps, obj, remaining)	{
	//console.log("shade::shade_hit()::remaining = " + remaining);
	
	var material = comps.object.material
	
	var is = is_shadowed(w, comps.over_point)
	
	var s = lighting(comps.object.material, w.light, comps.object, comps.over_point, comps.eyev, comps.normalv, is, 0)
	//console.log("shade_hit(): s = r:"+s.x+", g:" + s.y + ", b:"+s.z+"\n");
	var reflected = reflected_color(w, comps, remaining-1)
	//console.log("shade_hit(): reflected = r:"+reflected.x+", g:" + reflected.y + ", b:"+reflected.z+"\n");
	var refracted = refracted_color(w, comps, remaining)
	//console.log("shade_hit(): refracted = r:"+refracted.x+", g:" + refracted.y + ", b:"+refracted.z+"\n");
	//var reflected = colour(0,0,0)
	//var refracted = colour(0,0,0)
	
	if ((material.reflective > 0) && (material.transparency > 0))	{
		console.log("shade.js::shade_hit(...):Transparent & Reflective.\n")
		
		var reflectance = schlick(comps)
		
		// return surface + reflected * reflectance + refracted * (1 - reflectance)
		var res = multiplyInt(refracted, 1 - reflectance)
		res = add(multiplyInt(reflected, reflectance), res)
		res = add(s, res)
		
		return res;
	}
	
	return add(s, add(reflected, refracted))
}

function color_at(w, r, remaining)	{
	
	//console.log("shade::color_at()::remaining = " + remaining);
	
	if (remaining <= 0)
		return colour(0,0,0)
	
	if (r == undefined)
		console.log("shade::color_at() has an undefined ray.\n");
	
	var intersections = intersect_world(w, r)
	var h = hit(intersections)
	if (!h)
		return colour(0,0,0)

	var comps = prepare_computations(h, r, intersections)
	
	return shade_hit(w, comps, h.object, remaining-1)
}

function is_shadowed(w, p)	{
	
	var v = subtract(w.light.position, p)
	var dist = magnitude(v)
	var dir  = normalize(v)
	
	var r = new ray(p, dir)
	
	var i = intersect_world(w, r)
	// i contains [] of objects intersected with. If i.object.material.casts_shadow == false, remove entry from i
	
	for (var a = 0; a < i.length; a++)
		if (!i[a].object.material.casts_shadow)	{
			
			i.splice(a, 1)
			--a;
		}
	
	var h = hit(i)
	
	if (h && (h.t < dist))
		return true
	
	return false
}

function refracted_color(w, comps, remaining)	{
	
	if (comps.object.material.transparency == 0)
		return colour(0,0,0)
	
	if (remaining<=0)
		return colour(0,0,0)
	
	var n_ratio = comps.n1 / comps.n2
	
	// cos(theta_i) is the same as the dot product of the 2 vectors
	var cos_i = dot(comps.eyev, comps.normalv)
	
	// find sin(theta_t)^2 via trigonometric identity
	var sin2_t = (n_ratio ** 2) * (1 - (cos_i ** 2))
	
	if (sin2_t > 1) // total internal reflection
		return colour(0,0,0)
	
	var cos_t = Math.sqrt(1.0 - sin2_t)
	
	// compute the dir of the refracted ray
	var direction = subtract(multiplyInt(comps.normalv, (n_ratio * cos_i - cos_t)), multiplyInt(comps.eyev, n_ratio))
	
	var refracted_ray = new ray(comps.under_point, direction)
	
	var col = multiplyInt(color_at(w, refracted_ray, remaining-1), comps.object.material.transparency)
	
	return col;
	
	
	return colour(1,1,1)
}

function schlick(comps)	{
	
	// find the cosine of the angle between the eye and normal vectors
	var cos = dot(comps.eyev, comps.normalv)
	
	// total internal reflection can only occur if n1 > n2
	if (comps.n1 > comps.n2)	{
		
		var n = comps.n1 / comps.n2
		var sin2_t = n**2 * (1.0 - cos**2)
		
		//console.log("shade.js::schlick(...): sin2_t = " + sin2_t + "\n");
		if (sin2_t > 1.0)
			return 1.0
	
		// compute cosine of theta_t using trig identity
		var cos_t = Math.sqrt(1.0 - sin2_t)
	
		// when n1 > n2, use cos(theta_t) instead
		cos = cos_t
	}
	
	var r0 = ((comps.n1 - comps.n2) / (comps.n1 + comps.n2)) ** 2
	
	var res = r0 + (1 - r0) * (1 - cos)**5
	
	return res
}