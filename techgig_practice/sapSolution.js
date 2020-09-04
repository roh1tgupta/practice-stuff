function solution(A) {
    let smallesInt;
    let i = 1;
    // write your code in JavaScript (Node.js 8.9.4)
    for(i = 1; i <= A.length; i += 1 ) {
      console.log(i, A, smallesInt);
        if (A.indexOf(i) === -1) {
            smallesInt = i;
            break;
        }
    }
    console.log('last i',  i, smallesInt);
    if (!smallesInt) {
        smallesInt = i ? i : 1;   
    }
    return smallesInt;
}

let output = solution([1, 2, 3]);
console.log(output);