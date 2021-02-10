function getCanvas()	{
	
	return document.getElementById("canvas")
}

function setPixel(x,y, _color)	{
	
		//var c = getCanvas()
		ctx.fillStyle = _color || "#000000"
		
		ctx.fillRect(x,y,1,1)
		
		//return c
}

function eq(a,b, threshold)	{
	
	return (Math.abs(a-b) <= (threshold || 0.1))
}

function drawLine(xs,ys,xf,yf, _color)	{ // https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm , scroll down...
	
	var _COL = "#ffffff"
	
    var dx =  Math.abs(xf-xs)
    var dy = -Math.abs(yf-ys)
	
	var sx = xs<xf ? 1 : -1;
    var sy = ys<yf ? 1 : -1;
	
	var e2;
	
    var err = dx+dy
	
    while (true)	{

        setPixel(xs, ys, _color || _COL)
		
        if (xs == xf && ys == yf)
			break;
			
        e2 = 2*err;
		
        if (e2 >= dy) {
            err += dy;
            xs += sx;
        }
        if (e2 <= dx)	{
            err += dx;
            ys += sy;
		}
        
	}
	
	console.log("DRAWLINE() COMPLETE.")
}

function _square(xs, ys, xf, yf, _color)	{
	
	drawLine(xs, ys, xf, ys, _color) // tl -> tr
	drawLine(xs, yf, xf, yf, _color) // bl -> br
			
	drawLine(xs, ys, xs, yf, _color)                 // tl -> bl
	drawLine(xf, ys, xf, yf, _color)				// tr -> br
}

function _triangle(xs, ys, xf, yf, _color)	{
	
	var _ys = new Number(ys), _yf = new Number(yf)
	
	drawLine(xs+((xf-xs)/2), ys, xf, yf, _color) // top -> br
	drawLine(xs+(0.5*(xf-xs)), ys, xs, yf, _color) // top -> bl
	drawLine(xs, _yf, xf, _yf, _color)               // bl -> br
}



// C-program for circle drawing
// using Bresenham’s Algorithm
// in computer-graphics
 
// Function to put pixels
// at subsequence points
function drawCircle(xc, yc, x, y, _color)
{
    setPixel(xc+x, yc+y, _color || "red");
    setPixel(xc-x, yc+y, _color || "red");
    setPixel(xc+x, yc-y, _color || "red");
    setPixel(xc-x, yc-y, _color || "red");
    setPixel(xc+y, yc+x, _color || "red");
    setPixel(xc-y, yc+x, _color || "red");
    setPixel(xc+y, yc-x, _color || "red");
    setPixel(xc-y, yc-x, _color || "red");
}
 
// Function for circle-generation
// using Bresenham's algorithm
function circleBres(xc, yc, r, _color)	{
	
    var x = 0, y = r;
    var d = 3 - 2 * r;
	
    drawCircle(xc, yc, x, y, _color);
	
    while (y >= x)
    {
        // for each pixel we will
        // draw all eight pixels
         
        x++;
 
        // check for decision parameter
        // and correspondingly 
        // update d, x, y
        if (d > 0)
        {
            y--; 
            d = d + 4 * (x - y) + 10;
        }
        else
            d = d + 4 * x + 6;
			
        drawCircle(xc, yc, x, y, _color);  

    }
	
}



function draw(shape, xs, ys, xf, yf, _color)	{
	
	if (shape=="square")
		_square(xs,ys,xf,yf,_color)
	
	else if (shape=="triangle")
		_triangle(xs,ys,xf,yf,_color)
	
	else if (shape="circle")	{
	
		//var x_m = 0;
		
		var radius = 0.5 * (xf-xs) // dist2d({x: xs, y: ys}, {x: xf, y: yf}) / 2;
		
		console.log("radius == " + radius + ", xs+radius == " + new Number(xs+radius))
		
		circleBres(xs+radius,ys+radius, radius, _color)
	}	
	
	else
		console.log("Shape not implemented yet!: " + shape)
	
}