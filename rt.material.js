function material()	{
	
	this.color = colour(0, 1, 0);
	this.ambient = 0.1;
	this.diffuse = 0.9;
	this.specular = 0.9;
	this.shininess = 200.0; // between 10.0 and 200.0, technically there is no upper limit
	this.reflective = 0.0;
	this.transparency = 0.0;
	this.refractive_index = 1.0;
	
	this.casts_shadow = true;
	
	this.pattern = undefined;
}