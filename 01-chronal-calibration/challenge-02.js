const fs = require("fs");

// Starting with my input list of numbers
fs.readFile("./input.txt", "utf8", (err, data) => {

    // Turn the input string into an array split around newlines
    var arrayInput = data.split("\n");
    // Starting frequency is 0
    var freq = 0;
    // Create an array for the values of freq over time
    var freqArray = [];
    // Push the first value of freq (0) into the array
    freqArray.push(freq);

    var repeatFound = false;

    // While a repeate still hasn't been found, continue to compute a running sum of frequency changes
    while (!repeatFound) {
        // Iterate through the input array
        for (var i = 0; i < arrayInput.length; i++) {
            for (var i = 0; i < arrayInput.length; i++) {
                // If the first character at index 0 is a + then add to our running frequency total
                if (arrayInput[i].charAt(0) === "+") {
                    freq += parseInt(arrayInput[i].substr(1));
                }
                // If not, then it must be a - so we subtract from our running total
                else {
                    freq -= parseInt(arrayInput[i].substr(1));
                }
                // If the array already includes this frequency, we've found a repeat
                if (freqArray.includes(freq)) {
                    console.log("winner! " + freq);
                    // Set repeatFound to true so we break out of the while loop
                    repeatFound = true;
                    break;
                }
                // Push the new freq to the frequency array
                freqArray.push(freq);
            }
            if (repeatFound) {
                break;
            }
        }
    }

    // First repeat for me: 82516
    // Note: this seems very inefficient, I'll look into better solutions
})