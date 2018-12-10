var steps = "ARPON"
var arr = ["ABRP", "AG", "BFP", "GABOR", "OPAMNE", "A"]

function removePrereq(newSteps, prereqs) {
    console.log("test");
    for (var i = 0; i < newSteps.length; i++) {
        for (var j = 0; j < prereqs.length; j++) {
            if (prereqs[j].includes(newSteps[i])) {
                var head = prereqs[j].substring(0, prereqs[j].indexOf(newSteps[i]));
                var tail = prereqs[j].substring(prereqs[j].indexOf(newSteps[i]) + 1);
                prereqs[j] = head + tail;
            }
        }
    }
    return prereqs;
}

var altered = removePrereq(steps, arr);
console.log(altered);