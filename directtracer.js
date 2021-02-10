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

function drawLine(xs,ys,xf,yf, _color)	{
	
	var _COL = "#ffffff"
	
	var deltax = xf - xs
    var deltay = yf - ys
    var deltaerr = Math.abs(deltay / deltax)    // Assume deltax != 0 (line is not vertical),
          // note that this division needs to be done in a way that preserves the fractional part
    var error = 0.0 // No error at start
    var y = ys
	
	if (deltax)	{
		
		for (var i = xs; i <= xf; i++)	{
			
			setPixel(i, y, _color || _COL)
			error = error + (deltaerr || 0)
			
			if (error >= 0.5)	{
				
				y = y + ((deltay < 0) ? -1 : +1)
				error = error - 1.0
			}
		}
	}
	else	{ // line is vertical
		
		for (var j = ys; j <= yf; j++)	{
			
			setPixel(xs, j, _color || _COL)
			setPixel(xf, j, _color || _COL)
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
	
	drawLine(xs+(0.5*(xf-xs)), ys, xf, yf, _color) // top -> br
	//drawLine(xs+(0.5*(xf-xs)), ys, xs, yf, _color) // top -> bl
	drawLine(xs, _yf, xf, _yf, _color)               // bl -> br
}

function draw(shape, xs, ys, xf, yf, _color)	{
	
	if (shape=="square")
		_square(xs,ys,xf,yf,_color)
	
	else if (shape=="triangle")
		_triangle(xs,ys,xf,yf,_color)
		
	else
		console.log("Shape not implemented yet!: " + shape)
	
}