function solution(A) {
    let smallesInt;
    let i = 1;
    // write your code in JavaScript (Node.js 8.9.4)
    for(let i = 1; i < A.length; i += 1 ) {
        if (A.indexOf(i) === -1) {
            smallesInt = i;
            break;
        }
    }
    if (!smallesInt) {
        smallesInt = i ? i : 1;   
    }
    return smallesInt;
}

solution([1, 2, 3]);