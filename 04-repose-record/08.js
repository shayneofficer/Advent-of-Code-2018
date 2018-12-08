var fs = require("fs");

// Guard object constructor to initialize a new guard with a number and total minutes slept starting at 0
var Guard = function (num) {
    this.number = num;
    this.minutesFromMidnight = [];

    // An array to hold the minutes from 00:00 to 00:59 to see which minute was most often spent asleep by the sleepiest guard
    for (var i = 0; i < 60; i++) {
        this.minutesFromMidnight.push(0);
    }
}

// An array to hold the guard objects that will be created
var guardList = [];

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    // Get the input, split it into an array, then sort it (default alphabetical comparison works fine)
    var inputArray = data.split("\n");
    inputArray.sort();

    // Iterate through the (now sorted) input array
    for (var i = 0, currGuard = ""; i < inputArray.length; i++) {
        // If the line contains the word "Guard" that means a new guard begins a shift
        if (inputArray[i].includes("Guard")) {
            // Get the guard number from this line of the log
            var guardNum = inputArray[i].substring(inputArray[i].indexOf("#"), inputArray[i].indexOf("b"));
            guardNum = guardNum.trim();

            // Set the current guard in our for loop to this number
            currGuard = guardNum;

            // If no guard with this number is in our array, create a new guard object with that number and add it
            if (!guardInList(guardNum)) {
                var newGuard = new Guard(guardNum);
                guardList.push(newGuard);
            }
            // If the line contains the word "falls" that means the current guard has fallen asleep, so record the nap    
        } else if (inputArray[i].includes("falls")) {
            recordNap(inputArray, i, currGuard);
        };
    };

    // Go through each guard's sleep histogram and find the minute with the maximum, and that guard's number
    var mostSleptMinute = 0;
    var sleepMax = 0;
    var targetGuard = "";

    for (var i = 0; i < guardList.length; i++) {
        for (var j = 0; j < 60; j++) {
            if (guardList[i].minutesFromMidnight[j] > sleepMax) {
                sleepMax = guardList[i].minutesFromMidnight[j];
                mostSleptMinute = j;
                targetGuard = guardList[i].number;
            }
        }
    }

    // console.log(`Guard ${targetGuard} slept most on minute ${mostSleptMinute}`);
    // Guard #1489 slept most on minute 33 (slept 18 times on 00:33)
    // Solution: 1489 * 33 = 49,137
});

// Alternative recordNap function, which fills the minutesFromMidnight array for each guard instead of adding to total time slept
// Function which takes in the input array, the index of the line on which a guard has fallen asleep, and that guard's number
function recordNap(inputArray, i, currGuard) {
    // Get the minute at which the guard falls asleep (hour is always midnight)
    var sleepTime = inputArray[i].substring(inputArray[i].indexOf(":") + 1, inputArray[i].indexOf(":") + 3);
    sleepTime = parseInt(sleepTime);

    // Get the minute at which the guard wakes up (hour is always midnight)
    var wakeTime = inputArray[i + 1].substring(inputArray[i].indexOf(":") + 1, inputArray[i].indexOf(":") + 3);
    wakeTime = parseInt(wakeTime);

    for (var j = 0; j < guardList.length; j++) {
        if (guardList[j].number === currGuard) {
            for (var k = sleepTime; k < wakeTime; k++) {
                guardList[j].minutesFromMidnight[k]++;
            }
        }
    }
};

// Function to check whether a guard with a given number is already in the guard list
function guardInList(num) {
    for (var i = 0; i < guardList.length; i++) {
        if (guardList[i].number === num) {
            return true;
        }
    }
    return false;
};