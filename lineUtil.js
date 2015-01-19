var npoints = 0;
var MAX_LINE_POINTS = 100;

function clearLine ()
{
	console.log (scene.children.length);
	scene.remove (myLine);
	npoints = 0;
	
	render();
}

function outputContour ()
{
	var string ="";

	string = string.concat (npoints.toString() + " ");
	
	for (i = 0; i < npoints; i++) {
		var num = myLine.geometry.vertices[MAX_LINE_POINTS - npoints + i].x;
		string = string.concat (num.toString() + " ");
		var num = myLine.geometry.vertices[MAX_LINE_POINTS - npoints + i].y;
		string = string.concat (num.toString() + " ");
	}
	
//	console.log (string);
	
	localStorage.setItem ("myContour", string);
}

function tok (s, chars, rtl) 
{
	var n, i = chars.length;
	rtl = true === rtl;
	while (i--) {
		n = s.indexOf (chars[i]);
		s = n < 0 ? s : rtl
			? s.substr (++n)
			: s.substr (0, n);
	}
	return s;
}

function readContour ()
{
//	var ss = contour;

	var ss = localStorage.getItem ("myContour");
	console.log (ss);
	
	
	var n = tok (ss, " ");

	ss = tok (ss, " ", true);

	var x, y;
	x = tok (ss, " "); ss = tok (ss, " ", true);
	y = tok (ss, " "); ss = tok (ss, " ", true);
//	console.log (x+", " +y);
	
	newLine = createNewLine (new THREE.Vector3 (x,y,0));
	scene.add (newLine);
	
	for (i = 1; i < n; i++) {
		x = tok (ss, " "); ss = tok (ss, " ", true);
		y = tok (ss, " "); ss = tok (ss, " ", true);
	
		addPoint (new THREE.Vector3 (x,y,0));
	}
}

function createNewLine(startingPoint){
    var geometry = new THREE.Geometry();
	
	for (var i = 0; i < MAX_LINE_POINTS; i++) {
		geometry.vertices.push(startingPoint.clone());
    }

    myLine =  new THREE.Line(geometry,  new THREE.LineBasicMaterial( { color: 0x222222 } ));
    // myLine.geometry.dynamic = true; // default

    return myLine;
}

function addPoint(myPoint) 
{
    myLine.geometry.vertices.push(myLine.geometry.vertices.shift()); //shift the array
    myLine.geometry.vertices[MAX_LINE_POINTS-1] = myPoint; //add the point to the end of the array
    myLine.geometry.verticesNeedUpdate = true;
}

