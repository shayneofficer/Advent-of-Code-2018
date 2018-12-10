const fs = require("fs");

var workTime = 0;
var stepOrder = "";

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    var inputArray = data.split("\n");

    var prereqs = getPrereqs(inputArray);

    // Create arrays to hold the duration remaining of a worker's current task, as well as that task's label
    var workers = [0, 0, 0, 0, 0];
    var workersSteps = ['.', '.', '.', '.', '.'];

    while (stepOrder.length < 26) {
        var newSteps = "";
        // Iterate through the prerequisites array
        for (var i = 0; i < prereqs.length; i++) {
            // If there are any steps left without uncompleted prerequisites, and there's still a worker idle, assign the worker this task
            if (prereqs[i] === '' && workers.includes(0)) {
                var step = String.fromCharCode(i + 65);
                workersSteps[workers.indexOf(0)] = step;
                workers[workers.indexOf(0)] = step.charCodeAt(0) - 4;
                newSteps += step;
                prereqs[i] = '#';
            }
        }

        stepOrder += newSteps;

        // Start with the minimum time at 87 which will always be greater than any worker's current task (Z = 86 seconds)
        var min = 87;
        // Find the true minimum time left of the workers' current tasks (exclude 0 since that worker is idle)
        for (var i = 0; i < workers.length; i++) {
            if (workers[i] !== 0 && workers[i] < min) {
                min = workers[i];
            }
        }

        // Create the output.txt file
        // for (var i = 0; i < min; i++) {
        //     var line = `${workersSteps[0]}\t${workersSteps[1]}\t${workersSteps[2]}\t${workersSteps[3]}\t${workersSteps[4]}\n`;
        //     fs.appendFileSync("./output.txt", line, (err) => {
        //         if (err) {
        //             console.log(err);
        //         }
        //     })
        // }

        // Find the step(s) that will be completed next, remove them from remaining prerequisites array
        // I look for multiple in case two or more workers complete their tasks at the same second (this never actually happens for my input but I left this in for completeness' sake)
        for (var i = 0; i < workers.length; i++) {
            if (workers[i] === min) {
                prereqs = removePrereq(workersSteps[i], prereqs);
                workersSteps[i] = ".";
            }
        }

        // Jump forward to the completion of the next task ("min" seconds from now), add that to our total work time and subtract it from each other task's remaining time
        workTime += min;
        for (var i = 0; i < workers.length; i++) {
            if (workers[i] !== 0) {
                workers[i] -= min;
            }
        }
    }

    console.log(stepOrder);
    console.log(workTime);
    // Solution step order: IJLVUFDHRACEGZPNQKWSBTMXOY
    // Solution total work time: 1072 seconds
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

// Remove the given step from each of the indices of the prerequisites array
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