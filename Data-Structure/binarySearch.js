/*
    there can be more variations of binarySearch
 */

function binarySearch(arr, item) {
    if (!arr.length) {
        return -1;
    }
    let start = 0;
    let end = arr.length - 1;
    let m = parseInt((end-start)/2);
    if (item == arr[start]) {
        return 0;
    }
    if (item == arr[end]) {
        return arr.length - 1;
    }
    while (m > start && m < end) {
        if (item == arr[m]) {
            return m;
        }
        if (item > arr[m]) {
            start = m;
            m = start + parseInt((end-start)/2);
        } else {
            end = m;
            m = start + parseInt((end-start)/2);
        }
    }
    return -1;
};

let arr = [1,2,3,4,5,6,7,8,9,10,16,45,75,87];
console.log(binarySearch(arr, 87));
console.log(binarySearch(arr, 10));
console.log(binarySearch(arr, 0));
console.log(binarySearch(arr, 135));
console.log(binarySearch(arr, 45));

