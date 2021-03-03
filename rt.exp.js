var STEP_X = 0, STEP_Y = 0, STEP_Z = 0, A = B = point(0,0,-20);
var M = m();

function STEP(A)    {
    var B = point(0,0,0); B.x = A.x - STEP_X; B.y = A.y - STEP_Y; B.z = A.z - STEP_Z; console.log("x: " + B.x + ", y: " + B.y + ", z: " + B.z); return B;
}

function calc(A, STEPS)    {
    STEP_X = A.x / STEPS; STEP_Y = A.y / STEPS; STEP_Z = A.z / STEPS; }
	
function test(A)    { if (A.x <= 0 && A.y <= 0 && A.z >= 0)    return true; else return false; }

function set(A)	{
	
	Data.c.setCTransform(view_transform(A, point(0,0,0)));
}

function setScene()	{
	
	var l = new point_light(point(-10,10,-10), colour(1,1,1))
	lights(l)
	
	var cb = cube()
	cb.material.color = colour(135/255,206/255,250/255)
	cb.transform = m().translation(0, 0, 0)
	
	var skyBox = getSkyBoxObject()
	if (!verify_SkyBoxObj(skyBox))	{
		
		var b = alert("SkyBox obj is not populated! Please fix.")
		return false
	}
	
	cb.material = SkyBoxMaterial(SkyBox(skyBox.left, skyBox.right, skyBox.front, skyBox.back, skyBox.up, skyBox.down))
	
	
	
	
	
	var s = sphere()
	s.transform = m().translation(2,2,2).scaling(2,2,2)
	s.material.color = convHexClr("88ff55")
	s.material.transparency = 0.7
	s.material.refractive_index = 1.5
	
	scene(cb, s)
	
		Data.c.setCTransform(view_transform(
										A = B,
										point(0,0,0) /**,
										vector(0,1,0) */
										)
						);
						
	M = m()
	M.t = B
	
	M = M.rotation_y(radians(22.5)).rotation_x(radians(45)).rotation_z(radians(66))
	
}

function next()	{
	
	A = STEP(A)
	set(A)
	test(A)
	renderImage()
}


function next2()	{

	
	
	A = multiply_matrix_by_tuple(M, A)
	
	A = round_t(A)
	set(A)
	
	//debugger;
	
	renderImage()

}

/**
setScene()


calc(A, 5)

	next()
   ^--
	opt: test(A)
*/

function checkShape(obj)	{
	
	return (obj == "cylinder" || obj == "triangle" || obj == "plane" || obj == "cube" || obj == "cone" || obj == "group" || obj == "sphere" || obj == "fir_branch" || false)
}


function collectMaterial(obj, s)	{
	
		if (!obj)
			return false;
			

		var t = new material()
		
		var ambient = obj.ambient || t.ambient
		
		var color;

		try	{
			
			color = colour(obj.color[0] || 0, obj.color[1] || 0, obj.color[2] || 0)
		}
		catch(e)	{
		
			color = colour(0,0,0)	
		}
		
		if (color.x == 0 && color.y == 0 && color.z == 0)
			color = colour(1,1,1);
		
		var specular = obj.specular || t.specular
		
		var diffuse = obj.diffuse || t.diffuse
		
		t = new material()
		
		t.ambient = ambient;
		
		
		t.color = color;
		t.specular = specular
		t.diffuse = diffuse;
		
		
		var _pattern;
		
		//debugger;
		
		try	{
			
			if (_pattern = collectPattern(obj.pattern, s))	{

				
			}
		}
		catch(e)	{
			
			console.log("!!pattern == " + !!_pattern)
			_pattern = null;
			//debugger;
			
		}
		
		return { material: t, pattern: _pattern };
}

