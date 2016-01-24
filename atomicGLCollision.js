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
	// Ligne de bordures
	this.lines = [];
	// Plans inclinés
	this.plans = [];

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


		// Petits murets
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
		this.lines.push(l4);

		// Grange avec les 2 arches
		// exterieur
		var p1 = {x:3.5, y:2, z:-79.5};
		var p2 = {x:3.5, y:2, z:-88.5};
		var l5 = {p1:p1, p2:p2};

		var p1 = {x:3.5, y:2, z:-88.5};
		var p2 = {x:15 , y:2, z:-88.5};
		var l6 = {p1:p1, p2:p2};

		var p1 = {x:15, y:2, z:-88.5};
		var p2 = {x:15 , y:2, z:-79.5};
		var l7 = {p1:p1, p2:p2};

		// Interieur
		var p1 = {x:4.5, y:2, z:-79.5};
		var p2 = {x:4.5, y:2, z:-87.5};
		var l8 = {p1:p1, p2:p2};

		var p1 = {x:4.5, y:2, z:-87.5};
		var p2 = {x:14 , y:2, z:-87.5};
		var l9 = {p1:p1, p2:p2};

		var p1 = {x:14, y:2, z:-87.5};
		var p2 = {x:14, y:2, z:-79.5};
		var l10 = {p1:p1, p2:p2};

		var p1 = {x:9, y:2, z:-87.5};
		var p2 = {x:9, y:2, z:-79.5};
		var l11 = {p1:p1, p2:p2};
		var p1 = {x:10, y:2, z:-87.5};
		var p2 = {x:10, y:2, z:-79.5};
		var l12 = {p1:p1, p2:p2};
		var p1 = {x:9 , y:2, z:-79.5};
		var p2 = {x:10, y:2, z:-79.5};
		var l13 = {p1:p1, p2:p2};

		this.lines.push(l5);
		this.lines.push(l6);
		this.lines.push(l7);
		this.lines.push(l8);
		this.lines.push(l9);
		this.lines.push(l10);
		this.lines.push(l11);
		this.lines.push(l12);
		this.lines.push(l13);

		// Cabane sur la droite
		var p1 = {x:14.6, y:2, z:-64.5};
		var p2 = {x:14.6, y:2, z:-69};
		var l14 = {p1:p1, p2:p2};

		var p1 = {x:13, y:2, z:-68};
		var p2 = {x:13, y:2, z:-75.5};
		var l15 = {p1:p1, p2:p2};

		var p1 = {x:13, y:2, z:-75.5};
		var p2 = {x:19.5, y:2, z:-75.5};
		var l16 = {p1:p1, p2:p2};

		var p1 = {x:19.5, y:2, z:-75.5};
		var p2 = {x:19.5, y:2, z:-64.5};
		var l17 = {p1:p1, p2:p2};

		var p1 = {x:19.5, y:2, z:-64.5};
		var p2 = {x:14.6, y:2, z:-64.5};
		var l18 = {p1:p1, p2:p2};

		this.lines.push(l14);
		this.lines.push(l15);
		this.lines.push(l16);
		this.lines.push(l17);
		this.lines.push(l18);

		// Plans inclines
		p1 = {x:12,   y:2, z:-68};
		p2 = {x:14.6, y:2, z:-68};
		p3 = {x:14.6, y:2, z:-72};
		p4 = {x:12,   y:2, z:-72};
		p5 = {x:14.6, y:4.2, z:-72};
		p6 = {x:12,   y:4.2, z:-72};
		pl1 = {p1:p1, p2:p2, p3:p3, p4:p4, p5:p5, p6:p6};

		this.plans.push(pl1);

	}

	this.check_collision = function(oldX, oldZ, newX, newZ){
		// Lines
		for (i = 0; i < this.lines.length; i++) { 
			line = this.lines[i];
			direction = {p1:{x:oldX, y:2, z:oldZ}, p2:{x:newX, y:2, z:newZ}};

			col = this.doLinesIntersect(line, direction);
			if(col == true) {
				return true;
			}
		}
		return false;
	}

	this.monter = function(newX, newY, newZ) {
		// Plans inclines
		for (i = 0; i < this.plans.length; i++) { 
			plan = this.plans[i];
			// Si le new point est dans la zone sur le sol
			box = this.getBoundingBox({p1:plan.p1, p2:plan.p3});
			pointIn = newX >= box.p1.x 
					&&newX <= box.p2.x
					&&newZ >= box.p1.z
					&&newZ <= box.p2.z;
			// On calcule le nouveau y
			if( pointIn) {
				c = plan.p5.y - 2;
				a = newZ - plan.p1.z;
				B = plan.p4.z - plan.p1.z;
				newY = c*(a/B) + 2;
				break;
			}
		}
		return newY;
	}

	
	/**
	 * Check if bounding boxes do intersect. If one bounding box
	 * touches the other, they do intersect.
	 * @param a first bounding box
	 * @param b second bounding box
	 * @return true if they intersect,
	 *         false otherwise.
	 */
	this.doBoundingBoxesIntersect = function(b1, b2) {
	    return b1.p1.x <= b2.p2.x 
	        && b1.p2.x >= b2.p1.x 
	        && b1.p1.z <= b2.p2.z
	        && b1.p2.z >= b2.p1.z;
	}
	/**
	 * Checks if a Point is on a line
	 * @param a line (interpreted as line, although given as line segment)
	 * @param b point
	 * @return true if point is on line,
	 * false otherwise
	 */
	this.isPointOnLine = function(a, b) {
	    // Move the image, so that a.first is on (0|0)

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
	 * @return true if the point is right of the line,
	 *         false otherwise
	 */
	this.isPointRightOfLine = function(a, b) {
	    // Move the image, so that a.first is on (0|0)
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
	 * @return true if line segment first touches or crosses line second,
	 *         false otherwise.
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
	 * @return true if lines do intersect,
	 *         false otherwise
	 */
	this.doLinesIntersect = function(a, b) {
	    var box1 = this.getBoundingBox(a);
	    var box2 = this.getBoundingBox(b);

		return this.doBoundingBoxesIntersect(box1, box2)
			   && this.lineSegmentTouchesOrCrossesLine(box1, box2)
			   && this.lineSegmentTouchesOrCrossesLine(box2, box1);
	}

	this.getBoundingBox = function(l) {
        p1 = {x:Math.min(l.p1.x, l.p2.x), y:2, z:Math.min(l.p1.z, l.p2.z)};
        p2 = {x:Math.max(l.p1.x, l.p2.x), y:2, z:Math.max(l.p1.z, l.p2.z)};
		return {p1:p1, p2:p2};
	}

	this.crossProduct = function(a, b) {
        return a.x * b.z - b.x * a.z;
    }



	this.load();
}