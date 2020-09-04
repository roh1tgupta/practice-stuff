/*
	Like QuickSort, Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one

	Time Complexity: 
	T(n) = 2T(n/2) + \Theta(n)
	The above recurrence can be solved either using Recurrence Tree method or Master method. It falls in case II of Master Method and solution of the recurrence is \Theta(nLogn).
	Time complexity of Merge Sort is \Theta(nLogn) in all 3 cases (worst, average and best) as merge sort always divides the array in two halves and take linear time to merge two halves.
	Auxiliary Space: O(n)
	Algorithmic Paradigm: Divide and Conquer
	Sorting In Place: No in a typical implementation
	Stable: Yes
	Applications of Merge Sort	
	Merge Sort is useful for sorting linked lists in O(nLogn) time.
	Inversion Count Problem
	Used in External Sorting
*/

function merge(arr, l, m, r) {
	let leftArr = arr.slice(l,m+1);
	let rightArr = arr.slice(m+1,r+1);
	let i = l;
	let leftIndex = 0;
	let rightIndex = 0;
	while( leftIndex < leftArr.length && rightIndex < rightArr.length) {
		if (leftArr[leftIndex] < rightArr[rightIndex]) {
			arr[i++] = leftArr[leftIndex++];
		}
		
		if (rightArr[rightIndex] < leftArr[leftIndex]) {
			arr[i++] = rightArr[rightIndex++];
		}
	}
	while(leftIndex < leftArr.length) {
		arr[i++] = leftArr[leftIndex++];
	}
	
	while(rightIndex < rightArr.length) {
		arr[i++] = rightArr[rightIndex++];
	}
	
}
function mergeSort(arr, l, r) {
	if (l >= r) {
		return;
	}
	let m = Math.floor((l + r) / 2);
	mergeSort(arr, l, m);
	mergeSort(arr, m+1, r);
	merge(arr, l, m, r);
}

//let arr = [1,2,3,4,5,6,7,8,9,10];
let arr = [55,16,19,21,3,32,11,65,10,9,59,2];
console.log('unsorted array = ',arr);
let date = Date.now();
console.log(date);
mergeSort(arr, 0, arr.length - 1);
console.log('sorted array = ', arr );
console.log(Date.now(),'time consumed = ',Date.now() - date);