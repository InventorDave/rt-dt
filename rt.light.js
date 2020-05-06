// LIGHT

function point_light(position, intensity)	{
	
	this.position = position;
	this.intensity = intensity;
}

function colour(r, g, b)	{
	
	return new tuple(r, g, b, 2);
}

function lighting(_material, _light, obj, _point, eyev, normalv, in_shadow, f)	{
	
	var clr;
	
	if (_material.pattern)
		clr = _material.pattern.color_at_object(obj, _point)
	else
		clr = _material.color
	
	//console.log("light.js::lighting(...):clr = r:"+clr.x+", g:"+clr.y+", b:"+clr.z+"\n")
	
	// combine the surface color with the light's color/intensity
	var effective_color = multiply(clr, _light.intensity);
	
	// find the direction to the light source
	var lightv = normalize(subtract(_light.position, _point));
	
	// compute the ambient contribution
	var ambient = multiplyInt(effective_color, _material.ambient);
	
	/* light_dot_normal represents the cosine of the angle between the
	   light vector and the normal vector. A negative number means the 
	   light is on the other side of the surface.
	*/
	var diffuse = colour(0,0,0);
	var specular = colour(0,0,0);
	
	var light_dot_normal = dot(lightv, normalv);
	
	if (light_dot_normal < 0 || in_shadow)	{
		
		//diffuse = colour(0,0,0)
		//specular = colour(0,0,0)
	}
	else	{

		// compute the diffuse contribution
		var res = _material.diffuse * light_dot_normal;
		res = multiplyInt(effective_color, res);
		diffuse = res;
		
		/* reflect_dot_eye represents the cosine of the angle between the
		   reflection vector and the eye vector. A negative number means the
		   light reflects away from the eye.
		*/
		
		var neg_lightv = new tuple(-lightv.x, -lightv.y, -lightv.z, -lightv.w);
		var reflectv = reflect(neg_lightv, normalv);
		var reflect_dot_eye = dot(reflectv, eyev);
		
		if (reflect_dot_eye <= 0)	{
			
			specular = colour(0,0,0)
		}
		else	{
			
			// compute the specular contribution
			var factor = reflect_dot_eye **  _material.shininess;
			
			var res = _material.specular * factor;
			specular = multiplyInt(_light.intensity, res);
			
			//console.log("\tspecular:: r: " + specular.x + ", g: " + specular.y + ", b: " + specular.z + "\n");
			// When the above line is uncommented, the component values for specular printed are very low, negligble (<EPSILON)
		}
	}
	
	var res = colour(0,0,0);
	
	res = add(diffuse, specular);
	res = add(ambient, res);
	
	if (f)
		debugger;
	
	return res;
	//return ambient + diffuse + specular;
}