const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    findReactions(input);
});

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

    // Solution: 11,540
}