const fs = require("fs");

fs.readFile("input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    // Turn the input string into an array split around newlines
    var arrayInput = data.split("\n");
    // Starting frequency is 0
    var freq = 0;

    // Iterate through our input array
    for (var i = 0; i < arrayInput.length; i++) {
        // If the first character at index 0 is a + then add to our running frequency total
        if (arrayInput[i].charAt(0) === "+") {
            freq += parseInt(arrayInput[i].substr(1));
        }
        // If not, then it must be a - so we subtract from our running total
        else {
            freq -= parseInt(arrayInput[i].substr(1));
        }
    }

    // Console log the resulting frequency (578)
    console.log(freq);
})