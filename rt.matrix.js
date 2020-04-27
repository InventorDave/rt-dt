"use strict";

/* MATRICES */



function compareMatrices(m1, m2)	{
	
	// 1. check they are the same size
	
	if ((m1.length!=m2.length))
		return false;
	
	for (var r = 0; r < m1.length; r++)
		for (var c = 0; c < m1[0].length; c++)
			if (!equal(m1[r][c],m2[r][c]))
				return false;
	
	return true;
}

function m_multiply(m1, m2)	{
	
	var m = initArray(4,4);
	
	for (var r = 0; r < 4; r++)
		for (var c = 0; c < 4; c++)
			m[r][c] = m1[r][0] * m2[0][c] +
						m1[r][1] * m2[1][c] +
						m1[r][2] * m2[2][c] +
						m1[r][3] * m2[3][c];
						
	return m;
}

/*
function m_mul_t(m, t)	{ // multiply m, a 4x4 matrix, by t, a tuple   - raytracer book, p.31

	var res = initArray(4,1);

	for (var r = 0; r < 4; r++)
			res[r][0] = 	m[r][0] * t.x +
							m[r][1] * t.y +
							m[r][2] * t.z +
							m[r][3] * t.w;
		
	// convert result to a tuple, and return.
	
	return new tuple(res[0][0],res[1][0],res[2][0],res[3][0]);
}*/
var m_mul_t = multiply_matrix_by_tuple; // rt.matrix-transform.js

function transpose(m)	{
	
	var m2 = initArray(m.length,m[0].length);
	
	for(var i=0; i<m.length; ++i)
		for(var j=0; j<m[0].length; ++j)
			m2[j][i] = m[i][j]
		
	return m2
}

function identity_matrix()	{ // returns the "identity matrix"
	
	var m = initArray(4,4);
	m[0][0] = 1, /*m.m[0][1] = 0, m.m[0][2] = 0, m.m[0][3] = 0;
	m.m[1][0] = 0, */m[1][1] = 1, /*m.m[1][2] = 0, m.m[1][3] = 0;
	m.m[2][0] = 0, m.m[2][1] = 0, */m[2][2] = 1, /*m.m[2][3] = 0;
	m.m[3][0] = 0, m.m[3][1] = 0, m.m[3][2] = 0, */m[3][3] = 1;
	
	return m;
}


function getCofactor(mat, temp, p, q, n){ 
    var i = 0, j = 0;

// Looping for each element of the matrix 
    for (var row = 0; row < n; row++) { 
        for (var col = 0; col < n; col++) { 
            // Copying into temporary matrix only those element 
            // which are not in given row and column 
            if (row != p && col != q) { 
                temp[i][j++] = mat[row][col]; 

                // Row is filled, so increase row index and 
                // reset col index 
                if (j === n - 1) { 
                    j = 0; 
                    i++; 
                }
            }
        }
    }
} 

/* Recursive function for finding determinant of matrix. 
n is current dimension of mat[][]. */

function determinant(mat, n) {

	if (!n)
		n = mat.length;
	
    var D = 0; // Initialize result 

    // Base case : if matrix contains single element 
    if (n == 1) return mat[0][0]; 

    var temp = initArray(4,4); // To store cofactors 

    var sign = 1; // To store sign multiplier 

    // Iterate for each element of first row 
    for (var f = 0; f < n; f++) { 
        // Getting Cofactor of mat[0][f] 
        getCofactor(mat, temp, 0, f, n); 
		
		// TRY ALERT() ON TEMP[][] HERE, SEE IF GET COFACTORS OF ROW 0 OF 4X4 INPUT MATRIX
		// IF SO, EASY TO EXRACT [Y(0)][X(F)] ENTRY FOR ALL COFACTORS FOR 4X4 MATRIX
		//var debugstr = temp[0][0] + ", ";
		//debugstr += temp[0][1];
		//alert(debugstr += " [" + n + "]");
		
        D += sign * mat[0][f] * determinant(temp, n - 1); 

        // terms are to be added with alternate sign 
        sign = -sign; 
    }

    return D; 
} 

function minor(m, r, c)	{
	
	var sm = submatrix(m,r,c);
	
	return determinant(sm, sm.length);
}

function cofactor(m, r, c)	{
	
	var min = minor(m, r, c);
	
	if (((r + c) % 2) != 0) // convert minor to cofactor
		min = -min;
		
	return min;
}

function submatrix(m, row, col)	{ // deduct 1 row and 1 column from a matrix to create a sub-matrix
	
	var m2 = initArray(m.length-1,m.length-1);

	for (var r = 0, r2 = 0; r < m.length; r++, r2++)	{
	
		if (r == row)	{
			// ignore this row
			r2--;
			continue;
		}
		
		for (var c = 0, c2 = 0; c < m.length; c++, c2++)	{
			
			if (c == col)	{
				// ignore column
				c2--;
				continue;
			}

			m2[r2][c2] = m[r][c];
		}	
	}
		return m2;
}

function inverse(m)	{
	
	var det = determinant(m);
	
	if (det==0)  // Fail if matrix is not invertible
		return 0;
	
	var m2 = initArray(4,4);
	var cof = 0;
	
	for (var r = 0; r < 4; r++)
		for (var c = 0; c < 4; c++)
			m2[c][r] = (cof = cofactor(m,r,c)) / det;
	
	return m2;
}



//-------------------------
// HELPER FUNCTION

function initArray(rows, cols)  {

	var result = [];
	for (var r = 0; r < rows; r++)  {

		result[r] = [];
		for (var c = 0; c < cols; c++)
			result[r][c] = 0;
	}

	return result;
}

/*
// FAILED IMPLEMENTAION OF DETERMINANT CODE, ONLY WORKS FOR 2X2, 3X3 MATRICES

function determinant2(m)	{ // input matrix must be <= 3x3

	if (m.length == 2)
		return (m[0][0]*m[1][1] - m[0][1]*m[1][0]);

	var det = 0;
	for (var c = 0; c < m.length; c++)	{
		
		det = det + (m[0][c] * cofactor2(m, 0, c));
		// debugger; // to test each iteration of the above statement.
	}

	return det;
}

function minor2(m, r, c)	{ // p35
						  // "The Minor of an element at row r and column c is the determinant of the submatrix at (r,c)"
	return determinant2(submatrix(m, r, c));
}

function cofactor2(m, r, c)	{
							// Minors that have possibly had their signs changed.
							
		var min = minor2(m, r, c);
		
		if (((r + c) % 2) != 0)
			min = -min;
		
		return min;
}

// END BLOCK
*/
