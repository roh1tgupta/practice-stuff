/*
	Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways.
	> Always pick first element as pivot.
	> Always pick last element as pivot (implemented below)
	> Pick a random element as pivot.
	> Pick median as pivot.
	The key process in quickSort is partition(). Target of partitions is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.
	
*/
function swap(i, j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
function partition(arr, l, r) {
	let pivot = r;
	let i = l-1;
	for (let j = l; j <= r; j++) {
		if (arr[j] <= arr[pivot])
			swap(++i, j);
	}
	if (i === l-1)
		swap(++i, r);
	return i;
}

function quickSort(arr, l, r) {
	if(l < r) {
		let partitionPos = partition(arr, l, r);
		quickSort(arr, l, partitionPos - 1);
		quickSort(arr, partitionPos + 1, r);
	}
}


//let arr = [1,2,3,4,5,6,7,8,9,10];
let arr = [55,16,19,21,3,32,11,65,10,9,59,2];
console.log('unsorted array = ',arr);
let date = Date.now();
console.log(date);
quickSort(arr, 0, arr.length - 1);
console.log('sorted array = ', arr );
console.log(Date.now(),'time consumed = ',Date.now() - date);