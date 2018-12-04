const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    // Split input string into array
    var inputArray = data.split("\n");
    // Start counters for strings containing exactly two and exactly three of any character
    var doubles = 0;
    var triples = 0;

    // For each string in our input array, call the checkRepeatedLetters function
    for (var i = 0; i < inputArray.length; i++) {
        checkRepeatedLetters(inputArray[i]);
    }

    function checkRepeatedLetters(str) {
        // Object containing number of occurences of each letter (probably don't need to intialize every value...)
        var letterOccurences = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
            f: 0,
            g: 0,
            h: 0,
            i: 0,
            j: 0,
            k: 0,
            l: 0,
            m: 0,
            n: 0,
            o: 0,
            p: 0,
            q: 0,
            r: 0,
            s: 0,
            t: 0,
            u: 0,
            v: 0,
            w: 0,
            x: 0,
            y: 0,
            z: 0
        };

        // Boolean flags to denote whether a string contains exactly two or exactly three of any character
        var hasDouble = false;
        var hasTriple = false;

        for (var i = 0; i < str.length; i++) {
            letterOccurences[`${str[i]}`] += 1;
        }

        for (var i in letterOccurences) {
            if (letterOccurences[i] === 2) {
                hasDouble = true;
            }
            else if (letterOccurences[i] === 3) {
                hasTriple = true;
            }
        }
        if (hasDouble) {
            doubles++;
        }
        if (hasTriple) {
            triples++;
        }

    }

    // console.log(`Doubles: ${doubles}\nTriples: ${triples}`);

    console.log(`Checksum: ${doubles * triples}`);

    // 5434
})