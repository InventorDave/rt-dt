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

	next():
	renderImage()
	A = STEP(A)
	set(A)
   ^--
	opt: test(A)
*/