function collectPattern(patt, s)	{
	
	/**
	      type: checkers
      colors:
        - [ 1, 1, 1 ]
        - [ 0.94, 0.94, 0.94 ]
      transform:
        - [ scale, 0.2, 0.2, 0.2 ]
	*/
	
	var type = patt.type;

	// console.log("WE ARE ADDING A PATTERN!")
	
	debugger;
	
	if (type=="checkers")	{
		
		var tm = TextureMap(
		
			checkers_pattern(
				2,
				2,
				colour(	patt.colors[0][0], 
						patt.colors[0][1], 
						patt.colors[0][2]
					  ),
				colour(	patt.colors[1][0],
						patt.colors[1][1],
						patt.colors[1][2]
					  )
			),
					  
			spherical_map,
			
			s
		);
		
		
		var p = my_pattern(tm);
		
		var tr = add_transform(patt.transform);
		
		p.transform = tr;
		
		// debugger; 
		
		return p;
		
	}
}

function add_transform(obj)	{
	
	var _M = m();
	
	for (var i = 0; i < obj.length; i++)	{
		
		var e = obj[i][0]
		var f = obj[i]
		
		
		switch(e)	{
			
			case "scale":
				_M = _M.scaling(f[1], f[2], f[3])
				break;
			
			case "rotate-x":
				_M = _M.rotation_x(f[1])
				break;
				
			case "rotate-y":
				_M = _M.rotation_y(f[1])
				break;
				
			case "translate":
				_M = _M.translation(f[1], f[2], f[3])
				break;
				
			case "rotate-z":
				_M = _M.rotation_z(f[1])
				break;
				
			default:
				console.log("Unable to identify to transform property!")
				throw new Error("COULD NOT identify transform property!");
				break;
		}
		
		
	}
	
	return _M;
}



function grabMaterial(j, s)	{
	
	var min = j.min || 0
	var max = j.max || 0
	
	var tr;
	
	j.transform ? tr = add_transform(j.transform) : tr = null ;
	
	//debugger;
	
	
	var j_mat = collectMaterial(j.material, s) || null
	
	//debugger;
	
	try	{
		
		j_mat.transform = tr;
	}
	catch(e)	{
		
		// just return j_mat
	}
	
	
	// debugger;
	
	return j_mat
	
	
}


function breakYAML()	{
	
	var o = group(), defines = [];
	
	for (var i = 0; i < Data.yaml.length; i++)	{
		
		var j = Data.yaml[i];
		
		var obj, defs = {}, mat = {};
		
		
		if (j.add == "camera")	{
				
			Data.c = new Camera(j.width, j.height, j["field-of-view"])
			var from = vector(j.from[0], j.from[1], j.from[2])
			var to   = vector(j.to[0], j.to[1], j.to[2])
				
			// debugger;
				
			Data.c.setCTransform(view_transform(from, to))	
				
		}
		else if (j.add == "light")	{
				
			Data.l = new point_light(point(j.at[0], j.at[1], j.at[2]), colour(j.intensity[0], j.intensity[1], j.intensity[2]))
				
		}
	
		else if (obj = j.add)	{
				
			var sh;
				
			if (checkShape(obj))	{
					
				sh = eval(obj + "()")
				//console.log("Shape == " + obj);
					
			}
			
			else	{
					
				console.log("Shape not recognised: " + obj)
			}
				
			try	{
					
				sh.material = j.material
			}
				
			catch(e)	{ // ERROR ADDING MATERIAL!!
					
				console.log("Error adding material!!")
			}
				
			// debugger;
				
			var res;
			
			try	{
				
				res = grabMaterial(j, sh);
				
				sh.transform = res.transform || identity_matrix()
				
				sh.material = res.material
				sh.material.pattern = res.pattern  || null
			
			}
			
			catch(e)	{
				
				console.log("Shape has no material defined: " + j.add)
			}
			
			
			var a_tr;
			
			j.transform ? a_tr = add_transform(j.transform) : a_tr = null ;
				
			sh.transform = sh.transform || a_tr;
				
			o.addChild(sh);
		}
	
		else if (mat = j.define)	{
				
				console.log("j.define set!")
				defs[mat] = collectMaterial(j.value)
		}
			
		else	{	// ERROR :Unable to parse YAML object, fo shizzle!
			
			throw new Error("Unable to parse YAML object, fo shizzle!")
		}
			
	}
	
	Data.o = o;
	
	debugger;
	
}

