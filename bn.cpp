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
	
	HeightField::Vertex const * const paV = hf.GetData( x, y );	
	int const sx = hf.GetSizeX();	
	int const sy = hf.GetSizeY();	
	float const scale = hf.GetXYScale();	
	float const z0 = paV[ 0 ].m_Z;	
	float const Az = ( x + 1 < sx ) ? ( paV[   1 ].m_Z ) : z0;	
	float const Bz = ( y + 1 < sy ) ? ( paV[  sx ].m_Z ) : z0;	
	float const Cz = ( x - 1 >= 0 ) ? ( paV[  -1 ].m_Z ) : z0;	
	float const Dz = ( y - 1 >= 0 ) ? ( paV[ -sx ].m_Z ) : z0;	

	return Vector3( Cz - Az, Dz - Bz, 2.f * scale ).Normalize();
}