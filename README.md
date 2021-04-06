# rt/dt
Javascript implementation of Jamis Buck's Raytracer Challenge.

Once you have downloaded the project files, simply load "raytracer.html" into your browser. *This program is a work in progress.* 

On loading the app (loading the raytracer.html page in a browser with a local web server), the app will try to load a bunch of helper image files. It doesn't take more than a couple of seconds, I guess. These files will be useful to take advantage of the raytracer.

Toward the upper-left is a drop-down box with some pre-loaded sample scenes. Try them out, they're fun. Especially "Earth & Moon"...

After you've enjoyed that rather edifying experience, load the dev console and run the following 3 functions:

setScene()
genFrames() // takes a long time, generates ~36 frames
animate()

The last function, "animate()", will display an animation of the generated frames.

Note: In Firefox, after each frame is generated, the output confirmation is *NOT* printed in the dev console (it should be), but in Chrome it *IS* printed - at least on MY (rather crappy, entry level) rig.  On my (crap) rig, each frame takes on average 9-10 seconds to render.


Load a (hopefully compatible - no promises) .obj mesh file by selecting the "Load Mesh (.obj) File" File menu option. Then,

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
	

Then, the scene can be rendered from menu option "Render->Render!". Note, whether you choose to manually call renderImage() or not, if you want to define the camera, you must do the lower 3 lines of code above before you call renderImage()/exit your function.


(Note, any primitives that have a .min and .max property - see their definition function - needs to have those values set upon creation, it should be intuitive if you have any experience working with primitives in a raytracer...)

rt/dt stands for raytracer/distance-tracer because I am developing it as a quasi-rasterisation-and-raytracing app.

Some optimisations have been performed, but the code largely has not been refactored yet, as like I said, the program is still under development.

