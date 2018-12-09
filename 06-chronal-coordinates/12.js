const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    var inputArr = data.split("\n");
    for (var i = 0; i < inputArr.length; i++) {
        inputArr[i] = inputArr[i].split(",");
        inputArr[i][0] = parseInt(inputArr[i][0]);
        inputArr[i][1] = parseInt(inputArr[i][1]);
    }

    // Create a 2D array to hold the map. Note that the largest x and y values in the input are less than 358 and 355, respectively
    var coordinateGrid = [];
    for (var i = 0; i < 358; i++) {
        var col = [];
        for (var j = 0; j < 355; j++) {
            col.push('.');
        }
        coordinateGrid.push(col);
    }

    var coordinateNames = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < inputArr.length; i++) {
        coordinateGrid[inputArr[i][0]][inputArr[i][1]] = coordinateNames[i];
    }

    var safeSquares = 0;
    for (var i = 0; i < coordinateGrid.length; i++) {
        for (var j = 0; j < coordinateGrid[i].length; j++) {
            if (isSafe(i, j, inputArr)) {
                safeSquares++;
                console.log(`Safe spot: (${i},${j})`);
                coordinateGrid[i][j] = '#';
            }
        }
    }
    console.log(`${safeSquares} safe coordinates`);
    // Solution: 43852 safe coordinates

    // printGrid(coordinateGrid);

})

// Function to print out the coordinate grid to the grid.txt file (commented out call s.t. it doesn't keep appending)
function printGrid(arr) {
    for (var j = 0; j < arr[0].length; j++) {
        var rowStr = "";
        for (var i = 0; i < arr.length; i++) {
            rowStr += arr[i][j];
        }
        fs.appendFile("./grid_safe.txt", rowStr + "\n", (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

// Function that takes an x and y coordinate, then determines whether the total distance to each input is less than 10,000
function isSafe(x, y, arr) {
    var totalDist = 0;
    for (var i = 0; i < arr.length; i++) {
        totalDist += Math.abs(arr[i][0] - x) + Math.abs(arr[i][1] - y);
    }

    return (totalDist < 10000);
}