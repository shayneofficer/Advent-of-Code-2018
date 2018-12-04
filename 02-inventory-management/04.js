const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    // Split input string into array
    var inputArray = data.split("\n");

    // Nested for loops to compare each string to each other string and check whether a given pair satisfies the specified conditions
    for (var i = 0; i < inputArray.length - 1; i++) {
        for (var j = i + 1; j < inputArray.length; j++) {
            if (isSimilar(inputArray[i], inputArray[j])) {
                console.log(`${inputArray[i]}`);
                console.log(`${inputArray[j]}`);
                break;
            }
        }
    }

    // Check two strings for the number of indices at which the characters differ.
    // Return true if the number of differences is 0 or 1
    function isSimilar(str1, str2) {
        var numDifs = 0;
        for (var i = 0; i < str1.length; i++) {
            if (str1.charAt(i) !== str2.charAt(i)) {
                numDifs++;
            }
            if (numDifs > 1) {
                return false;
            }
        }
        return true;
    }

    // Similar strings: agirmdjvlhedpsyoqfzuknpjwt and agitmdjvlhedpsyoqfzuknpjwt
    // Strings minus difference agimdjvlhedpsyoqfzuknpjwt
})