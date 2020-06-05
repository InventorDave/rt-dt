function ComputeGridNormal( data, x, y )	{

//	The 4 adjacent points in a uniform grid: A, B, C, D
//
//	   B
//	   |
//	C--0--A
//	   |
//	   D
//
//	
	//	The ratio of XY-scale to Z-scale: 
	s = 0.02//Sxy / Sz

	//	The desired normal: N = cross(A,B) + cross(B,C) + cross(C,D) + cross(D,A), (then normalize)//	//	

	var N = vector(0,0,0)
	
	/*
	N.x = 2 * s * (C.z - A.z)//	
	N.y = 2 * s * (D.z - B.z)//	
	N.z = 4 * s**2//	
	normalize( N )//	
	*/
	//	Since N is normalized in the end, it can be divided by 2 * s://	//	
	N.x = C.z - A.z//	
	N.y = D.z - B.z//	
	N.z = 2 * s//	
	normalize( N )//
	
	var paV = hf.GetData( x, y );	
	var sx = hf.GetSizeX();	
	var sy = hf.GetSizeY();	
	var scale = hf.GetXYScale();	
	var z0 = paV[ 0 ].m_Z;	
	var Az = ( x + 1 < sx ) ? ( paV[   1 ].m_Z ) : z0;	
	var Bz = ( y + 1 < sy ) ? ( paV[  sx ].m_Z ) : z0;	
	var Cz = ( x - 1 >= 0 ) ? ( paV[  -1 ].m_Z ) : z0;	
	var Dz = ( y - 1 >= 0 ) ? ( paV[ -sx ].m_Z ) : z0;	

	return normalize( vector( Cz - Az, Dz - Bz, 2.0 * scale ) )
}