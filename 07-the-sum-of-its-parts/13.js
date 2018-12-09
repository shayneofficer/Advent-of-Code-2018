const fs = require("fs");
var stepOrder = "";

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    var inputArray = data.split("\n");

    var prereqs = getPrereqs(inputArray);


    // Assume all steps have been added to the step order, set flag to false when a new one is found
    var finished = false;
    while (!finished) {
        // Assume all steps have been added to the step order
        finished = true;
        // Iterate through the prerequisites array
        for (var i = 0; i < prereqs.length; i++) {
            // The first step with no uncompleted prerequisites
            if (prereqs[i] === '') {
                // Set the finished flag to false, make this the next step in the step order, then remove it from the prerequisite lists of other steps
                finished = false;
                var step = String.fromCharCode(i + 65);
                stepOrder += step;
                prereqs[i] = '#';
                prereqs = removePrereq(step, prereqs);
                break;
            }
        }
    }

    console.log(stepOrder);
    // Solution: IJLFUVDACEHGRZPNKQWSBTMXOY

})

function getPrereqs(inputArray) {
    var prereqs = [];
    for (var i = 0; i < 26; i++) {
        prereqs.push("");
    }
    for (var i = 0; i < inputArray.length; i++) {
        prereqs[inputArray[i].charCodeAt(36) - 65] += inputArray[i][5];
    }
    return prereqs;
}

function removePrereq(step, prereqs) {
    for (var i = 0; i < prereqs.length; i++) {
        if (prereqs[i].includes(step)) {
            var head = prereqs[i].substring(0, prereqs[i].indexOf(step));
            var tail = prereqs[i].substring(prereqs[i].indexOf(step) + 1);

            prereqs[i] = head + tail;
        }
    }
    return prereqs;
}