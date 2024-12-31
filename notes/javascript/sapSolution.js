// find the smallest positive integer that does not occur in the input array A

function solution(A) {
    let smallesInt;
    let i = 1;
    // write your code in JavaScript (Node.js 8.9.4)
    for(let i = 1; i < A.length; i += 1 ) {
        console.log(A.indexOf(i))
        if (A.indexOf(i) === -1) {
            smallesInt = i;
            break;
        }
    }
    console.log(i, smallesInt)
    if (!smallesInt) {
        smallesInt = i ? i : 1;   
    }
    console.log(i, smallesInt)
    return smallesInt;
}

function optimizedSolution(A) {
    const nums = new Set(A);
    let smallestInt = 1;

    while (nums.has(smallestInt)) {
        smallestInt++;
    }

    return smallestInt;
}

console.log(solution([1, 2, 3]));
// why set has O(1) for lookup while array has O(n)
// When you search for an element in an array using methods like indexOf, the engine must check each element one by one until it finds a match (or determines that the element isn't present). This process is linear, leading to a time complexity of O(n) in the worst case, where n is the number of elements in the array.
// A Set is typically implemented using a hash table (or hash map), where each value is associated with a unique hash code. This allows for direct access to elements based on their hash codes.

// Array:
// Lookup involves iterating through elements.
// Time complexity: O(n).

// Set:
// Lookup uses a hash table for direct access.
// Time complexity: O(1) on average.

// Considerations
// Worst Case for Set: While average-case lookup is O(1), in rare cases (like hash collisions), it can degrade to O(n). However, most implementations handle this efficiently.
// Space Complexity: A Set may consume more memory than an array because it requires additional space for storing hash codes and pointers.