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
	
	var deltax = xf - xs
    var deltay = yf - ys
    var deltaerr = Math.abs(deltay / (deltax || 1))    // Assume deltax != 0 (line is not vertical),
          // note that this division needs to be done in a way that preserves the fractional part
    var error = 0.0 // No error at start
    var y = ys
	
    for (var i = xs; i <= xf; i++)	{
		
        setPixel(i, y, _color || "#ffffff")
        var error = error + deltaerr
		
        if (error >= 0.5)	{
			
            y = y + ((deltay < 0) ? -1 : +1)
            error = error - 1.0
		}
	}
	
	console.log("DRAWLINE() COMPLETE.")
	
}