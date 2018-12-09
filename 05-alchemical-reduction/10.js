const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    // Iterate through all the types of units in the polymer
    var alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 26; i++) {
        // Remove units of the type represented by letter i (lowercase and capital)
        var alteredPolymer = removeUnit(alphabet.charCodeAt(i), data);
        // Find reactions in the new altered polymer (console logging the length of each resulting string)
        findReactions(alteredPolymer);
    }
});

// Function to find instances of a type of unit in the polymer and remove them
function removeUnit(type, polymer) {
    var finished = false;
    while (!finished) {
        finished = true;
        for (var i = 0; i < polymer.length; i++) {
            if (polymer.charCodeAt(i) === type || polymer.charCodeAt(i) === type - 32) {
                finished = false;
                var head = polymer.substring(0, i);
                var tail = polymer.substring(i + 1);
                polymer = head + tail;
            }
        }
    }
    return polymer;
}

// Reusing the same findReactions function from challenge 09
// Function to locate instances of units of the same type and opposite polarity
function findReactions(polymer) {
    // Boolean flag to control while loop
    var finished = false;
    // While the flag is false, look through the input string and remove reactions
    while (!finished) {
        // Start by assuming the reactions are finished, if no reaction occurs, the flag remains true and the loop will end
        finished = true;
        for (var i = 0; i < polymer.length - 1; i++) {
            var unit = polymer.charCodeAt(i);
            var nextUnit = polymer.charCodeAt(i + 1);

            if (Math.abs(nextUnit - unit) === 32) {
                // A reaction has occured, set finished to false, then create a new string with the reaction units removed
                finished = false;
                var head = polymer.substring(0, i);
                var tail = polymer.substring(i + 2);
                polymer = head + tail;
            }
        }
    }

    // console log the length of the polymer after all reactions have occured
    console.log(polymer.length);

    // Solution: the shortest polymer is 6918 characters long (found by removing units of type b/B)
    // This runs comparatively pretty slowly, so I suspect this solution can be vastly improved upon
}