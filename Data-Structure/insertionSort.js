/*
Insertion sort is a simple sorting algorithm that works the way we sort playing cards in our hands.  ---geeksforgeeks

Time Complexity: O(n*n)

Auxiliary Space: O(1)

Boundary Cases: Insertion sort takes maximum time to sort if elements are sorted in reverse order.
	And it takes minimum time (Order of n) when elements are already sorted.

Algorithmic Paradigm: Incremental Approach

Sorting In Place: Yes

Stable: Yes

Online: Yes

Uses: Insertion sort is used when number of elements is small. It can also be useful when input array is almost sorted,
	only few elements are misplaced in complete big array.

*/

function insertionSort(arr) {
	let n = arr.length;
	for (let i = 1; i < n; i++ ) {
		let temp = arr[i];
		let j = i-1;
		while (j >= 0 && temp < arr[j]) {
			arr[j+1] = arr[j];
			j--;
		}
		arr[j+1] = temp;
		
	}
	return arr;
}

let arr = [55,16,19,21,3,32,11,65,10,9,-59,2,67,-333,0,2056];

console.log('unsorted array = ',arr);

let date = Date.now();
console.log(date);

console.log('sorted array = ',insertionSort(arr));
console.log(Date.now(),"time consumed = ",Date.now() - date);