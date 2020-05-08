# js-raytracer-challenge
Javascript implementation of Jamis Buck's Raytracer Challenge.

Once you have downloaded the project files, simply load "raytracer.html" into your browser. This program is a work in progress. Included are some .obj mesh files you can load into the program by selecting the "choose file" button below the canvas window. Then,

Select "Render->Generate BVH" (unless you want the rendering to take forever - BVH stands for Bounding Volume Heirarchy, and it is an optimisation technique).

The console will indicate when the optimisation pass is complete, but you'll be able to tell because the UI will start responding again.

Then select "Render->Render!" and watch in wonder as the mesh object is rendered....

rt/dt stands for raytracer/distance-tracer because I am developing it as a quasi-rasterisation-and-raytracing app.

Some optimisations have been performed, but the code largely has not been refactored yet.

