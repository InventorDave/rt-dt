/** TESTS **/

// test tan(r)
function testTan(r)	{
	// Math.tan(r) accepts angle in radians
	console.log("r: " + r + ", tan: " + Math.tan(r))
}

function getTanFromDegrees(degrees) {
  return Math.tan(degrees * Math.PI / 180);
}




/** END OF TESTS **/