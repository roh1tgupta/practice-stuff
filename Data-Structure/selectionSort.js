/*
Selection Sort
The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.

1) The subarray which is already sorted.
2) Remaining subarray which is unsorted.

In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted subarray.

Time Complexity: O(n2) as there are two nested loops.

Auxiliary Space: O(1)
it never makes more than O(n) swaps and can be useful when memory write is a costly operation.

*/

function selectionSort(arr) {
	let n = arr.length;
	console.log('length of array = ',n);
	for (let i=0; i < n-1; i++) {
		let min = i;
		for (let j = i+1; j < n; j++) {
			if ( arr[j] < arr[min] ) {
				min = j;
			}
		}
		if (min !== i) {
		/*	arr[i] = arr[i] + arr[min];
			arr[min] = arr[i] - arr[min];
			arr[i] = arr[i] - arr[min];
		*/
			let temp = arr[i];
			arr[i] = arr[min];
			arr[min] = temp;
			
		}
	}
	return arr;;
}

let arr = [55,16,19,21,3,32,11,65,10,9,59,2];
console.log('unsorted array = ',arr);
let date = Date.now();
console.log(date);
console.log('sorted array = ',selectionSort(arr));
console.log(Date.now(),'time consumed = ',Date.now() - date);