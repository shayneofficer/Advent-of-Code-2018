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

    for (var i = 0; i < coordinateGrid.length; i++) {
        for (var j = 0; j < coordinateGrid[i].length; j++) {
            coordinateGrid[i][j] = findClosestLoc(i, j, inputArr, coordinateGrid);
        }
    }

    // printGrid(coordinateGrid);

    var mapAreas = [];
    for (var i = 0; i < 50; i++) {
        mapAreas.push(0);
    }

    for (var i = 0; i < coordinateGrid.length; i++) {
        for (var j = 0; j < coordinateGrid[i].length; j++) {
            var letterAtLocation = coordinateGrid[i][j];
            mapAreas[coordinateNames.indexOf(letterAtLocation)]++;
        }
    }

    // Get the number of coordinates occupied by each letter
    for (var i = 0; i < mapAreas.length; i++) {
        console.log(`${coordinateNames[i]}: ${mapAreas[i]}`);
    }

    // From here I just looked at the print out in grid.txt and eliminated letters in contact with the edge of the map (infinite)
    // The largest remaining value was "V" with 3882 locations.
    // This felt a like a little bit of a cheesy solution, so if I have time I'd like to look for a better one.
})

// Function to print out the coordinate grid to the grid.txt file (commented out call s.t. it doesn't keep appending)
function printGrid(arr) {
    for (var j = 0; j < arr[0].length; j++) {
        var rowStr = "";
        for (var i = 0; i < arr.length; i++) {
            rowStr += arr[i][j];
        }
        fs.appendFile("./grid.txt", rowStr + "\n", (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}

// Function that takes an x and y coordinate, then finds the location in the input the shortest distance away
function findClosestLoc(x, y, arr, grid) {
    var shortestPath = Math.abs(arr[0][0] - x) + Math.abs(arr[0][1] - y);
    closestPoint = "";

    for (var i = 0; i < arr.length; i++) {
        var dist = Math.abs(arr[i][0] - x) + Math.abs(arr[i][1] - y);
        if (dist < shortestPath) {
            shortestPath = dist;
            closestPoint = grid[arr[i][0]][arr[i][1]];
        } else if (dist === shortestPath) {
            closestPoint = ".";
        }
    }


    // console.log(shortestPath + " to " + closestPoint);
    return closestPoint;
}