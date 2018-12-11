const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, data) => {

    // Handle error object
    if (err) {
        return console.log(err);
    }

    var inputArray = data.split(" ");
    for (var i = 0; i < inputArray.length; i++) {
        inputArray[i] = parseInt(inputArray[i]);
    }

    DFS(inputArray);
});

// Note this solution is iterative but I suspect there are more interesting/elegant recursive solutions
function DFS(arr) {
    // Start a running sum of all metadata entries
    var sum = 0;
    // While there are still unvisited nodes in the tree
    while (arr.length > 0) {
        for (var i = 0; i < arr.length; i += 2) {
            // The first leaf encountered
            if (arr[i] === 0) {
                // Decrement its parent node's number of children
                arr[i - 2] -= 1;
                // Remove the leaf's number of children from the list
                arr.splice(i, 1);
                // Retreive the number of metadata entries in this leaf, then remove that number
                var numMetadata = parseInt(arr.splice(i, 1));
                // Iterate through the metadata entries, adding them to the running sum and removing them from the array
                for (var j = 0; j < numMetadata; j++) {
                    sum += parseInt(arr.splice(i, 1));
                }
                // Return to the parent node's number of children
                i -= 4;
            }
        }
    }
    console.log(sum);
    // Solution: 36,891
}