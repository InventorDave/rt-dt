function material()	{
	
	this.color = colour(1, 1, 1);
	this.ambient = 0.5;
	this.diffuse = 0.6;
	this.specular = 0.5;
	this.shininess = 100.0; // between 10.0 and 200.0, technically there is no upper limit
	this.reflective = 0.0;
	this.transparency = 0.0;
	this.refractive_index = 1.0;
	
	this.casts_shadow = true;
	
	this.pattern = undefined;
}