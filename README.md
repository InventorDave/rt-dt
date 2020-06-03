# rt/dt
Javascript implementation of Jamis Buck's Raytracer Challenge.

Once you have downloaded the project files, simply load "raytracer.html" into your browser. *This program is a work in progress.* 

The best way to start is to go to "File->Load PPM File", and load 2 PPM files consecutively. 1) "earth.ppm", and 2) any PPM file you have (GIMP converts image files to .PPM - you MUST export as ASCII not RAW!). Then go to "Options->Set/Unset BG Image", click the button that it tells you to, then select your PPM file from the dropdown menu. Finally, having exited the menu by clicking on the "x", click the "earth()" button on the right of the App window. And marvel.


Included are some .obj mesh files you can load into the program by selecting the "choose file" button below the canvas window. Then,

Select "Render->Generate BVH" (unless you want the rendering to take forever - BVH stands for Bounding Volume Heirarchy, and it is an optimisation technique).

The console will indicate when the optimisation pass is complete, but you'll be able to tell because the UI will start responding again.

Then select "Render->Render!" and watch in wonder as the mesh object is rendered....

Alternately, define a collection of primitives (look in "rt.p+e.js" to see the objects available, there is sphere, cylinder, cube, triangle etc...), create a light source object, then the best way to initialise your scene is:

	renderImage(lights(lightObj), scene(shape1, shape2, ...))
	
Or,

	scene(shape1, shape2, ...)
	lights(new point_light(positionPoint, intensityColour))
	// positionPoint = point(x,y,z), intensityColour = colour(1,1,1)
	
	var c = new Camera(width, height, fov_in_radians)
	c.setCTransform(view_transform(fromPoint, toPoint, upVector)) // positions and orients the Camera
	// point(x,y,z), vector(x,y,z)
	camera(c)
	

Then, the scene can be rendered from menu option "Render->Render!". Note, whether you choose to manually call renderImage() or not, if you want to define the camera, you must do the lower 3 lines above before you call renderImage()/exit your function.


(Note, any primitives that have a .min and .max property - see their definition function - needs to have those values set upon creation, it should be intuitive if you have any experience working with primitives in a raytracer...)

rt/dt stands for raytracer/distance-tracer because I am developing it as a quasi-rasterisation-and-raytracing app.

Some optimisations have been performed, but the code largely has not been refactored yet, as like I said, the program is still under development.

