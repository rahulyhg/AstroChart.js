function drawNatalChart(id, size, longitude, houses,  options) {
	var defaults = {red : "red",
					green : "green",
					orange : "orange",
					blue:"blue",
					outer_color : "yellow",
					outer_text_color : "black",
					inner_color : "green",
					inner_text_color : "lightgreen",
					outer_background_color : "white",
					inner_background_color: "white",
					outer_stroke1 : "black",
					outer_stroke2 : "black",
					inner_stroke1: "black",
					inner_stroke2: "black",
					text_color : "black",
					line_color: "lightgrey",
					ascendant_color: "black",
				   houseHover: undefined};

	var settings = utils.extend(defaults, options);

	var red = settings.red;
	var green = settings.green;
	var orange = settings.orange;
	var blue = settings.blue;
	var outer_color = settings.outer_color;
	var outer_text_color = settings.outer_text_color;
	var inner_color = settings.inner_color;
	var inner_text_color = settings.inner_text_color;
	var text_color = settings.text_color;
	var line_color = settings.line_color;

	var radius = 300;

	var outer2_radius=radius;
	var outer2_thick = radius*35/300;
	var inner_radius = radius*120/300;
	var inner_thick = radius*20/300;
	var big_gliph = radius*25/300;
	var mid_gliph = radius*20/300;
	var small_gliph = radius*12/300;
	var tiny_text = radius*10/300;

	var fsize = 2*(outer2_radius+outer2_thick);
	var center_x = fsize/2;
	var center_y = fsize/2;

		var retrograde = "rrrrrrrrrrrrrrr";

	var pl_glyph = [];
	pl_glyph[0] = String.fromCharCode(81);
	pl_glyph[1] = String.fromCharCode(87);
	pl_glyph[2] = String.fromCharCode(69);
	pl_glyph[3] = String.fromCharCode(82);
	pl_glyph[4] = String.fromCharCode(84);
	pl_glyph[5] = String.fromCharCode(89);
	pl_glyph[6] = String.fromCharCode(85);
	pl_glyph[7] = String.fromCharCode(73);
	pl_glyph[8] = String.fromCharCode(79);
	pl_glyph[9] = String.fromCharCode(80);
	pl_glyph[10] = String.fromCharCode(77);
	pl_glyph[11] = String.fromCharCode(96);
	pl_glyph[12] = String.fromCharCode(123);
	pl_glyph[13] = String.fromCharCode(60);		//Part of Fortune
	pl_glyph[14] = String.fromCharCode(109);	//Vertex
	pl_glyph[15] = String.fromCharCode(90);		//Ascendant
	pl_glyph[16] = String.fromCharCode(88);		//Midheaven

	var sign_glyph = [];
	sign_glyph[1] = String.fromCharCode(97);
	sign_glyph[2] = String.fromCharCode(115);
	sign_glyph[3] = String.fromCharCode(100);
	sign_glyph[4] = String.fromCharCode(102);
	sign_glyph[5] = String.fromCharCode(103);
	sign_glyph[6] = String.fromCharCode(104);
	sign_glyph[7] = String.fromCharCode(106);
	sign_glyph[8] = String.fromCharCode(107);
	sign_glyph[9] = String.fromCharCode(108);
	sign_glyph[10] = String.fromCharCode(122);
	sign_glyph[11] = String.fromCharCode(120);
	sign_glyph[12] = String.fromCharCode(99);


	var paper = Raphael(id, fsize,fsize);

	var hamburg = paper.getFont("HamburgSymbols");

	utils.drawThickCircle(center_x, center_y, outer2_radius, outer2_thick, paper, outer_color, settings.outer_background_color, settings.outer_stroke1, settings.outer_stroke2);

	utils.drawThickCircle(center_x, center_y, inner_radius,inner_thick, paper, inner_color, settings.inner_background_color, settings.inner_stroke1, settings.inner_stroke2);

	var x1 = center_x-inner_radius;
	var x2 = outer2_thick;

	utils.drawArrow(x1, center_y, x2, center_y, paper, settings.ascendant_color, Math.abs(x2-x1)/10, Math.abs(x2-x1)/20);

	//houses
	var i;
	var last_angle = 360;
	var sign_pos = Math.floor(houses[1]/30)+1;
	var glyph = paper.print(center_x-outer2_radius-(radius/10),center_y, sign_glyph[sign_pos], hamburg, big_gliph)
		.attr({fill: color(sign_pos)});
	if(settings.houseHover != null) {
		var bbox = glyph.getBBox();
		glyph = paper.rect(bbox.x, bbox.y, bbox.width, bbox.height)
		.attr({fill: "white", stroke: 'none', 'fill-opacity': 0})
			.hover(
				function(evt) {settings.houseHover.f_in(0, evt);},
				function(evt) {settings.houseHover.f_out(0, evt);}
			);
	}

	glyph.node.id= "house-0";
	displayDegMinute(houses[1], center_x-outer2_radius-2*radius/30,center_y,0);
	for(i=2; i<=12;i++) {
		var angle = (Ascendant-houses[i]);
		sign_pos = Math.floor(houses[i]/30)+1;

		if(angle < 0) angle = angle+360;

		var midAngle;
		if(i==2) {
			midAngle = last_angle+(360+angle)/2;
			paper.text(center_x-inner_radius-radius/30,center_y, 1)
				.attr({fill: inner_text_color, 'font-size': small_gliph})
				.transform("r"+midAngle+","+center_x+","+center_y+"r-"+(midAngle));
		}

		midAngle = angle+(angle-last_angle)/2;

		if(i == 10) {
			utils.drawArrow(x1,center_y,x2,center_y, paper, line_color, Math.abs(x2-x1)/10, Math.abs(x2-x1)/20).transform("r"+angle+","+center_x+","+center_y);
		} else {
			utils.drawLine(x1,center_y,x2,center_y, paper, line_color).transform("r"+angle+","+center_x+","+center_y);
		}

		last_angle=angle;

		paper.text(center_x-inner_radius-radius/30,center_y, i)
			.attr({fill: inner_text_color, 'font-size': small_gliph})
			.transform("r"+midAngle+","+center_x+","+center_y+"r-"+(midAngle));

		glyph = paper.print(center_x-outer2_radius-radius/10,center_y, sign_glyph[sign_pos], hamburg, big_gliph).transform("r"+angle+","+center_x+","+center_y+"r-"+(angle))
			.attr({fill: color(sign_pos)});

		if(settings.houseHover != null) {
			bbox = glyph.getBBox();
			glyph = paper.rect(bbox.x-5, bbox.y-5, bbox.width+5, bbox.height+5)
				.attr({fill: "white", stroke: 'none', 'fill-opacity':0})
				.hover(
					utils.mkClosure(i, function(hs, evt) {settings.houseHover.f_in(hs, evt);}),
					utils.mkClosure(i, function(hs, evt) {settings.houseHover.f_out(hs, evt);})
				);
		}
		glyph.node.id= "house-"+i;
		displayDegMinute(houses[i], center_x-outer2_radius-2*radius/30,center_y, angle);
	}

	longitude.sort(function(a, b) {return a.angle-b.angle;});

	last_angle = 360;
	var lastArc = true;
	for(i=0; i<longitude.length; i++) {

		var angle = -(longitude[i].angle-Ascendant);
		var arc = outer2_radius-5;
		if(lastArc && Math.ceil(last_angle-angle) < 4) {
			lastArc = false;
			arc = (outer2_radius+inner_radius+5)/2;
		} else {
			lastArc = true;
		}
		last_angle = angle;
		var degmin = degMinute(longitude[i].angle);
		sign_pos = Math.floor(longitude[i].angle/30)+1;
		var isRetrograde = retrograde.substring(longitude[i].planet,longitude[i].planet+1).toUpperCase() === 'R';

		//planet
		glyph = paper.print(center_x-arc,center_y, pl_glyph[longitude[i].planet], hamburg,mid_gliph)
			.attr({fill: text_color})
			.transform("r"+angle+","+center_x+","+center_y+"r-"+(angle));
		longitude[i].glyph = pl_glyph[longitude[i].planet];
		longitude[i].degree = degmin[0];
		longitude[i].minute = degmin[1];
		longitude[i].sign = sign_pos;
		longitude[i].signGlyph = sign_glyph[sign_pos];
		longitude[i].retrograde = isRetrograde;

		if(settings.planetHover != null) {
			bbox = glyph.getBBox();
			glyph = paper.rect(bbox.x-5, bbox.y-5, bbox.width+5, bbox.height+5)
				.attr({fill: "white", stroke: 'none', 'fill-opacity':0})
				.hover(
					utils.mkClosure(longitude[i], function(pl, evt) {settings.planetHover.f_in(pl, evt);}),
					utils.mkClosure(longitude[i], function(pl, evt) {settings.planetHover.f_out(pl, evt);})
				);
		}
		glyph.node.id= "planet-"+longitude[i].planet;

		//degree
		paper.text(center_x-arc+(mid_gliph+mid_gliph/4),center_y, degmin[0]+String.fromCharCode(176))
			.attr({'font-size': tiny_text, fill: text_color})
			.transform("r"+angle+","+center_x+","+center_y+"r-"+(angle));
		//sign
		paper.print(center_x-arc+(mid_gliph+small_gliph),center_y, sign_glyph[sign_pos], hamburg, small_gliph)
			.attr({fill: color(sign_pos)})
			.transform("r"+angle+","+center_x+","+center_y+"r-"+(angle));
		//minutes
		paper.text(center_x-arc+(mid_gliph+2*small_gliph+mid_gliph/3),center_y, degmin[1]+String.fromCharCode(39))
			.attr({'font-size': tiny_text, fill: text_color})
			.transform("r"+angle+","+center_x+","+center_y+"r-"+(angle));
		//Rx symbol
		if(isRetrograde) {
			paper.print(center_x-arc+(mid_gliph+3*small_gliph+mid_gliph/5),center_y, String.fromCharCode(62), hamburg, small_gliph)
				.attr({fill: red})
				.transform("r"+angle+","+center_x+","+center_y+"r-"+(angle));
		}

		//draw lines
		var j;
		for(j=0; j< longitude.length;j++) {
			var q = 0;
			var orb = 6;
			angle = Math.abs(longitude[i].angle - longitude[j].angle);
			if(angle > 180) angle = 360 - angle;

			if(isMoon(longitude[i]) || isSun(longitude[i]) || isMoon(longitude[j]) || isSun(longitude[j])) {
				orb = 8;
			}

			if (angle <= orb) {
				q = 1;
			} else if ((angle <= (60 + orb)) && (angle >= (60 - orb))) {
				q = 6;
			} else if ((angle <= (90 + orb)) && (angle >= (90 - orb))) {
				q = 4;
			} else if ((angle <= (120 + orb)) && (angle >= (120 - orb))) {
				q = 3;
			} else if ((angle <= (150 + orb)) && (angle >= (150 - orb))) {
				q = 5;
			} else if (angle >= (180 - orb)) {
				q = 2;
			}

			if (q > 0) {
				var aspect_color;
				if (q == 1 || q == 3 || q == 6) {
					aspect_color = green;
				} else if (q == 4 || q == 2) {
					aspect_color = red;
				} else if (q == 5) {
					aspect_color = blue;
				}

				if (q != 1 && !isVertex(longitude[i]) && !isVertex(longitude[j])  && !isLilith(longitude[i]) && !isLilith(longitude[j]) && !isPof(longitude[i]) && !isPof(longitude[j])) {
					//non-conjunctions
					x1 = (inner_radius) * Math.cos(utils.deg2rad(longitude[i].angle-Ascendant));
					y1 = (inner_radius) * Math.sin(utils.deg2rad(longitude[i].angle-Ascendant));
					x2 = (inner_radius) * Math.cos(utils.deg2rad(longitude[j].angle-Ascendant));
					y2 = (inner_radius) * Math.sin(utils.deg2rad(longitude[j].angle-Ascendant));
					utils.drawLine(center_x-x1,center_y+y1,center_x-x2,center_y+y2, paper, aspect_color);
				}
			}
		}
	}



	//////////////////////////////////////////////////////////////////////
	// utils
	//////////////////////////////////////////////////////////////////////

	function isPof(planet) {
		return planet.planet == 13;
	}

	function isLilith(planet) {
		return planet.planet == 11;
	}

	function isVertex(planet) {
		return planet.planet == 14;
	}

	function isMoon(planet) {
		return planet.planet == 1;
	}

	function isSun(planet) {
		return planet.planet == 0;
	}

	function width(angle1, angle2) {
		return Math.max(angle1, angle2) - Math.min(angle1,angle2);
	}

	function degMinute(angle) {
		var reduced = reduce(angle);
		var deg = Math.floor(reduced);
		var minute = Math.floor(60*(reduced-deg));
		if(deg<10) deg="0"+deg;
		if(minute<10) minute= "0"+minute;

		return [deg, minute];
	}

	function displayDegMinute(hc, x, y, angle) {
		var degmin = degMinute(hc);
		var deg = degmin[0];
		var minute = degmin[1];
		var dir = 20*radius/300;
		if(i >= 1 && i <= 6) dir *= 1;
		else dir *= -1;
		paper.text(x, y-dir, deg+String.fromCharCode(176))
			.attr({'font-size': small_gliph, fill: outer_text_color})
			.transform("r"+angle+","+center_x+","+center_y+"r-"+(angle));
		paper.text(x,y-(-1*dir), minute+String.fromCharCode(39))
			.attr({'font-size': small_gliph, fill: outer_text_color})
			.transform("r"+angle+","+center_x+","+center_y+"r-"+(angle));
	}

	function color(pos) {
		if (sign_pos == 1 || sign_pos == 5 || sign_pos == 9) {
			return red;
		} else if (sign_pos == 2 || sign_pos == 6 || sign_pos == 10) {
			return green;
		} else if (sign_pos == 3 || sign_pos == 7 || sign_pos == 11) {
			return orange;
		} else if (sign_pos == 4 || sign_pos == 8 || sign_pos == 12) {
			return blue;
		}
		return "black";
	}

	function reduce(angle) {
		var toRet = angle;
		while(toRet >=30) toRet -= 30;
		return toRet;
	}

};