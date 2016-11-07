// Global input values
var input = [
	[
		[0, 0], 0, 0, 0, 0
	], [
		[0, 0], 0, 0, 0, 0
	]
]

// Algorithms
var distFactors = [2.1963, 2.4112, 2.7044, 2.0314, 1.0737, 1.9638, 1.0737, 1.6619, 1.7287, 1.2740];
var distOffsets = [-1.87, -4.11, -18.76, 7.13, 0, 13.57, 0, -23.70, -67.25, -9.47];

// [100, 200, 400, 800, 1500, 1600, 3000, 3200, 5000, 8000, 10000]
var genderFactors = [1.3212, 1.3114, 1.2708, 1.2143, 1.2831, 1.2831, 1.2911, 1.2911, 1.37204, 1.3944, 1.4019];
var genderOffsets = [-2.13, -3.64, -5.37, -2.85, -27.58, -27.58, -65.65, -65.65, -183.791, -333.48, -434.61];

function getRaceConversion(data) {
	var dist1 = Number(data[1]) || 0;
    var dist2 = Number(data[2]) || 0;

	console.log('dist1: ' + dist1 + ', dist2: ' + dist2);

	data[0][0] = data[0][0] || 0;
	data[0][1] = data[0][1] || 0;
    var time1 = 60 * Number(data[0][0]) + Number(data[0][1]);
    var time2 = time1;

	console.log('time1: ' + time1);

	var gen1 = Number(data[3]) || 0;
	var gen2 = Number(data[4]) || 0;

	console.log('gen1: ' + gen1 + ', gen2: ' + gen2)

    if (dist1 < dist2) {
        for (var i=dist1; i<dist2; i++) {
            time2 = time2 * distFactors[i] + distOffsets[i];
			console.log("distFactor: " + distFactors[i] + ", distOffset: " + distOffsets[i]);
        }
    } else {
        for (var i=dist1-1; i>=dist2; i--) {
            time2 = (time2 - distOffsets[i]) / distFactors[i];
			console.log("distFactor: " + distFactors[i] + ", distOffset: " + distOffsets[i]);
        }
    }

	console.log('time2 (before gender conversion): ' + time2);

    if (gen1 != gen2) {
        if (gen1 == 0) {
            time2 = genderFactors[dist2] * time2 + genderOffsets[dist2];
        } else {
			time2 = (time2 - genderOffsets[dist2]) / genderFactors[dist2];
        }
    }

	console.log('time2: ' + time2);

    printTime(time2, 1);
}

function getSplitConversion(data) {
	dist1 = Number(data[1]) || 100;
	dist2 = Number(data[2]) || 100;
	unit1 = Number(data[3]) || 0;
	unit2 = Number(data[4]) || 0;

	console.log('dist1: ' + dist1 + ', dist2: ' + dist2 + ', unit1: ' + unit1 + ', unit2: ' + unit2);

	data[0][0] = data[0][0] || 0;
	data[0][1] = data[0][1] || 0;
	time1 = 60 * Number(data[0][0]) + Number(data[0][1]);

	console.log('time1: ' + time1);

	if (unit1 !== 0) {
		dist1 = correctDist(dist1, unit1);
	}
	if (unit2 !== 0) {
		dist2 = correctDist(dist2, unit2);
	}

	var time2 = dist2 / dist1 * time1;

	console.log('time2: ' + time2);

	printTime(time2, 2)
}

function correctDist(d, u) {
	if (u == 1) {
		d *= 1000;
	} else if (u == 2) {
		d /= 3.28084;
	} else if (u == 3) {
		d *= 1609.344;
	}
	return d;
}

function printTime(time2, type) {
    var time = [];
    time[0] = Math.floor(time2/60);
    time[1] = time2 - 60*time[0];
	time[1] = Math.round(100 * time[1]) / 100;

	if (time[1] < 10) time[1] = "0" + time[1];

    document.getElementById('min' + type).value = "" + time[0];
    document.getElementById('sec' + type).value = "" + time[1];
}
