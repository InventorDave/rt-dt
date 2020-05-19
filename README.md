# rt/dt
Javascript implementation of Jamis Buck's Raytracer Challenge.

Once you have downloaded the project files, simply load "raytracer.html" into your browser. *This program is a work in progress.* Included are some .obj mesh files you can load into the program by selecting the "choose file" button below the canvas window. Then,

Select "Render->Generate BVH" (unless you want the rendering to take forever - BVH stands for Bounding Volume Heirarchy, and it is an optimisation technique).

The console will indicate when the optimisation pass is complete, but you'll be able to tell because the UI will start responding again.

Then select "Render->Render!" and watch in wonder as the mesh object is rendered....

Alternately, define a collection of primitives (look in "rt.p+e.js" to see the objects available, there is sphere, cylinder, cube, triangle etc...), then add them to a group() object, then attach your user-defined light source and group to the "ofData" global object - see "scene2()", and "scene3()" at the bottom of "rt.examples.js" for a reference on how to build your function, which you will need to run from the browser console...

(Note, any primitives that have a .min and .max property - see their definition function - needs to have those values set upon creation, it should be intuitive if you have any experience working with primitives in a raytracer...)

rt/dt stands for raytracer/distance-tracer because I am developing it as a quasi-rasterisation-and-raytracing app.

Some optimisations have been performed, but the code largely has not been refactored yet, as like I said, the program is still under development.

