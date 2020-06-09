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
	
	if (_material.pattern)	{
		
		clr = _material.pattern.color_at_object(obj, _point)
		
		//console.log("LIGHTING: r: " + clr.x + ", g: " + clr.y + ", b: " + clr.z)
	}
	else
		clr = _material.color
	
	//console.log("LIGHTING: r: " + clr.x + ", g: " + clr.y + ", b: " + clr.z)
	
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
		//console.log("light_dot_normal < 0 || in_shadow")
	}
	else	{

		//console.log("Compute diffuse & specular: obj = " + obj.id)
		// compute the diffuse contribution
		diffuse = multiplyInt(effective_color, _material.diffuse * light_dot_normal);
		
		
		/* reflect_dot_eye represents the cosine of the angle between the
		   reflection vector and the eye vector. A negative number means the
		   light reflects away from the eye.
		*/
		
		var neg_lightv = new tuple(-lightv.x, -lightv.y, -lightv.z, 0);
		var reflectv = reflect(neg_lightv, normalv);
		var reflect_dot_eye = dot(reflectv, eyev);
		
		if (reflect_dot_eye <= 0)	{
			
			specular = colour(0,0,0)
			//console.log("specular = 0")
		}
		else	{
			
			// compute the specular contribution
			var factor =  Math.pow(reflect_dot_eye, _material.shininess);
			
			//var res = _material.specular * factor;
			specular = multiplyInt(_light.intensity, _material.specular);
			specular = multiplyInt(specular, factor);
			
			//console.log("computed specular contribution");
			// the component values for specular printed are very low, negligble (<EPSILON)
		}
	}
	
	return add(ambient, add(diffuse, specular))
	//return ambient + diffuse + specular;
}