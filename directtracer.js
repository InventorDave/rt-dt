function getCanvas()	{
	
	return document.getElementById("canvas")
}

function setPixel(x,y, _color, thickness)	{
	
		//var c = getCanvas()
		ctx.fillStyle = _color || "#ffffff"
		
		thickness = thickness || 1
		ctx.fillRect(x,y,thickness,thickness)
		
		//return c
}

function eq(a,b, threshold)	{
	
	return (Math.abs(a-b) <= (threshold || 0.1))
}

function drawLine(xs,ys,xf,yf, _color, thickness)	{ // https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm , scroll down...
	
	var _COL = "#ffffff"
	
    var dx =  Math.abs(xf-xs)
    var dy = -Math.abs(yf-ys)
	
	var sx = xs<xf ? 1 : -1;
    var sy = ys<yf ? 1 : -1;
	
	var e2;
	
    var err = dx+dy
	
    while (true)	{

        setPixel(xs, ys, _color || _COL, thickness)
		
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

function dtsquare(xs, ys, xf, yf, _color, thickness)	{
	
	drawLine(xs, ys, xf, ys, _color, thickness) // tl -> tr
	drawLine(xs, yf, xf, yf, _color, thickness) // bl -> br
			
	drawLine(xs, ys, xs, yf, _color, thickness)                 // tl -> bl
	drawLine(xf, ys, xf, yf, _color, thickness)				// tr -> br
}

function dttriangle(xs, ys, xf, yf, _color, thickness)	{
	
	var _ys = new Number(ys), _yf = new Number(yf)
	
	drawLine(xs+((xf-xs)/2), ys, xf, yf, _color, thickness) // top -> br
	drawLine(xs+(0.5*(xf-xs)), ys, xs, yf, _color, thickness) // top -> bl
	drawLine(xs, _yf, xf, _yf, _color, thickness)               // bl -> br
}


// program for circle drawing
// using Bresenham’s Algorithm
// in computer-graphics
 
// Function to put pixels
// at subsequence points
function drawCircle(xc, yc, x, y, _color, thickness)	{
	
	_color = _color || "white"
	thickness = thickness || 1
	
    setPixel(xc+x, yc+y, _color, thickness);
    setPixel(xc-x, yc+y, _color, thickness);
    setPixel(xc+x, yc-y, _color, thickness);
    setPixel(xc-x, yc-y, _color, thickness);
    setPixel(xc+y, yc+x, _color, thickness);
    setPixel(xc-y, yc+x, _color, thickness);
    setPixel(xc+y, yc-x, _color, thickness);
    setPixel(xc-y, yc-x, _color, thickness);
}

function dtcircle(xs,ys,radius,_color, thickness, fill)	{

	//var radius = 0.5 * (xf-xs) // dist2d({x: xs, y: ys}, {x: xf, y: yf}) / 2;
	circleBres(xs+radius,ys+radius, radius, _color, thickness, fill)	
}

// Function for circle-generation
// using Bresenham's algorithm
function circleBres(xc, yc, r, _color, thickness, fill)	{
	
	// _color = "#ffffff"
	
    var x = 0, y = r;
    var d = 3 - 2 * r;
	
    drawCircle(xc, yc, x, y, _color, thickness);
	
    while (y >= x)	{
		
        // for each pixel we will
        // draw all eight pixels
         
        x++;
 
        // check for decision parameter
        // and correspondingly 
        // update d, x, y
        if (d > 0)	{
			
            y--; 
            d = d + 4 * (x - y) + 10;
        }
        else
            d = d + 4 * x + 6;
			
        drawCircle(xc, yc, x, y, _color, thickness || 1);  

    }
	
	var i = 1
	
	if(fill)
		while((r -= thickness*(i++))>=0)
			circleBres(xc, yc, r, _color, thickness, fill)
		
}
