

		/**
		if (line.substring(0,"Sphere:".length)=="Sphere:")
			section = "sphere"
		else if (line.substring(0,"Plane:".length)=="Plane:")
			section = "plane"
		else if (line.substring(0,"Triangle:".length)=="Triangle:")
			section = "triangle"
		else if (line.substring(0,"Cube:".length)=="Cube:")
			section = "cube"
		else if (line.substring(0,"Cone:".length)=="Cone:")
			section = "cone"
		else if (line.substring(0,"Cylinder:".length)=="Cylinder:")
			section = "cylinder"
		else if (line.substring(0,"Group:".length)=="Group:")
			section = "group"
		
		else if (line.substring(0,"Camera:".length)=="Camera:")
			section = "camera"
		else if (line.substring(0,"Light:".length)=="Light:")
			section = "light"
			
		else // inside a section, or a comment, or empty line, or SOF/EOF ("---","...")
			section = "other"
			
		switch(section)	{
		
		}
		*/