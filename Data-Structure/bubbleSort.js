/*
	Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements 
		if they are in wrong order.
	Worst and Average Case Time Complexity: O(n*n). Worst case occurs when array is reverse sorted.
	Best Case Time Complexity: O(n). Best case occurs when array is already sorted.
	Auxiliary Space: O(1)
	Boundary Cases: Bubble sort takes minimum time (Order of n) when elements are already sorted.
	Sorting In Place: Yes
	Stable: Yes
	In computer graphics it is popular for its capability to detect a very small error (like swap of just two elements)
	 in almost-sorted arrays and fix it with just linear complexity (2n). For example, it is used in a polygon 
	 filling algorithm, where bounding lines are sorted by their x coordinate at a specific scan line 
	 (a line parallel to x axis) and with incrementing y their order changes (two elements are swapped) only
	 at intersections of two lines 
		source for documentation-"geeksforgeeks"
*/

function bubbleSort(arr) {
	let len = arr.length;
	let isSwapped = false;  //for optimization
	function swap(i, j) {
		let temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	for (let i = 0;i < len - 1; i++) {
		// here below imp j < len - i - 1
		for (let j = 0; j < len - i - 1;j++) {
			if (arr[j] > arr[j+1]) {
				swap(j, j+1);
				isSwapped = true;
			}
		}
		if (!isSwapped) {
			break;
		}
	}
	
	return arr;
}

//let arr = [1,2,3,4,5,6,7,8,9,10];
let arr = [55,16,19,21,3,32,11,65,10,9,59,2];
console.log('unsorted array = ',arr);
let date = Date.now();
console.log(date);
console.log('sorted array = ', bubbleSort(arr));
console.log(Date.now(),'time consumed = ',Date.now() - date);