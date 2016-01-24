// atomicGL
//----------------------------------------------------------------------------------------
// author: Kevin				
// contact: 
// version: 
// current version date: 2015/10/09
//----------------------------------------------------------------------------------------
// atomicGLCollision
//----------------------------------------------------------------------------------------
// TODO list
//----------------------------------------------------------------------------------------


// constructor
//------------------------
atomicGLCollision = function(){
	// attributes
	// -------------------------------------------------
	
	this.rectangles = [];
	this.lines = [];

	this.EPSILON = 0.1;
	
	// methods
	// --------------------------------------------------
	//---------------------------
	this.load 	= function () {
		var p1 = {x:3.5,  y:2, z:-44};
		//var point2 = {x:10, y:2, z:0};
		var p2 = {x:19, y:2, z:-44};
		//var point4 = {x:0,  y:2, z:10};
		var rec1 = {p1:p1, p2:p2};
		this.rectangles.push(rec1);


		var p1 = {x:3.7, y:2, z:-44};
		var p2 = {x:19,  y:2, z:-44};
		var l1 = {p1:p1, p2:p2};

		var p1 = {x:3.7, y:2, z:-45};
		var p2 = {x:19,  y:2, z:-45};
		var l2 = {p1:p1, p2:p2};

		var p1 = {x:19, y:2, z:-45};
		var p2 = {x:19,  y:2, z:-59};
		var l3 = {p1:p1, p2:p2};

		var p1 = {x:20, y:2, z:-44};
		var p2 = {x:20,  y:2, z:-59};
		var l4 = {p1:p1, p2:p2};

		this.lines.push(l1);
		this.lines.push(l2);
		this.lines.push(l3);
		//this.lines.push(l4);
	}

	this.check_collision = function(oldX, oldZ, newX, newZ){
		var collision = false;

		// Rectangles
		/*for (i = 0; i < this.rectangles.length; i++) { 
			rec = this.rectangles[i];

			A = -(rec.p2.z - rec.p1.z);
			B = rec.p2.x - rec.p1.x;
			C = -(A * rec.p1.x + B * rec.p1.z);

			D = A * newX + B * newZ + C;

			if( D<0) {
				//console.log("right");
			}
			else {
				//console.log("left");
			}
		}*/

		// Lines
		for (i = 0; i < this.lines.length; i++) { 
			line = this.lines[i];
			direction = {p1:{x:oldX, y:2, z:oldZ}, p2:{x:newX, y:2, z:newZ}};

			col = this.doLinesIntersect(line, direction);
			//console.log("i="+i + "   " + col);
			if(col == true) {
				return true;
			}

/*
			console.log("i = "+i);
			X1 = line.p1.x;		Y1 = line.p1.z;
			X2 = line.p2.x;		Y2 = line.p2.z;
			X3 = oldX;			Y3 = oldZ;
			X4 = newX;			Y4 = newZ;

			if (Math.max(X1,X2) < Math.min(X3,X4)) {
			    continue; // There is no mutual abcisses
			}
			A1 = (Y1-Y2)/(X1-X2); // Pay attention to not dividing by zero
			A2 = (Y3-Y4)/(X3-X4); // Pay attention to not dividing by zero
			if( A1 == Number.POSITIVE_INFINITY) A1 = Number.MAX_VALUE;
			if( A1 == Number.NEGATIVE_INFINITY) A1 = -Number.MAX_VALUE;		
			if( A2 == Number.POSITIVE_INFINITY) A2 = Number.MAX_VALUE;
			if( A2 == Number.NEGATIVE_INFINITY) A2 = -Number.MAX_VALUE;

			b1 = (Y1-A1*X1);
			b2 = (Y3-A2*X3);
			if( b1 == Number.POSITIVE_INFINITY) b1 = Number.MAX_VALUE;
			if( b1 == Number.NEGATIVE_INFINITY) b1 = -Number.MAX_VALUE;
			if( b2 == Number.POSITIVE_INFINITY) b2 = Number.MAX_VALUE;
			if( b2 == Number.NEGATIVE_INFINITY) b2 = -Number.MAX_VALUE;

			if( i==2 ) {
			}

			console.log(" A1 : " + A1);
			console.log(" A2 : " + A2);
			console.log(" b1 : " + b1);
			console.log(" b2 : " + b2);
			// if( !isFinite(A1) || !isFinite(A2)) {
			// 	continue;
			// }
			

			if (A1 == A2) {
				console.log(" A1==A2");
    			continue; // Parallel segments
			}
			Xa = (b2 - b1) / (A1 - A2); // Once again, pay attention to not dividing by zero
			if( i==2 ) {
			}
			console.log(" Xa : "+ Xa);

			if ( (Xa < Math.max( Math.min(X1,X2), Math.min(X3,X4) )) ||
			  (Xa > Math.min( Math.max(X1,X2), Math.max(X3,X4) )) ) {
			    console.log(" pas collision"); // intersection is out of bound
			}
			else {
				console.log(" collision i="+i);
			    return true;
			}*/


		}


		return collision;
	}

	
	/**
	 * Check if bounding boxes do intersect. If one bounding box
	 * touches the other, they do intersect.
	 * @param a first bounding box
	 * @param b second bounding box
	 * @return <code>true</code> if they intersect,
	 *         <code>false</code> otherwise.
	 */
	this.doBoundingBoxesIntersect = function(b1, b2) {
	    return b1.p1.x <= b2.p1.x 
	        && b1.p2.x >= b2.p1.x 
	        && b1.p1.z <= b2.p1.z
	        && b1.p2.z >= b2.p1.z;
	}
	/**
	 * Checks if a Point is on a line
	 * @param a line (interpreted as line, although given as line
	 *                segment)
	 * @param b point
	 * @return <code>true</code> if point is on line, otherwise
	 *         <code>false</code>
	 */
	this.isPointOnLine = function(a, b) {
	    // Move the image, so that a.first is on (0|0)
	    /*LineSegment aTmp = new LineSegment(new Point(0, 0), new Point(a.second.x - a.first.x, a.second.y - a.first.y));
	    Point bTmp = new Point(b.x - a.first.x, b.y - a.first.y);
	    double r = crossProduct(aTmp.second, bTmp);
	    return Math.abs(r) < EPSILON;*/

		var aTmp = {p1:{x:0,y:2,z:0}, p2:{x:a.p2.x-a.p1.x, y:2, z:a.p2.z-a.p1.z}};
		var bTmp = {x:b.x-a.p1.x, y:2, z:b.z-a.p1.z};
		var r = this.crossProduct(aTmp.p2, bTmp);
		return Math.abs(r) < this.EPSILON;
	}
	/**
	 * Checks if a point is right of a line. If the point is on the
	 * line, it is not right of the line.
	 * @param a line segment interpreted as a line
	 * @param b the point
	 * @return <code>true</code> if the point is right of the line,
	 *         <code>false</code> otherwise
	 */
	this.isPointRightOfLine = function(a, b) {
	    // Move the image, so that a.first is on (0|0)
	    /*LineSegment aTmp = new LineSegment(new Point(0, 0), new Point(a.second.x - a.first.x, a.second.y - a.first.y));
	    Point bTmp = new Point(b.x - a.first.x, b.y - a.first.y);
	    return crossProduct(aTmp.second, bTmp) < 0;*/

	    var aTmp = {p1:{x:0,y:2,z:0}, p2:{x:a.p2.x-a.p1.x, y:2, z:a.p2.z-a.p1.z}};
		var bTmp = {x:b.x-a.p1.x, y:2, z:b.z-a.p1.z};
		return this.crossProduct(aTmp.p2, bTmp) < 0;
	}
	/**
	 * Check if line segment first touches or crosses the line that is 
	 * defined by line segment second.
	 *
	 * @param first line segment interpreted as line
	 * @param second line segment
	 * @return <code>true</code> if line segment first touches or
	 *                           crosses line second,
	 *         <code>false</code> otherwise.
	 */
	this.lineSegmentTouchesOrCrossesLine = function(a, b) {
	    return Boolean (this.isPointOnLine(a, b.p1)
	            || this.isPointOnLine(a, b.p2)
	            || (this.isPointRightOfLine(a, b.p1) ^ 
	                this.isPointRightOfLine(a, b.p2)));
	}
	/**
	 * Check if line segments intersect
	 * @param a first line segment
	 * @param b second line segment
	 * @return <code>true</code> if lines do intersect,
	 *         <code>false</code> otherwise
	 */
	this.doLinesIntersect = function(a, b) {
	    var box1 = this.getBoundingBox(a);
	    var box2 = this.getBoundingBox(b);
	    //o1 = this.doBoundingBoxesIntersect(box1, box2);
	    o2 = this.lineSegmentTouchesOrCrossesLine(box1, box2);
	    o3 = this.lineSegmentTouchesOrCrossesLine(box2, box1);

	    //console.log("o2:" + o2 + " o3:" + o3);

		return o2 && o3;
	}

	this.getBoundingBox = function(l) {
		/*Point[] result = new Point[2];
        result[0] = new Point(Math.min(first.x, second.x), Math.min(first.y, second.y));
        result[1] = new Point(Math.max(first.x, second.x), Math.max(first.y, second.y));*/

        p1 = {x:Math.min(l.p1.x, l.p2.x), y:2, z:Math.min(l.p1.z, l.p2.z)};
        p2 = {x:Math.max(l.p1.x, l.p2.x), y:2, z:Math.max(l.p1.z, l.p2.z)};
		return {p1:p1, p2:p2};
	}

	this.crossProduct = function(a, b) {
        return a.x * b.z - b.x * a.z;
    }



	this.load();
}