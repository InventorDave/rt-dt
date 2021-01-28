// https://rosettacode.org/wiki/Mandelbrot_set#JavaScript
// test


var R = 128
var G = 90
var B = 200

function mandelbrot()	{
	
	var canvas_ = document.getElementById('canvas');
	mandelbrot_(canvas_, -2, 1, -1, 1, 1000)
}

 
function mandelbrot_(canvas, xmin, xmax, ymin, ymax, iterations) {
  var width = canvas.width;
  var height = canvas.height;
 
  var ctx = canvas.getContext('2d');
  var img = ctx.getImageData(0, 0, width, height);
  var pix = img.data;
 
  for (var ix = 0; ix < width; ++ix) {
    for (var iy = 0; iy < height; ++iy) {
      var x = xmin + (xmax - xmin) * ix / (width - 1);
      var y = ymin + (ymax - ymin) * iy / (height - 1);
      var i = mandelIter(x, y, iterations);
      var ppos = 4 * (width * iy + ix);
 
      if (i > iterations) {
        pix[ppos] = R //0;
        pix[ppos + 1] = G // 0;
        pix[ppos + 2] = B //0;
      } else {
        var c = 3 * Math.log(i) / Math.log(iterations - 1.0);
 
        if (c < 1) {
          pix[ppos] = 	255 * c;
          pix[ppos + 1]  = G //0;
          pix[ppos + 2]  = B //0;
        }
        else if ( c < 2 ) {
          pix[ppos] = 		R // 255;
          pix[ppos + 1] = 	255 * (c - 1);
          pix[ppos + 2] = 	B // 0;
        } else {
          pix[ppos] = 		R //255;
          pix[ppos + 1] = 	G //255;
          pix[ppos + 2] = 	255 * (c - 2);
        }
      }
      pix[ppos + 3] = 255;
    }
  }
 
  ctx.putImageData(img, 0, 0);
}

function mandelIter(cx, cy, maxIter) {
  var x = 0.0;
  var y = 0.0;
  var xx = 0;
  var yy = 0;
  var xy = 0;
 
  var i = maxIter;
  while (i-- && xx + yy <= 4) {
    xy = x * y;
    xx = x * x;
    yy = y * y;
    x = xx - yy + cx;
    y = xy + xy + cy;
  }
  return maxIter - i;
}