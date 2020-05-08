

var flag17 = false;
function convert3(vertices)	{

	// vertices[] - check for invalid entries for both teapot(checked) and man
	if(flag17)
		debugger;
	
	var obj = [], v2 = [], vn2 = [];
	var x, y, z;
	
	// CONVERT VERTICES (1-BASED OFFSETS INTO OFDATA.V[]) INTO SIZE(N) POINT()'S
	for (var m = 0; m < vertices.length/* - 1 */; m++)	{
		
		var vdata = ofData["v"][vertices[m][0]-1];
		var vndata =ofData["vn"][vertices[m][1]-1];
		
		if(flag17)
			debugger;
		
		if(!vdata)  // hack for invalid final entry, basically accounts for leading/trailing ws in man obj file "f" entries
			continue;
		
		x = vdata[0];
		y = vdata[1];
		z = vdata[2];
		
		v2.push(point(x,y,z));
		
		// the if-clause is a hack to support teapot format, with no vertice_normal data
		if(vndata)	{
			x = vndata[0], y = vndata[1], z = vndata[2];
		}
		else	{
			x = undefined, y = undefined, z = undefined;
		}
		
		vn2.push(vector(x,y,z))
			
	}
	
	
	if(flag17)
		debugger;
	
	var ts = fan_triangulation(v2, vn2)

	
	for (var i = 0; i < ts.length; i++)
		if (ts[i])	{
			
			ts[i].material.color = colour(1,0,0)//colour(255,105,180); // #FFB6C1
			obj.push(ts[i])
		}
	
	return obj
}

function parse_obj_file()	{
	
	// use global OBJFILECONTENTS
	if (!OBJFILECONTENTS)
		throw new Error("No obj file contents available!")
	
	var ignored_lines = 0;
	var lines = OBJFILECONTENTS.split("\n")
	
	ofDataR.f_begins = 0
	ofDataR.v_begins = 0
	ofDataR.vn_begins = 0
	ofDataR.vt_begins = 0
	
	ofDataR.x_min = 0
	ofDataR.x_max = 0
	ofDataR.y_min = 0
	ofDataR.y_max = 0
	ofDataR.z_min = 0
	ofDataR.z_max = 0
	
	for (var l = 0; l<lines.length;l++)	{
		
		var line = lines[l]
		var str = line.substring(0, 2)
		
		var curr_e = "";
		
		if (str=="f ")	{
			
			curr_e = "f";
			if(!ofDataR.f_begins)	{
			
				ofData["f"] = []
				ofDataR.f_begins = l;
			}
			
		}
		else if (str=="g ")	{
		
			curr_e = "g";
			
		}
		else if (str=="v ")	{
		
			if(!ofDataR.v_begins)	{
			
				ofData["v"] = []
				ofDataR.v_begins = l;
			}
			
			curr_e = "v";
		}
		else if (str=="vn")	{
		
			curr_e = "vn";
			if(!ofDataR.vn_begins)	{
				
				ofData["vn"] = []
				ofDataR.vn_begins = l;
			}
		}
		else if (str=="vt")	{
			
			curr_e = "vt"
			if(!ofDataR.vt_begins)	{
				
				ofData["vt"] = []
				ofDataR.vt_begins = l;
			}
		}
		else	{
		
			curr_e = "";
			ignored_lines++;
			// ignore line
			// 3351-1508-6959-0290-1969-4871-4238-88 expand!2 key
		}
		
		if (curr_e)	{
			
			var body2 = line.substring(2,line.length).split(" ");
			var body = [];
			
			for (var g = 0; g < body2.length; g++)
				if((body2[g]!==" ")&&(body2[g]))
					body.push(body2[g])
			
			ofData[curr_e].push(body);
			
			if(curr_e=="v")	{
				if(body[0]==0)
					body[0]=0
				
				if(body[1]==0)
					body[1]=0
				
				if(body[2]==0)
					body[2]=0
				
				if (body[0] < ofDataR.x_min)
					ofDataR.x_min = body[0]
				else if(body[0] > ofDataR.x_max)
					ofDataR.x_max = body[0]
				
				if (body[1] < ofDataR.y_min)
					ofDataR.y_min = body[1]
				else if(body[1] > ofDataR.y_max)
					ofDataR.y_max = body[1]
				
				if (body[2] < ofDataR.z_min)
					ofDataR.z_min = body[2]
				else if(body[2] > ofDataR.z_max)
					ofDataR.z_max = body[2]
			}
		}
	}
	console.log("Parsed Object File: " + (lines.length-ignored_lines) + " lines of data.")
	
	
	var o = group()
	
	for (var i = 0; i < ofData.f.length; i++)	{
	
		var f = [];
		
		for (var j = 0; j < ofData["f"][i].length; j++) { // for teapot, vertice refs only, no n//n structure
			f.push([ofData["f"][i][j].split("/")[0], ofData["f"][i][j].split("/")[2]])
		}	
	
		var s = convert3(f); // if from teapot, last entry in f is not invalid, it is in man mesh file
		
		for (var j = 0; j < s.length; j++)	{
			
			if(s[j])
				o.addChild(s[j]);
		}
	
	}
	ofData.o = o
	
	console.log("Generated triangle mesh.")
}