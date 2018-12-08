const fs = require("fs");

// Guard object constructor to initialize a new guard with a number and total minutes slept starting at 0
var Guard = function (num) {
    this.number = num;
    this.totalTimeAsleep = 0;
}

// An array to hold the guard objects that will be created
var guardList = [];

// An array to hold the minutes from 00:00 to 00:59 to see which minute was most often spent asleep by the sleepiest guard
var minutesFromMidnight = [];
for (var i = 0; i < 60; i++) {
    minutesFromMidnight.push(0);
}

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

    // Once the input array has been traversed, our guard list is complete with each guard number and the total minutes each has slept
    // for (var i = 0; i < guardList.length; i++) {
    //     console.log(`Guard ${guardList[i].number} slept ${guardList[i].totalTimeAsleep} minutes`);
    // }
    // Guard #2917 slept the most: 495 minutes

    // console.log(minutesFromMidnight);
    // Minute most frequently spent asleep by guard #2917: 00:25

    // Solution: 2917 * 25 = 72,925
});

// Function which takes in the input array, the index of the line on which a guard has fallen asleep, and that guard's number
function recordNap(inputArray, i, currGuard) {
    // Get the minute at which the guard falls asleep (hour is always midnight)
    var sleepTime = inputArray[i].substring(inputArray[i].indexOf(":") + 1, inputArray[i].indexOf(":") + 3);
    sleepTime = parseInt(sleepTime);

    // Get the minute at which the guard wakes up (hour is always midnight)
    var wakeTime = inputArray[i + 1].substring(inputArray[i].indexOf(":") + 1, inputArray[i].indexOf(":") + 3);
    wakeTime = parseInt(wakeTime);

    // Compute the length in minutes of this nap
    var minutesSlept = wakeTime - sleepTime;

    // Add these minutes slept to the total sleep time of the guard whose number matches our current guard number
    for (var j = 0; j < guardList.length; j++) {
        if (guardList[j].number === currGuard) {
            guardList[j].totalTimeAsleep += minutesSlept;
        };
    };

    // If the current guard is the guard who slept most, add the minutes he slept to the minutesFromMidnight array
    if (currGuard === "#2917") {
        for (var k = sleepTime; k < wakeTime; k++) {
            minutesFromMidnight[k]++;
        };
    };
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