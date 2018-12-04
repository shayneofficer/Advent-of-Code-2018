const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    var inputArray = data.split("\n");
    var fabric = [];
    var totalOverlap = 0;

    // Initialize sheet of fabric (2D array)
    for (var i = 0; i < 1000; i++) {
        var tempArr = [];
        for (var j = 0; j < 1000; j++) {
            tempArr.push(0);
        }
        fabric.push(tempArr);
    }

    // Add 1 to each box occupied by a request, s.t. those boxes with values >1 have overlap
    for (var i = 0; i < inputArray.length; i++) {
        // [distance from left, distance from top, distance from left + width, distance from top + height]
        var box = getCoords(inputArray[i]);
        for (var j = box[0]; j < box[2]; j++) {
            for (var k = box[1]; k < box[3]; k++) {
                fabric[j][k]++;
            }
        }
    }

    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < 1000; j++) {
            if (fabric[i][j] > 1) {
                totalOverlap += 1;
            }
        }
    }

    console.log(totalOverlap);
    // 104439 square inches occupied by more than one claim
})

function getCoords(str) {
    var coords = str.substring(str.indexOf("@") + 2, str.indexOf(":")).split(",");
    coords[0] = parseInt(coords[0]);
    coords[1] = parseInt(coords[1]);

    var width = parseInt(str.substring(str.indexOf(":") + 2, str.indexOf("x")));
    var height = parseInt(str.substring(str.indexOf("x") + 1));
    coords.push(coords[0] + width, coords[1] + height);

    return coords;
}